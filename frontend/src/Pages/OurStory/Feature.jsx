function Feature() {
  return (

    <div className=" w-full pb-40 pt-20 relative z-50">
       <h2 className="text-center font-semibold text-[54px] sm:text[30px] self-stretch bg-gradient-to-r from-white to-[rgba(99,89,233,1)] bg-clip-text text-transparent" >
          Why PandaoLive?
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-4xl mx-auto mb-10 md:mb-16 text-brand7 leading-relaxed px-4">
          Lorem ipsum dolor sit amet consectetur adipisi minus magnam architecto, maiores sunt
          quaerat qui sapiente accusantium! Similique magni eaque labore!
        </p>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-16">
          {/* Decorative lines - visible only on medium screens and up */}
          <div className="hidden md:block absolute left-1/2 h-full top-0 border-l-[3px] md:border-l-[5px] border-dashed border-[#532da1] -translate-x-1/2"></div>
          <div className="hidden md:block absolute w-full left-0 top-1/2 border-t-[3px] md:border-t-[5px] border-dashed border-[#532da1] -translate-y-1/2"></div>
          
          {/* First row of features */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-24 mb-16 md:mb-24">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4 md:gap-5 md:w-1/2 p-4 md:p-6 rounded-xl transition-all duration-300 hover:bg-[#1a1528]/40">
              <div className="h-16 w-20 mb-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
                  <img src="/A.svg" alt="Feature icon" className="w-full h-full object-contain"/>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent">
                Built for Radix, Ready for the Future:
              </h2>
              <p className="text-[#a9a4b3] text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                The only layer one purpose-built for DeFi and composability — faster, safer, smarter.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col gap-4 md:gap-5 md:w-1/2 p-4 md:p-6 rounded-xl transition-all duration-300 hover:bg-[#1a1528]/40">
              <div className="h-16 w-20 mb-2">
                <div className="w-16 h-16 flex items-center justify-center text-white text-2xl">
                  <img src="/B.svg" alt="Feature icon" className="w-full h-full object-contain"/>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent">
                Modular &amp; Scalable:
              </h2>
              <p className="text-[#a9a4b3] text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                Start small. Grow big. Add modules as your community evolves.
              </p>
            </div>
          </div>
          
          {/* Second row of features */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-24">
            {/* Feature 3 */}
            <div className="flex flex-col gap-4 md:gap-5 md:w-1/2 p-4 md:p-6 rounded-xl transition-all duration-300 hover:bg-[#1a1528]/40">
              <div className="h-16 w-20 mb-2">
                <div className="w-16 h-16 flex items-center justify-center text-white text-2xl">
                  <img src="/F2.svg" alt="Feature icon" className="w-full h-full object-contain"/>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent">
                Actually Transparent:
              </h2>
              <p className="text-[#a9a4b3] text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                Every vote, rule, and transfer is on-chain. Full trust. No tricks.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="flex flex-col gap-4 md:gap-5 md:w-1/2 p-4 md:p-6 rounded-xl transition-all duration-300 hover:bg-[#1a1528]/40">
              <div className="h-16 w-20 mb-2">
                <div className="w-16 h-16 flex items-center justify-center text-white text-2xl">
                  <img src="/E.svg" alt="Feature icon" className="w-full h-full object-contain"/>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent">
                Heading
              </h2>
              <p className="text-[#a9a4b3] text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                We emphasize teamwork and open communication, believing that great work is achieved together.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Feature;