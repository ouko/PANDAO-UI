import BrandButton from "@/components/ui/myComponents/brand-button";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import { Spotlight } from "@/components/ui/myComponents/spotlight";

function HomeSection() {
  return (
    <div className="flex flex-col  items-start justify-start  relative max-w-[3000px] mx-auto overflow-hidden">
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
    <div className=" w-full h-full min-h-screen flex  flex-col items-center px-4 py-16 md:px-8">
      {/* Background elements */}
      
      <div className="absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      
      <div className="w-full absolute overflow-hidden opacity-40 h-[600px]">
        
        <TileEffect4 />
        
      </div>
      <div className="flex flex-col items-center gap-6 pt-40 text-center mx-auto z-50">
        <h2 className="text-center font-semibold text-[50px] md:text-[69px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
          The Catalyst Suit
        </h2>
        <p className="text-xl md:text-2xl text-brand6 leading-relaxed max-w-4xl">
         The Catalyst Suite is Pandao’s all-in-one toolkit for creating, customizing, and operating decentralized organizations seamlessly on RadixDLT.
          Whether you’re launching a DAO or managing a mature one, our modules provide battle-tested, flexible infrastructure.
        </p>

        <div className=" left-0 top-[100px] justify-start absolute items-start gap-5 opacity-5">
        <img
          src="/ic.svg" alt=""
          className="w-[400px] h-[400px] object-cover"
        />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
        <BrandButton title="Get Started" href="" />
      </div>

      <div className=" right-0 top-[650px] justify-start absolute items-start gap-5 opacity-10">
        <img
          src="/ic.svg" alt=""
          className="w-[250px] h-[250px] object-cover"
        />
        </div>
    </div>
    </div>
  );
}

export default HomeSection;
