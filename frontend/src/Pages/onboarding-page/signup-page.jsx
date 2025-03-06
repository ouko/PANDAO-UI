import CarouselComponent from "./SignUp/carausel";
import { motion, AnimatePresence } from "framer-motion";

import EmploymentDetails from "./SignUp/employment-details";
import Otp from "./SignUp/otp-page";
import PersonalDetail from "./SignUp/personal-details";
import TileEffect2 from "@/components/ui/myComponents/grid-bg-3";

import useStepStore from "@/store/stepStore";
import { StepIndicator2, steps } from "./SignUp/stepper";
const stepVariants = {
    initial: { opacity: 0, x: 50 },  // Start off-screen to the right
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // Slide in
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } } // Slide out left
};

const OnboardingFlow = () => {
    const { currentStep } = useStepStore();

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <PersonalDetail />;
            case 1:
                return <EmploymentDetails />;
            case 2:
                return <Otp />;
            default:
                return <PersonalDetail />;
        }
    };

    return (<div className="bg-brand1 pt-20 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-black/90  bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
            <TileEffect2 />
        </div>



        <div className="absolute bottom-[-100px] left-1/3 bg-brand2 z-10 size-[500px] rounded-full blur-[200px]"></div>
        <div className="absolute top-[750px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[1550px] left-[50%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[2550px] left-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>
        <div className="absolute top-[2550px] right-[10%] bg-brand3 z-10 size-[300px] rounded-full blur-[150px]"></div>

        <div className="absolute bottom-[200px] right-[5%] bg-brand4 z-10 size-[400px] rounded-full blur-[180px]"></div>
        <div className="absolute top-[50%] right-[30%] bg-brand2 z-10 size-[350px] rounded-full blur-[170px]"></div>
        <div className="absolute top-[10%] left-[50%] bg-brand3 z-10 size-[250px] rounded-full blur-[120px]"></div>

        <div className="grid grid-cols-2  font-clash  pb-20">
            <div className=" w-full z-50  ">
                <div className="flex items-center justify-center  m-10">
                    <img src="/logo.png" alt="logo" className="w-56" />
                </div>
                <StepIndicator2 currentStep={currentStep} steps={steps} />
                <div className="w-full  relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep} 
                            variants={stepVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="absolute w-full "
                        >
                            {renderStepContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>



            </div>


            <div className="z-40 flex items-center justify-center  mx-auto " >
                <CarouselComponent />

            </div>
        </div>

    </div>);
}

export default OnboardingFlow;