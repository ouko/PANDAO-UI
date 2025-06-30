import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {PropTypes} from 'prop-types';

const UserActivity = ({ activityData = [] }) => {
  const navigate = useNavigate();

  const formatStandardDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
        <h2 className="text-white md:text-2xl text-lg font-semibold">User Activity</h2>
      </div>

      <div className="w-full mt-4 flex flex-col justify-start md:justify-center md:items-center items-start gap-4 px-3">
        {activityData.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-white">
            No user activities.
          </div>
        ) : (
          activityData.slice(0, 3).map((activity, index) => (
            <div
              key={index}
              onClick={() => navigate(`/community/detail/${activity.community_id}`)}
              className="bg-gradient-to-br from-[rgba(39,18,76,0.68)] to-brand1 rounded-2xl border-2 border-brand3 hover:border-brand2  p-1 px-4 flex flex-col sm:flex-row items-center gap-4 w-full max-w-5xl cursor-pointer"
            >
              <Avatar className="w-14 h-14 rounded-md overflow-hidden">
                <AvatarImage src={activity.user_image_url} className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col sm:flex-1 w-full sm:items-end items-center text-center sm:text-right">
                <h3 className="text-brand7 text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                  {activity.info}
                </h3>
                <p className="text-[#bdbdbd] text-xs sm:text-sm font-medium">
                  {formatStandardDateTime(activity.created_at)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
UserActivity.propTypes = {
  activityData: PropTypes.arrayOf
};
 
export default UserActivity;
