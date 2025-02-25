import React, { useState } from "react";

function Question() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is PanDAO?", answer: "PanDAO is a decentralized platform for ..." },
    { question: "How does PanDAo ensure my data is secure?", answer: "We use blockchain technology and end-to-end encryption to protect user data." },
    { question: "What are the benefits of using PanDAo?", answer: "Users benefit from transparency, security, and decentralized governance." },
    { question: "How can I get started with PanDAo?", answer: "Simply sign up, connect your wallet, and start exploring the features." },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center justify-center  py-12 px-4 w-full min-h-screen z-50 container mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full  px-4 z-50">
        <div className="flex flex-col items-start justify-start mt-5 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-clash font-bold bg-gradient-to-r  from-white to-indigo-500 bg-clip-text text-transparent">
            Got Questions? We&apos;ve Got Answers!
          </h1>
          <p className="text-gray-400 text-lg mt-2 font-clash">Find answers to the most common questions below.</p>
          <button
            // onClick={() => navigate('/userDashboard')}
            className="relative w-[219px] h-[49px] mt-10 shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
          >
            <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
            <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
            <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
            <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#c1bbcf] bg-clip-text text-transparent z-50">
              Get Started
            </span>
          </button>
        </div>
        
        <div className="flex flex-col gap-4 w-full lg:w-[40rem] mt-8 lg:mt-0">
          {faqs.map((faq, index) => (
            <div key={index} className="p-[2px] rounded-lg bg-gradient-to-r from-[#1e0165] to-[#48386c]">
              <div className="rounded-lg bg-[#12082a] pt-4 pb-4">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="cursor-pointer text-lg md:text-xl font-semibold text-white flex items-center gap-2 px-4"
                >
                  <div className="flex items-center justify-between w-full">
                  <span>{faq.question}</span>
                  <div>
  {index === openIndex ? (
    <img src="/close.png" alt="Open" />
  ) : (
    <img src="/open.png" alt="Close" />
  )}
</div>

                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[1000px] p-4' : 'max-h-0 p-0 opacity-0'}`}
                >
                  <p className="text-gray-300 text-sm md:text-base">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default  Question;
