
const PersonalDetail = () => {
    return (
        <div className=" h-full  w-full relative justify-center items-center gap-8 flex overflow-hidden">
            <div className="flex flex-col gap-8 w-[663px]  left-[53px] top-[59.5px]">

                <div className="flex flex-col gap-4 items-center">
                    <img src="/new/logo.svg" alt="logo" className="w-40 h-10" />
                    <div className="flex gap-16">
                        <span className="text-white text-xl font-medium">Personal Details</span>
                        <span className="text-white text-xl font-medium opacity-50">Employment Details</span>
                        <span className="text-white text-xl font-medium opacity-50">Enter OTP</span>
                    </div>
                </div>


                <div className="flex flex-col pt-10 gap-8 w-[670px] text-white ">

                    <div className="flex gap-8 ">
                        <div>
                            <InputField label="Enter your Name" placeholder="John Doe" />

                            <label className="flex items-center gap-2 text-white text-sm">
                                <input type="checkbox" className="border-2 border-primary-300 rounded-sm pt-3" />
                                Same as Wallet Name .
                            </label>
                        </div>


                        <InputField label="Enter your E-mail" placeholder="Enter your email" />

                    </div>


                    <InputField
                        label="Enter your Bio:"
                        placeholder="Tell us something about yourself!"
                        isTextArea
                    />


                    <InputField
                        label="Choose 5 communities you might be interested in:"
                        placeholder="Select communities"
                        isTagInput
                    />


                    <div className="flex flex-col gap-4 w-80">
                        <label className="text-white text-xl font-medium">
                            Upload your Profile picture here:
                        </label>
                        <div className="flex bg-[#1B0D37] border border-primary-500 items-center h-19 overflow-hidden rounded-md">
                            <div className="bg-[#9268E4] px-5 py-4  items-start justify-start w-25 ">
                                <h1 className="text-white font-semibold text-[16px]">
                                    Choose File
                                </h1>
                            </div>
                            <input
                                type="file"
                                className="bg-[#1B0D37] p-4 text-neutral-60 text-lg flex-1 file:hidden"
                            />
                        </div>
                    </div>




                    <button className="rounded-3xl hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]   bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] text-white text-2xl font-semibold py-3 px-4 w-full">
                        Next
                    </button>
                </div>
            </div>



        </div>
    );
};


const InputField = ({ label, placeholder, isTextArea = false, isTagInput = false }) => {
    return (
        <div className="flex flex-col gap-2.5">
            <label className="text-white text-xl font-medium">{label}</label>
            {isTextArea ? (
                <textarea
                    className="bg-[#1B0D37] rounded-md border border-[#9268E4] p-4 w-full h-24 resize-none"
                    placeholder={placeholder}
                />
            ) : isTagInput ? (
                <div className="bg-[#1B0D37] rounded-md border border-[#9268E4] p-3 flex gap-2 items-center h-14">


                </div>
            ) : (
                <input
                    className="bg-[#1B0D37] rounded-md border border-[#9268E4] p-4 w-full"
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};



export default PersonalDetail