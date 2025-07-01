import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';
import { FiHelpCircle } from 'react-icons/fi';

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
    <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full px-4">
      {/* Progress Bar */}
      <div className="h-[42px] relative w-full">
        <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
        <div className="rounded-[300px] w-[83%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
        <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
      </div>

      {/* Step Section */}
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-4 p-6 md:p-10 border border-[#5228A4] flex flex-col items-start mb-10">
        <div className="text-2xl md:text-4xl font-semibold text-start text-white">
          <span className="text-[#AE85FF]">STEP -5 :</span>{' '}
          <span className="text-amber-50">AirDrop</span>
        </div>
        <div className="text-[#ffffff] text-base md:text-xl font-normal text-left">
          Configure your token distribution and airdrop settings
        </div>
      </div>

      <div className="w-full max-w-screen-lg text-white mx-auto pt-6 md:pt-10 gap-4 shadow-lg rounded-lg space-y-6">
        <div className="space-y-4">
          {/* Public Sale */}
          {/* Public Sale (%) */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="public-sale" className="text-white text-2xl leading-[120%] font-medium">
                Public Sale (%)
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="Percentage allocated for public sale"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Percentage allocated for public sale
            </div>
            <input
              id="public-sale"
              name="publicSale"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              value={formFields.airDrop.publicSale}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Founding Team (%) */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="founding-team" className="text-white text-2xl leading-[120%] font-medium">
                Founding Team (%)
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="Percentage allocated for founding team"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Percentage allocated for founding team
            </div>
            <input
              id="founding-team"
              name="foundingTeam"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              value={formFields.airDrop.foundingTeam}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Treasury (%) */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="treasury" className="text-white text-2xl leading-[120%] font-medium">
                Treasury (%)
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="Percentage allocated for treasury"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Percentage allocated for treasury
            </div>
            <input
              id="treasury"
              name="treasury"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              value={formFields.airDrop.treasury}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Community Incentives (%) */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="community-incentives" className="text-white text-2xl leading-[120%] font-medium">
                Community Incentives (%)
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="Percentage allocated for community incentives"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Percentage allocated for community incentives
            </div>
            <input
              id="community-incentives"
              name="communityIncentives"
              type="number"
              min="0"
              max="100"
              placeholder="Enter percentage..."
              value={formFields.airDrop.communityIncentives}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* AirDrop Start Time */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="airdrop-start-time" className="text-white text-2xl leading-[120%] font-medium">
                AirDrop Start Time
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="When will the airdrop begin?"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              When will the airdrop begin?
            </div>
            <input
              id="airdrop-start-time"
              name="airDropStartTime"
              type="datetime-local"
              value={formFields.airDrop.airDropStartTime}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400 cursor-pointer"
              style={{ WebkitAppearance: 'none' }}
            />
          </div>

          {/* AirDrop End Time */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch text-white relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="airdrop-end-time" className="text-white text-2xl leading-[120%] font-medium">
                AirDrop End Time
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="When will the airdrop end?"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              When will the airdrop end?
            </div>
            <input
              id="airdrop-end-time"
              name="airDropEndTime"
              type="datetime-local"
              value={formFields.airDrop.airDropEndTime}
              onChange={handleInputChange}
              onClick={(e) => e.target.showPicker()}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 [color-scheme:dark] focus:ring-purple-400"
            />
          </div>

          {/* Amount per AirDrop */}
          <div className="flex flex-col gap-2.5 py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="amount-per-airdrop" className="text-white text-2xl leading-[120%] font-medium">
                Amount per AirDrop
              </label>
              <FiHelpCircle
                className="text-[#b59aec] cursor-pointer"
                title="How many tokens will be distributed per airdrop?"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              How many tokens will be distributed per airdrop?
            </div>
            <input
              id="amount-per-airdrop"
              name="amount_per_air_drop"
              type="number"
              min="0"
              placeholder="Enter amount..."
              value={formFields.airDrop.amount_per_air_drop}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
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