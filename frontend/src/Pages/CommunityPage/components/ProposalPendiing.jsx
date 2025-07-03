import PropTypes from "prop-types";
import ProposalCard from "./ProposalCard";
import { SkeletonProposal } from "@/Pages/GlobalComponents/SkeletonProposal";

function ProposalPending({ proposals, loading, setActiveProposal, setShowForm, convertUnixTimestamp, clipAddress }) {
  return (
    <div className="h-full relative overflow-hidden">
      <div className="bg-[#39246b] pr-[15px] pl-[15px] flex z-50 flex-row items-center justify-between w-full h-[63px] sticky left-0 top-0">
        <div className="text-[#ffffff] text-left text-xl md:text-2xl font-medium flex items-center gap-2">
          Pending Proposals:
        </div>
      </div>

      {!loading && (
        <div className="space-y-4">
          {!proposals.length > 0 && (
            <div className="flex items-center justify-center h-10">
              No Pending Proposal
            </div>
          )}
        </div>
      )}

      {!loading && proposals && (
        <div className="flex flex-col gap-4 px-5 py-5 rounded-lg overflow-y-clip">
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

ProposalPending.propTypes = {
  proposals: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  setActiveProposal: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  convertUnixTimestamp: PropTypes.func.isRequired,
  clipAddress: PropTypes.func.isRequired,
};

export default ProposalPending;
