import { useAccount } from '@/AccountContext'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { BookDownIcon } from 'lucide-react'
import { useSendTransaction } from '@/hooks/useSendTransaction'

const PurchasedBond = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [purchasedBonds, setPurchasedBonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sellBondId, setSellBondId] = useState('')
  const [bondCreatorAddress,setBondCreatorAddress]=useState('')
  const [sellError, setSellError] = useState(null)
  const [selling, setSelling] = useState(false)
  const [manifest,setManifest]=useState("")
  const sendTransaction = useSendTransaction()


  const fetchPurchasedBond = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/purchased/${params.id}`,
      )
      setPurchasedBonds(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Failed to load purchased bonds')
      setLoading(false)
    }
  }

  const handleSellBond = async () => {
    if (!bondCreatorAddress) {
      setSellError('Please enter a valid bond ID to sell')
      return
    }
    setSellError(null)
    setSelling(true)
    try {
     const response= await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/sell-bond`,
        {
          community_id: params.id,
          bond_creator_address: bondCreatorAddress
        }, 
      )
      console.log(response.data);
      setManifest(response.data)
      const { receipt } = await sendTransaction(manifest).finally(() => {
        setLoading(false)
      })
      let txId = receipt.transaction.intent_hash
      if (txId) {
        try {
          const response = await axios.post(
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
          console.log(response.data)
         
        } catch (error) {
       console.log(error)
        }
      }
    } catch (err) {
      console.error(err)
      setSellError('Failed to sell bond. Please try again.')
    } finally {
      setSelling(false)
    }
  }

  useEffect(() => {
    fetchPurchasedBond()
  }, [])

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }

  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <BookDownIcon className="text-blue-700" />
                  </div>
                </div>
                <div className="text-3xl font-semibold">Purchased Bonds</div>
              </Card>
              <Card className="p-5">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Bond ID to sell"
                    value={bondCreatorAddress}
                    onChange={(e) => setBondCreatorAddress(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleSellBond}
                    disabled={selling}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {selling ? 'Selling...' : 'Sell Bond'}
                  </button>
                  {sellError && (
                    <div className="mt-2 text-red-500 text-sm">{sellError}</div>
                  )}
                </div>
                {/* {loading ? (
                  <div className="text-center">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : purchasedBonds.length === 0 ? (
                  <div className="text-center">No purchased bonds yet</div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {purchasedBonds.map((bond) => (
                      <Card
                        key={bond.id}
                        className="bg-white shadow-md rounded-lg p-4"
                      >
                        <CardTitle className="text-xl font-semibold">
                          {bond.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-2">
                          {bond.description}
                        </CardDescription>
                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Bond ID:</strong> {bond.id}
                          </p>
                          <p>
                            <strong>Currency:</strong> {bond.currency}
                          </p>
                          <p>
                            <strong>Interest Rate:</strong> {bond.interest_rate}
                            %
                          </p>
                          <p>
                            <strong>Price:</strong> $
                            {bond.price || 'Not available'}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )} */}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasedBond
