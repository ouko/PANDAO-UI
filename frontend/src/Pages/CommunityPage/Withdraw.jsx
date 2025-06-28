import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { SkeletonCard } from "../GlobalComponents/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchWithdrawRequests = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/community/token-withdraw/request?c_id=${id}`
  );
  return res.data;
};

const Withdraw = () => {
  const [signingId, setSigningId] = useState(null);
  const params = useParams();
  const { accounts } = useAccount();
  const sendTransaction = useSendTransaction();
  const queryClient = useQueryClient();

  const { data: withdrawRequests = [], isLoading } = useQuery({
    queryKey: ["withdrawRequests", params.id],
    queryFn: () => fetchWithdrawRequests(params.id),
    staleTime: 30000,
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const data = {
        community_id: params.id,
        user_address: accounts?.[0]?.address,
        id,
      };

      setSigningId(id);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/sign-withdraw-request`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData =
        typeof response.data === "string"
          ? response.data.trim()
          : JSON.stringify(response.data);

      const { receipt } = await sendTransaction(responseData);
      const txId = receipt?.transaction?.intent_hash;

      if (txId) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
          {
            tx_id: txId,
            user_address: accounts?.[0]?.address,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Sign Withdraw Request Successfully!");
        queryClient.invalidateQueries(["withdrawRequests", params.id]); // refetch
      } else {
        toast.error("Transaction failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
    onSettled: () => {
      setSigningId(null);
    },
  });

  const totalWithdrawAmount = withdrawRequests.reduce(
    (sum, r) => sum + parseFloat(r.amount_to_withdraw || 0),
    0
  );

  return (
    <div className="px-[12px] pt-[3px]">
      <div className="rounded-2xl border border-[#5228A4] p-4 sm:p-7 mt-16 flex flex-col gap-4 items-center sm:items-start justify-center relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center w-full">
          <div className="bg-[#321e58] rounded-full p-4 sm:p-5 z-50 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
            <img className="w-12 h-12 sm:w-14 sm:h-14" src="/8.svg" alt="User Icon" />
          </div>
          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left w-full">
            <div className="text-brand6 font-semibold uppercase text-lg sm:text-xl">
              Total Withdraw:
            </div>
            <div className="text-white text-[32px] sm:text-[56px] font-medium">
              ${totalWithdrawAmount.toFixed(2)} USD
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] mt-10 overflow-hidden backdrop-blur-[6.7px]">
        <div className="bg-[#39246b] px-4 py-3 flex items-center w-full">
          <div className="text-white text-xl sm:text-2xl font-medium">
            Total Withdraw Request:
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4 sm:p-6">
          {isLoading ? (
            <div className="flex flex-col h-[200px] items-center justify-center text-center mt-5">
              <SkeletonCard />
            </div>
          ) : withdrawRequests.length === 0 ? (
            <div className="text-center text-white text-lg font-semibold">
              No active withdrawal requests.
            </div>
          ) : (
            withdrawRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gradient-to-br from-[rgba(31,18,55,0.6)] via-transparent to-brand1 
            border border-brand3 backdrop-blur-xl shadow-lg p-4 sm:p-6 rounded-2xl hover:shadow-2xl"
              >
                <div className="flex flex-col gap-3 text-white">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-base sm:text-lg font-semibold">
                    <span className="text-[#c9a8ff]">Withdraw Amount:</span>
                    <span>${request.amount_to_withdraw}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm">
                    <span className="text-[#c9a8ff]">Date:</span>
                    <span>{new Date(request.request_date).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-sm">
                    <span className="text-[#c9a8ff]">Status:</span>
                    <span className={request.status ? "text-green-400" : "text-red-400"}>
                      {request.status ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4">
                  <img
                    src={request.user_image}
                    alt="User"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm object-cover border-2 border-white"
                  />
                  <div className="text-white">
                    <div className="text-base sm:text-lg font-semibold">{request.user_name}</div>
                    <div className="text-xs opacity-75">
                      {request.user_address?.slice(0, 6)}...
                      {request.user_address?.slice(-6)}
                    </div>
                  </div>
                </div>
                {request.signed_users?.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-white text-sm mb-2 font-medium">Signed by:</h4>
                    <div className="flex gap-3 flex-wrap">
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
                    onClick={() => mutation.mutate(request.id)}
                  >
                    {signingId === request.id ? "Signing..." : "Sign Withdraw Request"}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
