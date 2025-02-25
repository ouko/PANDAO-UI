import HomeSection from "./homeSectionComponents/HomeSection";
import Footer from "./homeSectionComponents/Footer";
import PriceSection from "./homeSectionComponents/PriceSection";
import Question from "./homeSectionComponents/Question";
import Reviews from "./homeSectionComponents/Reviews";
import ExploreSection from "./homeSectionComponents/ExploreSection";

const HomePage = () => {
    return (
        <div className="bg-brand1 relative">
            <div className="absolute inset-0 h-full bg-black/60 z-10 "></div>
            <HomeSection />
            <ExploreSection />
            {/* <Reviews />
            <PriceSection />
            <Question />
            <Footer /> */}

        </div>
    );
};

export default HomePage;
