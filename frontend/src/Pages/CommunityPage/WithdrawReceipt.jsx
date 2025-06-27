import { useAccount } from '@/AccountContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import BondCard from './components/BondCard'
import SkeletonBond from '../GlobalComponents/SkeletonBond'

const WithdrawReceipt = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()

  const address = accounts && accounts.length > 0 ? accounts[0] : null

  // Using TanStack Query to fetch bond reports
  const {
    data: issuedBonds = [],
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['bondReports', params.id, address?.address],
    queryFn: async () => {
      if (!address) return []; // if no address, return empty array
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/zcb/report/${params.id}`
      );
      return res.data;
    },
    enabled: !!address, // Only run query if we have an address
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
    onError: (err) => {
      console.error('Error fetching bond reports:', err);
    }
  });

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      navigate('/')
    }
  }, [accounts, navigate])

  if (!accounts || accounts.length === 0) {
    return null // navigation already handled in useEffect
  }
  return (
    <div className=" items-start justify-start min-h-screen overflow-hidden z-50  text-black px-[12px]">
      <div className="flex md:flex-row flex-col py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[95%]  ">
            <div className="md:w-[100%] w-full  space-y-6">
              <div className="rounded-2xl border border-[#5228A4] p-4 sm:p-7 mt-5 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center w-full">
                  <div className="bg-[#321e58] rounded-full p-5 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      className="w-12 h-12 sm:w-14 sm:h-14"
                      src="/8.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
                    <div className="text-brand6 font-semibold uppercase text-lg sm:text-xl">
                      Total Bonds Report:
                    </div>
                    <div className="text-white text-3xl sm:text-[56px] font-medium leading-tight">
                      Bonds Report
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border border-[#5228A4] relative overflow-hidden">
                <div className="bg-[#39246b] px-4 sm:px-6 flex z-50 flex-row items-center justify-between w-full h-[63px] sticky top-0 left-0">
                  <div className="text-white text-left text-lg sm:text-2xl font-medium flex items-center gap-2">
                    Bonds:
                  </div>
                </div>
                {loading ? (
                  <div className="flex flex-col items-center px-4 py-6 gap-4 justify-center text-center">
                    {[...Array(2)].map((_, i) => (
                      <SkeletonBond key={i} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-4 px-2 sm:px-4">
                    {error instanceof Error ? error.message : 'Failed to load bond reports'}
                  </div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center py-4 my-8 text-white px-2 sm:px-4">
                    No bonds reports available
                  </div>
                ) : (
                  <div className="space-y-4 px-4 sm:px-6 py-6">
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

export default WithdrawReceipt
