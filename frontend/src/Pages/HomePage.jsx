import ExploreSection from "./components/ExploreSection";
import HomeSection from "./components/HomeSection";
import Footer from "./HomeSection/homeSectionComponents/Footer";
import PriceSection from "./HomeSection/homeSectionComponents/PriceSection";
import Question from "./HomeSection/homeSectionComponents/Question";
import Reviews from "./HomeSection/homeSectionComponents/Reviews";

const HomePage = () => {
  return (
    <div>
      <HomeSection />
     <ExploreSection/>
     <Reviews/>
     <PriceSection/>
     <Question/>
     <Footer/>
     
    </div>
  );
};

export default HomePage;
