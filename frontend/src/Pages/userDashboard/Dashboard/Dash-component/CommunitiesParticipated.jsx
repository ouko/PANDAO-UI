import { Card } from "@/components/ui/card";
import { SquareArrowOutUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CommunitiesParticipated = ({ participatedCommunities }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + 2 >= participatedCommunities.length ? 0 : prev + 2
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev - 2 < 0 ? Math.max(participatedCommunities.length - 2, 0) : prev - 2
    );
  };

  return (
    <div>
      <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
        <h2 className="text-white text-2xl font-medium">
          Communities Participated:
        </h2>
      </div>

      <div className="relative px-6">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {participatedCommunities.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-white min-w-full">
                No participated communities.
              </div>
            ) : (
              participatedCommunities.map((dao, index) => (
                <Card
                  key={dao.community_id || index}
                  onClick={() => navigate(`/community/detail/${dao.community_id}`)}
                  className="flex overflow-hidden flex-col items-start justify-between p-5 min-w-[calc(50%-8px)] mx-2 cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-brand4 rounded-lg opacity-90 h-[200px] "
                >
                  <div className="flex flex-col items-start space-y-5 overflow-hidden w-full">
                    <div className="w-full overflow-hidden flex items-start justify-start gap-4 ">
                      <img
                        src={dao.community_image}
                        alt={dao.name || "DAO"}
                        className="size-[60px] rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <div className="text-xl font-semibold tracking-wider text-white">
                          {dao.community_name}
                        </div>
                        <div className="line-clamp-1 text-[#B59AEC] mt-1">
                          {dao.description || "No description available"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {dao.tags?.slice(0, 2).map((tag, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="rounded-full p-[2px] bg-gradient-to-r from-brand2 via-brand5 to-brand2"
                        >
                          <div className="w-full rounded-full bg-brand1 flex justify-center items-center">
                            <h1 className="text-white font-bold text-[12px] px-3 py-[0.5]">
                              {tag}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        {participatedCommunities.length > 2 && (
          <div className="flex justify-end gap-4 mt-6">
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

export default CommunitiesParticipated;