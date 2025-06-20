import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';

function AirDrop() {
  const { setView } = useViewStore();
  const { formFields, setFormFields } = useTokenWeightStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      airDrop: {
        ...formFields.airDrop,
        [name]: value
      }
    });
  };

 const allFieldsFilled = () => {
  const ad = formFields.airDrop;
  
  // Convert percentage values to numbers for validation
  const publicSale = parseFloat(ad.publicSale) || 0;
  const foundingTeam = parseFloat(ad.foundingTeam) || 0;
  const treasury = parseFloat(ad.treasury) || 0;
  const communityIncentives = parseFloat(ad.communityIncentives) || 0;
  
  // Calculate total percentage
  const totalPercentage = publicSale + foundingTeam + treasury + communityIncentives;
  
  // Check if all fields are filled and valid
  return (
    publicSale > 0 &&
    foundingTeam > 0 &&
    treasury > 0 &&
    communityIncentives > 0 &&
    totalPercentage === 100 && // Ensure percentages sum to exactly 100%
    ad.airDropStartTime && // Check that datetime fields exist
    ad.airDropEndTime &&
    parseFloat(ad.amount_per_air_drop) > 0 // Ensure amount is positive
  );
};

   
  const handleViewChange = () => {
    if (allFieldsFilled()) {
      setView('7');
    }
  };

  return (
    <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full"> 
      <div className="h-[42px] relative w-full ">
        <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
        <div className="rounded-[300px] w-[83%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
        <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
      </div>

      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-7 p-10 border border-[#5228A4] flex flex-col justify-start items-start mb-10">
        <div className="text-[40px] leading-[130%] font-semibold text-start">
          <span>
            <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -6 :</span>
            <span className="step-2-describe-your-dao-span2"></span>
            <span className="step-2-describe-your-dao-span3 text-amber-50">AirDrop</span>
          </span>
        </div>
        <div className="text-[#ffffff] text-xl leading-[130%] font-normal text-center">
          Configure your token distribution and airdrop settings
        </div>
      </div>

      <div className="w-[1221px] mx-auto pt-10 gap-4 shadow-lg rounded-lg">
        <div className="space-y-4">
          {/* Public Sale */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="public-sale"
            >
              Public Sale (%)
            </label>
            <div
              className="text-[#b59aec] text-left font-['ClashDisplayVariable-Regular',_sans-serif] text-sm leading-[120%] font-normal relative self-stretch"
            >
              Percentage allocated for public sale
            </div>
            <input
              name="publicSale"
              value={formFields.airDrop.publicSale}
              onChange={handleInputChange}
              id="public-sale"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Founding Team */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="founding-team"
            >
              Founding Team (%)
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Percentage allocated for founding team
            </div>
            <input
              name="foundingTeam"
              value={formFields.airDrop.foundingTeam}
              onChange={handleInputChange}
              id="founding-team"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Treasury */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="treasury"
            >
              Treasury (%)
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Percentage allocated for treasury
            </div>
            <input
              name="treasury"
              value={formFields.airDrop.treasury}
              onChange={handleInputChange}
              id="treasury"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Community Incentives */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="community-incentives"
            >
              Community Incentives (%)
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Percentage allocated for community incentives
            </div>
            <input
              name="communityIncentives"
              value={formFields.airDrop.communityIncentives}
              onChange={handleInputChange}
              id="community-incentives"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* AirDrop Start Time */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="airdrop-start-time"
            >
              AirDrop Start Time
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              When will the airdrop begin?
            </div>
            <input
              name="airDropStartTime"
              value={formFields.airDrop.airDropStartTime}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}
              id="airdrop-start-time"
              type="datetime-local"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
              style={{ WebkitAppearance: 'none' }}
            />
          </div>

          {/* AirDrop End Time */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="airdrop-end-time"
            >
              AirDrop End Time
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              When will the airdrop end?
            </div>
            <input
              name="airDropEndTime"
              value={formFields.airDrop.airDropEndTime}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}

              id="airdrop-end-time"
              type="datetime-local"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Amount per AirDrop */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="amount-per-airdrop"
            >
              Amount per AirDrop
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              How many tokens will be distributed per airdrop?
            </div>
            <input
              name="amount_per_air_drop"
              value={formFields.airDrop.amount_per_air_drop}
              onChange={handleInputChange}
              id="amount-per-airdrop"
              type="number"
              min="0"
              placeholder="Enter amount..."
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 text-2xl w-full">
            <button
              onClick={() => setView('5')}
              type="button"
              className="flex-1 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              Back
            </button>
            <button
              disabled={!allFieldsFilled()}
              onClick={handleViewChange}
              type="submit"
              className={`flex-1 rounded-2xl p-3 font-semibold shadow-inner ${allFieldsFilled()
                ? "text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF]"
                : "bg-brand2 text-gray-300 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirDrop;