const FeatureCard = () => {

  return (
    
    <div className=" p-10 grid grid-cols-12 gap-10 px-20 relative z-50">
      <div className="col-span-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 bg-gradient-to-r from-brand7 to-[#6359e9] bg-clip-text text-transparent font-['ClashDisplayVariable-Medium',_sans-serif]">
          Heading:
        </h2>
        <p className="text-brand7 text-base md:text-lg">
          Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque eget.Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>

      <div className="col-span-3">
        <div className="rounded-[24.69px] border-2 border-solid p-6 md:p-7  h-[400px] w-full overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">
          <div className="bg-neutral-n900 rounded-xl p-4 inline-flex mb-6">
            <img
              className="w-16 h-16"
              src="/1a.svg"
              alt="" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-n100 text-xl md:text-2xl font-medium"></h3>
            <p className="text-white text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-[24.69px] border-2 border-solid p-6 md:p-7   w-full overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">

          <div className="bg-neutral-n900 rounded-xl p-4 inline-flex mb-6">
            <img
              className="w-16 h-16"
              src="/2b.svg"
              alt="" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-n100 text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-6">
       <div className="rounded-[24.69px] border-2 border-solid p-6 md:p-7 h-[390px]  w-full overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">

          <div className="bg-neutral-n-900 rounded-xl p-4 inline-flex mb-6">
            <img
              className="w-20 h-20 "
              src="/3b.svg"
              alt="" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-n100 text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur, magnam cupiditate. Natus enim ab dolor totam voluptatibus ad explicabo. Illum ea ex minima accusantium dolorum quisquam. Eius neque molestiae rem?
            </p>  
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-[24.69px] border-2 border-solid p-6 md:p-7   w-full overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">

          <div className="bg-neutral-n900 rounded-xl p-4 inline-flex mb-6">
            <img
              className="w-16 h-16"
              src="/4b.svg"
              alt="" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-n100 text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-sm md:text-base">
              Lorem ipsum Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-[24.69px] border-2 border-solid p-6 md:p-7   w-full overflow-hidden bg-gradient-to-b from-[rgba(132,74,249,0.12)] via-[rgba(132,74,249,0.04)] to-[rgba(132,74,249,0.07)] border-[rgba(132,74,249,0.5)] shadow-[inset_0px_0px_0.92px_0.92px_rgba(255,255,255,0.4)] backdrop-blur-[19.28px]">

          <div className="bg-neutral-n900 rounded-xl p-4 inline-flex mb-6">
            <img
              className="w-16 h-16 "
              src="/5b.svg"
              alt="" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-n100 text-xl md:text-2xl font-medium"></h3>
            <p className="text-brand7 text-xl md:text-base">
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