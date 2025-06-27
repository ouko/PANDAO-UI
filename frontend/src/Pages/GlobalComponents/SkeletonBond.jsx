import React from 'react';

const SkeletonBond = () => {
  return (
    <div className="bg-[#1B0D37] rounded-2xl border-2 border-[#5228A4] w-full h-auto relative overflow-hidden backdrop-blur-md animate-pulse">

      {/* Top Header */}
      <div className="bg-black/50 border-b border-[#5228a4] w-full h-[159px] absolute top-0 left-0" />

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start absolute top-4 left-4 sm:left-20 right-4">
        <div className="bg-brand3 rounded-lg w-full sm:w-[179px] h-[105px]" />
        <div className="flex flex-col space-y-2 w-full sm:w-auto">
          <div className="bg-brand3 rounded w-3/4 sm:w-40 h-6" />
          <div className="bg-brand3 rounded w-full sm:w-[600px] h-20" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-start items-start px-4 sm:px-8 py-4 gap-6 sm:gap-10 mt-[180px]">
        {[1, 2, 3].map((col) => (
          <div key={col} className="flex flex-col space-y-4 w-full sm:w-auto">
            <div className="bg-brand3 rounded w-full sm:w-[200px] h-5" />
            <div className="bg-brand3 rounded w-full sm:w-[200px] h-5" />
            <div className="bg-brand3 rounded w-full sm:w-[200px] h-5" />
            <div className="bg-brand3 rounded w-full sm:w-[200px] h-5" />
          </div>
        ))}
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/30 p-4 gap-5 flex flex-col sm:flex-row w-full absolute bottom-0 left-0">
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <div className="bg-brand3 rounded w-1/2 h-5" />
          <div className="bg-brand3 rounded w-full sm:w-[600px] h-5" />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <div className="bg-brand3 rounded w-3/4 h-5" />
          <div className="bg-brand3 rounded w-3/4 h-5" />
        </div>
      </div>

    </div>
  );
};

export default SkeletonBond;
