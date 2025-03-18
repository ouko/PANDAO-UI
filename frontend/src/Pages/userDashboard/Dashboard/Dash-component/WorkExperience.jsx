import React from "react";
import dayjs from 'dayjs';
const WorkExperience = ({ userData }) => {
  return (
    <div className="text-white">
      <div className="bg-[#39246b] p-4 flex items-center justify-start rounded-md mb-6">
        <h1 className="text-white text-2xl font-semibold tracking-wider">Work Experience</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full ">
        {userData &&
          userData.user_work &&
          userData.user_work.length > 0 &&
          userData.user_work.map((exp, index) => (
            <div
              key={index}
              className="w-full  flex items-center justify-between pr-5 "
            >
              <div className="relative ml-10 bg-black isolate">
                {/* Dot */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 border-2 border-white  ring-4 ring-indigo-300 z-10  rounded-full"></div>

                {/* Dashed Vertical Line */}
                {index < userData.user_work.length - 1 && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 h-[160px] w-0.5 bg-indigo-400 border-l-2 border-dashed border-indigo-400"></div>
                )}
              </div>

              <div className="bg-[rgba(109,54,219,0.21)] rounded-[20px]  border border-brand3 p-6 flex flex-col gap-2.5 items-start justify-center w-[90%] mb-6">
                <div className="flex flex-row gap-[67px] items-start justify-between w-full">
                  <div className="flex flex-row gap-[27px] items-end justify-start">
                    <img
                      className="w-[86.02px] h-[64.94px] mb-5 object-cover"
                      src={exp.logo || '/logo1.png'}
                      alt="Company Logo"
                    />
                    <div className="flex flex-col gap-[11px] items-start justify-start w-[342px]">
                      <div className="text-white font-semibold text-[26px]">
                        {exp.designation}
                      </div>
                      <div className="text-[#bdbdbd] font-medium text-base">
                        {exp.company}
                      </div>
                      <div className="text-[#bdbdbd] font-medium text-sm">
                        {exp.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-right font-medium text-xl">
                    {dayjs(exp.from_date).format('MMM YYYY')} - {dayjs(exp.to_date).format('MMM YYYY')}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {userData && userData.user_work && userData.user_work.length === 0 && (
          <div className="py-20">Add Your Work History</div>
        )}
      </div>
    </div>
  );
};

export default WorkExperience;
