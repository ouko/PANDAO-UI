import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, CirclePlus, Pen, ShieldCheck } from "lucide-react";
import { StepsCard } from "./StepsCard";
import useViewStore from "@/store/view";

const InstructionView = () => {
  const { setView } = useViewStore();

  return (
    <div className="container mx-auto mt-20 ">
      <Card className="bg-white relative z-40 text-black mt-10 p-12 flex flex-col gap-3 rounded-xl shadow-sm">
        <div className="text-4xl font-semibold ">Build your DAO</div>
        <div className="flex flex-col items-center justify-between gap-3">
          <span className="w-full">
            Welcome to the How to Build Your DAO hub. Here you can find a variety of
            guides and resources to assist you in forming and operating your own
            Decentralized Autonomous Organization . If you’re unfamiliar with what a
            DAO is or an experienced builder interested in exploring the best practices,
            we’ve compiled the ideal tutorials for you. Check our collection and get the
            skills you need to create, launch, and regulate your DAO.

          </span>
          <div className="flex items-center justify-end w-full">
          <Button
            onClick={() => setView("2")}
            className="w-full md:w-1/4 group"
            variant="radix"
          >
            <span>Build you DAO</span>
            <ChevronRight className="h-4 w-5 group-hover:translate-x-2 duration-200 transition-transform" />
          </Button>
          </div>
       
        </div>
      </Card>
      <div className="flex md:flex-row flex-col items-center justify-center  gap-5 mt-2 mb-5">
        <StepsCard title="Select Template" step="Step 1" icon={CirclePlus} />
        <StepsCard title="Describe your DAO" step="Step 2" icon={Pen} />
        <StepsCard title="Deploy" step="Step 3" icon={ShieldCheck} />

      </div>
    </div>
  );
};

export default InstructionView;
