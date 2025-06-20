import { useAccount } from '@/AccountContext'
import BrandButton from '@/components/ui/myComponents/brand-button'
import TileEffect from '@/components/ui/myComponents/grid-bg-2'
import { Spotlight } from '@/components/ui/myComponents/spotlight'
import { TextLoop } from '@/components/ui/myComponents/Textloop';

const HomeSection = () => {
  const { accounts } = useAccount()

  return (
    <>
      <div className="flex flex-col  items-start justify-start  relative max-w-[3000px] mx-auto overflow-hidden">
        <Spotlight
          className="-right-[800px] top-28 h-[129%]"
          fill="#B59AEC"
        />
        <Spotlight
          className="-right-[600px] translate-x-[200px]"
          fill="#B59AEC"
        />
        <Spotlight
          className="-right-[400px] -top-48"
          fill="#B59AEC"
        />
        <TileEffect />
        <div className="flex flex-col gap-6 items-start justify-start self-stretch shrink-0 pt-32 z-30 md:pl-10">
          <div className="bg-white/20 rounded-[53px] border border-brand2 px-3 py-2 flex flex-col  gap-2.5 items-center justify-center shrink-0  mx-auto md:mx-0 ">
            <div className="flex flex-row gap-[10px] items-center justify-center  ">

              <img
                className=" w-[26.63px] h-[25.34px]  mt-1"
                src="/new.png"
                alt="Icon"
              />


              <div className="text-white text-left font-mono md:text-base text-sm font-medium relative pr-4 ">
                

                 <TextLoop className='font-mono text-sm'>
                   <span>Build Your DAO. Govern Your Future.</span>
                   <span>The Fastest Way to Launch a DAO on Radix.</span>
                   <span>Governance Made Simple. Power Made Scalable</span>
                   <span>Create. Govern. Evolve. All in One.</span>
                   <span>Turn Ideas Into Action – Instantly on Pandao.</span>
                   <span>Plug Into the Future of Decentralized Governance</span>
                   <span>Radically Easy DAO Deployment</span>
                   <span>Precision DAOs. Automated by Design.</span>
                   <span>Finance-Grade DAOs Built for Everyone.</span>
                   <span>Where Communities Become Institutions</span>
                 </TextLoop>
              </div>
            </div>
          </div>
          <div className=" text-center md:text-left self-stretch max-w-[800px] font-clash ">
            <span>
              <span className="text-white text-[34px] md:text-[64px] md:leading-[96px] leading-[50px] font-extrabold">Bringing Governance <br /> To All with <span className='bg-gradient-to-r from-white from-[50%] to-[#b894ff] bg-clip-text text-transparent'> PanDAO</span>  </span>
              <br />
              <span className="text-white md:text-3xl text-xl  font-thin tracking-wide">Effortless, Effective, Empowering.</span>
            </span>
          </div>
          <div className="text-[#B59AEC] font-clash text-center md:text-left  text-md md:text-xl leading-normal font-medium tracking-wider relative md:max-w-[627.74px] px-3 md:px-0">
            Making Blockchain Accessible and DAO Governance Effortless.
          </div>

          {!accounts || accounts.length === 0 ? (
            <div className='flex items-center md:justify-start justify-center w-full'>
              <BrandButton />

            </div>
          ) : (
            <div className='flex flex-wrap  justify-center items-center gap-5'>
              <BrandButton title='My Dashboard' href='/userDashboard' />
              <BrandButton title='Create Dao' href='/create' />
         
            </div>

          )}

        </div>




        <div className='md:flex hidden z-20 mb-52' >
          <img className=" absolute top-64 left-[76.5%] translate-x-[-50%] translate-y-[-50%]  " src="/animate.png" alt="" />
        </div>
        <div className='md:flex hidden z-30' >
          <img className="w-[400px] h-[400px] absolute top-[300px]  md:left-[93%] 2xl:left-[85%] translate-x-[-100%] translate-y-[-40%]" src="/logo1.png" alt="" />
        </div>




      </div >

    </>



  )
}

export default HomeSection
