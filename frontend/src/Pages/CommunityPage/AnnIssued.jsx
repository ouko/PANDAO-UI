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

const AnnIssued = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [issuedBonds, setIssuedBonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIssuedBond = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/all/${params.id}`,
      )
      setIssuedBonds(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Failed to load issued bonds')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIssuedBond()
  }, [])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <BookDownIcon className=" text-blue-700" />
                  </div>
                </div>
                <div className="text-3xl font-semibold"> Issued ANN Token </div>
              </Card>
              <Card className="p-5">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center">No bonds issued yet</div>
                ) : (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {issuedBonds.map((bond) => (
                      <Card
                        key={bond.id}
                        className="bg-white shadow-md rounded-lg p-4"
                      >
                        {/* <div className="flex flex-col justify-between items-center"> */}
                          <CardTitle className="text-xl font-semibold">
                            {bond.name}
                          </CardTitle>
                          {/* <span className="text-sm text-gray-500">
                            ID: {bond.id}
                          </span> */}
                        {/* </div> */}
                        <CardDescription className="text-gray-600 mb-2">
                          {bond.description}
                        </CardDescription>

                        <div className="mt-4 space-y-2 text-sm text-gray-700">
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
                            {bond.price ? `$${bond.price}` : 'Not available'}
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
                        </div>

                        <div className="mt-4 text-sm text-gray-500">
                          <p>
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
                        </div>
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

export default AnnIssued
