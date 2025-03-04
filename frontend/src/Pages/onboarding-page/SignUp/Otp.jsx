import React from 'react'

const [otpFields, setOtpFields] = useState(Array(6).fill(''));

const Otp = () => {
const handleOtpChange = (e, index) => {
    const { value } = e.target;

    if (/^\d*$/.test(value)) { 
        const newOtp = [...otpFields];
        newOtp[index] = value;
        setOtpFields(newOtp);

        
        if (value && index < otpFields.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }
};

const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpFields[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
    }
};

return (
    <div className="h-full bg-[#100821] w-full flex justify-center items-center gap-8 relative overflow-hidden">
        <div className="flex flex-col gap-8 w-[663px]">
            <div className="flex flex-col gap-4 items-center">
                <img src="/new/logo.svg" alt="logo" className="w-40 h-10" />
                <div className="flex pt-5 gap-16">
                    <span className="text-white text-xl font-medium opacity-50">Personal Details</span>
                    <span className="text-white text-xl font-medium opacity-50">Employment Details</span>
                    <span className="text-white text-xl font-medium">Enter OTP</span>
                </div>
            </div>

            <h1 className="text-white font-medium pt-5 flex justify-center text-xl">
                Enter the OTP sent to your e-mail:
            </h1>

            <div className="flex gap-4 pt-5">
                {otpFields.map((value, index) => (
                    <div
                        key={index}
                        className="w-[91px] h-[108px] bg-[#1B0D37] border border-[#9268E4] rounded-md flex items-center justify-center shadow-xs"
                    >
                        <input
                            id={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            value={value}
                            className="w-full h-full bg-transparent text-5xl text-center text-white focus:outline-none"
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </div>
                ))}
            </div>

            <div className="flex items-center mt-5 gap-3">
                <input
                    type="checkbox"
                    className="w-7 h-7 border-2 border-primary-300 rounded"
                />
                <p className="text-white text-xl">
                    Accept to get Daily Newsletter by PanDAO
                </p>
            </div>

            <button
                className="  hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]   bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] text-white text-2xl font-semibold py-3 px-5 rounded-[26px] shadow-inner transition-all duration-300"
            >
                Finish
            </button>
        </div>

        <div className="rounded-2xl p-4 w-[647px] h-[961px] overflow-hidden">
            <img
                src="/S3.svg"
                alt="Background1"
                className="inset-0 w-[647px] object-cover -z-10"
            />
        </div>
    </div>
);
};

export default Otp