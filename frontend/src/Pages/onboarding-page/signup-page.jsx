import CarouselComponent from "./SignUp/carausel";
import EmploymentDetails from "./SignUp/employment-details";
import Otp from "./SignUp/otp-page";
import PersonalDetail from "./SignUp/personal-details";

const OnboardingFlow = () => {
    return (<div className="bg-brand1 pt-20">
        <div className="grid grid-cols-2 gap-2">
            <div className=" w-full">
                <EmploymentDetails />
            </div>

            {/* <Otp/>
        <PersonalDetail/> */}
            <div className="">
                <CarouselComponent />

            </div>
        </div>

    </div>);
}

export default OnboardingFlow;