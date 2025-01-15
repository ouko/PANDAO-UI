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
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/all/${
          params.id
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
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6">
              {/* Heading Card */}
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <BookDownIcon className="text-blue-700" />
                  </div>
                </div>
                <div className="text-3xl font-semibold">Purchased Bonds</div>
              </Card>

              {/* Issued Bonds Section */}
              <Card className="p-5">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center">No bonds purchased yet</div>
                ) : (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {issuedBonds.map((bond) => (
                      <Card
                        key={bond.id}
                        className="bg-green-100/50 shadow-lg rounded-lg p-6  hover:shadow-xl ring-2 ring-emerald-600"
                      >
                        {/* Bond Title */}
                        <CardTitle className="text-2xl font-bold text-blue-800 capitalize py-2">
                          {bond.name}
                        </CardTitle>

                        {/* Bond Image */}
                        {bond.asset_url && (
                          <div className="mb-4">
                            <img
                              src={bond.asset_url}
                              alt={bond.asset_name || 'Asset'}
                              className="w-full h-48 object-cover rounded-md ring-2 ring-purple-400"
                            />
                          </div>
                        )}

                        <p>
                          <strong>Asset Name:</strong>{' '}
                          {bond.asset_name || 'N/A'}
                        </p>

                        {/* Bond Description */}
                        <CardDescription className="text-gray-600 mb-4">
                          {bond.description ? (
                            <div>
                              <div
                                className={`${
                                  expandedBonds[bond.id] ? '' : 'line-clamp-3'
                                }`}
                              >
                                {bond.description}
                              </div>
                              {/* <button
                                className="mt-2 text-blue-500 hover:text-blue-700"
                                onClick={() => toggleDescription(bond.id)}
                              >
                                {expandedBonds[bond.id]
                                  ? 'Show less'
                                  : 'Show more'}
                              </button> */}
                            </div>
                          ) : (
                            <p>No description provided</p>
                          )}
                        </CardDescription>

                        {/* Bond Details */}
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>
                            <strong>Contract Identity:</strong>{' '}
                            {bond.contract_identity || 'N/A'}
                          </p>
                          <p>
                            <strong>Number of Bonds:</strong>{' '}
                            {bond.number_of_bonds}
                          </p>
                          <p>
                            <strong>Currency:</strong> {bond.currency}
                          </p>
                          <p>
                            <strong>Interest Rate:</strong> {bond.interest_rate}
                            %
                          </p>
                          <p>
                            <strong>Discount:</strong> {bond.discount}
                          </p>
                          <p>
                            <strong>Price:</strong>{' '}
                            {bond.price ? (
                              <>
                                {bond.price} <strong>XRD</strong>
                              </>
                            ) : (
                              'Not available'
                            )}
                          </p>
                          <p>
                            <strong>Notional Principle:</strong>{' '}
                            {bond.notional_principle}
                          </p>
                          <p>
                            <strong>Bond Position:</strong> {bond.bond_position}
                          </p>
                          <p>
                            <strong>Contract Type:</strong> {bond.contract_type}
                          </p>
                          <p>
                            <strong>Contract Role:</strong> {bond.contract_role}
                          </p>
                          <p>
                            <span className="font-semibold text-xl">
                              Expected Return:
                            </span>{' '}
                            {bond.amount_own} XRD
                          </p>
                        </div>

                        {/* Dates and Blockchain Details */}
                        <div className="mt-4 space-y-2 text-sm text-gray-500">
                          <p
                            className={
                              new Date(bond.initial_exchange_date) < new Date()
                                ? 'text-red-500'
                                : ''
                            }
                          >
                            <strong>Initial Exchange Date:</strong>{' '}
                            {new Date(
                              bond.initial_exchange_date,
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Maturity Date:</strong>{' '}
                            {new Date(bond.maturity_date).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Created on Blockchain:</strong>{' '}
                            {bond.created_on_blockchain ? 'Yes' : 'No'}
                          </p>
                          <p className="truncate">
                            <strong>Creator Address:</strong>{' '}
                            <span
                              className="cursor-pointer hover:underline"
                              onClick={() => {
                                navigator.clipboard.writeText(bond.creator)
                                toast.success('Copied address')
                              }}
                            >
                              {bond.creator}
                            </span>
                          </p>
                        </div>
                        {bond.maturity_date &&
                          new Date(bond.maturity_date) < new Date() &&  (
                            <Button disabled={loading2} onClick={()=>handleClaim(bond)} className="w-full mt-3">Claim</Button>
                          )}
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchasedBond
