// import { useAccount } from "@/AccountContext";
// import { Button } from "@/components/ui/button";
// import { useSendTransaction } from "@/hooks/useSendTransaction";
// import axios from "axios";
// import { useState } from "react";
// import { useQuery, useQueryClient } from "react-query";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";

const  Withdraw =()=> {
  // const [signingId, setSigningId] = useState(null);
  // const params = useParams();
  // const queryClient = useQueryClient();
  // const { accounts } = useAccount();
  // const sendTransaction = useSendTransaction();

  // const {
  //   data: withDrawRequest = [],
  //   isLoading: isLoadingWithdraw,
  // } = useQuery({
  //   queryKey: ["withdrawRequests", params.id],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/community/token-withdraw/request?c_id=${params.id}`
  //     );
  //     return res.data;
  //   },
  // });

  // const handleWithDrawSign = async (id) => {
  //   const data = {
  //     community_id: params.id,
  //     user_address: accounts?.[0]?.address,
  //     id,
  //   };

  //   setSigningId(id);

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/manifest/sign-withdraw-request`,
  //       data,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const responseData =
  //       typeof response.data === "string"
  //         ? response.data.trim()
  //         : JSON.stringify(response.data);

  //     const { receipt } = await sendTransaction(responseData);
  //     const txId = receipt?.transaction?.intent_hash;

  //     if (txId) {
  //       try {
  //         const submitResponse = await axios.post(
  //           `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
  //           {
  //             tx_id: txId,
  //             user_address: accounts?.[0]?.address,
  //           },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         toast.success("Sign Withdraw Request Successfully!");
  //         await queryClient.invalidateQueries(["withdrawRequests", params.id]);
  //       } catch (submitError) {
  //         console.error("Error submitting transaction:", submitError);
  //         toast.error("Failed to submit transaction.");
  //       }
  //     } else {
  //       toast.error("Transaction failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error?.response?.data?.message || "Something went wrong.");
  //   } finally {
  //     setSigningId(null);
  //   }
  // };

  // const totalWithdrawAmount = withDrawRequest.reduce(
  //   (sum, r) => sum + parseFloat(r.amount_to_withdraw || 0),
  //   0
  // );

  return (
    <div className="h-screen">
      {/* <div className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden">
        <div className="flex flex-row gap-10 items-center w-full">
          <div className="bg-[#321e58] rounded-full p-5 z-50 flex items-center justify-center w-24 h-24">
            <img className="w-14 h-14" src="/8.svg" alt="User Icon" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[#5228A4] font-semibold uppercase text-xl">
              Total Issued Bonds:
            </div>
            <div className="text-white text-[56px] font-medium text-center">
              ${totalWithdrawAmount} Total Withdraw Amount
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] mt-10 overflow-hidden backdrop-blur-[6.7px]">
        <div className="bg-[#39246b] px-3 flex items-center w-full h-[53px]">
          <div className="text-white text-2xl font-medium">
            Total Withdraw Request:
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {isLoading ? (
            <div className="text-center text-white text-lg font-semibold">
              Loading withdrawal requests...
            </div>
          ) : withdrawRequests.length === 0 ? (
            <div className="text-center text-white text-lg font-semibold">
              No active withdrawal requests.
            </div>
          ) : (
            withdrawRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gradient-to-br from-[rgba(31,18,55,0.6)] via-transparent to-brand1 border border-brand3 backdrop-blur-xl shadow-lg p-6 rounded-2xl hover:shadow-2xl"
              >
                <div className="flex flex-col gap-3 text-white">
                  <div className="flex gap-2 text-lg font-semibold">
                    <span className="text-[#c9a8ff]">Withdraw Amount:</span>
                    <span>${request.amount_to_withdraw}</span>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <span className="text-[#c9a8ff]">Date:</span>
                    <span>{new Date(request.request_date).toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <span className="text-[#c9a8ff]">Status:</span>
                    <span
                      className={request.status ? "text-green-400" : "text-red-400"}
                    >
                      {request.status ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={request.user_image}
                    alt="User"
                    className="w-14 h-14 rounded-sm object-cover border-2 border-white"
                  />
                  <div className="text-white">
                    <div className="text-lg font-semibold">{request.user_name}</div>
                    <div className="text-xs opacity-75">
                      {request.user_address?.slice(0, 6)}...
                      {request.user_address?.slice(-6)}
                    </div>
                  </div>
                </div>

                {request.signed_users?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-white text-sm mb-2 font-medium">Signed by:</h4>
                    <div className="flex gap-4 flex-wrap">
                      {request.signed_users.map((user) => (
                        <div
                          key={user.public_address}
                          className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
                        >
                          <img
                            src={user.image_url}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                          <span className="text-white text-sm">{user.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-4">
                  <Button
                    variant="brand"
                    disabled={signingId === request.id}
                    onClick={() => handleWithDrawSign(request.id)}
                  >
                    {signingId === request.id ? "Signing..." : "Sign Withdraw Request"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Withdraw;
