import ExploreSection from "../components/ExploreSection";
import HomeSection from "./homeSectionComponents/HomeSection";
import Footer from "./homeSectionComponents/Footer";
import PriceSection from "./homeSectionComponents/PriceSection";
import Question from "./homeSectionComponents/Question";
import Reviews from "./homeSectionComponents/Reviews";

const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)]">      

            <HomeSection />
            <ExploreSection />
            <Reviews />
            <PriceSection />
            <Question />
            <Footer />

        </div>
    );
};

export default HomePage;
