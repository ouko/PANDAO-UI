import { useAccount } from '@/AccountContext'

import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import BondCard from './components/BondCard'

const BondIssued = (props) => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [issuedBonds, setIssuedBonds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  const fetchIssuedBond = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/all/${params.id}?purchased=false`,
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
    <div className=" items-start gap-3 justify-start min-h-screen overflow-hidden z-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[95%] mx-auto gap-2">
            <div className="md:w-[100%] w-full  space-y-6">
              <div
                className =" rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden "
               >
               
                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                    <img
                      className="w-14 h-14"
                      src="/8.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                      className="text-[#5228A4] font-semibold uppercase text-xl"
                    >
                      Total Issued Bonds:
                    </div>
                    <div
                      className="text-white text-[56px] font-medium text-center"
                    >
                      Issued Bonds
                    </div>
                  </div>
                </div>
              </div>

              {/* Issued Bonds Section */}

              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] h-full relative overflow-hidden">
                <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                  <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                    Bonds:
                  </div>
                  
                </div>
                {loading ? (
                  <div className="flex items-center justify-center h-96">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-full  animate-pulse"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center">No bonds issued yet</div>
                ) : (
                  <div className="space-y-4 px-6 py-6">
                    {issuedBonds.map((bond) => (
                      <BondCard key={bond.id} bond={bond} />
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

export default BondIssued
