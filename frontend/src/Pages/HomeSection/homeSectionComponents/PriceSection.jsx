import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PricingCard = ({ title, description, price, features, buttonText }) => {
  return (
    <div className="rounded-[32px]  border border-solid p-10 shrink-0 w-[363px] h-[724px] relative overflow-hidden bg-gradient-to-b from-[rgba(32,3,92,0.97)] to-[rgba(22,3,60,0.94)] backdrop-blur-[42px] hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex  flex-col gap-8 items-start justify-start">
        <div className="flex  flex-col gap-6 items-start justify-start">
          <div className="rounded-[100px] w-10 h-10 relative overflow-hidden bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(192,161,255,0.41)]">
            <div className="bg-black rounded-full w-5 h-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="flex flex-col gap-1 items-start justify-start">
            <div className="text-white font-clash  text-left  font-medium text-xl leading-7">
              {title}
            </div>
            <div className="text-[rgba(255,255,255,0.80)] text-left font-clash  font-normal text-sm leading-5">
              {description}
            </div>
          </div>
        </div>

        <div className="shrink-0 w-[209px] h-14 relative">
          <div className="text-white text-left f font-medium text-4xl font-clash  leading-[56px] absolute left-0 top-0">
            {price}
          </div>
        </div>
      </div>

      <button
        className="rounded-[26px] border-solid border-transparent pt-3 pr-3.5 pb-3 pl-3.5 flex flex-row gap-2.5 items-center justify-center w-[283px] absolute left-10 top-[284px] overflow-hidden transition duration-300 bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0)] hover:from-[rgba(192,161,255,1)] hover:to-[rgba(125,61,255,1)]"
      >
        <span className="text-[#ffffff] text-left  text-[14px] leading-5 font-medium relative">
          {buttonText}
        </span>
      </button>

      <div className="border-solid border-[rgba(255,255,255,0.16)] border-t w-[283px] h-0 absolute left-10 top-[368px]"></div>

      <div className="flex flex-col gap-4 items-start justify-start absolute left-10 top-[408px]">
        <div className="text-white text-left  font-medium text-base leading-6 w-[271.79px]">
          {features.intro}
        </div>
        <div className="flex flex-col gap-4 items-start justify-start">
          {features.list.map((feature, index) => (
            <div key={index} className="flex flex-row gap-2 items-center justify-start">
              <div className="shrink-0 w-4 h-4 relative">
                <img className="h-auto absolute left-0 top-0 overflow-visible" src={`/tick.svg`} alt="feature icon" />
              </div>
              <div className="text-[rgba(255,255,255,0.80)] text-left  font-normal text-sm leading-[22px]">
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
        intro: "Access essential DAO tools and resources to kickstart your journey.",
        list: ["Basic DAO setup", "Voting & governance tools", "Essential analytics", "Community support"]
      },
      buttonText: "Get Started",

    },
    {
      title: "Enterprise",
      description: "For growing DAOs aiming for sustainable growth.",
      price: "$299",
      features: {
        intro: "Scale your DAO with enhanced features and dedicated support.",
        list: ["Advanced voting mechanisms", "Custom analytics dashboards", "Member onboarding tools", "Email & chat support"]
      },
      buttonText: "Subscribed",

    },
    {
      title: "Business",
      description: "Customized solutions for enterprise DAOs.",
      price: "Custom ",
      features: {
        intro: "Tailored DAO solutions to meet your unique organizational needs.",
        list: ["Dedicated DAO strategist", "Custom integrations & tools", "On-site workshops & training", "Priority 24/7 support"]
      },
      buttonText: "Contact Us",

    }
  ];

  return (
    <div className="flex  flex-col gap-[10px] items-center justify-start bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)]">
      <div className="flex flex-col gap-3 items-center justify-start self-stretch">
        <div className="text-center font-semibold text-[64px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
          The Perfect Pricing to Power Your DAO Development.
        </div>
        <div className="text-[#B59AEC] text-center font-normal text-2xl leading-[120%] relative self-stretch">
          At PANDAO, we believe in transparency, not just in governance but also in costs.
        </div>
      </div>
      <div className="flex flex-col gap-[34px] items-center justify-start">
        <div className="bg-[rgba(255,255,255,0.08)] rounded-[29px] border-solid border-[rgba(255,255,255,0.12)] border p-1 flex flex-row gap-0 items-start justify-center backdrop-blur-[6px]">
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
        </div>
        <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-[50px] justify-center md:justify-start">
  {plans.map((plan, index) => (
    <PricingCard key={index} {...plan} />
  ))}
</div>

      </div>
    </div>
  );
};

export default PriceSection;