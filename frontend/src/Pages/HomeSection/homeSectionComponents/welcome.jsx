import { motion } from "framer-motion";

const Welcome = () => {
    // Define animation variants
   
    
    const cardHover = {
        rest: { scale: 1, transition: { duration: 0.2 } },
        hover: { scale: 1.03, transition: { duration: 0.2 } }
    };

    const buttonHover = {
        rest: { scale: 1, transition: { duration: 0.2 } },
        hover: { scale: 1.03, transition: { duration: 0.2 } }
    };

    return (<div className="min-h-screen flex flex-col items-center py-28  justify-center gap-7  text-white max-w-[1440px] mx-auto p-5 z-50" id="catalystsuite">
        <div className="text-[35px] md:text-[64px] leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash z-50">
            Welcome to the Future of Decentralized Governance
        </div>
        <div className="text-[24px]  leading-tight font-semibold bg-gradient-to-r from-white to-[#9290bb] bg-clip-text text-transparent text-center  z-50 pb-10 font-mono">
            Discover how Urify is empowering users to take control of their finances effortlessly.
        </div>
      
        <div className="flex flex-row  items-center self-stretch">
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 z-50 rounded-2xl  border border-brand3 p-5 mx-auto flex-1 w-full max-w-[1200px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
          >
            <div className="flex flex-col gap-8 mx-4 items-start w-full absolute left-4 top-1/2 transform -translate-y-1/2">
              <h2 className="text-left text-[48px] font-semibold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Join, Vote, and Shape the Future
              </h2>
              <p className="text-[#B59AEC] text-left text-2xl font-normal w-[558px]">
                A DAO Community Built for Engagement - Buy, Propose, and Vote to Lead the Change!
              </p>
              <motion.button 
                initial="rest"
                whileHover="hover"
                variants={buttonHover}
                className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
              >
                <div className="absolute w-[230.02px] h-[59.52px] rounded-full opacity-70 blur-[25.75px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
                <span className="text-center font-roboto font-bold text-[22px] z-50 leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                  Join Community
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="flex md:flex-wrap flex-row gap-6 items-center justify-center self-stretch">
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl z-50 border border-brand3 p-5 w-[724px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
          >
            <div className="absolute left-[374px] top-[136px] w-100 h-100 bg-blue-700 opacity-40 blur-2xl rounded-full"></div>
            <motion.div 
              initial={{ rotate: 0 }}
             
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute left-[386px] top-[113px]"
            >
              <img src="/f.svg" alt="DAO Representation" className="w-[356px] h-[356px] object-cover" />
            </motion.div>
            <div className="absolute w-[350px] top-10 left-5">
              <h3 className="text-left text-[48px] font-semibold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Actus for Precision, Radix for Trust <br />
                <span className="text-indigo-400 text-[32px] font-extralight">The Ultimate DAO Platform.</span>
              </h3>
            </div>
          </motion.div>

          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl z-50 border border-brand3 p-5 w-[441px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
          >
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
                    <h2 className="font-bold text-[48px] bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
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
          </motion.div>
        </div>
      
    </div>);
}

export default Welcome;