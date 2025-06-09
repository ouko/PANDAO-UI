import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Question() {
  const [openIndex, setOpenIndex] = useState(null);

  const actusContracts = [
    { title: "Standardized Contract Types", description: "ACTUS defines a taxonomy of machine-executable financial contract types, representing everything from bonds and loans to swaps and annuities. These standards make financial products transparent, interoperable, and automatable." },
    { title: "Legal Interpretability", description: "By integrating ACTUS contracts into your DAO's infrastructure, you gain legally interpretable behaviour based on global standards." },
    { title: "Event-Driven Payment Logic", description: "ACTUS contracts provide event-driven payment logic, including interest, principal, fees, and penalties." },
    { title: "Predictable Cash Flow Modelling", description: "Implement predictable cash flow modelling across complex portfolios with ACTUS standard contracts." },
    { title: "Plug-and-Play Templates", description: "Access plug-and-play templates for compliant on-chain finance with ACTUS integration." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[600px] pb-20 pt-20 z-50 container mx-auto px-4 sm:px-6 md:px-8">
       <h2 className="text-center font-semibold text-4xl sm:text-5xl md:text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          ACTUS Standard Contracts
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl z-50 mx-auto items-center justify-center flex md:text-2xl text-brand7 leading-relaxed px-4 sm:px-0">
            ACTUS defines a taxonomy of machine-executable financial contract types, making financial products transparent, interoperable, and automatable.
        </p>
       
      <div className="flex flex-col md:items-start md:justify-start lg:flex-row lg:items-center lg:justify-between w-full pt-10 sm:pt-16 md:pt-20 px-4 z-50 gap-6 md:gap-8">
        <div className="flex flex-col items-center md:items-start justify-start mt-5 text-center md:text-left w-full md:w-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-clash font-bold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
            Benefits of ACTUS
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-2 font-clash">Key advantages of integrating ACTUS contracts into your DAO</p>
          
        </div>
        
        
        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-[40rem] mt-6 sm:mt-8 lg:mt-0">
          {actusContracts.map((item, index) => (
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
      </div>
    </div>
  );
}

export default  Question;
