import { useNavigate, useParams } from 'react-router-dom';

export default function TotalProposalsCard() {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4]  self-stretch shrink-0 h-[135px]  overflow-hidden backdrop-blur-[6.7px]">

      <div className="bg-[#39246b]  flex items-center w-full h-[53px] px-5 ">
        <div className="text-white text-2xl font-medium ">
          Total Proposals:
        </div>
      </div>
      <div className='flex items-center justify-between pt-5 px-4'>
        <div className="text-[#AE85FF] text-2xl font-normal">
          No Proposals yet
        </div>
        <button
          onClick={() => navigate(`/community/detail/${params.id}/proposals`)}
          className="rounded-[26px] px-4 py-2 flex items-center justify-center  overflow-hidden bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] cursor-pointer"
        >
          <span className="text-black text-sm leading-5 font-medium ">
            New Proposal
          </span>
        </button>
      </div>





    </div>
  );
}
