import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Sidebar = () => {
  const rdt = useRdt()
  const navigate = useNavigate()
  const params = useParams()
const [slug,setSlug]=useState("")

  rdt.walletApi.provideConnectResponseCallback(async (result) => {
    if (result.isErr()) {
      console.log('Error')
    } else {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${
            result.value.accounts[0].address
          }`,
        )
        console.log(response.data.exist)

        if (response.data.exist === false) {
          navigate('/signup')
        } else {
          navigate('/userDashboard')
        }
      } catch (error) {
        console.log('Error in API call', error)
      }
    }
  })
  
useEffect(()=>{
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/detail/${params.id}`,
      )

      if (res.status == 200) {
        console.log(res.data.blueprint_slug, 'res')
        setSlug(res.data.blueprint_slug)

        // Fetch fund history data

      }
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  fetchDetails()
},[params.id])

const getNavItems = () => {
  const baseItems = [
    { icon: '/2.svg', label: 'Dashboard', path: `/community/detail/${params.id}` },
    { icon: '/3.svg', label: 'Members', path: `/community/detail/${params.id}/members` },
    { icon: '/4.svg', label: 'Discussion', path: `/community/detail/${params.id}/discussion` },
    { icon: '/5.svg', label: 'Vote Power', path: `/community/detail/${params.id}/tokenDistribution` },
    { icon: '/6.svg', label: 'Activity', path: `/community/detail/${params.id}/activity` },
    { icon: '/7.svg', label: 'Proposals', path: `/community/detail/${params.id}/proposals` },
  ];

  const conditionalItem =
    slug === 'Investment'
      ? { icon: '/2.svg', label: 'Ann Issue', path: `/community/detail/${params.id}/annissue` }
      : { icon: '/2.svg', label: 'Bond Issue', path: `/community/detail/${params.id}/bondissue` };

  const restItems = [
    { icon: '/2.svg', label: 'Purchased Bond', path: `/community/detail/${params.id}/purchasedbond` },
    { icon: '/8.svg', label: 'Bond Issued', path: `/community/detail/${params.id}/bondissued` },
    { icon: '/1.svg', label: 'Back', path: '/' },
  ];

  return [...baseItems, conditionalItem, ...restItems];
};


console.log(slug,"asdfasdf")

  return (
    <div className=''>
      <div className="bg-[rgba(169,126,255,0.08)]  rounded-[20px] text-white border-solid border-[#5228A4] border py-10 pt-[13px] px-[15px] shrink-0  min-h-[737px] relative overflow-hidden">
        {getNavItems().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-row py-2 items-center justify-start my-4 cursor-pointer px-1 transition-colors ${isActive ? 'bg-[#5228A4] text-white rounded-lg w-[300px] ' : 'text-primary-100'}`
            }
            end
          >
            <img className="shrink-0 size-[45px] px-3" src={item.icon} alt={item.label} />
            <div className="font-medium text-2xl">{item.label}</div>
          </NavLink>
        ))}  

      </div>
    </div>
  );
}

export default Sidebar;
