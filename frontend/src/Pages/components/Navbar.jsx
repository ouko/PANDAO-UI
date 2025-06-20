import { Link,  useNavigate } from 'react-router-dom'
import MobileSidebar from './MobileSidebar'
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
  const handleNavClick = (item) => {
    if (item.type === "scroll") {
      const elementId = item.path.replace(/^\/+/, ''); // Remove leading slashes
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
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
    <ul className="md:flex hidden items-center justify-evenly gap-4 font-semibold text-lg">
      {navconfig.map((item, index) => (
        <li key={index}>
          {item.type === "scroll" ? (
            // Button for scroll behavior
            <button
              onClick={() => handleNavClick(item)}
              className="hover:text-brand7 transition-colors "
            >
              <div className="flex items-center">
                <span>{item.title}</span>
              </div>
            </button>
          ) : (
            // Regular link for navigation
            <a 
              href={item.path}
              className="hover:text-brand7 transition-colors"
            >
              <div className="flex items-center">
                <span>{item.title}</span>
              </div>
            </a>
          )}
        </li>
      ))}
    </ul>
    <div className="flex items-center gap-2">
    <div id="connect-btn">
      <radix-connect-button />
    </div>
    <div className="md:hidden block">
      <MobileSidebar />
    </div>
    </div>
 
  </div>
</div>
  )
}

export default Navbar
