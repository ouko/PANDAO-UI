import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Activity } from 'lucide-react';

const UserActivity = ({ activityData }) => {
  const navigate = useNavigate();

  const formatStandardDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
        <h2 className="text-white text-2xl font-medium">User Activity:</h2>
      </div>

      <div className="w-full mt-4 flex flex-col gap-4">
        {activityData.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-white">
            No user activities.
          </div>
        ) : (
          activityData.slice(0, 3).map((activity, index) => (
            <div key={index} className="bg-[rgba(109,54,219,0.21)] rounded-2xl border border-brand3 p-4 flex items-center gap-4">
              <Avatar className="w-16 h-16 object-cover rounded-md">
                <AvatarImage src={activity.user_image_url} className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1">
                <h3 className="text-white text-lg font-semibold">{activity.info}</h3>
                <p className="text-[#bdbdbd] text-sm font-medium">
                  {formatStandardDateTime(activity.created_at)}
                </p>
              </div>
              <div
                onClick={() => navigate(`/community/detail/${activity.community_id}`)}
                className="text-primary-200 cursor-pointer"
              >
                <Activity className="h-5 w-5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserActivity;
