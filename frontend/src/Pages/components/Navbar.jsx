import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import MobileSidebar from './MobileSidebar'
import { Rocket } from 'lucide-react'
import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'
import { useEffect } from 'react'
import { useAccount } from '@/AccountContext'
import useScrollTop from '@/hooks/useScroll'

const Navbar = () => {
  const rdt = useRdt()
  const { accounts } = useAccount()
  const navigate = useNavigate()
  const scrolled = useScrollTop()
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
          // try {
          //   const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
          //     public_address: result.value.accounts[0].address
          //   });
          //   console.log("Login successful", loginResponse.data);
          //   if(loginResponse.status==200){

          //   navigate("/userDashboard");
          //   }
          // } catch (loginError) {
          //   console.log("Error during login API call", loginError);
          // }
        }
      } catch (error) {
        console.log('Error in API call', error)
      }
    }
  })

  useEffect(() => {
    const checkSignup = async () => {
      if (accounts && accounts.length > 0) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${
              accounts[0].address
            }`,
          )

          console.log('Signup status:', response.data.exist)
          if (response.data.exist === false) {
            await rdt.disconnect()
          }
        } catch (error) {
          console.error('Error checking signup status:', error)
        }
      }
    }

    checkSignup()
  }, [])
  console.log(scrolled, 'scrolled')
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto flex  bg-gradient-to-t from-black/80 to-purple-900 text-white fixed w-full  z-50 transition-all duration-300  items-center justify-center h-14 p-5  ${
          scrolled ? 'top-6 max-w-[1200px] rounded-3xl ' : 'top-0 max-w-full '
        }   `}
      >
        <div className="w-full ">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className=" h-12 " />
          </Link>
        </div>
        <ul className="md:flex hidden items-center justify-center  gap-5 w-[170%] font-semibold text-lg">
          {/* <NavLink
            to="/aboutus"
            className={
              ({ isActive }) =>
                isActive
                  ? 'bg-purple-700/70 p-2 rounded-xl text-white font-semibold' // Active state with a darker purple background
                  : 'hover:bg-purple-600/30 p-2 rounded-xl text-white font-semibold' // Inactive state with a light purple hover effect
            }
            end
          >
            <li>About Us</li>
          </NavLink> */}

          <NavLink
            to="/products"
            className={
              ({ isActive }) =>
                isActive
                  ? 'bg-purple-700/70 p-2 rounded-xl text-white font-semibold' // Active state with a darker purple background
                  : 'hover:bg-purple-600/30 p-2 rounded-xl text-white font-semibold' // Inactive state with a light purple hover effect
            }
            end
          >
            <li>Products</li>
          </NavLink>
          <NavLink
            to="/resources"
            className={
              ({ isActive }) =>
                isActive
                  ? 'bg-purple-700/70 p-2 rounded-xl text-white font-semibold' // Active state with a darker purple background
                  : 'hover:bg-purple-600/30 p-2 rounded-xl text-white font-semibold' // Inactive state with a light purple hover effect
            }
            end
          >
            <li>Resources</li>
          </NavLink>
          <NavLink
            to="/blog"
            className={
              ({ isActive }) =>
                isActive
                  ? 'bg-purple-700/70 p-2 rounded-xl text-white font-semibold' // Active state with a darker purple background
                  : 'hover:bg-purple-600/30 p-2 rounded-xl text-white font-semibold' // Inactive state with a light purple hover effect
            }
            end
          >
            <li>Blogs</li>
          </NavLink>
          <NavLink
            to="/explore"
            className={
              ({ isActive }) =>
                isActive
                  ? 'bg-purple-700/70 p-2 rounded-xl text-white font-semibold' // Active state with a darker purple background
                  : 'hover:bg-purple-600/30 p-2 rounded-xl text-white font-semibold' // Inactive state with a light purple hover effect
            }
            end
          >
            <li>Explore</li>
          </NavLink>
        </ul>
        <div className="w-full md:flex items-center justify-end gap-4 hidden ">
          <radix-connect-button />
        </div>
        <div className="md:hidden block">
          <MobileSidebar />
        </div>
      </div>
    </div>
  )
}

export default Navbar
