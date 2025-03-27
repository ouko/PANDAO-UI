import React from 'react';

function WithdrawCard({ withDrawRequest, handleWithDrawSign, loading }) {
    return (
        <div className="bg-[rgba(169,126,255,0.15)] rounded-lg border border-[#5228A4] p-6 overflow-hidden backdrop-blur-[6.7px]">
            {/* Header */}
            <div className="bg-[#39246b] px-4 flex items-center w-[661px] h-[53px] absolute left-0 top-0">
        <div className="text-white text-2xl font-medium font-[ClashDisplayVariable-Medium, sans-serif]">
        Total Withdraw Request:
        </div>
      </div>
           

            {/* Withdraw Requests Container */}
            <div className="flex flex-col py-8 gap-6 mt-6">
                {withDrawRequest.map((request) => (
                    <div 
                        key={request.id} 
                        className="bg-gradient-to-br from-[rgba(31,18,55,0.6)] via-transparent to-brand1 border border-brand3 backdrop-blur-xl shadow-lg p-6 rounded-2xl transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Withdraw Details */}
                        <div className="flex flex-col gap-3 text-white">
                            <div className="flex gap-2 text-lg font-semibold">
                                <span className="text-[#c9a8ff]">Total Withdraw Request:</span> 
                                <span>${request.amount_to_withdraw}</span>
                            </div>

                            <div className="flex gap-2 text-sm">
                                <span className="text-[#c9a8ff]">Date:</span>
                                <span>{new Date(request.request_date).toLocaleString()}</span>
                            </div>

                            <div className="flex gap-2 text-sm">
                                <span className="text-[#c9a8ff]">Status:</span>
                                <span className={request.status ? "text-green-400" : "text-red-400"}>
                                    {request.status ? "Completed" : "Pending"}
                                </span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-4 mt-4">
                            <img
                                src={request.user_image}
                                alt="User"
                                className="w-14 h-14 rounded-sm object-cover border-2 border-white"
                            />
                            <div className="text-white">
                                <div className="text-lg font-semibold">{request.user_name}</div>
                                <div className="text-xs opacity-75">
                                    {request.user_address.slice(0, 6)}...{request.user_address.slice(-6)}
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                disabled={loading}
                                onClick={() => handleWithDrawSign(request.id)}
                                className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-black font-semibold rounded-full "
                            >
                                Sign Withdraw Request
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WithdrawCard;
