import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'

const ProposalCard = ({ proposalItem, onClick, convertUnixTimestamp, clipAddress }) => {
  return (
    <Card
      onClick={onClick}
      className="bg-gradient-to-br from-[rgba(27,18,63,0.92)] to-brand1 hover:scale-95 transition-transform duration-300 flex flex-col hover:shadow-lg h-[150px] cursor-pointer items-start gap-2 border-[1px] border-brand5 rounded-lg p-3 text-black relative"
    >
      <Badge
        variant={proposalItem.is_active ? 'success' : 'destructive'}
        className={`absolute right-2 ${proposalItem.is_active ? 'bg-green-600 text-white' : ''}`}
      >
        {proposalItem.is_active ? 'Pending' : 'Executed'}
      </Badge>

      {proposalItem.proposal_type && (
        <Badge className="absolute right-20 mx-2">{proposalItem.proposal_type}</Badge>
      )}

      <div className="capitalize font-semibold text-white text-xl">{proposalItem.proposal}</div>
      <div className="capitalize font-semibold text-white text-md">{proposalItem.description}</div>

      <div className="text-xs">
        Published by <span className="text-purple-700">{clipAddress(proposalItem.id)}</span>
      </div>

      <div className="absolute bottom-0 right-0 p-4">
        <span className="text-green-500">Start Time:</span>
        <span className="font-semibold text-white mx-2">{convertUnixTimestamp(proposalItem.start_time)}</span>

        <span className="text-red-500">End Time:</span>
        <span className="font-semibold text-white mx-2">{convertUnixTimestamp(proposalItem.ends_time)}</span>
      </div>
    </Card>
  );
};

export default ProposalCard;
