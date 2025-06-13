// Matter component

const Matter = () => {
  return (
    <div className="flex flex-col gap-20 z-50 items-center justify-start pt-20 pb-40 relative py-16">
      <h2 className="text-center font-semibold pb-20 text-4xl sm:text-5xl md:text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          Why It Matter for DAO&apos;s ?
        </h2>
      {/* Main design background */}
      
      <div className="w-full max-w-[1200px] h-[865px] relative">
        {/* Background SVGs */}
        <img
  className="hidden md:block rounded-none w-full max-w-[1297px] h-[887px] absolute left-6 top-[100px] overflow-visible opacity-70"
  src="/Union.svg"
  alt="Background pattern"
/>

        
        {/* Top Row */}
       <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-16 px-4">

  {/* Governance Hub */}
  <div className="relative flex flex-col items-center justify-start gap-6 w-full sm:w-[300px] mb-8">
    <img
      className="w-32 h-32 absolute -top-20"
      src="i1.png"
      alt="Governance icon"
    />
    <div className="mt-16 flex flex-col items-center text-center gap-2 px-2">
      <div className="text-[#8447ff] text-lg font-semibold">
        Governance Hub
      </div>
      <div className="text-[#d0d0d0] text-base">
        Design, deploy &amp; evolve DAO rules.
        <br />
        Custom voting types, flexible
      </div>
    </div>
    <img
      className="w-[50px] h-[37px]"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

  {/* Treasury Core */}
  <div className="relative flex flex-col items-center justify-start gap-6 w-full sm:w-[300px] mb-8">
    <img
      className="w-32 h-32 absolute -top-20"
      src="i2.png"
      alt="Treasury icon"
    />
    <div className="mt-16 flex flex-col items-center text-center gap-2 px-2">
      <div className="text-[#8447ff] text-lg font-semibold">
        Treasury Core
      </div>
      <div className="text-[#d0d0d0] text-base">
        Quorums, off-chain sync.
        <br />
        Smart financial coordination.
        <br />
        Multi-sig vaults, spending policies.
      </div>
    </div>
    <img
      className="w-[50px] h-[37px]"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

  {/* Catalyst Contracts */}
  <div className="relative flex flex-col items-center justify-start gap-6 w-full sm:w-[300px] mb-8">
    <img
      className="w-32 h-32 absolute -top-20"
      src="i2.png"
      alt="Catalyst icon"
    />
    <div className="mt-16 flex flex-col items-center text-center gap-2 px-2">
      <div className="text-[#8447ff] text-lg font-semibold">
        Catalyst Contracts
      </div>
      <div className="text-[#d0d0d0] text-base">
        Auto-payouts, KPI triggers.
        <br />
        ACTUS-based agreements.
        <br />
        Bond templates, royalty sharing.
      </div>
    </div>
    <img
      className="w-[50px] h-[37px]"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

</div>

        
        {/* Middle Row */}
       <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-40 px-4 w-full relative ">
  
  {/* Member Engine Card */}
  <div className="relative flex flex-col items-center justify-start gap-6 w-full sm:w-[280px] mb-8">
    {/* Floating Icon */}
    <img
      className="w-32 h-32 absolute -top-[40px]"
      src="i2.png"
      alt="member icon"
    />

    {/* Content */}
    <div className="mt-16 flex flex-col items-center justify-start text-center gap-2 px-2 w-full min-w-[240px]">
      <div className="text-[#8447ff] text-lg font-semibold w-full">
        Member Engine
      </div>
      <div className="text-[#d0d0d0] text-base w-full">
        Insurance logic, zero-coupon ready.<br />
        Identity &amp; engagement.<br />
        Member roles, badges, proposals.
      </div>
    </div>

    {/* Decoration */}
    <img
      className="w-[50px] h-[37px]"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

  {/* LaunchPad Card */}
  <div className="relative flex flex-col items-center justify-start gap-6 w-full sm:w-[280px] mb-8">
    {/* Floating Icon */}
    <img
      className="w-32 h-32 absolute -top-10"
      src="i2.png"
      alt="LaunchPad icon"
    />

    {/* Content */}
    <div className="mt-16 flex flex-col items-center justify-start text-center gap-2 px-2 w-full min-w-[240px]">
      <div className="text-[#8447ff] text-lg font-semibold w-full">
        LaunchPad
      </div>
      <div className="text-[#d0d0d0] text-base w-full">
        Contribution scoring.<br />
        DAO creation in minutes.<br />
        Templates, asset onboarding.
      </div>
    </div>

    {/* Decoration */}
    <img
      className="w-[50px] h-[37px]"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

</div>

        
        {/* Bottom Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-28 px-4 w-full relative ">

  {/* Analytics & Insights Card */}
  <div className="relative w-full sm:w-[280px] mb-16 flex flex-col items-center">
    {/* Floating Icon */}
    <div className="absolute -top-16">
      <img
        className="w-32 h-32"
        src="i2.png"
        alt="Analytics icon"
      />
    </div>

    {/* Card Content */}
    <div className="mt-20 flex flex-col items-center text-center gap-3 px-2 min-w-[240px]">
      <h3 className="text-[#8447ff] text-lg font-semibold">
        Analytics &amp; Insights
      </h3>
      <p className="text-[#d0d0d0] text-base">
        Customizable onboarding flows.<br />
        Data that powers decision-making.<br />
        Treasury tracking, participation.
      </p>
    </div>

    {/* Decoration */}
    <img
      className="w-[50px] h-[37px] mt-4"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

  {/* Pandao API Card */}
  <div className="relative w-full sm:w-[280px] mb-16 flex flex-col items-center">
    {/* Floating Icon */}
    <div className="absolute -top-16">
      <img
        className="w-32 h-32"
        src="i2.png"
        alt="API icon"
      />
    </div>

    {/* Card Content */}
    <div className="mt-20 flex flex-col items-center text-center gap-3 px-2 min-w-[240px]">
      <h3 className="text-[#8447ff] text-lg font-semibold">
        Pandao API
      </h3>
      <p className="text-[#d0d0d0] text-base">
        Heatmaps, financial forecasts.<br />
        API seamless external integration.<br />
        Webhooks, auth layer, role-based.
      </p>
    </div>

    {/* Decoration */}
    <img
      className="w-[50px] h-[37px] mt-4"
      src="Poly.svg"
      alt="Polygon decoration"
    />
  </div>

</div>

      </div>
    </div>
  );
};

export default Matter;
