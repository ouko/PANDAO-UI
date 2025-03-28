import React from 'react'

function TotalFund({ data, setWithDrawModal }) {
    return (
        <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] pt-3 pr-6 pb-3 pl-6 self-stretch shrink-0 h-[155px] relative overflow-hidden backdrop-blur-[6.7px]">

            <div className="bg-[#39246b] px-4 flex items-center w-[761px] h-[53px] absolute left-0 top-0">
                <div className="text-white text-2xl font-medium ">
                    Total Funds:
                </div>
            </div>

            <div className="flex flex-col flex-wrap gap-[11px] absolute left-[39px] top-20">
                <div className="flex gap-[11px]">
                    <div className="text-[#5228A4] text-xl uppercase"> Funds In USD:</div>
                    <div className="text-white text-xl">{Math.round(data.funds_in_usd * 10000) / 10000} $</div>
                </div>

                <div className="flex gap-[11px]">
                    <div className="text-[#5228A4] text-xl uppercase">Total Funds:</div>
                    <div className="text-white text-xl">{data.funds} XRD</div>

                </div>



                
            </div>
            <button
                    onClick={() => setWithDrawModal(true)}
                    className="rounded-[26px] px-4 py-2 flex items-center justify-center absolute left-[451px] top-[89px] overflow-hidden bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] cursor-pointer"
                >
                    <span className="text-black text-sm leading-5 font-medium ">
                        Withdraw Request
                    </span>
                </button>



        </div>


    )
}

export default TotalFund