
const EmploymentDetails = () => {
    return (
        <div className="h-full  w-full relative justify-center items-center gap-8 flex overflow-hidden">
            <div className="flex flex-col gap-8 ">

                <div className="flex flex-col gap-4 items-center">
                    <img src="/logo.png" alt="logo" className="w-60 h-20" />
                    <div className="flex gap-16">
                        <span className="text-white text-xl font-medium">Personal Details</span>
                        <span className="text-white text-xl font-medium ">Employment Details</span>
                        <span className="text-white text-xl font-medium ">Enter OTP</span>
                    </div>
                </div>


                <div className="flex flex-col pt-10 gap-8 w-[670px] text-white">
                    <div className="flex flex-col gap-4 w-full">
                        <label className="text-white text-xl font-medium">Enter Company’s Name:</label>
                        <input
                            type="text"
                            placeholder="Company’s Name"
                            className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 placeholder:text-neutral-60 shadow-sm"
                        />
                    </div>

                    <div className="flex gap-8 w-full">
                        <div className="flex flex-col gap-4 w-1/2">
                            <label className="text-white text-xl font-medium">Enter Starting Date:</label>
                            <input
                                type="date"
                                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            <label className="text-white text-xl font-medium">Enter Ending Date:</label>
                            <input
                                type="date"
                                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 shadow-sm"
                            />
                            <label className="flex items-center gap-2 text-white text-sm">
                                <input type="checkbox" className="border-2 border-primary-300 rounded-sm" />
                                I currently work here.
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-8 w-full">
                        <div className="flex flex-col gap-4 w-1/2">
                            <label className="text-white text-xl font-medium">Enter your Role:</label>
                            <input
                                type="text"
                                placeholder="Your Role"
                                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 placeholder:text-neutral-60 shadow-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            <label className="text-white text-xl font-medium">Upload Company’s Logo:</label>
                            <input
                                type="file"
                                className="bg-[#1B0D37] border border-[#9268E4] rounded-md p-4 w-full text-neutral-60 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-6 h-6 border-2 border-primary-300 rounded" />
                        <span className="text-white text-xl">Add another work Experience.</span>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button className="flex-1 bg-primary-500 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]   bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner">
                            Skip
                        </button>
                        <button className="flex-1 rounded-2xl p-3 text-white font-semibold  hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]   bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner">
                            Next
                        </button>
                    </div>
                </div>





            </div>



        </div>
    );
}



export default EmploymentDetails