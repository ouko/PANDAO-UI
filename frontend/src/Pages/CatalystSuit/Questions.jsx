import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Questions() {
  const [openIndex, setOpenIndex] = useState(null);

  const actusItems = [
    // Contract Types
    { title: "Zero-Coupon Bonds", description: "Deploy zero-coupon bonds that are pre-coded and ACTUS-compliant with our no-code interface." },
    { title: "Fixed and Floating Rate Loans", description: "Create fixed and floating rate loans that automatically handle interest calculations and payments." },
    { title: "Tokenized Installment Plans", description: "Set up tokenized installment plans with customizable payment schedules and terms." },
    { title: "Recurring Subscriptions with Penalty Clauses", description: "Implement recurring subscription models with automated penalty clauses for late or missed payments." },
    { title: "Time-Locked Investment Tranches", description: "Structure time-locked investment tranches with predetermined release schedules." },
    { title: "Revenue-sharing Agreements", description: "Create transparent revenue-sharing agreements with automatic distribution of funds." },
    { title: "Yield-bearing Structured Notes", description: "Issue yield-bearing structured notes with customizable terms and conditions." },
    
    // Features
    // { title: "Custom token denominations", description: "Support for various token standards and denominations for flexible financial instrument creation." },
    // { title: "Scheduled and conditional payments", description: "Set up payments that execute automatically based on time or specific conditions." },
    // { title: "Interest accrual and balance tracking", description: "Automated calculation and tracking of interest accruals and balances." },
    // { title: "Automated redemption or rollover at maturity", description: "Configure contracts to automatically redeem or roll over when they reach maturity." },
    // { title: "DAO vote-triggered parameter updates", description: "Allow DAO governance to modify parameters like interest rates or durations through voting." },
    
    // // Security & Compliance
    // { title: "Rigorously audited smart contract libraries", description: "Built on thoroughly audited smart contract foundations for maximum security." },
    // { title: "Native support for RadixDLT or EVM-compatible chains", description: "Deploy on RadixDLT or any EVM-compatible blockchain for flexibility." },
    // { title: "Integration with DAO treasuries and multi-sig wallets", description: "Seamlessly connect with existing DAO treasury systems and multi-signature wallets." },
    // { title: "ACTUS conformance", description: "Ensures compatibility with future DeFi standards and regulatory mappings." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-20 pt-20 w-full min-h-[600px] z-50 container mx-auto px-4 sm:px-6 md:px-8">
       <h2 className="text-center font-semibold text-4xl sm:text-5xl md:text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          ACTUS Module Capabilities
        </h2>
        <p className="text-base sm:text-lg  text-center max-w-4xl z-50 mx-auto items-center justify-center flex md:text-2xl text-brand7 leading-relaxed px-4 sm:px-0">
            These DAOs can instantly deploy various contract types, pre-coded and ACTUS-compliant through a no-code interface.
        </p>
       
      <div className="flex flex-col md:items-start md:justify-start lg:flex-row lg:items-center lg:justify-between w-full pt-10 sm:pt-16 md:pt-20 px-4 z-50 gap-6 md:gap-8">
        
        
        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[40rem] mt-6 sm:mt-8 lg:mt-0">
          {actusItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="p-[2px] rounded-lg bg-gradient-to-r from-[#1e0165] to-[#48386c] w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-lg bg-[#12082a] pt-3 pb-3 sm:pt-4 sm:pb-4">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="cursor-pointer text-base sm:text-lg md:text-xl font-semibold text-white flex items-center gap-2 px-3 sm:px-4"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{item.title}</span>
                    <div>
                      {index === openIndex ? (
                        <img src="/close.png" alt="Open" className="w-5 h-5 sm:w-auto sm:h-auto" />
                      ) : (
                        <img src="/open.png" alt="Close" className="w-5 h-5 sm:w-auto sm:h-auto" />
                      )}
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-3 sm:p-4">
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base">{item.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start justify-start mt-5 text-center md:text-left w-full md:w-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-clash font-bold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
            ACTUS Capabilities
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-2 font-clash">Everything you can do with ACTUS-compliant contracts</p>
        </div>
      </div>
    </div>
  );
}

export default  Questions;
