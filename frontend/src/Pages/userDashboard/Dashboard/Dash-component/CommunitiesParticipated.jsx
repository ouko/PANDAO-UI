import { SquareArrowOutUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommunitiesParticipated = ({ participatedCommunities }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
        <h2 className="text-white text-2xl font-medium">Communities Participated:</h2>
      </div>

      <div className="flex flex-col gap-4">
        {participatedCommunities.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-white">
            No participated communities.
          </div>
        ) : (
          participatedCommunities.slice(0, 3).map((activity, index) => (
            <div
              key={index}
              className="bg-[rgba(109,54,219,0.21)] rounded-2xl border border-brand2 p-4 flex items-center gap-4"
            >
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={activity.community_image}
                alt={activity.community_name}
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-white text-lg font-semibold">{activity.community_name}</h3>
                <p className="text-[#bdbdbd] text-sm font-medium">Community</p>
              </div>
              <div
                onClick={() => navigate(`/community/detail/${activity.community_id}`)}
                className="text-primary-200 cursor-pointer"
              >
                <SquareArrowOutUpRight className="h-5 w-5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunitiesParticipated;
