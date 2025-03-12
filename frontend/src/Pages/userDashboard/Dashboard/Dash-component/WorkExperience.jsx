import React from 'react';

const WorkExperience = () => {
  const experiences = [
    {
      role: 'Senior Backend Developer',
      company: 'Creatix Studio',
      logo: '/radix.webp',
      duration: 'March 2022 - Present',
    },
    {
      role: 'Backend Developer',
      company: 'CodeSphere Technologies',
      logo: '/logo1.png',
      duration: 'July 2019 - February 2022',
    },
  ];

  return (
    <div>
      <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
        <h1 className="text-white text-2xl font-medium">Work Experience:</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-[rgba(109,54,219,0.21)] rounded-[20px] border border-brand3 p-6 flex flex-col gap-2.5 items-start justify-center h-[120px] w-[770px] mx-auto mb-6">
            <div className="flex flex-row gap-[67px] items-start justify-between w-full">
              <div className="flex flex-row gap-[27px] items-end justify-start">
                <img className="w-[66.02px] h-[64.94px] object-cover" src={exp.logo} alt="Company Logo" />
                <div className="flex flex-col gap-[11px] items-start justify-start w-[342px]">
                  <div className="text-white font-semibold text-[26px]">{exp.role}</div>
                  <div className="text-[#bdbdbd] font-medium text-base">{exp.company}</div>
                </div>
              </div>
              <div className="text-primary-200 text-right font-medium text-xl">{exp.duration}</div>
            </div>
          </div>
        ))}
        <div className="text-[#9c9c9d] font-normal text-xl mb-4">Previous:</div>
      </div>
    </div>
  );
};

export default WorkExperience;
