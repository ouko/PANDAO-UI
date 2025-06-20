import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, CircleCheck } from 'lucide-react';

export const PricingCard = ({ title, description, price, features, buttonText, highlight }) => {
  return (
    <div
      className={`rounded-[32px] border border-brand2 p-10 w-full flex flex-col relative overflow-hidden ${highlight ? 'z-10 md:-translate-y-10' : ''}`}
      style={{
        background: 'linear-gradient(195.05deg, rgba(192, 161, 255, 0.1) 0%, rgba(192, 161, 255, 0.02) 50%, rgba(192, 161, 255, 0.06) 100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      {highlight && (
        <div
          className="absolute left-1/2 -top-40 -translate-x-1/2 pointer-events-none z-0 rounded-full blur-2xl bg-purple-700 w-52 h-52"
        />
      )}

      <div className="flex flex-col gap-8 mb-8">
        {/* Header section */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[100px] w-10 h-10 relative bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(192,161,255,0.41)]">
            <div className="bg-black rounded-full w-5 h-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-white font-clash text-xl leading-7 font-medium">
              {title}
            </div>
            <div className="text-[rgba(255,255,255,0.80)] font-clash text-sm leading-5 font-normal">
              {description}
            </div>
          </div>
        </div>

        {/* Price section */}
        <div className="text-white font-clash text-4xl leading-[56px] font-medium">
          {price}
        </div>
      </div>
   {/* Button section - stays at bottom with flex-grow pushing it down */}
   <div className="mb-5">
        <Button variant="brand" className="w-full">
          <span className="text-[#ffffff] text-[14px] leading-5 font-medium">
            {buttonText}
          </span>
        </Button>
      </div>
      {/* Features section */}
      <Separator className="my-10 bg-brand2"/>
      <div className="flex flex-col gap-4 mb-8">
        {/* <div className="text-white font-medium text-base leading-6">
          {features.intro}
        </div> */}

        <div className="flex flex-col gap-4">
          {features.list.map((feature, index) => (
            <div key={index} className="flex flex-row gap-2 items-start">
              <span className="min-w-4 min-h-4 flex items-center justify-center mt-1">
                <CircleCheck className="h-4 w-4 text-brand7 flex-shrink-0" />
              </span>
              <div className="text-[rgba(255,255,255,0.80)] font-normal text-sm leading-[22px]">
                {feature}
              </div>
            </div>
          ))}
        </div>
      </div>

   
    </div>
  );
};

const PriceSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);

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
    <div className="flex  flex-col gap-[10px] z-50 items-center justify-start container mx-auto px-4">
      <div className="flex flex-col gap-3 items-center justify-start self-stretch z-50">
        <div className="text-center font-semibold md:text-[64px] text-[30px] leading-[120%]  self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
          The Perfect Pricing to Power Your DAO Development. 
        </div> 
        <div className="text-[#B59AEC] text-center font-normal md:text-2xl text-xl leading-[120%] relative self-stretch px-3" >
          At PANDAO, we believe in transparency, not just in governance but also in costs.
        </div>
      </div>
      <div className="flex flex-col gap-[34px] items-center justify-start z-50 px-3 md:px-0">
        {/* <div className="bg-[rgba(255,255,255,0.08)] rounded-[29px] border-solid border-[rgba(255,255,255,0.12)] border p-1 flex flex-row gap-0 items-start justify-center backdrop-blur-[6px]">
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-1/2 h-full  bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] rounded-full shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)]"
            animate={{ x: isMonthly ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <button
            className={cn(
              "w-1/2 py-2 text-center text-sm px-4 font-medium relative z-10 transition-all",
              isMonthly ? "text-black" : "text-[rgba(255,255,255,0.80)]"
            )}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={cn(
              "w-1/2 py-2 text-center text-sm px-4 font-medium relative z-10 transition-all",
              !isMonthly ? "text-black" : "text-[rgba(255,255,255,0.80)]"
            )}
            onClick={() => setIsMonthly(false)}
          >
            Annually
          </button>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-[1200px] mx-auto ">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PriceSection;