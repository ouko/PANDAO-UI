import { NavLink, useNavigate, useParams } from 'react-router-dom'

import { useRdt } from '@/hooks/useRdt'
import axios from 'axios'


const Sidebar = () => {
  const rdt = useRdt()
  const navigate = useNavigate()
  const params = useParams()


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
  



  const navItems = [
    { icon: '/1.svg', label: 'Home', path: '/' },
    { icon: '/2.svg', label: 'Dashboard', path: `/community/detail/${params.id}` },
    { icon: '/3.svg', label: 'Members', path: `/community/detail/${params.id}/members` },
    { icon: '/4.svg', label: 'Discussion', path: `/community/detail/${params.id}/discussion` },
    { icon: '/5.svg', label: 'Vote Power', path: `/community/detail/${params.id}/tokenDistribution` },
    { icon: '/6.svg', label: 'Activity', path: `/community/detail/${params.id}/activity` },
    { icon: '/7.svg', label: 'Proposals', path: `/community/detail/${params.id}/proposals` },
    { icon: '/2.svg', label: 'Bond Issue', path: `/community/detail/${params.id}/bondissue` },
    { icon: '/2.svg', label: 'Purchased Bond', path: `/community/detail/${params.id}/purchasedbond` },
    { icon: '/8.svg', label: 'Bond Issued', path: `/community/detail/${params.id}/bondissued` }
];


  return (
    <div className=''>
      <div className="bg-[rgba(169,126,255,0.08)]  rounded-[20px] text-white border-solid border-[#5228A4] border py-10 pt-[13px] px-[15px] shrink-0  h-[737px] relative overflow-hidden">
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

      </div>
    </div>
  );
}

export default Sidebar;
