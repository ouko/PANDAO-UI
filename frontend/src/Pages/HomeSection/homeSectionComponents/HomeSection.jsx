import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'

const HomeSection = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col  items-start justify-start  relative min-h-screen container mx-auto overflow-hidden">
        <div className="flex flex-col gap-6 items-start justify-start self-stretch shrink-0 pt-32 z-10 ">
          <div className="bg-white/20 rounded-[53px] border border-violet-900 px-3 py-2 flex flex-col  gap-2.5 items-center justify-center shrink-0 ">
            <div className="flex flex-row gap-[17px] items-center justify-start ">
              <img
                className=" w-[26.63px] h-[25.34px] shadow-md "
                src="/logo1.png"
                alt="Icon"
              />
              <div className="text-white text-left font-robotoMono text-base font-medium relative pr-4">
                Lorem ipsum dolor sit amet elitsed
              </div>
            </div>
          </div>
          <div className="text-left self-stretch max-w-[800px] font-clash ">
            <span>
              <span className="text-white text-[64px]  leading-[96px] font-extrabold">Bringing Governance <br /> To All with PanDAO </span>
              <br />
              <span className="text-white text-3xl  font-thin tracking-wide">Effortless, Effective, Empowering.</span>
            </span>
          </div>
          <div className="text-[#B59AEC] text-left font-mono text-xl leading-normal font-medium tracking-wider relative max-w-[627.74px]">
            Making Blockchain Accessible and DAO Governance Effortless.
          </div>

          {!accounts || accounts.length === 0 ? (
            <button className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer">
              <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
              <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
              <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
              <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                Get Started
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/userDashboard')}
              className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
            >
              <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
              <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
              <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
              <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                My Dashboard
              </span>
            </button>
          )}

        </div>


        {/* <div>
        <div>
          <img className="w-[700px] h-[1000px] absolute top-[70%] left-[76.5%] translate-x-[-50%] translate-y-[-50%]" src="/wave1.svg" alt="" />
        </div>
        <div>
          <img className="w-[200px] h-[200px] absolute top-[60%] left-[93%] translate-x-[-50%] translate-y-[-50%]" src="/lh.svg" alt="" />
        </div>
      </div> */}

        <div className='md:flex hidden' >
          <img className=" absolute top-80 left-[76.5%] translate-x-[-50%] translate-y-[-50%]" src="/animate.png" alt="" />
        </div>
        <div className='md:flex hidden' >
          <img className="w-[400px] h-[400px] absolute top-80  left-[93%] translate-x-[-100%] translate-y-[-40%]" src="/logo1.png" alt="" />
        </div>




      </div >

    </>



  )
}

export default HomeSection
