import BrandButton from "@/components/ui/myComponents/brand-button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Questions() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('whatWeDo');


  const whatWeDo = [
    { 
      title: "Launch DAOs with Ease", 
      description: "We simplify the process of starting a DAO. Our streamlined workflows and user-friendly tools let you bring your vision to life quickly and efficiently—without the steep learning curve often associated with blockchain technology." 
    },
    { 
      title: "Enhance Governance", 
      description: "Our platform provides adaptable governance structures designed for inclusivity. We empower you to create transparent decision-making frameworks that ensure every voice is heard and valued, fostering a culture of shared responsibility and trust." 
    },
    { 
      title: "Seamlessly Integrate with DeFi", 
      description: "PANDAO not only supports DAO creation but also ensures seamless integration with Radix-based DeFi applications and beyond. This interoperability positions your organization at the forefront of the rapidly evolving decentralized finance landscape." 
    },
    {
      title: "Customize Everything, or Keep it Simple",
      description: "Pick a pre-built template or start from scratch — it’s your DAO, your way."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const toggleSection = (section) => {
    setActiveSection(section);
    setOpenIndex(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 w-full min-h-screen z-50 container mx-auto">

      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full px-4 z-50">
        
        
        
        <div className="flex flex-col gap-4 w-full lg:w-[40rem] mt-8 lg:mt-0">
          {whatWeDo.map((item, index) => (
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

        <div className="flex flex-col items-start justify-start mt-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-clash font-bold bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent">
            {activeSection === 'ethos' ? 'Our Ethos' : 'What We Do'}
          </h1>
          <p className="text-gray-400 text-lg mt-2 font-clash">
            {activeSection === 'ethos' 
              ? 'The principles that guide everything we do at PandaoLive' 
              : 'How we empower communities through decentralized governance'}
          </p>
          <div className="pt-6">
           <BrandButton title='Get Started' href='' />
           </div>
        </div>
      </div>
    </div>
  );
}

export default  Questions;
