import { Card } from "@/components/ui/card";
import { SkeletonCard } from "@/Pages/GlobalComponents/Skeleton";
import { Badge } from '@/components/ui/badge'
import ProposalCard from "./ProposalCard";
import { SkeletonProposal } from "@/Pages/GlobalComponents/SkeletonProposal";

function ProposalExecuted({ proposals, loading, setActiveProposal, setShowForm, convertUnixTimestamp, clipAddress }) {
  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] h-full  relative overflow-hidden ">
      <div className="bg-[#39246b] pr-[15px] pl-[15px] flex z-50 flex-row items-center justify-between w-full h-[63px] sticky left-0 top-0">
        <div className="text-[#ffffff] text-left text-2xl font-medium flex items-center gap-2">
          Executed Proposals:
        </div>
      </div>

      {!loading && (
        <div className="space-y-4">
          {!proposals.length > 0 && (
            <div className="flex items-center justify-center h-10">
              No Executed Proposal
            </div>
          )}
        </div>
      )}

{!loading && proposals && (
  <div className="flex flex-col gap-4 px-5 py-5  rounded-lg overflow-y-clip">
    {proposals.map((proposalItem, index) => (
      <ProposalCard
        key={index}
        proposalItem={proposalItem}
        onClick={() => {
          setActiveProposal(proposalItem);
          setShowForm(null);
        }}
        convertUnixTimestamp={convertUnixTimestamp}
        clipAddress={clipAddress}
      />
    ))}
  </div>
)}

      {loading && (
        <div className="flex flex-col h-auto items-center px-5 py-5 justify-center text-center mt-5">
          {[...Array(3)].map((_, index) => (
            <SkeletonProposal key={index} className="h-[200px]" />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProposalExecuted;
