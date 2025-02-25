import ExploreSection from "../components/ExploreSection";
import HomeSection from "./homeSectionComponents/HomeSection";
import Footer from "./homeSectionComponents/Footer";
import PriceSection from "./homeSectionComponents/PriceSection";
import Question from "./homeSectionComponents/Question";
import Reviews from "./homeSectionComponents/Reviews";

const HomePage = () => {
    return (
        <div className="bg-brand1">      

            <HomeSection />
            {/* <ExploreSection />
            <Reviews />
            <PriceSection />
            <Question />
            <Footer /> */}

        </div>
    );
};

export default HomePage;
