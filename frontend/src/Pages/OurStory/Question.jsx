import BrandButton from "@/components/ui/myComponents/brand-button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Question() {
  const [openIndex, setOpenIndex] = useState(null);

  const ethos = [
    { title: "Permissionless by Design", description: "We believe anyone should be able to launch or join a DAO without gatekeepers or institutional barriers." },
    { title: "Community is Everything", description: "PandaoLive is built for people — builders, organizers, rebels, and dreamers who believe in doing things together, better." },
    { title: "Simplicity Over Complexity", description: "We obsess over making DAO creation intuitive, accessible, and elegant. No code. No jargon. No bloated overhead." },
    { title: "Transparency & Trust", description: "Every action, vote, and fund movement is on-chain and verifiable — because trust shouldn't need to be negotiated." },
    { title: "Composable Future", description: "We don't believe in walled gardens. PandaoLive is designed to integrate, expand, and evolve with the growing DeFi and Web3 ecosystem." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full min-h-[600px] z-50 container mx-auto">
       <h2 className="text-center font-semibold text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          Question
        </h2>
        <p className="text-xl text-center max-w-4xl z-50 mx-auto items-center justify-center flex md:text-2xl text-brand7 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur 
             quaerat qui sapiente accusantium! Similique magni eaque labore!
        </p>
       
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full pt-20  px-4 z-50">
        <div className="flex flex-col items-start justify-start mt-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-clash font-bold bg-gradient-to-r  from-white to-indigo-500 bg-clip-text text-transparent">
            Our Ethos
          </h1>
          <p className="text-gray-400 text-lg mt-2 font-clash">The principles that guide everything we do at PandaoLive</p>
          
        </div>
        
        
        <div className="flex flex-col gap-4 w-full lg:w-[40rem] mt-8 lg:mt-0">
          {ethos.map((item, index) => (
            <motion.div 
              key={index} 
              className="p-[2px] rounded-lg bg-gradient-to-r from-[#1e0165] to-[#48386c]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="rounded-lg bg-[#12082a] pt-4 pb-4">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="cursor-pointer text-lg md:text-xl font-semibold text-white flex items-center gap-2 px-4"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{item.title}</span>
                    <div>
                      {index === openIndex ? (
                        <img src="/close.png" alt="Open" />
                      ) : (
                        <img src="/open.png" alt="Close" />
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
                      <div className="p-4">
                        <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
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
