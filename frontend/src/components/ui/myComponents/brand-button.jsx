import React from 'react';

const BrandButton = ({ title = "Get Started", href = "/" }) => {
  return (
    <a
      href={href}
      className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer hover:shadow-[0px_3px_100px_2px_#ed64a6] transition-shadow duration-500"

    >

      <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
      <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
      <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
      <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent z-30">
        {title}
      </span>
    </a>
  );
};

export default BrandButton;