const FeatureCard = () => {

  return (
    <div className="py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 relative z-50">
      {/* Heading section - full width on mobile, half on larger screens */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 mb-6 lg:mb-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6 bg-gradient-to-r from-brand7 to-[#6359e9] bg-clip-text text-transparent font-['ClashDisplayVariable-Medium',_sans-serif]">
          Heading:
        </h2>
        <p className="text-brand7 text-sm sm:text-base md:text-lg">
          Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque eget.Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>

      {/* First card - full width on mobile, quarter on larger screens */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 mb-6 lg:mb-0">
        <div className="rounded-[24.69px] border-2 border-solid p-4 sm:p-5 md:p-6 lg:p-7 h-auto md:h-[350px] lg:h-[400px] overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n900 rounded-xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16"
              src="/1a.svg"
              alt="Feature icon" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-neutral-n100 text-lg sm:text-xl md:text-2xl font-medium"></h3>
            <p className="text-white text-xs sm:text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>

      {/* Second card */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 mb-6 lg:mb-0">
        <div className="rounded-[24.69px] border-2 border-solid p-4 sm:p-5 md:p-6 lg:p-7 h-auto md:h-[350px] lg:h-[400px] overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n900 rounded-xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16"
              src="/2b.svg"
              alt="Feature icon" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-neutral-n100 text-lg sm:text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-xs sm:text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>

      {/* Large center card - full width on mobile, half on larger screens */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6 mb-6 lg:mb-0">
       <div className="rounded-[24.69px] border-2 border-solid p-4 sm:p-5 md:p-6 lg:p-7 h-auto md:h-[350px] lg:h-[390px] overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n-900 rounded-xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              src="/3b.svg"
              alt="Feature icon" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-neutral-n100 text-lg sm:text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-xs sm:text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur, magnam cupiditate. Natus enim ab dolor totam voluptatibus ad explicabo. Illum ea ex minima accusantium dolorum quisquam. Eius neque molestiae rem?
            </p>  
          </div>
        </div>
      </div>

      {/* Fourth card */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3 mb-6 sm:mb-0">
        <div className="rounded-[24.69px] border-2 border-solid p-4 sm:p-5 md:p-6 lg:p-7 h-auto md:h-[350px] overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n900 rounded-xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16"
              src="/4b.svg"
              alt="Feature icon" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-neutral-n100 text-lg sm:text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-xs sm:text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>

      {/* Fifth card */}
      <div className="col-span-1 sm:col-span-1 lg:col-span-3">
        <div className="rounded-[24.69px] border-2 border-solid p-4 sm:p-5 md:p-6 lg:p-7 h-auto md:h-[350px] overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n900 rounded-xl p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16"
              src="/5b.svg"
              alt="Feature icon" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-neutral-n100 text-lg sm:text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-xs sm:text-sm md:text-base overflow-y-auto max-h-[250px]">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;