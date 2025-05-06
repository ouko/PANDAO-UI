import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const BondCard = ({ bond }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    
    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
    // Calculate ROI helper
    const calculateROI = (returnValue, price) => {
        if (!returnValue || !price || price === 0) return 0;
        return (((returnValue / price) - 1) * 100).toFixed(2);
    };
    console.log('%c Bond Object: ', 'font-weight: bold; color: #00b0ff', bond);
    return (
        <div className="bg-gradient-to-br from-[#1B0D37] to-[#2A1850] rounded-2xl border-2 border-[#5228A4] w-full mx-auto p-6 overflow-hidden backdrop-blur-md flex flex-col gap-6 shadow-lg">
            {/* Header Section with Asset Info */}
            <div className="flex gap-6">
                {bond.asset_url && (
                    <div className="relative">
                        <img
                            className="rounded-lg w-44 h-28 object-cover border border-[#7F42F9]/30"
                            src={bond.asset_url}
                            alt={bond.asset_name || 'Asset'}
                        />
                       
                    </div>
                )}
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-brand5 text-2xl font-medium">
                                {bond.asset_name || 'Unnamed Asset'}
                            </h2>
                            {bond.created_on_blockchain && (
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                                    On-Chain
                                </span>
                            )}
                             {bond.created_on_blockchain && (
                                <span className="bg-[#7F42F9] text-white text-xs px-2 py-1 rounded-full">
                                     {bond.bond_position || 'N/A'}
                                </span>
                            )}
                        </div>
                        <div className="text-white text-lg font-semibold">
                            {bond.price ? `${bond.price} ${bond.currency?.toUpperCase() || 'XRD'}` : 'Price N/A'}
                        </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm font-medium">
                        Created by <span className="text-white">{bond.creator_name || 'Unknown'}</span>
                    </p>
                    <div className="text-gray-300 text-sm font-medium">
                        Resources Address: <Link className="text-white" to={`https://stokenet-dashboard.radixdlt.com/resource/${bond.asset_address}`} target="_blank">{bond.asset_address}</Link>
                    </div>
                    
                    <div className="mt-1">
                        <span className="font-normal text-sm text-white max-w-3xl">
                            {showFullDescription
                                ? bond.description || 'No description provided'
                                : (bond.description || 'No description provided').slice(0, 100)}
                            {bond.description && bond.description.length > 100 && (
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-brand5 hover:underline ml-2"
                                >
                                    {showFullDescription ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative py-8">
  {/* Timeline lines between dots */}
  {/* First segment: between Created and Initial Exchange */}
  <div className="absolute top-1/3 left-[16.66%] w-[33.33%] h-1 bg-gray-700 rounded-full -translate-y-1/2 z-0"></div>
  {/* Second segment: between Initial Exchange and Maturity Date */}
  <div className="absolute top-1/3 left-[49.99%] w-[33.33%] h-1 bg-gray-700 rounded-full -translate-y-1/2 z-0"></div>
  {/* Timeline steps */}
  <div className="flex justify-between items-center relative z-10">
    {/* Created */}
    <div className="flex flex-col items-center w-1/3">
      <div className="bg-[#b7ec9a] h-5 w-5 rounded-full border-4 border-[#1B0D37] shadow-lg"></div>
      <span className="text-[#b7ec9a] text-xs mt-2 font-semibold">Created</span>
      <span className="text-white text-xs mt-1">{formatDate(bond.created_at)}</span>
    </div>
    {/* Initial Exchange */}
    <div className="flex flex-col items-center w-1/3">
      <div className="bg-[#b7ec9a] h-5 w-5 rounded-full border-4 border-[#1B0D37] shadow-lg"></div>
      <span className="text-[#b7ec9a] text-xs mt-2 font-semibold">Initial Exchange</span>
      <span className="text-white text-xs mt-1">{formatDate(bond.initial_exchange_date)}</span>
    </div>
    {/* Maturity Date */}
    <div className="flex flex-col items-center w-1/3">
      <div className="bg-[#f97679] h-5 w-5 rounded-full border-4 border-[#1B0D37] shadow-lg"></div>
      <span className="text-[#f97679] text-xs mt-2 font-semibold">Maturity Date</span>
      <span className="text-white text-xs mt-1">{formatDate(bond.maturity_date)}</span>
    </div>
  </div>
</div>

            {/* Bond Key Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-[#2A1850]/70 p-3 rounded-lg border border-[#7F42F9]/30">
                    <span className="text-brand5 text-xs uppercase block">Contract Type</span>
                    <span className="text-white font-medium">{bond.contract_type || 'N/A'}</span>
                </div>
                <div className="bg-[#2A1850]/70 p-3 rounded-lg border border-[#7F42F9]/30">
                    <span className="text-brand5 text-xs uppercase block">Interest Rate</span>
                    <span className="text-white font-medium">{bond.interest_rate ? `${bond.interest_rate}%` : 'N/A'}</span>
                </div>
                <div className="bg-[#2A1850]/70 p-3 rounded-lg border border-[#7F42F9]/30">
                    <span className="text-brand5 text-xs uppercase block">Notional Principle</span>
                    <span className="text-white font-medium">{bond.notional_principle || 'N/A'}</span>
                </div>
                <div className="bg-[#2A1850]/70 p-3 rounded-lg border border-[#7F42F9]/30">
                    <span className="text-brand5 text-xs uppercase block">Number of Bonds</span>
                    <span className="text-white font-medium">{bond.number_of_bonds || 'N/A'}</span>
                </div>
            </div>

            {/* Proposal Section - if exists */}
            {Array.isArray(bond.proposals) && bond.proposals.length > 0 && (
                <div className="bg-[#2A1850] rounded-xl p-4 border border-[#7F42F9]">
                    <h3 className="text-brand7 text-xl font-medium mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Proposal Details
                    </h3>
                    
                    {bond.proposals.map((proposal, index) => (
                        <div key={proposal.id || index} className="bg-[#1B0D37] rounded-lg p-4 mb-2 last:mb-0">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-white text-lg font-medium">{proposal.proposal}</h4>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${proposal.status === 1 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {proposal.status === 1 ? 'Approved' : 'Pending'}
                                </span>
                            </div>
                            
                            {proposal.description && (
                                <p className="text-gray-300 text-sm mb-4">{proposal.description}</p>
                            )}
                            
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">For: {proposal.voted_for ?? 0}</span>
                                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">Against: {proposal.voted_against ?? 0}</span>
                                </div>
                                <div className="text-gray-400 text-xs">
                                    Created by {proposal.creator_name || 'Unknown'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Expected Earnings Section */}
            {Array.isArray(bond.earnings) && bond.earnings.length > 0 && (
                <div className="bg-[#2A1850] rounded-xl p-4 border border-[#7F42F9]">
                    <h3 className="text-brand7 text-xl font-medium mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Expected Earnings
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bond.earnings.map((earning, index) => (
                            <div key={earning.user_address || index} className="bg-[#1B0D37] rounded-lg p-4 border border-[#7F42F9]/30">
                                <div className="flex items-center gap-3 mb-3">
                                    {earning.user_profile_picture && (
                                        <img 
                                            src={earning.user_profile_picture} 
                                            alt={earning.user_name} 
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <h4 className="text-white font-medium">{earning.user_name}</h4>
                                        <div className={`text-xs ${earning.is_bond_successful ? 'text-green-400' : 'text-amber-400'}`}>
                                            {earning.is_bond_successful ? 'Successful' : 'In Progress'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-brand5 text-xs block">Bond Price</span>
                                        <span className="text-white">{earning.bond_price} XRD</span>
                                    </div>
                                    <div>
                                        <span className="text-brand5 text-xs block">Return Value</span>
                                        <span className="text-white">{earning.bond_return_value} XRD</span>
                                    </div>
                                    <div>
                                        <span className="text-brand5 text-xs block">Potential Earning</span>
                                        <span className="text-green-400">{earning.potential_earning.toFixed(4)} XRD</span>
                                    </div>
                                    <div>
                                        <span className="text-brand5 text-xs block">ROI</span>
                                        <span className="text-green-400">
                                            {calculateROI(earning.bond_return_value, earning.bond_price)}%
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-brand5 text-xs block">People Invested</span>
                                        <span className="text-white">{earning.people_invested} {earning.people_invested === 1 ? 'Person' : 'People'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Additional Details & Footer */}
            <div className="bg-black/30 p-4 rounded-xl mt-2">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
    <div className="flex items-center gap-3">
      {bond.creator_image ? (
        <img
          src={bond.creator_image}
          alt={bond.creator_name || "Creator"}
          className="w-8 h-8 rounded-full object-cover border border-brand5"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-brand5 flex items-center justify-center text-white font-bold">
          {bond.creator_name ? bond.creator_name.charAt(0).toUpperCase() : "?"}
        </div>
      )}
      <div>
        <p className="text-brand5 text-xs uppercase">Creator Name:</p>
        <p className="text-white text-sm">{bond.creator_name || 'N/A'}</p>
      </div>
    </div>
    <div>
      <p className="text-brand5 text-xs uppercase">Creator Address:</p>
      <p
        className="text-white text-sm truncate cursor-pointer hover:underline"
        onClick={() => {
          navigator.clipboard.writeText(bond.creator);
          toast.success('Address copied to clipboard');
        }}
        title={bond.creator}
      >
        {bond.creator || 'N/A'}
      </p>
    </div>
  </div>
</div>
        </div>
    );
};

export default BondCard;