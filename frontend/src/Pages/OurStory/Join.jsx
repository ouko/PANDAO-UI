import BrandButton2 from "@/components/ui/myComponents/brand-button-2";

function Join() {
  return (
    <div className=" py-20  relative z-50 ">
    <div className="rotating-border-container w-[90%] mt-20 mb-20 mx-auto rounded-3xl ">
      <div className="bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] relative w-full h-full rounded-3xl overflow-hidden z-20">
        <div className="relative min-h-[460px] px-6 md:px-12 lg:px-16 py-10 flex items-center">
        
          <div className="absolute right-0 top-[195px]  max-w-[50%] md:max-w-[443px]">
            <img
              className="w-full h-auto opacity-60 object-cover"
              src="/h.svg"
              alt="Hand illustration"
            />
          </div>
        
          <div className="absolute left-10 bottom-0  max-w-[50%] md:max-w-[400px]">
            <img
              className="w-full h-auto opacity-20"
              src="/c.svg"
              alt="Background decoration"
            />
          </div>
        
          <div className="absolute md:block hidden right-10 bottom-0 z-50 max-w-[50%] md:max-w-[400px]">
            <img
              className="w-full h-auto opacity-80"
              src="/c.svg"
              alt="Backgr decoration"
            />
          </div>

          <div className="relative z-10 flex flex-col gap-6 max-w-full md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold bg-gradient-to-r from-white to-[#6359e9] bg-clip-text text-transparent font-clash">
              Join the DAOvolution
            </h1>
            <p className="text-brand7 text-lg md:text-xl lg:text-2xl font-medium font-clash">
              Whether you are a buzzing community, a solo builder rallying your tribe, or a founder dreaming of transparent governance — PandaoLive is your launchpad.
            </p>
             <div className="flex flex-wrap justify-start items-start gap-5 mt-10">
                    <BrandButton2 title="Launch your dao Now" href="" />
                  </div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// Add custom CSS for the rotating border gradient effect
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .rotating-border-container {
      position: relative;
      z-index: 0;
    }
    
    .rotating-border-container::before,
    .rotating-border-container::after {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      background: linear-gradient(10deg, #5228A4, #100821 );
      background-size: 300% 300%;
      z-index: -1;
      border-radius: 1.5rem;
      animation: rotateGradient 3s linear infinite;
    }
    
    .rotating-border-container::after {
      filter: blur(1px);
      opacity: 0.7;
    }
    
    @keyframes rotateGradient {
      0% {
        background-position: 0% 0%;
      }
      25% {
        background-position: 100% 0%;
      }
      50% {
        background-position: 100% 100%;
      }
      75% {
        background-position: 0% 100%;
      }
      100% {
        background-position: 0% 0%;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

export default Join;