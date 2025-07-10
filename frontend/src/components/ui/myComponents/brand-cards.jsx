import PropTypes from "prop-types";
import { Card } from "@/components/ui/card";
import { Banknote, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BrandCard2 = ({ dao }) => {
  const navigate = useNavigate();

  const renderStat = (icon, value, tooltip) => (
    <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm bg-[#5228A4] border-[#7F42F9]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            {icon}
            <p className="text-sm text-white">{value ?? 0}</p>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <Card
      onClick={() => navigate(`/community/detail/${dao?.community_id}`)}
      className="flex overflow-hidden flex-col items-start justify-between p-5 min-w-[calc(50%-8px)] mx-2 cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-brand4 rounded-lg opacity-90 h-[200px]"
    >
      <div className="flex flex-col items-start space-y-5 overflow-hidden w-full">
        <div className="w-full overflow-hidden flex items-start justify-start gap-4">
          <img
            src={dao?.community_image}
            alt={dao?.community_name || "DAO"}
            className="size-[60px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <div className="text-xl font-semibold tracking-wider text-white">
              {dao?.community_name || "Unnamed Community"}
            </div>
            <div className="line-clamp-1 text-[#B59AEC] mt-1">
              {dao?.description || "No description available"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {dao?.tags?.slice(0, 2).map((tag, index) => (
            <div
              key={index}
              className="rounded-full p-[2px] bg-gradient-to-r from-brand2 via-brand5 to-brand2"
            >
              <div className="w-full rounded-full bg-brand1 flex justify-center items-center">
                <h1 className="text-white font-bold text-[12px] px-3 py-[1px]">
                  {tag}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end w-full mt-1">
        <div className="flex items-center gap-2">
          {renderStat(
            <Users className="h-4 w-4 text-white" />,
            dao?.number_of_participants ?? 0,
            "Total Number of Participants"
          )}
          {renderStat(
            <Banknote className="h-4 w-4 text-white" />,
            dao?.funds ?? 0,
            "Total Funds"
          )}
        </div>
      </div>
    </Card>
  );
};

BrandCard2.propTypes = {
  dao: PropTypes.shape({
    community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    community_image: PropTypes.string,
    community_name: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    number_of_participants: PropTypes.number,
    funds: PropTypes.number,
  }).isRequired,
};

export default BrandCard2;
