import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PropTypes from "prop-types";


const WithdrawCard = ({ withDrawRequest, participant,onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { accounts } = useAccount()
  const sendTransaction = useSendTransaction()

console.log(participant,"faisal")

  const handleWithDrawSign = async (id) => {
    console.log("id", id)
    const data = {
      community_id: params.id,
      user_address: accounts[0].address,
      id,
    }
    console.log("id", data)
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/sign-withdraw-request`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const responseData =
        typeof response.data === 'string'
          ? response.data.trim()
          : JSON.stringify(response.data)

      console.log('Response:', responseData)

      const { receipt } = await sendTransaction(responseData)

      const txId = receipt?.transaction?.intent_hash

      if (txId) {
        try {
          const submitResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          console.log('Submit Transaction Response:', submitResponse.data)
          toast.success('Sign Withdraw Request Successfully!')
          onSuccess()

        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error :', error)


      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  console.log(withDrawRequest)
  return (
    <div className="bg-[rgba(169,126,255,0.08)]  rounded-lg border border-[#5228A4]  overflow-hidden backdrop-blur-[6.7px] z-20">

      <div className="bg-[#39246b] px-3   flex items-center w-full  h-[53px] ">
        <div className="text-white text-xl md:text-2xl font-medium ">
          Total Withdraw Request:
        </div>
      </div>


      <div className="flex flex-col  gap-6  p-6">
        {withDrawRequest.length === 0 ? (
          <div className="text-center text-white text-lg font-semibold">
            No active withdrawal requests.
          </div>
        ) : (
          withDrawRequest.map((request) => (
            <div
              key={request.id}
              className="bg-gradient-to-br from-[rgba(31,18,55,0.6)] via-transparent to-brand1 border border-brand3 backdrop-blur-xl shadow-lg p-6 rounded-2xl transition-all   hover:shadow-2xl"
            >
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
              {request.signed_users.length > 0 && (
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
                {participant
                  .filter(p => p.is_executive_member === true)
                  .some(exec =>
                    !request.signed_users.some(user => user.public_address === exec.public_address)
                  ) && (
                  <Button
                    variant="brand"
                    disabled={loading}
                    onClick={() => handleWithDrawSign(request.id)}
                  >
                    Sign Withdraw Request
                  </Button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

WithdrawCard.propTypes = {
  withDrawRequest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      amount_to_withdraw: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      request_date: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      user_image: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      user_address: PropTypes.string.isRequired,
      signed_users: PropTypes.arrayOf(
        PropTypes.shape({
          public_address: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          image_url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,

  participant: PropTypes.arrayOf(
    PropTypes.shape({
      is_executive_member: PropTypes.bool.isRequired,
      public_address: PropTypes.string.isRequired,
    })
  ).isRequired,

  onSuccess: PropTypes.func.isRequired,
};

export default WithdrawCard;
