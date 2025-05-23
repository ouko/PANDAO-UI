import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PricingCard } from "./HomeSection/homeSectionComponents/PriceSection";
import Welcome from "./HomeSection/homeSectionComponents/welcome";

const WelcomePage = () => {
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
  
  const plans = [
    {
      title: "Community Plan",
      description: "Perfect for early-stage DAOs.",
      price: "Free",
      features: {
        intro: "Designed for new or experimental DAOs ready to take their first steps in decentralized governance. The Community Plan provides access to foundational tools and educational resources to help you set up your DAO, onboard contributors, and launch your first proposals.",
        list: [
          "DAO creation wizard",
          "Basic proposal and voting tools",
          "Contributor role setup and permissions",
          "Templates for DAO charters and governance policies",
          "Access to the Catalyst community support forum",
          "Educational resources and DAO best practice guides"
        ]
      },
      buttonText: "Get Started"
    },
    {
      title: "Growth Plan",
      description: "For growing DAOs aiming for sustainable growth.",
      price: "$299",
      features: {
        intro: "Scale your DAO operations with powerful governance features and strategic support. The Growth Plan equips you with the tools to manage your contributor base, drive engagement, and grow your treasury with confidence.",
        list: [
          "All Community Plan features",
          "Custom DAO subdomains and branding",
          "Token-based access control and reputation systems",
          "Contributor compensation workflows",
          "Community analytics dashboard",
          "Multi-sig treasury integration",
          "Priority email + chat support",
          "Monthly governance optimization reports"
        ]
      },
      buttonText: "Upgrade Now",
      highlight: true
    },
    {
      title: "Enterprise Plan",
      description: "Custom solutions for enterprise DAOs",
      price: "Custom Pricing",
      features: {
        intro: "The Enterprise Plan is a white-glove solution tailored for large DAOs and decentralized organizations with complex coordination needs. We work with you to build deeply customized governance architecture, integrations, compliance pathways, and scaling strategies.",
        list: [
          "All Growth Plan features",
          "Custom smart contract modules",
          "API access and system integrations",
          "Layer-2 scaling options",
          "On-chain/off-chain identity verification",
          "Governance consulting and training",
          "Dedicated account manager + 24/7 support",
          "SLA-based onboarding and support"
        ]
      },
      buttonText: "Contact Us"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden flex md:flex-wrap flex-col gap-24 items-center justify-start"
    >
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
        className="flex flex-col gap-8 items-center justify-start z-10"
      >
        <motion.h1 
          className="text-center text-6xl relative lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white to-brand3 bg-clip-text text-transparent mt-20"
        >
          Welcome to the future of Decentralized Governance
        </motion.h1>
        <motion.p 
          className="text-[#B59AEC] text-center text-2xl font-normal"
        >
          Discover how Urify is empowering users to take control of their finances effortlessly.
        </motion.p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-wrap gap-8 items-center justify-center z-10"
      >
        <div className="flex flex-row  items-center self-stretch">
          <motion.div 
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className="bg-white/5 rounded-2xl border border-brand3 p-5 mx-10 flex-1 w-[850px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
          >
            <div className="flex flex-col gap-8 mx-4 items-start w-full absolute left-4 top-1/2 transform -translate-y-1/2">
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
            className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[724px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
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
            className="bg-white/5 rounded-2xl border border-brand3 p-5 w-[441px] h-[411px] relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-lg hover:shadow-brand3/20"
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

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-wrap gap-16 items-center justify-center z-10"
        >
          {/* Catalyst Suite Section */}
          <div className="flex flex-col gap-12 items-center justify-center w-full pb-20 max-w-7xl px-4">
            <div className="text-center">
              <p className="text-[#B59AEC] w-full text-2xl max-w-3xl mx-auto">
                Empowering DAOs at every stage of their evolution. The Catalyst Suite offers a tiered approach to decentralized governance and community-building.
              </p>
            </div>
            
            {/* Plans Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 max-w-[1200px] mx-auto">
              {plans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
            
            {/* ACTUS Smart Contracts Section */}
            <motion.div 
              initial="rest"
              
              variants={cardHover}
              className="bg-gradient-to-br from-[#0c0920] via-[#1a103a] to-[#1e0b35] rounded-3xl border-2 border-brand3/60 p-8 w-full mt-12 relative overflow-hidden transition-all duration-300 hover:border-brand2 hover:shadow-xl hover:shadow-brand3/30"
            >
              {/* Enhanced background effects */}
              <div className="absolute top-0 right-0 bg-indigo-600/30 w-80 h-80 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-0 left-0 bg-purple-600/30 w-80 h-80 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute top-1/3 left-1/4 bg-blue-600/20 w-40 h-40 rounded-full blur-[80px] animate-pulse"></div>
              <div className="absolute -top-20 -right-20 bg-brand3/10 w-[300px] h-[300px] rounded-full blur-3xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 border border-brand3/20 rounded-full"></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 border border-brand3/20 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-brand3/20 rounded-full"></div>
              
              <div className="flex flex-col gap-6 relative z-10">
                {/* Animated header with enhanced styling */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-5xl font-extrabold bg-gradient-to-r from-white via-indigo-300 to-brand3 bg-clip-text text-transparent inline-block">
                    ACTUS <span className="text-4xl font-bold">Smart Contracts</span>
                  </h3>
                  <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-brand3 rounded-full mt-2"></div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-indigo-200 text-2xl max-w-3xl font-light leading-relaxed"
                >
                  Standardized, compliant, and composable financial contracts for DAO-native economies.
                </motion.p>
                
                <div className="mt-8">
                  {/* Card-style section with icon */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30 shadow-lg shadow-indigo-900/10">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent inline-block">The ACTUS Smart Contracts Module</h4>
                        <p className="text-white/90 text-lg leading-relaxed">
                          The ACTUS Smart Contracts Module in the Catalyst Suite enables DAOs to adopt and deploy financial instruments based on the globally recognized ACTUS (Algorithmic Contract Types Unified Standards) framework. These smart contracts bring precision, modularity, and legal clarity to decentralized finance and treasury operations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card-style section with icon */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-900/30 shadow-lg shadow-indigo-900/10 mt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent inline-block">What Are ACTUS Standard Contracts?</h4>
                        <p className="text-white/90 text-lg leading-relaxed">
                          ACTUS defines a taxonomy of machine-executable financial contract types, representing everything from bonds and loans to swaps and annuities. These standards make financial products transparent, interoperable, and automatable.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Benefits section with animated cards */}
                  <div className="mt-8">
                    <h4 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent inline-block">Key Benefits</h4>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      By integrating ACTUS contracts into your DAO's infrastructure, you gain:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-700/30 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-indigo-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h5 className="text-xl font-semibold text-white">Legal Compliance</h5>
                        </div>
                        <p className="text-white/90 text-base pl-10">
                          <span className="font-medium text-indigo-300">Legally interpretable behaviour</span> based on globally recognized standards
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-700/30 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-purple-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h5 className="text-xl font-semibold text-white">Smart Payments</h5>
                        </div>
                        <p className="text-white/90 text-base pl-10">
                          <span className="font-medium text-indigo-300">Event-driven payment logic</span>, including interest, principal, fees, and penalties
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-700/30 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-blue-600 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <h5 className="text-xl font-semibold text-white">Cash Flow Modeling</h5>
                        </div>
                        <p className="text-white/90 text-base pl-10">
                          <span className="font-medium text-indigo-300">Predictable cash flow modelling</span> across complex portfolios
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-5 rounded-xl border border-indigo-700/30 shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-indigo-700 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                          </div>
                          <h5 className="text-xl font-semibold text-white">Plug-and-Play</h5>
                        </div>
                        <p className="text-white/90 text-base pl-10">
                          <span className="font-medium text-indigo-300">Plug-and-play templates</span> for compliant on-chain finance
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h5 className="text-xl font-medium text-indigo-300 mb-3">What You Can Do with the Module:</h5>
                      <p className="text-white/80 text-lg mb-3">
                        These DAOs can instantly deploy some of the following contract types, pre-coded and ACTUS-compliant:
                      </p>
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
                      
                      <p className="text-white/80 text-lg mt-4">
                        Each contract is configured through a <span className="font-medium">no-code interface</span>, and includes full support for:
                      </p>
                      <ul className="text-white/80 text-lg space-y-2 mt-2 ml-6">
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Custom token denominations
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Scheduled and conditional payments
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Interest accrual and balance tracking
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Automated redemption or rollover at maturity
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> DAO vote-triggered parameter updates
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
                          <span className="text-brand3">•</span> ACTUS conformance assures compatibility with future DeFi standards and regulatory mappings
                        </li>
                      </ul>
                      
                      <h5 className="text-xl font-medium text-indigo-300 mt-6 mb-3">Why It Matters for DAOs</h5>
                      <p className="text-white/80 text-lg">
                        DAOs often rely on ad hoc or bespoke financial arrangements. With ACTUS-standard contracts:
                      </p>
                      <ul className="text-white/80 text-lg space-y-2 mt-2 ml-6">
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Financial logic is <span className="font-medium">transparent and deterministic</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Agreements are <span className="font-medium">future-proof and modular</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Risk is reduced through <span className="font-medium">standardized templates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Capital flows are <span className="font-medium">visible, forecastable, and programmable</span>
                        </li>
                      </ul>
                      
                      <p className="text-white/80 text-lg mt-3">
                        This elevates your DAO's capacity to:
                      </p>
                      <ul className="text-white/80 text-lg space-y-2 mt-2 ml-6">
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Issue bonds to back protocol development
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Manage lending arrangements with communities or contributors
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Offer structured DAO-native savings products
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-brand3">•</span> Enable compliant interaction with institutional DeFi platforms
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h5 className="text-xl font-medium text-indigo-300 mb-3">Seamless Catalyst Integration</h5>
                    <p className="text-white/80 text-lg">
                      The ACTUS module plugs directly into your DAO via the Catalyst Suite:
                    </p>
                    <ul className="text-white/80 text-lg space-y-2 mt-2 ml-6">
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Link contracts to <span className="font-medium">on-chain governance outcomes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Monitor all flows through the <span className="font-medium">Catalyst Dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Tokenize contract cashflows for DeFi composability
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand3">•</span> Use Catalyst's <span className="font-medium">Growth or Enterprise Plan</span> for multi-contract management
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.button 
                    initial="rest"
                    whileHover="hover"
                    variants={buttonHover}
                    className="relative px-6 py-3 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer group"
                  >
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
    </motion.div>
  );
};

export default WelcomePage;
