import EmploymentDetails from "./SignUp/employment-details";
import Otp from "./SignUp/otp-page";
import PersonalDetail from "./SignUp/personal-details";

const OnboardingFlow = () => {
    return (<div className="bg-brand1 pt-20">
        <EmploymentDetails/>
        <Otp/>
        <PersonalDetail/>
    </div>);
}

export default OnboardingFlow;