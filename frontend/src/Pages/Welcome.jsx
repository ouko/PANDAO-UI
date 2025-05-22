import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PricingCard } from "./HomeSection/homeSectionComponents/PriceSection";
import Welcome from "./HomeSection/homeSectionComponents/welcome";

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
  
<Welcome/>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-wrap gap-16 items-center justify-center z-10">
    
        
        {/* Catalyst Suite Section */}
        <div className="flex flex-col gap-12 items-center justify-center w-full max-w-7xl px-4">
          <div className="text-center">
            
            <p className="text-[#B59AEC] w-full text-2xl max-w-3xl mx-auto">
              Empowering DAOs at every stage of their evolution. The Catalyst Suite offers a tiered approach to decentralized governance and community-building.
            </p>
          </div>
          
          {/* Plans Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 max-w-[1200px] mx-auto ">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
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
                <h4 className="text-2xl font-semibold text-white mb-4">The ACTUS Smart Contracts Module</h4>
                <p className="text-white/80 text-lg">
                  The ACTUS Smart Contracts Module in the Catalyst Suite enables DAOs to adopt and deploy financial instruments based on the globally recognized ACTUS (Algorithmic Contract Types Unified Standards) framework. These smart contracts bring precision, modularity, and legal clarity to decentralized finance and treasury operations.
                </p>
                
                <h4 className="text-2xl font-semibold text-white mt-6 mb-4">What Are ACTUS Standard Contracts?</h4>
                <p className="text-white/80 text-lg">
                  ACTUS defines a taxonomy of machine-executable financial contract types, representing everything from bonds and loans to swaps and annuities. These standards make financial products transparent, interoperable, and automatable.
                </p>
                
                <p className="text-white/80 text-lg mt-3">
                  By integrating ACTUS contracts into your DAO's infrastructure, you gain:
                </p>
                <ul className="text-white/80 text-lg space-y-2 mt-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> <span className="font-medium">Legally interpretable behaviour</span> based on global standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> <span className="font-medium">Event-driven payment logic</span>, including interest, principal, fees, and penalties
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> <span className="font-medium">Predictable cash flow modelling</span> across complex portfolios
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand3">•</span> <span className="font-medium">Plug-and-play templates</span> for compliant on-chain finance
                  </li>
                </ul>
                
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