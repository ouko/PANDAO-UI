// Matter component

const Matter = () => {
  return (
    <div className="flex flex-col gap-20 z-50 items-center justify-start pt-20 pb-20 relative py-16">
      <h2 className="text-center font-semibold pb-20 text-4xl sm:text-5xl md:text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          Why It Matter for DAO&apos;s ?
        </h2>
      {/* Main design background */}
      
      <div className="w-full max-w-[1200px] h-[865px] relative">
        {/* Background SVGs */}
        <img
  className="hidden md:block rounded-none w-full max-w-[1197px] h-[587px] absolute left-6 top-[278px] overflow-visible opacity-70"
  src="/Union.svg"
  alt="Background pattern"
/>

        
        {/* Top Row */}
        <div className="flex flex-row gap-8 md:gap-16 lg:gap-32 items-start justify-center absolute left-1/2 transform -translate-x-1/2 top-0 w-full px-4 flex-wrap">
          {/* Governance Hub */}
          <div className="flex flex-col gap-6 items-center justify-start w-full sm:w-[280px] mb-8">
            <div className="flex flex-col gap-0 items-center justify-start w-full">
              <img
                className="w-40 h-40 absolute top-[-110px] overflow-visible"
                src="i1.png"
                alt="Governance icon"
              />
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Governance Hub
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  Design, deploy &amp; evolve DAO rules Custom voting types, flexible
                </div>
              </div>
            </div>
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
          
          {/* Treasury Core */}
          <div className="flex flex-col gap-6 items-center justify-start w-full sm:w-[280px] mb-8">
            <div className="flex flex-col  items-center justify-start w-full">
              <img
                className="w-40 h-40 absolute top-[-110px] overflow-visible"
                src="i2.png"
                alt="Treasury icon"
              />
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Treasury Core
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  quorums, off-chain sync
                  <br />
                  Smart financial coordination Multi-sig vaults, spending policies,
                </div>
              </div>
            </div>
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
          
          {/* Catalyst Contracts */}
          <div className="flex flex-col gap-6 items-center justify-start w-full sm:w-[280px] mb-8">
            
             <div className="flex flex-col  items-center justify-start w-full">
                <img
                  className="w-40 h-40 absolute top-[-100px] overflow-visible"
                  src="i2.png"
                  alt="Catalyst icon"
                />
              </div>
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Catalyst Contracts
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  auto-payouts, KPI triggers ACTUS-based agreements Bond templates,
                  royalty sharing,
                </div>
              </div>
            
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
        </div>
        
        {/* Middle Row */}
        <div className="flex flex-row gap-8 md:gap-16 lg:gap-40  items-end justify-center absolute left-1/2 transform -translate-x-1/2 top-[330px] w-full px-4 flex-wrap">
          {/* Member Engine */}
          <div className="flex flex-col gap-6 items-center justify-start w-full sm:w-[280px] mb-8">
            
             <div className="flex flex-col  items-center justify-start w-full">
                <img
                  className="w-40 h-40 absolute top-[-90px] overflow-visible"
                  src="i2.png"
                  alt="member icon"
                />
                
              </div>
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Member Engine
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  insurance logic, zero-coupon ready Identity &amp; engagement
                  Member roles, badges, proposals,
                </div>
              </div>
            
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
          
          {/* LaunchPad */}
          <div className="flex flex-col gap-2 items-center justify-start w-full sm:w-[280px] mb-8">
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <img
                className="w-40 h-40 absolute top-[-80px] overflow-visible"
                src="i2.png"
                alt="LaunchPad icon"
              />
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  LaunchPad
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  contribution scoring DAO creation in minutes Templates, asset
                  onboarding,
                </div>
              </div>
            </div>
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="flex flex-row gap-8 md:gap-16 lg:gap-28 items-center justify-center absolute left-1/2 transform -translate-x-1/2 top-[629px] w-full px-4 flex-wrap">
          {/* Analytics & Insights */}
          <div className="flex flex-col gap-5 items-center justify-start w-full sm:w-[280px] mb-8">
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <img
                className="w-40 h-40 absolute top-[-110px] overflow-visible"
                src="i2.png"
                alt="Analytics icon"
              />
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Analytics &amp; Insights
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  customizable onboarding flows
                  <br />
                  Data that powers decision-making Treasury tracking, participation
                </div>
              </div>
            </div>
            <img
              className="w-[50px] h-[37px] relative overflow-visible"
              src="Poly.svg"
              alt="Polygon decoration"
            />
          </div>
          
          {/* Pandao API */}
          <div className="flex flex-col  items-center justify-start w-full sm:w-[280px] mb-8">
            <div className="flex flex-col gap-5 items-center justify-start w-full">
              <img
                className="w-40 h-40 absolute top-[-100px] overflow-visible"
                src="i2.png"
                alt="API icon"
              />
              <div className="flex flex-col gap-2 items-center justify-start w-full min-w-[240px]">
                <div className="text-[#8447ff] text-center text-lg font-semibold w-full">
                  Pandao API
                </div>
                <div className="text-[#d0d0d0] text-center text-base w-full">
                  heatmaps, financial forecasts
                  <br />
                  API Seamless external integration Webhooks, auth layer, role-based
                </div>
              </div>
            </div>
            <img
              className="w-[50px] h-[37px] pt-2 relative overflow-visible"
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
