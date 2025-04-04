import { useAccount } from '@/AccountContext'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BookDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { SkeletonCard } from '../GlobalComponents/Skeleton'
import BondCard from './components/BondCard'
import SkeletonBond from '../GlobalComponents/SkeletonBond'

const PurchasedBond = (props) => {
  const { accounts } = useAccount()
  const [loading2, setLoading2] = useState(false)
  const sendTransaction = useSendTransaction()
  const params = useParams()
  const navigate = useNavigate()
  const [issuedBonds, setIssuedBonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedBonds, setExpandedBonds] = useState({}) // Track expanded descriptions
  const [manifest, setManifest] = useState('')
  const fetchIssuedBond = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/all/${params.id
        }?purchased=true`,
      )
      setIssuedBonds(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Failed to load issued bonds')
      setLoading(false)
    }
  }
  const handleClaim = async (bond) => {
    const data = {
      bond_id: bond.id,
      community_id: bond.community_id,
    }
    setLoading2(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/zcb/claim`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData =
        typeof response.data === 'string'
          ? response.data.trim()
          : JSON.stringify(response.data)

      console.log('Response:', responseData)

      setManifest(responseData)

      const { receipt } = await sendTransaction(responseData)

      const txId = receipt?.transaction?.intent_hash

      if (txId) {
        try {
          const submitResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log('Submit Transaction Response:', submitResponse.data)

          toast.success('Withdraw Successfully!')
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error Withdraw token:', error.response.data.detail)

      toast.error('Something went wrong while Withdrawing.')
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading2(false)
    }
  }
  useEffect(() => {
    fetchIssuedBond()
  }, [])

  const toggleDescription = (id) => {
    setExpandedBonds((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the expanded state for the bond
    }))
  }

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }

  return (
    <div className="items-start gap-3 justify-start min-h-screen overflow-hidden  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6">
              {/* Heading Card */}

              <div
                className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden"
              >

                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                    <img
                      className="w-14 h-14"
                      src="/member.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="text-[#5228A4] font-semibold uppercase text-xl"
                    >
                      Total Purchased Bonds:
                    </div>
                    <div
                      className="text-white text-[56px] font-medium text-center"
                    >
                      Purchased Bonds
                    </div>

                  </div>
                </div>
              </div>


              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] z-50 border-2 border-[#5228A4]  relative overflow-hidden">
                <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                  <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                  Bonds:
                  </div>
                  
                </div>

                {loading ? (
                   <div className="flex flex-col h-auto items-center px-5  justify-center text-center mt-5">
                   {[...Array(2)].map((_, i) => (
                     <SkeletonBond key={i} />
                   ))}
                 </div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center my-10 text-white">No bonds purchased yet</div>
                ) : (
                  <div className="mx-2  my-6">
                    {issuedBonds.map((bond) => (
                      <div key={bond.id}  
                      className='flex flex-col relative items-end '       >
                        <BondCard bond={bond} />
                        {bond.maturity_date && (
                          bond.claimed ? (
                            
                            <Button
                              disabled
                              className="rounded-[26px] py-2 text-[20px] top-3 right-2 px-[35px]  absolute bg-brand3 shadow-inner text-black  leading-5 font-medium"
                            >
                              Already Claimed
                            </Button>
                          ) : (
                            
                            <Button
                              disabled={loading2}
                              onClick={() => handleClaim(bond)}
                              className="rounded-[26px]  text-[18px] top-3 right-2 px-[35px]  absolute bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black  leading-5 font-medium"
                            >
                              Claim
                            </Button>
                           
                          )

                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasedBond
