function Join() {
  return (
    <div className="justify-start bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] relative  border-2 border-[#5228A4] w-full rounded-lg ">
      <div className="h-[460px]   ">  
        <div>   
          <img
            className="w-[443px] absolute h-[253px] opacity-40 right-12 top-[185px] object-cover"
            src="/h.svg"
            alt="Hand illustration"
          />
        </div>
        
      
        <img
          className="w-[400px] h-[400px] absolute opacity-60 right-10 top-0"
          src="/c.svg"
          alt=""
        />


        <div className="flex flex-col absolute gap-6 top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10 text-start  px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-[#6359e9] bg-clip-text text-transparent font-clash">
            Join the DAOvolution
          </h1>
          <p className="text-grey-100 w-[700px] text-xl md:text-2xl font-medium font-clash">
            Whether you are a buzzing community, a solo builder rallying your tribe, or a founder dreaming of transparent governance — PandaoLive is your launchpad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Join;