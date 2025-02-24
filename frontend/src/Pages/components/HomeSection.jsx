import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'

const HomeSection = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()

  return (

    // <AnimatedGridPattern />
    <div className="flex flex-col  items-start justify-start bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] relative h-screen">
      <div className="flex flex-col gap-6 items-start justify-start self-stretch shrink-0 pt-40 pl-10 ">
        <div className="bg-white/20 rounded-[53px] border border-violet-900 pt-3.5 pr-5 pb-3.5 pl-5 flex flex-col  gap-2.5 items-center justify-center shrink-0 ">
          <div className="flex flex-row gap-[17px] items-center justify-start ">
            <img
              className=" w-[26.63px] h-[25.34px] shadow-md "
              src="/logo1.png"
              alt="Icon"
            />
            <div className="text-white text-left font-robotoMono text-base font-medium relative">
              Lorem ipsum dolor sit amet elitsed
            </div>
          </div>
        </div>
        <div className="text-left self-stretch w-[800px]">
          <span>
            <span className="text-white text-6xl ">Bringing Governance  </span>
            <span className="text-white text-6xl">To All with PanDAO</span>
            <br />
            <span className="text-white text-3xl  font-thin">Effortless, Effective, Empowering.</span>
          </span>
        </div>
        <div className="text-[#B59AEC] text-left font-robotoMono text-xl leading-normal font-medium tracking-wider relative w-[627.74px]">
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
     
        <div className="relative">
          <img className="w-[700px] h-[1000px] absolute top-[70%] left-[76.5%] translate-x-[-50%] translate-y-[-50%]" src="/wave1.svg" alt="" />
        </div>
        <div>
          <img className="w-[200px] h-[200px] absolute top-[60%] left-[93%] translate-x-[-50%] translate-y-[-50%]" src="/lh.svg" alt="" />
        </div>
     



    </div >





  )
}

export default HomeSection
