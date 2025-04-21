import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSendTransaction } from '@/hooks/useSendTransaction';
import axios from 'axios';
import { useAccount } from '@/AccountContext';

const BondCard = ({ bond }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [loading2, setLoading2] = useState(false)
    const { accounts } = useAccount()

    const sendTransaction = useSendTransaction()
    const handleClaim = async (bond) => {
        const data = {
            bond_id: bond.id,
            community_id: bond.community_id,
        }
        setLoading2(true)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/manifest/zcb/claim`,
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

                    toast.success('Withdraw Successfully!')
                } catch (submitError) {
                    console.error('Error submitting transaction:', submitError)
                    toast.error('Failed to submit transaction.')
                }
            } else {
                console.error('Transaction ID not found in receipt:', receipt)
                toast.error('Transaction failed. Please try again.')
            }
        } catch (error) {
            console.error('Error Withdraw token:', error.response.data.detail)

            toast.error('Something went wrong while Withdrawing.')
        } finally {
            // Ensure loading is stopped regardless of success or failure
            setLoading2(false)
        }
    }
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-[#1B0D37] rounded-2xl border-2 border-[#5228A4] w-full  mx-auto p-6 overflow-hidden backdrop-blur-md flex flex-col gap-6">
            {/* Top Section */}
            <div className="flex gap-6">
                {bond.asset_url && (
                    <img
                        className="rounded-lg w-44 h-28 object-cover"
                        src={bond.asset_url}
                        alt={bond.asset_name || 'Asset'}
                    />
                )}
                <div className="flex flex-col gap-2 w-full">
                    <div className='flex items-center justify-between bg- '>
                        <h2 className="text-brand5 text-2xl font-medium">Asset Name:</h2>
                        {bond.maturity_date && (
                            bond.claimed ? (

                                <Button
                                    disabled
                                    variant="brand"
                                >
                                    Already Claimed
                                </Button>
                            ) : (

                                <Button
                                    disabled={loading2}
                                    onClick={() => handleClaim(bond)}
                                    className="   "
                                    variant="brand"
                                >
                                    Claim
                                </Button>

                            )

                        )}
                    </div>

                    <p className="text-white text-xl font-medium">{bond.asset_name || 'N/A'}</p>
                    <span className="font-normal text-sm text-white max-w-3xl">
                        {showFullDescription
                            ? bond.description || 'No description provided'
                            : (bond.description || 'No description provided').slice(0, 100)}
                        {bond.description && bond.description.length > 100 && (
                            <button
                                onClick={toggleDescription}
                                className="text-brand5 hover:underline ml-2"
                            >
                                {showFullDescription ? 'Show Less' : 'More'}
                            </button>
                        )}
                    </span>
                </div>
            </div>

            {/* Middle Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                    <p className="text-brand5 uppercase">Contract Identity: <span className="text-white">{bond.contract_identity || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Currency: <span className="text-white">{bond.currency || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Price: <span className="text-white">{bond.price ? `${bond.price} XRD` : 'Not available'}</span></p>
                    <p className="text-brand5 uppercase">Number of Bonds: <span className="text-white">{bond.number_of_bonds || 'N/A'}</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-brand5 uppercase">Creator By: <span className="text-white">{bond.creator_name || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Interest Rate: <span className="text-white">{bond.interest_rate || 'N/A'}%</span></p>
                    <p className="text-brand5 uppercase">Notional Principle: <span className="text-white">{bond.notional_principle || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Contract Role: <span className="text-white">{bond.contract_role || 'N/A'}</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-brand5 uppercase">Expected Return: <span className="text-white">{bond.amount_own ? `${bond.amount_own} XRD` : 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Discount: <span className="text-white">{bond.discount || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Bond Position: <span className="text-white">{bond.bond_position || 'N/A'}</span></p>
                    <p className="text-brand5 uppercase">Created on Blockchain: <span className="text-white">{bond.created_on_blockchain ? 'Yes' : 'No'}</span></p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-black/30 p-4 rounded-xl">
                <div className="space-y-2 max-w-xl">
                    <p className="text-brand5 uppercase">Contract Type: <span className="text-white">{bond.contract_type || 'N/A'}</span></p>
                    <p className="truncate text-brand5 uppercase">
                        <strong>Creator Address:</strong>{' '}
                        <span
                            className="cursor-pointer text-white hover:underline truncate"
                            onClick={() => {
                                navigator.clipboard.writeText(bond.creator);
                                toast.success('Copied address');
                            }}
                        >
                            {bond.creator || 'N/A'}
                        </span>
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-[#b7ec9a] uppercase">Initial Exchange Date: <span className="text-white">{bond.initial_exchange_date ? new Date(bond.initial_exchange_date).toLocaleDateString() : 'N/A'}</span></p>
                    <p className="text-[#f97679] uppercase">Maturity Date: <span className="text-white">{bond.maturity_date ? new Date(bond.maturity_date).toLocaleDateString() : 'N/A'}</span></p>
                </div>
            </div>
        </div>
    );
};
BondCard.propTypes = {
    bond: PropTypes.shape({
        asset_url: PropTypes.string,
        asset_name: PropTypes.string,
        description: PropTypes.string,
        contract_identity: PropTypes.string,
        currency: PropTypes.string,
        price: PropTypes.number,
        number_of_bonds: PropTypes.number,
        creator_name: PropTypes.string,
        interest_rate: PropTypes.number,
        notional_principle: PropTypes.string,
        contract_role: PropTypes.string,
        amount_own: PropTypes.number,
        discount: PropTypes.string,
        bond_position: PropTypes.string,
        created_on_blockchain: PropTypes.bool,
        contract_type: PropTypes.string,
        creator: PropTypes.string,
        initial_exchange_date: PropTypes.string,
        maturity_date: PropTypes.string,
        claimed: PropTypes.bool,
        community_id: PropTypes.string,
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default BondCard;
