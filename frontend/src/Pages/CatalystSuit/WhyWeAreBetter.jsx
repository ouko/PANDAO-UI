
const cardData = [
  {
    icon: "light.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
  {
    icon: "light.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-1 md:col-span-1 col-span-1",
  },
  {
    icon: "light.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-1 md:col-span-1 col-span-1",
  },
  {
    icon: "light.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
  {
    icon: "light.svg",
    heading: "Heading",
    content:
      "Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien. Libero aliquam luctus pellentesque. Lorem ipsum dolor sit amet consectetur.",
    className: "lg:col-span-2 md:col-span-2 col-span-1",
  },
];

const Card = ({ icon, heading, content, className }) => (
  <div
    className={`relative rounded-[24px] p-[2px] bg-gradient-to-b from-[#a674fd80] via-[#a674fd0a] to-[#a674fd11] transition-all duration-300 hover:scale-[1.02] ${className}`}
  >
    <div className="rounded-[22px] p-4 md:p-6 pt-[30px] flex flex-col gap-4 md:gap-6 items-start justify-start overflow-hidden backdrop-blur-[19.28px] shadow-inner h-full bg-[#1c1c1c]/60">
      <div className="w-full h-full relative">
        <div className="rounded-2xl p-4 flex items-start justify-start  ">
          <img src={icon} alt="icon" className="w-24 h-24 object-contain" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start w-full mt-10">
        <div className="text-white text-[26px] md:text-xl font-semibold">{heading}</div>
        <div className="text-gray-400 text-[20px] md:text-base leading-relaxed">{content}</div>
      </div>
    </div>
  </div>
);


const WhyWeAreBetter = () => {
  return (
    <div className="relative z-50 py-16 px-4 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-8 md:gap-12 items-center justify-center mb-10 md:mb-16">
        <h2 className="text-center font-semibold pb-10 text-4xl sm:text-5xl md:text-[64px] z-50 self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent">
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
