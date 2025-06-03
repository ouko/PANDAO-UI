const cardData = [
  {
    title: "OUR STORY",
    description: `Where innovation meets imagination — and anyone can start a DAO. 
      Welcome to PandaoLive, your new favorite corner of the internet 
      where community dreams become decentralized realities.`,
  },
  {
    title: "OUR MISSION",
    description: `To radically simplify how DAOs are launched, scaled, and sustained. 
      We're not just giving you the tools to launch a DAO — we're giving you 
      the freedom to organize, fund, and govern transparently from Day 1.`,
  },
  {
    title: "OUR VISION",
    description: `We imagine a world where DAOs are as common as group chats and as 
      impactful as corporations. PandaoLive is building that world — one DAO at a time.`,
  },
];

function Heading() {
  return (
    <div className="pb-20 relative z-50">
         <h2 className="text-center font-semibold text-[64px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          Heading
        </h2>
        <p className="text-xl text-center max-w-4xl mx-auto items-center justify-center flex md:text-2xl text-brand7 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisi minus magnam architecto, maiores sunt
             quaerat qui sapiente accusantium! Similique magni eaque labore!
        </p>
    <div className="relative w-full max-w-6xl mx-auto py-12 px-12 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="w-full max-w-sm mx-auto rounded-[50px] border-4 border-brand2 p-6 md:p-8 h-[400px] sm:h-[450px] md:h-[500px] lg:h-[557px] overflow-hidden bg-gradient-to-b from-brand-500/12 via-purple-500/4 to-purple-500/7 backdrop-blur-lg"
        >
         
          

         
          <div className="relative z-10 flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-medium leading-tight bg-gradient-to-r from-white to-[rgba(99,89,233,1)] text-transparent bg-clip-text">
              {card.title}
            </h2>
            <p className="text-[#d2d2d2] text-lg md:text-xl lg:text-2xl leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}

      
    </div>

    <div className="w-full max-w-4xl mx-auto h-[55px] relative flex items-center justify-between">

      <div >
       
        <div className="bg-purple-500/22 rounded-full w-[55px] h-[55px] flex items-center justify-center">
     
          <div className="rounded-full w-[31px] h-[31px] bg-gradient-to-b from-brand5 to-brand3"></div>
        </div>
      </div>


      <div className="h-1 bg-gradient-to-b from-brand5 to-brand3 flex-1 mx-2"></div>

      <div >

        <div className="bg-purple-500/22 rounded-full w-[55px] h-[55px] flex items-center justify-center">
   
          <div className="rounded-full w-[31px] h-[31px] bg-gradient-to-b from-brand5 to-brand3"></div>
        </div>
      </div>

    
      <div className="h-1 bg-gradient-to-b from-brand5 to-brand3 flex-1 mx-2"></div>

      <div>
    
        <div className="bg-purple-500/22 rounded-full w-[55px] h-[55px] flex items-center justify-center">
       
          <div className="rounded-full w-[31px] h-[31px] bg-gradient-to-b from-brand5 to-brand3"></div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default Heading;
