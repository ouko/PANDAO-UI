import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'sonner';


const BondCard = ({ bond }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
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

            {/* User Earnings Section */}
            {bond.user_earning && (
                <div className="bg-[#2A1850] rounded-xl p-4 border border-[#7F42F9]">
                    <h3 className="text-brand5 text-lg font-medium mb-3">Bond Investment Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <span className="text-brand5 text-sm uppercase">Bond Price</span>
                            <span className="text-white text-lg font-medium">{bond.user_earning.bond_price} XRD</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-brand5 text-sm uppercase">Return Value</span>
                            <span className="text-white text-lg font-medium">{bond.user_earning.bond_return_value} XRD</span>
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-brand5 text-sm uppercase`}>Potential Earning</span>
                            <span className={`text-lg font-medium ${bond.user_earning.potential_earning > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {bond.user_earning.potential_earning > 0 ? '+' : ''}{bond.user_earning.potential_earning.toFixed(2)} XRD
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-brand5 text-sm uppercase">Bond Status</span>
                            <span className={`text-lg font-medium ${bond.user_earning.is_bond_successful ? 'text-green-400' : 'text-amber-400'}`}>
                                {bond.user_earning.is_bond_successful ? 'Successful' : 'In Progress'}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-brand5 text-sm uppercase">Investors</span>
                            <span className="text-white text-lg font-medium">{bond.user_earning.people_invested} {bond.user_earning.people_invested === 1 ? 'Person' : 'People'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-brand5 text-sm uppercase">ROI</span>
                            <span className={`text-lg font-medium ${((bond.user_earning.bond_return_value / bond.user_earning.bond_price) - 1) * 100 > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {(((bond.user_earning.bond_return_value / bond.user_earning.bond_price) - 1) * 100).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            )}

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
        user_earning: PropTypes.shape({
            potential_earning: PropTypes.number,
            is_bond_successful: PropTypes.bool,
            bond_return_value: PropTypes.number,
            bond_price: PropTypes.number,
            people_invested: PropTypes.number
        })
    }).isRequired,
};

export default BondCard;
