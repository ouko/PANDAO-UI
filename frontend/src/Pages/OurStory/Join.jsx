function Join() {
  return (
    <div className=" min-h-screen pt-20">
    <div className="bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] relative border-2 border-[#5228A4] w-[90%] mt-20 mb-20 mx-auto rounded-3xl overflow-hidden z-50">
      <div className="relative min-h-[460px] px-6 md:px-12 lg:px-16 py-10 flex items-center">
        
        <div className="absolute right-0 top-[195px]  max-w-[50%] md:max-w-[443px]">
          <img
            className="w-full h-auto opacity-60 object-cover"
            src="/h.svg"
            alt="Hand illustration"
          />
        </div>
        
        <div className="absolute left-10 bottom-0  max-w-[50%] md:max-w-[400px]">
          <img
            className="w-full h-auto opacity-20"
            src="/c.svg"
            alt="Background decoration"
          />
        </div>
        
        <div className="absolute right-10 bottom-0 z-0 max-w-[50%] md:max-w-[400px]">
          <img
            className="w-full h-auto opacity-60"
            src="/c.svg"
            alt="Backgr decoration"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-6 max-w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-[#6359e9] bg-clip-text text-transparent font-clash">
            Join the DAOvolution
          </h1>
          <p className="text-brand7 text-lg md:text-xl lg:text-2xl font-medium font-clash">
            Whether you are a buzzing community, a solo builder rallying your tribe, or a founder dreaming of transparent governance — PandaoLive is your launchpad.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Join;