import { useNavigate, useParams } from 'react-router-dom';

export default function TotalProposalsCard() {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="bg-[rgba(169,126,255,0.15)] rounded-lg border border-[#5228A4] pt-3 pr-6 pb-3 pl-6 self-stretch shrink-0 h-[135px] relative overflow-hidden backdrop-blur-[6.7px]">
      {/* Header Section */}
      <div className="bg-[#39246b] px-4 flex items-center w-[561px] h-[53px] absolute left-0 top-0">
        <div className="text-white text-2xl font-medium font-[ClashDisplayVariable-Medium, sans-serif]">
          Total Proposals:
        </div>
      </div>

      {/* New Proposal Button */}
      <button
      onClick={() => navigate(`/community/detail/${params.id}/proposals`)}
      className="rounded-[26px] px-4 py-2 flex items-center justify-center absolute left-[281px] top-[82px] overflow-hidden bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] cursor-pointer"
    >
      <span className="text-black text-sm leading-5 font-medium font-[ClashDisplayVariable-Medium, sans-serif]">
        New Proposal
      </span>
    </button>

      {/* Proposals Text */}
      <div className="text-[#AE85FF] text-2xl font-normal font-[ClashDisplayVariable-Regular, sans-serif] absolute top-[79px]">
        No Proposals yet
      </div>
    </div>
  );
}
