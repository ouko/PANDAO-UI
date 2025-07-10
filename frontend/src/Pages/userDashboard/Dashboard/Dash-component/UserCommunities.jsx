import PropTypes from "prop-types";
import BrandCard2 from "@/components/ui/myComponents/brand-cards";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const UserCommunities = ({ communities }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const maxIndex = Math.ceil(communities.length / cardsPerSlide) - 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div>
      <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
        <h1 className="text-white md:text-2xl text-[16px] font-semibold tracking-wider">
          Created Communities
        </h1>
      </div>

      <div className="relative px-6">
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out pb-2"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerSlide)}%)` }}
          >
            {communities.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-white w-full">
                No communities found.
              </div>
            ) : (
              communities.map((dao, index) => (
                <div
                  key={dao?.community_id || index}
                  className="w-full md:w-1/2 shrink-0 px-2 py-4"
                >
                  <BrandCard2 dao={dao} />
                </div>
              ))
            )}
          </div>
        </div>

        {communities.length > cardsPerSlide && (
          <div className="flex justify-end gap-4 mt-4 py-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-brand5 hover:bg-[#4c2f8d] text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-brand5 hover:bg-[#4c2f8d] text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

UserCommunities.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.object),
};

UserCommunities.defaultProps = {
  communities: [],
};

export default UserCommunities;
