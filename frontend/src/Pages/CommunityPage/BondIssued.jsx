import { useAccount } from '@/AccountContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import BondCard from './components/BondCard'
import SkeletonBond from '../GlobalComponents/SkeletonBond'

// API utility functions
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async (endpoint, params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
  return response.data;
};

const BondIssued = () => {
  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()

  const address = accounts && accounts.length > 0 ? accounts[0] : null

  // Query for fetching issued bonds
  const { 
    data: issuedBonds = [], 
    isLoading: loading, 
    error 
  } = useQuery({
    queryKey: ['issuedBonds', params.id, address?.address],
    queryFn: async () => {
      if (!address) return []; // if no address, return empty array
      return fetchData(`/community/zcb/all/${params.id}`, {
        purchased: false,
        user_address: address.address
      });
    },
    enabled: !!address, // Only run query if we have an address
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
    onError: (err) => {
      console.error('Error fetching issued bonds:', err);
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
    <div className=" items-start gap-2 justify-start min-h-screen overflow-hidden z-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-2 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto">
        <div className="space-y-6 md:w-[100%]">
          <div className="flex md:flex-row flex-col md:w-[100%] mx-auto gap-2">
            <div className="md:w-[100%] w-full  space-y-6">
              <div className =" rounded-2xl border border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden ">  
                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#321e58] rounded-full p-5 z-50 flex items-center justify-center w-24 h-24">
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

              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4]  relative overflow-hidden">
                <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                  <div className="text-[#ffffff] text-left text-xl md:text-2xl font-medium flex items-center gap-2">

                    Bonds:
                  </div>
                  
                </div>
                {loading ? (
                  <div className="flex flex-col h-auto items-center px-5 justify-center text-center mt-5">
                    {[...Array(2)].map((_, i) => (
                      <SkeletonBond key={i} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-4">
                    {error instanceof Error ? error.message : 'Failed to load issued bonds'}
                  </div>
                ) : issuedBonds.length === 0 ? (
                  <div className="text-center py-4 text-white">No bonds issued yet</div>
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
