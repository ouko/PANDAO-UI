import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Question() {
  const [openIndex, setOpenIndex] = useState(null);
  
  // Define plan items for the accordion
  const planItems = [
    { 
      title: "Community Plan", 
      description: "Designed for new or experimental DAOs ready to take their first steps in decentralized governance. The Community Plan provides access to foundational tools and educational resources to help you set up your DAO, onboard contributors, and launch your first proposals.",
      type: "community"
    },
    { 
      title: "Growth Plan", 
      description: "Scale your DAO operations with powerful governance features and strategic support. The Growth Plan equips you with the tools to manage your contributor base, drive engagement, and grow your treasury with confidence.",
      type: "growth",
      features: [
        "All Community Plan features",
        "Custom DAO subdomains and branding",
        "Token-based access control and reputation systems",
        "Contributor compensation workflows",
        "Community analytics dashboard",
        "Multi-sig treasury integration",
        "Priority email + chat support",
        "Monthly governance optimization reports"
      ],
      idealFor: "DAOs moving from bootstrap to structured operations — including DeFi communities, social DAOs, media collectives, and protocol-aligned groups."
    },
    { 
      title: "Enterprise Plan", 
      description: "The Enterprise Plan is a white-glove solution tailored for large DAOs and decentralized organizations with complex coordination needs. We work with you to build deeply customized governance architecture, integrations, compliance pathways, and scaling strategies.",
      type: "enterprise"
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container relative mx-auto px-4 py-16 z-50">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-[77px] items-start justify-start">
        {/* Left Column - Heading and Description */}
        <div className="flex flex-col gap-[53px] items-start justify-start">
          <h2 
            className="text-left font-[&quot;ClashDisplayVariable-Semibold&quot;,_sans-serif] text-4xl md:text-5xl font-semibold w-full lg:w-[599px]"
            style={{
              background: "linear-gradient(90.09deg, rgba(255, 255, 255, 1) 12.58%, rgba(99, 89, 233, 1) 89.61%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Empowering DAOs at every stage of their evolution
          </h2>
          <div className="flex flex-col gap-7 items-start justify-start w-[799px]">
            <p className="text- text-brand7 eft font-[&quot;ClashDisplayVariable-Regular&quot;,_sans-serif] text-xl md:text-2xl font-normal">
              The Catalyst Suite offers a tiered approach to decentralized
              governance and community-building — whether you're just starting out
              or scaling toward complex, enterprise-grade coordination.
            </p>
          </div>
        </div>

        {/* Right Column - Plans */}
        <div className="flex flex-col gap-5 items-start justify-start  w-full lg:w-[627px]">
          {/* Plan Accordions */}
          {planItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="w-full relative mb-5 p-[2px] rounded-lg bg-gradient-to-r from-[#1e0165] to-[#48386c]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="rounded-lg bg-[#12082a] overflow-hidden">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="cursor-pointer p-5 text-base sm:text-lg md:text-xl font-semibold text-white flex items-center"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.title}</span>
                      {item.type === "community" && (
                        <span className="text-gray-300 text-sm">Perfect for early-stage DAOs.</span>
                      )}
                      {item.type === "growth" && (
                        <span className="text-gray-300 text-sm">For growing DAOs aiming for sustainable growth.</span>
                      )}
                      {item.type === "enterprise" && (
                        <span className="text-gray-300 text-sm">Custom solutions for enterprise DAOs</span>
                      )}
                    </div>
                    <div>
                      {index === openIndex ? (
                        <img src="/close.png" alt="Close" className="w-5 h-5 sm:w-auto sm:h-auto" />
                      ) : (
                        <img src="/open.png" alt="Open" className="w-5 h-5 sm:w-auto sm:h-auto" />
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
                      <div className="p-5 border-t border-[rgba(255,255,255,0.1)]">
                        <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                        
                        {item.features && (
                          <div className="mt-4">
                            <h4 className="text-white text-base mb-2">What's included:</h4>
                            <ul className="space-y-1 text-gray-300 text-sm">
                              {item.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="mr-2">●</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {item.idealFor && (
                          <div className="mt-4">
                            <p className="text-gray-300 text-sm">
                              <span className="text-white">Ideal for:</span> {item.idealFor}
                            </p>
                          </div>
                        )}
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
