import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import MobileSidebar from '../MobileSidebar'
import { ChevronLeft } from 'lucide-react'
import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'
import MobileNav from './MobileNav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useBluePrintSlugStore from '@/store/blueprintSlug'
import { IoHomeOutline } from "react-icons/io5";

const Navbar = () => {
  const rdt = useRdt()
  const navigate = useNavigate()
  const params = useParams()
  const { slug } = useBluePrintSlugStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showMore, setShowMore] = useState(false);

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
  

  const handleSelect = (action) => {
    action();
    setIsDropdownOpen(false);
  };


  const navItems = [
    { icon: '/1.svg', label: 'Home', path: '/' },
    { icon: '/2.svg', label: 'Dashboard', path: `/community/detail/${params.id}` },
    { icon: '/3.svg', label: 'Members', path: `/community/detail/${params.id}/members` },
    { icon: '/4.svg', label: 'Discussion', path: `/community/detail/${params.id}/discussion` },
    { icon: '/5.svg', label: 'Vote Power', path: `/community/detail/${params.id}/tokenDistribution` },
    { icon: '/6.svg', label: 'Activity', path: `/community/detail/${params.id}/activity` },
    { icon: '/7.svg', label: 'Proposals', path: `/community/detail/${params.id}/proposals` },
  ];

  const moreItems = slug === 'Insurance' ? [
    { label: 'Issue ANN Token', path: `/community/detail/${params.id}/annissue` },
    { label: 'Issued ANN Tokens', path: `/community/detail/${params.id}/annissued` },
  ] : [
    { label: 'Bond Issue', path: `/community/detail/${params.id}/bondissue` },
    { label: 'Purchased Bond', path: `/community/detail/${params.id}/purchasedbond` },
    { label: 'Bond Issued', path: `/community/detail/${params.id}/bondissued` },
  ];

  return (
    <div className=''>
      <div className="bg-[rgba(169,126,255,0.08)] ms-10 rounded-[20px] text-white border-solid border-[#5228A4] border py-10 pt-[13px] px-[25px] shrink-0 w-[300px] h-[737px] relative overflow-hidden">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-row py-2 items-center justify-start my-4 cursor-pointer transition-colors ${isActive ? 'bg-[#5228A4] text-white rounded-lg w-[300px] px-3' : 'text-primary-100'}`
            }
            end
          >
            <img className="shrink-0 w-[40px] h-[30px] px-3" src={item.icon} alt={item.label} />
            <div className="font-medium text-2xl">{item.label}</div>
          </NavLink>
        ))}

        {/* More Button */}
        <div
          onClick={() => setShowMore(!showMore)}
          className="flex flex-row py-2 items-center justify-start my-4 cursor-pointer text-primary-100 transition-colors w-[300px] px-3"
        >
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d={showMore ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}></path>
          </svg>
          <div className="font-medium px-3 text-2xl">{showMore ? 'Less' : 'More'}</div>
          
        </div>

        {/* Additional Tabs */}
        {showMore && moreItems.map((item, index) => (
          <NavLink
            key={`more-${index}`}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-row py-2 items-center justify-start my-4 cursor-pointer transition-colors ${isActive ? 'bg-[#5228A4] text-white rounded-lg w-[300px] px-3' : 'text-primary-100'}`
            }
            end
          >
            <div className="font-medium text-2xl pl-3">{item.label}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
