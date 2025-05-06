import HomeSection from "./homeSectionComponents/HomeSection";
import Footer from "./homeSectionComponents/Footer";
import Question from "./homeSectionComponents/Question";
import Reviews from "./homeSectionComponents/Reviews";
import ExploreSection from "./homeSectionComponents/ExploreSection";
import Welcome from "./homeSectionComponents/welcome";
import PriceSection from "./homeSectionComponents/PriceSection";

const HomePage = () => {
    return (
        <div className="bg-brand1 relative overflow-hidden">
            <div className="absolute inset-0 h-full bg-black/60 z-10 "></div>
            <div className="absolute bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
            <div className="absolute top-[750px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            <div className="absolute top-[1550px] left-[50%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            <div className="absolute top-[2550px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
            <div className="absolute top-[2550px] right-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>

            <div className="absolute bottom-[200px] right-[5%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>
            <div className="absolute top-[50%] right-[30%] bg-brand2 z-10 size-[350px] rounded-full blur-[170px]"></div>
            <div className="absolute top-[10%] left-[50%] bg-brand3 z-10 size-[250px] rounded-full blur-[120px]"></div>
            <HomeSection />
            <ExploreSection />
            <Welcome />
            <Reviews />
            <PriceSection />
            <Question />
            <Footer />

        </div>
    );
};

export default HomePage;
