import TileEffect from "@/components/ui/myComponents/grid-bg-2";
import CarouselComponent from "./SignUp/carausel";
import EmploymentDetails from "./SignUp/employment-details";
import Otp from "./SignUp/otp-page";
import PersonalDetail from "./SignUp/personal-details";

const OnboardingFlow = () => {
    return (<div className="bg-brand1 pt-20 relative overflow-hidden min-h-screen">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/90  bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
            <TileEffect />
        </div>
        {/* <div className="absolute inset-0 h-full bg-black/60  ">
   
        </div> */}


        <div className="absolute bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
        <div className="absolute top-[750px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[1550px] left-[50%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[2550px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[2550px] right-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>

        <div className="absolute bottom-[200px] right-[5%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>
        <div className="absolute top-[50%] right-[30%] bg-brand2 z-10 size-[350px] rounded-full blur-[170px]"></div>
        <div className="absolute top-[10%] left-[50%] bg-brand3 z-10 size-[250px] rounded-full blur-[120px]"></div>
        <div className="grid grid-cols-2 gap-2 font-clash ">
            <div className=" w-full z-50">
                {/* <EmploymentDetails />
                       <Otp/> */}
                <PersonalDetail />
            </div>


            <div className="z-40">
                <CarouselComponent />

            </div>
        </div>

    </div>);
}

export default OnboardingFlow;