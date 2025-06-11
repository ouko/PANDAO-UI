import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import HomeSection from "./Resources/HomeSection";
import ResourceSection from "./Resources/ResourcesSection";
import Footer from "./HomeSection/homeSectionComponents/Footer";

const Resources  = () => {
    return (
        <div>
        <div className="bg-brand1 relative min-h-screen pb-10 font-clash overflow-hidden">
      {/* Background elements */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        
      </div>

            <HomeSection/>
       <ResourceSection/>


       <Footer/>
       
           </div>
           
           </div>
    );
  };
  
  export default Resources ;
  