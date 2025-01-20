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
  

  const handleSelect = (callback) => {
    setIsDropdownOpen(false) // Close dropdown
    callback() // Perform any additional actions, like navigation
  }

  return (
    <div className="z-50 p-4 w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 bg-purple-50 text-black fixed">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-10 md:px-10">
        <ul className="md:flex hidden items-center justify-start gap-5 w-full font-semibold text-lg">
          <NavLink
            to="/"
            className="bg-white p-2 rounded-xl hover:text-sky-600 group"
            end
          >
            <IoHomeOutline className="group-hover:scale-110 duration-300 transition-transform" />
            
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/members`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Members</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/discussion`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-32 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-32 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Discussion</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/tokenDistribution`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Vote Power</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/activity`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Activity</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/proposals`}
            className={({ isActive }) =>
              isActive
                ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
            }
            end
          >
            <li>Proposals</li>
          </NavLink>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger>More</DropdownMenuTrigger>
            <DropdownMenuContent>
              {slug === 'Insurance' ? (
                <DropdownMenuItem
                 onSelect={() => handleSelect(() => navigate(`/community/detail/${params.id}/annissue`))}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                      : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
                  }
                    end
                >
                 <li>Issue ANN Token</li>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    onSelect={() => handleSelect(() => navigate(`/community/detail/${params.id}/bondissue`))}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                        : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
                    }
                      end
                  >
                   <li>Bond Issue</li>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleSelect(() => navigate(`/community/detail/${params.id}/purchasedbond`))}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                        : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
                    }
                  >
                   <li>Purchased Bond</li>
                  </DropdownMenuItem>
                </>
              )}
              {slug === 'Insurance' ? (
                <DropdownMenuItem
                  onSelect={() => handleSelect(() => navigate(`/community/detail/${params.id}/annissued`))}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                      : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
                  }
                    end
                >
                  <li>Issued ANN Tokens</li>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onSelect={() => handleSelect(() => navigate(`/community/detail/${params.id}/bondissued`))}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-white text-blue-800 w-36 text-center py-2 px-4 rounded-lg font-semibold'
                      : 'bg-transparent text-black w-36 text-center py-2 px-4 rounded-lg hover:text-[#003bf5]'
                  }
                    end
                >
                 <li>Bond Issued</li>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </ul>
        <div className="w-full md:flex items-center justify-end gap-4 hidden">
          <radix-connect-button />
        </div>
        <div className="md:hidden gap-3 flex items-center justify-between w-full">
          <NavLink
            to="/"
            className="bg-white p-2 rounded-xl hover:text-sky-600"
            end
          >
            <ChevronLeft />
          </NavLink>
          <MobileNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar

//const image_url = "https://github.com/shadcn.png";
//  public_address: result.value.accounts[0].address,
//         name: result.value.persona.label,
//         image_url,
