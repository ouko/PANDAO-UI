import TileEffect4 from "@/components/ui/myComponents/grid-bg-4"
import Footer from "./HomeSection/homeSectionComponents/Footer"
import Feature from "./OurStory/Feature"
import FeatureCard from "./OurStory/FeatureCard"
import Heading from "./OurStory/Heading"
import HomeSection from "./OurStory/HomeSection"
import Join from "./OurStory/Join"
import Question from "./OurStory/Question"
import Questions from "./OurStory/Questions"


function OurStory() {
  return (
    <div className="bg-brand1 relative overflow-hidden">
            <div className="absolute inset-0 h-full bg-black/60 z-10 "></div>
            <div className="absolute bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
            <div className="absolute top-[1500px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            
            <div className="absolute top-[2550px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            <div className="absolute top-[2550px] right-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            <div className="absolute bottom-[1700px] right-[10%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>

            <div className="absolute bottom-[500px] right-[90%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>
            <div className="absolute top-[50%] right-[30%] bg-brand2 z-10 size-[350px] rounded-full blur-[170px]"></div>
            <div className="absolute top-[10%] left-[50%] bg-brand3 z-10 size-[250px] rounded-full blur-[120px]"></div>
      <HomeSection/>
      <Heading/>
      <Question/>
      <Questions/>
      <Feature/>
      <FeatureCard/>
      <Join />
      <Footer/>

    </div>
  )
}

export default OurStory