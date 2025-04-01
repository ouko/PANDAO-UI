import React, { useState } from 'react';
import { toast } from 'sonner'

const BondCard = ({ bond }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-[#1B0D37] rounded-2xl border-2 border-[#5228A4] hover:scale-105 transition-transform duration-300 ease-in-out h-[428px] relative overflow-hidden backdrop-blur-md">
            <div className="bg-black/50 border-b border-[#5228a4] w-full h-[149px] absolute top-0"></div>
            <div className="flex gap-8 items-start absolute w-[1000px] top-6 translate-x-20">
                {bond.asset_url && (
                    <img
                        className="rounded-lg w-[179px] h-[105px] object-cover"
                        src={bond.asset_url}
                        alt={bond.asset_name || 'Asset'}
                    />
                )}
                <div className="flex flex-col justify-between">
                    <div className="text-[#5228A4] text-2xl font-medium">ASSET NAME:</div>
                    <div className="text-white text-2xl font-medium">
                        {bond.asset_name || 'N/A'}
                        <br />
                        <span className="font-normal text-sm">
                            {showFullDescription ? bond.description || 'No description provided' : (bond.description || 'No description provided').slice(0, 100)}
                            {bond.description && bond.description.length > 100 && (
                                <button
                                    onClick={toggleDescription}
                                    className="text-[#5228A4] hover:underline ml-2"
                                >
                                    {showFullDescription ? 'Show Less' : 'More'}
                                </button>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-start transform px-8 py-4 gap-40 translate-x-10 translate-y-40">
                <div className="flex flex-col space-y-4">
                    <p className="text-[#5228A4] uppercase">Contract Identity: <span className="text-white">{bond.contract_identity || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Currency: <span className="text-white">{bond.currency || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Price: <span className="text-white">{bond.price ? `${bond.price} XRD` : 'Not available'}</span></p>
                </div>
                <div className="flex flex-col space-y-4">
                    <p className="text-[#5228A4] uppercase">Creator By: <span className="text-white">{bond.creator_name || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Interest Rate: <span className="text-white">{bond.interest_rate || 'N/A'}%</span></p>
                    <p className="text-[#5228A4] uppercase">Notional Principle: <span className="text-white">{bond.notional_principle || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Contract Role: <span className="text-white">{bond.contract_role || 'N/A'}</span></p>
                </div>
                <div className="flex flex-col space-y-4">
                    <p className="text-[#5228A4] uppercase">Number of Bonds: <span className="text-white">{bond.number_of_bonds || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Discount: <span className="text-white">{bond.discount || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Bond Position: <span className="text-white">{bond.bond_position || 'N/A'}</span></p>
                    <p className="text-[#5228A4] uppercase">Created on Blockchain: <span className="text-white">{bond.created_on_blockchain ? 'Yes' : 'No'}</span></p>
                </div>
            </div>
            <div className="bg-black/30 p-4 gap-10 flex w-full h-[84px] py-4 absolute bottom-0 px-16">
                <div className="flex-col gap-4">
                    <p className="text-[#5228A4] uppercase">Contract Type: <span className="text-white">{bond.contract_type || 'N/A'}</span></p>
                    <p className="truncate text-[#5228A4] uppercase w-[600px]">
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
                <div className="flex-col gap-4">
                    <p className="text-[#b7ec9a] uppercase">Initial Exchange Date: <span className="text-white">{new Date(bond.initial_exchange_date).toLocaleDateString()}</span></p>
                    <p className="text-[#f97679] uppercase">Maturity Date: <span className="text-white">{new Date(bond.maturity_date).toLocaleDateString()}</span></p>
                </div>
            </div>
        </div>
    );
};

export default BondCard;
