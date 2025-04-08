import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSendTransaction } from "@/hooks/useSendTransaction";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const TotalFund = ({ data }) => {
    const [withDrawModal, setWithDrawModal] = useState(false);
    const [withdrawAmount, setwithdrawAmout] = useState(0)
    const [loadingMint, setLoadingMint] = useState(false)
    const sendTransaction = useSendTransaction()

    const { accounts } = useAccount()
    const params = useParams()

    const handleWithdrawRequest = async () => {
        if (withdrawAmount.trim() === "") {

            toast.error("Fill Fields")
            return
        }

        const data = {
            user_address: accounts[0].address,
            community_id: params.id,
            amount: withdrawAmount

        }

        setLoadingMint(true)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL
                }/manifest/generate-token-withdraw-request`,
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
                    toast.success('Successfully!')

                } catch (submitError) {
                    console.error('Error submitting transaction:', submitError)
                    toast.error('Failed .')
                }
            } else {
                console.error('Transaction ID not found in receipt:', receipt)
                toast.error('Transaction failed. Please try again.')

            }
        } catch (error) {
            console.error('Error selling token:', error.response.data.detail)
            toast.error('Something went wrong.')
        } finally {
            setLoadingMint(false)
        }
    }
    return (

        <>
            <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] min-h-[155px] relative overflow-hidden backdrop-blur-[6.7px] flex flex-col justify-between">
                {/* Header */}
                <div className="bg-[#39246b] px-4 py-2 flex items-center rounded-md w-full">
                    <div className="text-white text-2xl font-medium">
                        Total Funds:
                    </div>
                </div>
<div className="flex items-center justify-between">
{/* Fund Details */}
<div className="flex flex-col gap-2 mt-2 p-5">
                    <div className="flex gap-2">
                        <div className="text-purple-300 text-xl uppercase">Funds In USD:</div>
                        <div className="text-white text-xl">{Math.round(data.funds_in_usd * 10000) / 10000} $</div>
                    </div>

                    <div className="flex gap-2">
                        <div className="text-purple-300 text-xl uppercase">Total Funds:</div>
                        <div className="text-white text-xl">{data.funds} XRD</div>
                    </div>
                </div>

                {/* Withdraw Button */}
                <div className="flex items-center px-5  ">
                    <button
                        onClick={() => setWithDrawModal(true)}
                        className="rounded-[26px] px-4 py-2 bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] text-black text-sm leading-5 font-medium"
                    >
                        Withdraw Request
                    </button>
                </div>
</div>
                
            </div>

            <Dialog open={withDrawModal} onOpenChange={setWithDrawModal}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="w-[600px] pt-10 bg-[rgba(169,126,255,0.34)] text-white  border-[1px] border-brand3 rounded-lg shadow-lg max-w-5xl overflow-y-auto max-h-[80vh]">
                    <DialogHeader className="w-full overflow-auto">
                        <DialogTitle className="text-2xl font-semibold text-gray-300 w-full text-center">
                            Fund Withdraw Request
                        </DialogTitle>
                        <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 w-full overflow-y-auto">

                            <div className="w-full">
                                <Input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setwithdrawAmout(e.target.value)}
                                    min={0}
                                />
                            </div>

                            <Button
                                className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium"
                                onClick={handleWithdrawRequest} disabled={loadingMint}>
                                Withdraw Request
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        </>



    )
}

export default TotalFund