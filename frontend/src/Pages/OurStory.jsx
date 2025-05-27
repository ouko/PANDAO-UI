import TileEffect4 from "@/components/ui/myComponents/grid-bg-4"
import Footer from "./HomeSection/homeSectionComponents/Footer"
import Feature from "./OurStory/Feature"
import FeatureCard from "./OurStory/FeatureCard"
import Heading from "./OurStory/Heading"
import HomeSection from "./OurStory/HomeSection"
import Join from "./OurStory/Join"


function OurStory() {
  return (
    <div>
      <div className="bg-black/50 absolute inset-0"></div>
            <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
            <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
            <div className="absolute top-[0px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
            <div className="w-full absolute overflow-hidden opacity-10 inset-0 h-full">
              <TileEffect4 />
      
            </div>
      <HomeSection/>
      <Heading/>
      <Feature/>
      <FeatureCard/>
      <Join />
      <Footer/>

    </div>
  )
}

export default OurStory