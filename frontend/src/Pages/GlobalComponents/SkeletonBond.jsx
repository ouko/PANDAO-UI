import React from 'react';

const SkeletonBond = () => {
  return (
    <div className="bg-[#1B0D37] rounded-2xl border-2 border-[#5228A4] w-full h-[428px] relative overflow-hidden backdrop-blur-md animate-pulse">
   
      <div className="bg-black/50 border-b border-[#5228a4] w-full h-[159px] absolute top-0" />

     
      <div className="flex gap-8 items-start absolute w-[1000px] top-4 translate-x-20">
        <div className="bg-brand3 rounded-lg w-[179px] h-[105px]" />
        <div className="flex flex-col space-y-2">
          <div className="bg-brand3 rounded w-40 h-6" />
          <div className="bg-brand3 rounded w-[600px] h-20" />
        </div>
      </div>


      <div className="flex justify-start items-start transform px-8 py-4 gap-10 translate-x-10 translate-y-40">
        <div className="flex flex-col space-y-4">
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
          <div className="bg-brand3 rounded w-[200px] h-5" />
        </div>
      </div>

    
      <div className="bg-black/30 p-4 gap-5 flex w-full h-[84px] absolute bottom-0">
        <div className="flex flex-col gap-4">
          <div className="bg-brand3 rounded w-40 h-5" />
          <div className="bg-brand3 rounded w-[600px] h-5" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-brand3 rounded w-60 h-5" />
          <div className="bg-brand3 rounded w-60 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonBond;
