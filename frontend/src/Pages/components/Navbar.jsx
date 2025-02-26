import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import MobileSidebar from './MobileSidebar'
import { Compass, DollarSign, FileText, Home, Info, Package, Rocket } from 'lucide-react'
import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'
import { useEffect } from 'react'
import { useAccount } from '@/AccountContext'
import useScrollTop from '@/hooks/useScroll'
import { navconfig } from '@/lib/config'



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
          `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${result.value.accounts[0].address
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
            `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${accounts[0].address
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
    <div className="flex items-center flex-wrap justify-center">
  <div
    className={`mx-auto flex bg-brand1/80 text-white fixed w-full z-[99] transition-all duration-300 items-center justify-between h-14 p-5 ${
      scrolled
        ? 'top-6 max-w-[1300px] rounded-[77px] border border-violet-900 pt-[13px] pr-[25px] pb-[13px] pl-[25px]'
        : 'top-0 max-w-full border-violet-900'
    }`}
  >
    <div className="w-auto">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="h-12" />
      </Link>
    </div>
    <ul className="md:flex hidden items-center justify-evenly  gap-4 font-semibold text-lg">
      {navconfig.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? 'p-2 rounded-xl text-white font-semibold'
              : 'hover:text-white p-2 rounded-xl text-[#B59AEC] font-semibold'
          }
          end
        >
          <div className='flex items-center'>
            {/* <item.icon className="w-5 h-5 mr-2" /> */}
            <span>{item.title}</span>
          </div>
        </NavLink>
      ))}
    </ul>
    <div id="connect-btn">
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
