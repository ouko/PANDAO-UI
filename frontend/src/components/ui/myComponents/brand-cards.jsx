import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const BrandCard2 = ({ dao }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/community/detail/${dao.community_id}`)}
      className="flex overflow-hidden flex-col items-start justify-between p-5 min-w-[calc(50%-8px)] mx-2 cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-brand4 rounded-lg opacity-90 h-[200px]"
    >
      <div className="flex flex-col items-start space-y-5 overflow-hidden w-full">
        <div className="w-full overflow-hidden flex items-start justify-start gap-4">
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
  );
};

export default BrandCard2;
