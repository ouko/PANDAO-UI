import BrandCard2 from "@/components/ui/myComponents/brand-cards";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const UserCommunities = ({ communities = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 2 >= communities.length ? 0 : prev + 2
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 2 < 0 ? Math.max(communities.length - 2, 0) : prev - 2
    );
  };

  return (
    <div>
      <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
        <h1 className="text-white text-2xl font-semibold tracking-wider">
          Created Communities
        </h1>
      </div>

      <div className="relative px-6">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform py-4 duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {communities.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-white min-w-full">
                No communities found.
              </div>
            ) : (
              communities.map((dao, index) => (
                <BrandCard2 key={dao.community_id || index} dao={dao} />
              ))
            )}
          </div>
        </div>

        {communities.length > 1 && (
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

export default UserCommunities;
