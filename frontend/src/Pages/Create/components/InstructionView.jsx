import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, CirclePlus, Pen, ShieldCheck } from "lucide-react";
import { StepsCard } from "./StepsCard";
import useViewStore from "@/store/view";

const InstructionView = () => {
  const { setView } = useViewStore();

  return (
    <div className="container mx-auto mt-10 z-50 ">
      
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] p-10  gap-7 border border-[#5228A4] flex flex-col justify-start items-start my-10">

        <div className="font-[ClashDisplayVariable-Semibold,sans-serif]  text-[40px] leading-[130%] font-semibold text-start">

          <span>

            
            <span className="step-2-describe-your-dao-span3 text-amber-50">Build your DAO</span>
          </span>
        </div>
        <div className="text-[#ffffff] font-[Inter-Regular,sans-serif]  text-xl leading-[130%] font-normal text-left ">
          <span>
          Welcome to the How to Build Your DAO hub. Here you can find a variety of
            guides and resources to assist you in forming and operating your own
            Decentralized Autonomous Organization . If you’re unfamiliar with what a
            DAO is or an experienced builder interested in exploring the best practices,
            we’ve compiled the ideal tutorials for you. Check our collection and get the
            skills you need to create, launch, and regulate your DAO.
          </span>
        </div>
      </div>












      <div className="flex md:flex-row flex-col items-center justify-center   gap-5 mt-2 mb-5">
        <StepsCard title="Select Template" step="Step 1" icon={CirclePlus} />
        <StepsCard title="Describe your DAO" step="Step 2" icon={Pen} />
        <StepsCard title="Deploy" step="Step 3" icon={ShieldCheck} />

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
              className="flex justify-center items-center w-full md:w-1/4 group bg-primary-500 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              <span>Build you DAO </span>
              <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
              
            </button>
          </div>
    </div>
  );
};

export default InstructionView;
