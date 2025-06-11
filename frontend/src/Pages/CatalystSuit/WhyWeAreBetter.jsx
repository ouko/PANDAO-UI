import React from "react";

const cardData = [
  {
    icon: "icons-lightning0.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
  {
    icon: "icons-lightning1.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-1 md:col-span-1 col-span-1",
  },
  {
    icon: "icons-lightning2.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-1 md:col-span-1 col-span-1",
  },
  {
    icon: "icons-lightning3.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
  {
    icon: "icons-lightning4.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque. Lorem ipsum dolor sit amet consectetur.",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
];

const Card = ({ icon, heading, content, className }) => (
  <div
    className={`rounded-[24px] border-2 border-solid p-4 md:p-6 pt-[30px] flex flex-col gap-4 md:gap-6 items-center justify-center overflow-hidden backdrop-blur-[19.28px] shadow-inner h-full transition-all duration-300 hover:scale-[1.02] ${className}`}
    style={{
      background:
        "linear-gradient(180deg, rgba(166,116,253,0.12) 0%, rgba(166,116,253,0.04) 50%, rgba(166,116,253,0.07) 100%)",
      borderImage: "linear-gradient(180deg, rgba(166,116,253,0.5) 0%, rgba(166,116,253,0.6) 100%) 1",
    }}
  >
    <div className="w-16 h-16 relative">
      <div className="bg-[#1c1c1c] rounded-2xl p-4 flex items-center justify-center absolute left-[21px] top-[30px]">
        <img src={icon} alt="icon" className="w-8 h-8" />
      </div>
    </div>
    <div className="flex flex-col gap-2 items-start w-full mt-10">
      <div className="text-white text-lg md:text-xl font-semibold">{heading}</div>
      <div className="text-gray-400 text-sm md:text-base leading-relaxed">{content}</div>
    </div>
  </div>
);

const WhyWeAreBetter = () => {
  return (
    <div className="relative z-50 py-16 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-8 md:gap-12 items-center justify-center mb-10 md:mb-16">
        <h2
          className="text-3xl md:text-5xl lg:text-[64px] font-semibold text-center"
          style={{
            background:
              "linear-gradient(90.09deg, rgba(255,255,255,1) 12.58%, rgba(99,89,233,1) 89.61%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why we are better?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default WhyWeAreBetter
