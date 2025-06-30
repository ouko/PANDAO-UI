import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import { Spotlight } from "@/components/ui/myComponents/spotlight";
import BrandButton from "@/components/ui/myComponents/brand-button";
import { TextLoop } from "@/components/ui/myComponents/Textloop";

const HomeSection = () => {
  return (
    <div className="flex flex-col items-start justify-start relative max-w-[3000px] mx-auto overflow-hidden">
      <Spotlight
        className="-right-[800px] top-28 h-[129%]"
        fill="#B59AEC"
      />
      <Spotlight
        className="-right-[450px] translate-x-[200px]"
        fill="#B59AEC"
      />
      <Spotlight
        className="-right-[200px] -top-48"
        fill="#B59AEC"
      />
      <div className="w-full h-full min-h-screen flex flex-col items-center px-4 py-16 md:px-8">
        {/* Background elements */}
        
        <div className="absolute inset-0"></div>
        <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
        <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
        <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
        
        <div className="w-full absolute overflow-hidden opacity-40 h-[600px]">
          <TileEffect4 />
        </div>
        
        <div className="flex flex-col items-center gap-6  pt-40 text-center mx-auto z-50">

           <div className="bg-white/20 rounded-[53px] border border-brand2 px-3 py-2 flex flex-col  gap-2.5 items-center justify-center shrink-0  mx-auto md:mx-0 ">
            <div className="flex flex-row gap-[20px] items-center justify-center  ">

              <img
                className=" w-[26.63px] h-[25.34px]  mt-1"
                src="/new.png"
                alt="Icon"
              />


              <div className="text-white text-left  md:text-base text-md font-medium relative pr-4 ">
                

                 <TextLoop className=' text-sm'>
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
          <h2 className="text-center font-semibold text-[50px] md:text-[69px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
            Resource Library
          </h2>
          <p className="text-xl md:text-2xl text-brand6 leading-relaxed max-w-4xl">
            Making Blockchain Accessible and DAO Governance Effortless.
            <br />
            Explore insightful resources about the PandaO platform and learn how to create and manage your DAO.
          </p>

          <div className="left-0 top-[100px] justify-start absolute items-start gap-5 opacity-5">
            <img
              src="/ic.svg" alt=""
              className="w-[400px] h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
          <BrandButton title="Explore Resources" href="" />
        </div>

        <div className="right-0 top-[650px] justify-start absolute items-start gap-5 opacity-10">
          <img
            src="/ic.svg" alt=""
            className="w-[250px] h-[250px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
