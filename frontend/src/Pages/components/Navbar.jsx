import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import MobileSidebar from './MobileSidebar'
import { Rocket } from 'lucide-react'
import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import useScrollTop from '@/hooks/useScroll'



const Navbar = () => {
  const rdt = useRdt()
  const { accounts } = useAccount()
  const navigate = useNavigate()
  const scrolled = useScrollTop()
  const [userData, setUserData] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)


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

  // Fetch user data including metadata
  const fetchUserData = async (address) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/details/${address}`
      );
      console.log('Fetched user data:', response.data)// Log fetched data for debugging
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  };

  // Fetch user metadata
  const fetchUserMetadata = async (address) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/metadata/${address}`
      );
      console.log('Fetched user metadata:', response.data); // Add logging for debugging
      if (response.data) {
        setUserData((prevState) => ({
          ...prevState,
          usermetadata: response.data,
        }));
      } else {
        console.log('No metadata found for this user');
      }
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      
    }
  };

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

    if (accounts && accounts.length > 0) {
      fetchUserData(accounts[0].address);
      fetchUserMetadata(accounts[0].address);
    }
    checkSignup();
  }, [accounts, rdt]);

  const handleImageError = () => {
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Log the user data to ensure it's fetched correctly
  console.log('User Data:', userData);
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
          
          <NavLink
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
          </NavLink>

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
          {/* <NavLink
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
          </NavLink> */}
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

        {/* Profile Icon and Redirect to Dashboard */}
        <div className="ml-4 flex items-center">
          {userData?.usermetadata?.image_url ? (
            <Link to="/userDashboard">
              <img
                src={userData.usermetadata.image_url}
                alt="Profile"
                className="w-32 h-8 rounded-full"
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </Link>
          ) : (
            <Link to="/userDashboard">
              <img
                src="/path/to/default/profile.png"
                alt="Default Profile"
                className="w-8 rem h-8 rounded-full"
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
