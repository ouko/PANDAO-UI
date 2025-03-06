import { useSignupFormStore } from '@/store/onboarding/signup-form';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAccount } from '@/AccountContext';

const Otp = () => {
    const [otpFields, setOtpFields] = useState(Array(6).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const firstInputRef = useRef(null);
    const navigate = useNavigate();
        const { accounts } = useAccount();
    

    const {
        setNewsletter,
        newletterOpted,
        setFormData,
        username,
        email,
        bio,
        work_history,
        tags,
        display_image,
        public_address
    } = useSignupFormStore();

    // Focus on first input when component mounts
    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    // Updates OTP in store when all fields are filled
    useEffect(() => {
        const completeOtp = otpFields.join("");
        if (completeOtp.length === 6) {
            setFormData({ otp: completeOtp });
        }
    }, [otpFields, setFormData]);

    const handleOtpChange = (e, index) => {
        const { value } = e.target;
        
        // Clear any previous errors
        if (error) setError("");

        // Only allow numeric input
        if (/^\d*$/.test(value)) {
            const newOtp = [...otpFields];
            newOtp[index] = value;
            setOtpFields(newOtp);

            // Auto-focus next input if value exists
            if (value && index < otpFields.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace - focus previous input
        if (e.key === 'Backspace' && !otpFields[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
        // Handle right arrow - focus next input
        else if (e.key === 'ArrowRight' && index < otpFields.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
        // Handle left arrow - focus previous input
        else if (e.key === 'ArrowLeft' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();
        
        // Only proceed if pasted content is numeric and within valid length
        if (/^\d+$/.test(pastedData) && pastedData.length <= 6) {
            const newOtp = [...otpFields];
            
            // Fill OTP fields with pasted digits
            for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
                newOtp[i] = pastedData[i];
            }
            
            setOtpFields(newOtp);
            
            // Focus on the next empty field or the last field
            const nextIndex = Math.min(pastedData.length, 5);
            document.getElementById(`otp-input-${nextIndex}`).focus();
        }
    };

    const validateForm = () => {
        const completeOtp = otpFields.join("");
        if (completeOtp.length !== 6) {
            setError("Please enter all 6 digits of the OTP");
            return false;
        }
        
        if (!username || !email) {
            setError("Required profile information is missing");
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        const submitData = {
            username,
            email,
            bio,
            work_history,
            tags,
            display_image,
            public_address:accounts[0].address,
            newletterOpted,
            otp: otpFields.join("")
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
                submitData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('API Response:', response.data);
            navigate('/userDashboard');
        } catch (error) {
            console.error('Error in API call:', error);
            setError(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // const resendOtp = async () => {
    //     if (!email) {
    //         setError("Email is required to resend OTP");
    //         return;
    //     }
        
    //     try {
    //         await axios.post(
    //             `${import.meta.env.VITE_BACKEND_URL}/user/resend-otp`,
    //             { email },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );
    //         // Clear current OTP fields
    //         setOtpFields(Array(6).fill(""));
    //         // Focus first input
    //         if (firstInputRef.current) {
    //             firstInputRef.current.focus();
    //         }
    //     } catch (error) {
    //         console.error('Error resending OTP:', error);
    //         setError(error.response?.data?.message || "Failed to resend OTP. Please try again.");
    //     }
    // };
    // console.log(username, email, public_address, bio, display_image,tags, "fasial")

    return (
        <div className="h-full w-full flex justify-center items-center gap-8 relative overflow-hidden container">
            <div className="flex flex-col gap-8 w-full">
                <h1 className="text-white font-medium pt-5 flex justify-center text-xl">
                    Enter the OTP sent to your e-mail:
                </h1>

                <div className="flex gap-4 pt-5 mx-auto">
                    {otpFields.map((value, index) => (
                        <div
                            key={index}
                            className="w-[91px] h-[108px] bg-[#1B0D37] border border-[#9268E4] rounded-md flex items-center justify-center shadow-xs"
                        >
                            <input
                                id={`otp-input-${index}`}
                                ref={index === 0 ? firstInputRef : null}
                                type="text"
                                maxLength="1"
                                value={value}
                                className="w-full h-full bg-transparent text-5xl text-center text-white focus:outline-none"
                                onChange={(e) => handleOtpChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? handlePaste : undefined}
                            />
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                )}

                <div className="flex items-center mt-5 gap-3 ">
                    <input
                        type="checkbox"
                        checked={newletterOpted}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="w-7 h-7 border-2 border-primary-300 rounded"
                    />
                    <p className="text-white text-xl">
                        Accept to get Daily Newsletter by PanDAO
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] text-white text-2xl font-semibold py-3 px-5 rounded-[26px] shadow-inner transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    
                    {/* <button
                        type="button"
                        onClick={resendOtp}
                        className="text-white text-lg underline hover:text-[#C0A1FF] transition-colors duration-300 self-center mt-2"
                    >
                        Didn't receive the code? Resend OTP
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Otp;