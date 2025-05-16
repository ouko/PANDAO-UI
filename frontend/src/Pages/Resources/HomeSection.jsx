import AnimatedGridPattern from "@/components/ui/myComponents/animated-grid";
import { ResourcesAnimation } from "./ResourcesAnimation";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";

const HomeSection = () => {
  // const some= "bg-gradient-to-r from-[#0097b2] from-20%  to-[#7ed957]"
  // const some2="bg-gradient-to-r from-[#375e91] from-0%  to-[#68237b]"
  return (
    <>
      <div className="relative h-[400px] font-clash overflow-hidden">
      {/* Background elements */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[800px]">
        <TileEffect4 />
      </div>
        <div className="h-[200px] flex md:flex-row z-50 flex-col items-center  justify-center  text-brand7 max-w-[1440px] mx-auto">
          <div className="flex flex-col  items-center  gap-5 justify-center  p-5 w-full h-full object-cover bg-no-repeat md:bg-none">
            <div className="text-[40px] md:text-[64px] pt-[200px] z-50  leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash ">
              Resource Library{" "}
            </div>
            <p className="text-xl font-clash">
              Making Blockchain Accessible and DAO Governance Effortless.
            </p>
          </div>

          {/* <ResourcesAnimation /> */}
        </div>
      </div>
    </>
  );
};

export default HomeSection;
