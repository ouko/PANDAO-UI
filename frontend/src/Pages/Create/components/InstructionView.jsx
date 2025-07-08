import { ChevronRight, Pen, Coins, Send, Gavel, Rocket, LayoutTemplate } from "lucide-react";
import { StepsCard } from "./StepsCard";
import useViewStore from "@/store/view";
import { useRef, useState, useEffect } from "react";

const InstructionView = () => {
  const { setView } = useViewStore();
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Touch scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
    }
  }, []);

  return (
    <div className="container mx-auto mt-10 z-50 ">
      
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] p-10  gap-7 border border-[#5228A4] flex flex-col justify-start items-start my-10">

        <div className="  text-[40px] leading-[130%] font-semibold text-start">

          <span>

            
            <span className="step-2-describe-your-dao-span3 text-amber-50">Build your DAO</span>
          </span>
        </div>
        <div className="text-[#ffffff] text-base md:text-xl tracking-wider  leading-[130%] font-normal text-left max-w-xs sm:max-w-md md:max-w-full mx-auto md:mx-0 break-words">
  <span>
  Create your DAO in minutes.
  Start by picking a template that fits your needs.
  Customize the details, governance, and token settings.
  Launch and manage your DAO with just a few steps.
</span>
</div>
      </div>

      {/* Enhanced Horizontal Scrollable Steps Container */}
      <div className="w-full mt-2 mb-5 px-2 md:px-0">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hidden scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="flex gap-4 md:gap-5 min-w-max pb-2 select-none">
            <StepsCard title="Select Template" step="Step 1" icon={LayoutTemplate} />
            <StepsCard title="Describe your DAO" step="Step 2" icon={Pen} />
            <StepsCard title="Token Details" step="Step 3" icon={Coins} />
            <StepsCard title="AirDrop" step="Step 4" icon={Send} />
            <StepsCard title="Governance" step="Step 5" icon={Gavel} />
            <StepsCard title="Deploy" step="Step 6" icon={Rocket} />
          </div>
        </div>
      </div>

      <div className="flex items-center mt-10 justify-center ">
          {/* <Button
            onClick={() => setView("2")}
            className="w-full md:w-1/4 group"
            variant="radix"
          >
            <span>Build you DAO</span>
            <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
          </Button> */}

          <button
          onClick={() => setView("2")}
              type="button"
              className="flex justify-center text-xl md:text-2xl items-center w-full md:w-1/4 group bg-primary-500 rounded-full p-2 md:p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              <span>Build your DAO</span>
              <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
            </button>
          </div>
    </div>
  );
};

export default InstructionView;