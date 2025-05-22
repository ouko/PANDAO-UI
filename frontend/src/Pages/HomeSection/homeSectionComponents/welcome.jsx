import { WobbleCard } from "@/components/ui/myComponents/wobble-card";

const Welcome = () => {
    return (<div className="min-h-screen flex flex-col items-center py-28  justify-center gap-7  text-white max-w-[1440px] mx-auto p-5 z-50 ">
      <div className="flex flex-col gap-8 items-center justify-start z-50 ">
        <h1 className="text-center text-6xl relative lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent mt-20">
          Welcome to the future of Decentralized Governance
        </h1>
        <p className="text-[#B59AEC] text-center text-2xl font-normal">
          Discover how Urify is empowering users to take control of their finances effortlessly.
        </p>
      </div>

      <div className="flex flex-col md:flex-wrap gap-16 items-center justify-center ">
        <div className="flex flex-row gap-10 items-center self-stretch z-50">
          <div className="bg-white/5 rounded-2xl border border-brand3 p-5 flex-1 w-[300px] h-[411px] relative overflow-hidden">
            <div className="flex flex-col gap-8 items-start w-[721px] absolute left-9 top-1/2 transform -translate-y-1/2">
              <h2 className="text-left text-[48px] font-semibold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Join, Vote, and Shape the Future
              </h2>
              <p className="text-[#B59AEC] text-left text-2xl font-normal w-[658px]">
                A DAO Community Built for Engagement - Buy, Propose, and Vote to Lead the Change!
              </p>
              <button className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer">
                <div className="absolute w-[230.02px] h-[59.52px]  rounded-full opacity-70 blur-[25.75px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
                <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                  Join Community
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex md:flex-wrap flex-row gap-10 items-center justify-center self-stretch z-50">
          <div className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[724px] h-[411px] relative overflow-hidden">
            <div className="absolute left-[374px] top-[136px] w-100 h-100 bg-blue-700 opacity-40 blur-2xl rounded-full"></div>
            <div className="absolute left-[386px] top-[113px]">
              <img src="/f.svg" alt="DAO Representation" className="w-[356px] h-[356px] object-cover" />
            </div>
            <div className=" absolute  w-[350px] top-10 left-5">
              <h3 className="text-left text-[48px] font-semibold  bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Actus for Precision, Radix for Trust <br />
                <span className="text-indigo-400 text-[32px] font-extralight">The Ultimate DAO Platform.</span>
              </h3>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[441px] h-[411px] relative overflow-hidden z-50">
            <div>
              <div
                className="bg-[#002088] rounded-[50%] w-[343.85px] h-[343.85px] absolute left-[124.89px] top-[205.5px] opacity-[0.64] blur-[79.25px]"
              ></div>
              <div
                className="bg-[#e03fc8] rounded-[50%] w-[343.85px] h-[343.85px] absolute left-[295.54px] top-[253.86px] opacity-[0.64] blur-[79.25px]"
              ></div>
              <div
                className="bg-[#011040] rounded-[50%] w-[295.26px] h-[295.26px] absolute left-[14.21px] top-[-43.93px] opacity-[0.76] blur-[79.25px]"
              ></div>
              <div
                className="bg-[#7b176d] rounded-[50%] w-[295.26px] h-[295.26px] absolute left-[-137.25px] top-[-52.4px] opacity-[0.64] blur-[79.25px]"
              ></div>
              <div className="flex flex-col gap-[55px] items-start justify-start w-[365px] absolute left-[38px] top-[40.62px]">
                <div className="text-center relative self-stretch">
                  <span>
                    <h2 className="font-bold text-[48px]  bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent ">
                      Secure, Scalable, & Seamless DAOS
                    </h2>
                    <br />
                    <span className="font-light text-white text-lg">
                      Made Possible with Radix & Actus.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}

export default Welcome;