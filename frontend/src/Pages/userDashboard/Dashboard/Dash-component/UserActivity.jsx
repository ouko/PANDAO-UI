import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Activity } from 'lucide-react';

const UserActivity = ({activityData = [] }) => {
  const navigate = useNavigate();

  const formatStandardDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <div>
      <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
        <h2 className="text-white text-2xl font-semibold">User Activity</h2>
      </div>

      <div className="w-full mt-4 flex flex-col justify-center items-center gap-4 px-3">
        {activityData.length === 0 ? (
          <div className="flex items-center justify-center h-24 text-white">
            No user activities.
          </div>
        ) : (
          activityData.slice(0, 3).map((activity, index) => (
            <div key={index} className="bg-gradient-to-br from-[rgba(39,18,76,0.68)] w-[980px]  to-brand1 rounded-2xl border-2 border-brand3 hover:border-brand2  transition-transform transform hover:scale-105 duration-300 p-6 flex items-center gap-4 ">
              <Avatar className="w-20 h-20 object-cover rounded-md">
                <AvatarImage src={activity.user_image_url} className="object-cover" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 justify-end items-end  ">
                <h3 className="text-brand7 text-lg mb-8  font-semibold">{activity.info}</h3>
                <p className="text-[#bdbdbd] text-sm font-medium">
                  {formatStandardDateTime(activity.created_at)}
                </p>
              </div>
              {/* <div
                onClick={() => navigate(`/community/detail/${activity.community_id}`)}
                className="text-primary-200 cursor-pointer"
              >
                <Activity className="h-5 w-5" />
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserActivity;
