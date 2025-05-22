import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WelcomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };
  
  const buttonHover = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(74, 38, 146, 0)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 20px rgba(74, 38, 146, 0.7)",
      transition: { duration: 0.2 }
    }
  };
  
  const listItemAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };
    return (<motion.div 
      initial="hidden"
      animate="visible"
      className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden flex md:flex-wrap flex-col gap-24 items-center justify-start">
      {/* Background elements */}
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 items-center justify-start z-10">
        <motion.h1 
          variants={fadeIn}
          className="text-center text-6xl relative lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent mt-20">
          Welcome to the future of Decentralized Governance
        </motion.h1>
        <motion.p 
          variants={fadeIn}
          className="text-[#B59AEC] text-center text-2xl font-normal">
          Discover how Urify is empowering users to take control of their finances effortlessly.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-wrap gap-16 items-center justify-center z-10">
        <div className="flex flex-row gap-10 items-center self-stretch">
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl border border-brand3 p-5 flex-1 w-[300px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20">
            <div className="flex flex-col gap-8 items-start w-[721px] absolute left-9 top-1/2 transform -translate-y-1/2">
              <h2 className="text-left text-[48px] font-semibold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Join, Vote, and Shape the Future
              </h2>
              <p className="text-[#B59AEC] text-left text-2xl font-normal w-[658px]">
                A DAO Community Built for Engagement - Buy, Propose, and Vote to Lead the Change!
              </p>
              <motion.button 
                initial="rest"
                whileHover="hover"
                variants={buttonHover}
                className="relative w-[219px] h-[49px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer">
                <div className="absolute w-[230.02px] h-[59.52px]  rounded-full opacity-70 blur-[25.75px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
                <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                  Join Community
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="flex md:flex-wrap flex-row gap-10 items-center justify-center self-stretch">
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[724px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20">
            <div className="absolute left-[374px] top-[136px] w-100 h-100 bg-blue-700 opacity-40 blur-2xl rounded-full"></div>
            <motion.div 
              initial={{ rotate: 0 }}
             
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute left-[386px] top-[113px]">
              <img src="/f.svg" alt="DAO Representation" className="w-[356px] h-[356px] object-cover" />
            </motion.div>
            <div className=" absolute  w-[350px] top-10 left-5">
              <h3 className="text-left text-[48px] font-semibold  bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Actus for Precision, Radix for Trust <br />
                <span className="text-indigo-400 text-[32px] font-extralight">The Ultimate DAO Platform.</span>
              </h3>
            </div>
          </motion.div>

          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[441px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20">
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
          </motion.div>
        </div>
        
        {/* Catalyst Suite Section */}
        <div className="flex flex-col gap-12 items-center justify-center w-full max-w-7xl px-4">
          <div className="text-center">
            
            <p className="text-[#B59AEC] w-full text-2xl max-w-3xl mx-auto">
              Empowering DAOs at every stage of their evolution. The Catalyst Suite offers a tiered approach to decentralized governance and community-building.
            </p>
          </div>
          
          {/* Plans Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Community Plan */}
            <div className="bg-white/5 rounded-2xl border border-brand3 p-6 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand2/20 w-40 h-40 rounded-full blur-[80px]"></div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
                Community Plan
              </h3>
              <p className="text-indigo-300 text-xl font-medium">Perfect for early-stage DAOs.</p>
              <p className="text-white/80 text-base">
                Designed for new or experimental DAOs ready to take their first steps in decentralized governance.
              </p>
              <div className="flex flex-col gap-2 text-[18px]">
                <h4 className="text-white font-medium text-xl">What&apos;s included:</h4>
                <ul className="text-white/80 text-lg space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> DAO creation wizard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Basic proposal and voting tools
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Contributor role setup and permissions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Templates for DAO charters and governance policies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Access to the Catalyst community support forum
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Educational resources and DAO best practice guides
                  </li>
                </ul>
              </div>
              <p className="text-white/70 text-base italic mt-auto">
                Ideal for: Hackathon projects, mission-aligned communities, small collectives, NFT-based groups, and testnets.
              </p>
            </div>
            
            {/* Growth Plan */}
            <div className="bg-white/5 rounded-2xl border border-brand3 p-6 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-600/20 w-40 h-40 rounded-full blur-[80px]"></div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                Growth Plan
              </h3>
              <p className="text-indigo-400 text-xl font-medium">For growing DAOs aiming for sustainable growth.</p>
              <p className="text-white/80 text-base">
                Scale your DAO operations with powerful governance features and strategic support.
              </p>
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-medium text-xl">What's included:</h4>
                <ul className="text-white/80 text-lg space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> All Community Plan features
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Custom DAO subdomains and branding
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Token-based access control and reputation systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Contributor compensation workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Community analytics dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Multi-sig treasury integration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Priority email + chat support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Monthly governance optimization reports
                  </li>
                </ul>
              </div>
              <p className="text-white/70 text-base italic mt-auto">
                Ideal for: DAOs moving from bootstrap to structured operations — including DeFi communities, social DAOs, media collectives, and protocol-aligned groups.
              </p>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white/5 rounded-2xl border border-brand3 p-6 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600/20 w-40 h-40 rounded-full blur-[80px]"></div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
                Enterprise Plan
              </h3>
              <p className="text-indigo-500 text-xl font-medium">Custom solutions for enterprise DAOs</p>
              <p className="text-white/80 text-base">
                A white-glove solution tailored for large DAOs and decentralized organizations with complex coordination needs.
              </p>
              <div className="flex flex-col gap-2">
                <h4 className="text-white font-medium">What's included:</h4>
                <ul className="text-white/80 text-lg space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> All Growth Plan features
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Custom smart contract modules
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> API access and system integrations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Layer-2 scaling options
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> On-chain/off-chain identity verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Governance consulting and training
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> Dedicated account manager + 24/7 support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> SLA-based onboarding and support
                  </li>
                </ul>
              </div>
              <p className="text-white/70 text-base italic mt-auto">
                Ideal for: Protocol DAOs, large treasuries, enterprise-aligned networks, multi-team foundations, cross-chain ecosystems, and institutional DAO use cases.
              </p>
            </div>
          </div>
          
          {/* ACTUS Smart Contracts Section */}
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl border border-brand3 p-8 w-full mt-8 relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20">
            <div className="absolute top-0 right-0 bg-indigo-600/20 w-60 h-60 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 bg-purple-600/20 w-60 h-60 rounded-full blur-[100px]"></div>
            
            <div className="flex flex-col gap-6 relative z-10">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent">
                ACTUS Smart Contracts DAOs
              </h3>
              <p className="text-indigo-300 text-2xl">
                Standardized, compliant, and composable financial contracts for DAO-native economies.
              </p>
              
              <div className="mt-4">
                <h4 className="text-2xl font-semibold text-white mb-4">What Are ACTUS Standard Contracts?</h4>
                <p className="text-white/80 text-lg">
                  ACTUS defines a taxonomy of machine-executable financial contract types, representing everything from bonds and loans to swaps and annuities. These standards make financial products transparent, interoperable, and automatable.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h5 className="text-xl font-medium text-indigo-300 mb-3">What You Can Do with the Module:</h5>
                    <ul className="text-white/80 text-lg space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Zero-Coupon Bonds
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Fixed and Floating Rate Loans
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Tokenized Installment Plans
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Recurring Subscriptions with Penalty Clauses
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Time-Locked Investment Tranches
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Revenue-sharing Agreements
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Yield-bearing Structured Notes
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xl font-medium text-indigo-300 mb-3">Security, Compliance & Interoperability</h5>
                    <ul className="text-white/80 text-lg space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Based on rigorously audited smart contract libraries
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Native support for RadixDLT or EVM-compatible chains
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Easily integrates with DAO treasuries and multi-sig wallets
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> ACTUS conformance assures compatibility with future DeFi standards
                      </li>
                    </ul>
                    
                    <h5 className="text-xl font-medium text-indigo-300 mt-6 mb-3">Why It Matters for DAOs</h5>
                    <p className="text-white/80 text-lg">
                      DAOs often rely on ad hoc or bespoke financial arrangements. With ACTUS-standard contracts, financial logic is transparent and deterministic, agreements are future-proof and modular, and capital flows are visible, forecastable, and programmable.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <motion.button 
                  initial="rest"
                  whileHover="hover"
                  variants={buttonHover}
                  className="relative px-6 py-3 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer group">
                  <div className="absolute w-full h-full bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="text-center font-medium text-xl bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent relative z-10">
                    Explore ACTUS Smart Contracts
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
);
}

export default WelcomePage;