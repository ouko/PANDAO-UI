import { useAccount } from '@/AccountContext'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import AnimatedGridPattern from '@/components/ui/myComponents/animated-grid'

const HomeSection = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()

  return (
    <div className="relative ">
      <AnimatedGridPattern />
      <div className="h-[600px] flex items-start  justify-start  text-black max-w-[1200px] mx-auto">
        <div className="flex flex-col  items-center text-center  gap-5 justify-center  p-5 w-full h-full object-cover bg-no-repeat md:bg-none">
          <div className="md:text-7xl text-3xl font-extrabold tracking-wider md:leading-[75px] leading-[40px] ">
            Bringing Governance To All: <span className='text-blue-600'>Effortless</span> ,
            <span className='text-purple-800'>Effective,</span> <span className='text-indigo-600'>Empowering. </span>
          </div>
          <p className="text-2xl">
            Making Blockchain Accessible and DAO Governance Effortless.
          </p>
          {!accounts || accounts.length === 0 ? (
            <Button variant="radix">Get Started</Button>
          ) : (
            <Button onClick={() => navigate('/userDashboard')} variant="radix">
              My Dashboard
            </Button>
          )}
        </div>
      </div>
      <div className='pb-40 flex items-center justify-center relative'>
 
      <img src="/home.jpg" alt="" className='bg-white  rounded-xl border-4 border-purple-200 shadow-purple-200 shadow-2xl'/>
   
      </div>
  
    </div>
  )
}

export default HomeSection
