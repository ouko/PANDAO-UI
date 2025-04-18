import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge'
import PropTypes from 'prop-types';

const ProposalCard = ({ proposalItem, onClick, convertUnixTimestamp, clipAddress }) => {
  return (
    <Card
      onClick={onClick}
      className="bg-gradient-to-br from-[rgba(27,18,63,0.92)] to-brand1  transition-transform duration-300 
               hover:shadow-xl h-auto cursor-pointer flex flex-col gap-3 
               border border-brand5 rounded-xl p-8 text-white"
    >
      {/* Top Row: Title + Badges */}
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div className="font-semibold text-lg capitalize">
          {proposalItem.proposal}
        </div>

        <div className="flex gap-2">
          {proposalItem.proposal_type && (
            <Badge className="bg-brand3 text-white">
              {proposalItem.proposal_type}
            </Badge>
          )}
          <Badge
            variant={proposalItem.is_active ? 'success' : 'destructive'}
            className={`${proposalItem.is_active ? 'bg-green-600 text-white' : ''}`}
          >
            {proposalItem.is_active ? 'Pending' : 'Executed'}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-200 capitalize line-clamp-2">
        {proposalItem.description}
      </div>

      {/* Published by */}
      <div className="text-xs">
        Published by <span className="text-purple-400">{clipAddress(proposalItem.id)}</span>
      </div>

      {/* Time Info */}
      <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-300 gap-1 sm:gap-6 mt-1">
        <div>
          <span className="text-green-400">Start:</span>{' '}
          <span className="font-medium text-white">{convertUnixTimestamp(proposalItem.start_time)}</span>
        </div>
        <div>
          <span className="text-red-400">End:</span>{' '}
          <span className="font-medium text-white">{convertUnixTimestamp(proposalItem.ends_time)}</span>
        </div>
      </div>
    </Card>


  );
};
ProposalCard.propTypes = {
  proposalItem: PropTypes.shape({
    is_active: PropTypes.bool.isRequired,
    proposal_type: PropTypes.string,
    proposal: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    start_time: PropTypes.number.isRequired,
    ends_time: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  convertUnixTimestamp: PropTypes.func.isRequired,
  clipAddress: PropTypes.func.isRequired,
};

export default ProposalCard;
