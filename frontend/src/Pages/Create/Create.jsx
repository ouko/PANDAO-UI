
import InstructionView from "./components/InstructionView";
import useViewStore from "@/store/view";
import TemplateView from "./components/TemplateView";
import DescribeView from "./components/DescribeDao";
import DeployView from "./components/DeployView";
import FinancialView from "./components/FinancialDao";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";

const Create = () => {
  const {view} = useViewStore();
  return (
    <div className=" relative pb-20 font-clash overflow-hidden  bg-[#100821] min-h-screen  flex flex-col items-center justify-center">
          {/* Background elements */}
          <div className="bg-black/50 absolute  "></div>
          <div className="absolute bottom-[100px] left-0 bg-brand2 y-0 size-[500px] rounded-full blur-[200px]"></div>
          <div className="absolute top-[10px] right-0 bg-brand2 y-0 size-[500px] rounded-full blur-[200px]"></div>
          <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
          <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
            <TileEffect4 />
          </div>
   
      {view === "1" && (
       <InstructionView/>
      )}
         {view === "2" && (
       <TemplateView/>
      )}
            {view === "3" && (
       <DescribeView/>
      )}
              {view === "4" && (
       <DeployView/>
      )}
           {view === "5" && (
       <FinancialView/>
      )}
    </div>
  );
};

export default Create;


