import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';
import { FiHelpCircle, FiLock, FiUnlock } from 'react-icons/fi';
import { useState } from 'react';

function AirDrop() {
  const { setView } = useViewStore();
  const { formFields, setFormFields } = useTokenWeightStore();
  
  // State to track which sliders are locked
  const [lockedSliders, setLockedSliders] = useState({
    publicSale: false,
    foundingTeam: false,
    treasury: false,
    communityIncentives: false
  });

  // Compute the total of all four sliders
  const totalSlider =
    Number(formFields.airDrop.publicSale) +
    Number(formFields.airDrop.foundingTeam) +
    Number(formFields.airDrop.treasury) +
    Number(formFields.airDrop.communityIncentives);

  // Toggle lock state for a slider
  const toggleLock = (sliderKey) => {
    setLockedSliders(prev => ({
      ...prev,
      [sliderKey]: !prev[sliderKey]
    }));
  };

  // Handle slider change and proportionally adjust others
  const handleSliderChange = (changedKey, newValue) => {
    // Don't allow changes to locked sliders
    if (lockedSliders[changedKey]) {
      return;
    }

    // Get the old values
    const keys = ['publicSale', 'foundingTeam', 'treasury', 'communityIncentives'];
    const oldValues = keys.map(k => Number(formFields.airDrop[k]) || 0);
    const changedIdx = keys.indexOf(changedKey);
    const oldChangedValue = oldValues[changedIdx];
    
    // Get unlocked indices (excluding the changed one)
    const unlockedIndices = keys
      .map((_, i) => i)
      .filter(i => i !== changedIdx && !lockedSliders[keys[i]]);
    
    // Calculate sum of locked sliders (excluding the changed one)
    const lockedSum = keys.reduce((sum, key, i) => {
      if (i !== changedIdx && lockedSliders[key]) {
        return sum + oldValues[i];
      }
      return sum;
    }, 0);

    // Calculate remaining percentage available for unlocked sliders
    const availableForUnlocked = 100 - newValue - lockedSum;
    
    // If no unlocked sliders or not enough space, don't allow the change
    if (unlockedIndices.length === 0 || availableForUnlocked < 0) {
      return;
    }

    // Get current sum of unlocked sliders
    let sumUnlocked = unlockedIndices.reduce((sum, i) => sum + oldValues[i], 0);

    // If unlocked sliders are all zero, distribute remaining equally
    if (sumUnlocked === 0 && availableForUnlocked > 0) {
      const equalShare = Math.floor(availableForUnlocked / unlockedIndices.length);
      const remainder = availableForUnlocked - (equalShare * unlockedIndices.length);
      
      const next = { ...formFields.airDrop };
      keys.forEach((k, i) => {
        if (i === changedIdx) {
          next[k] = newValue;
        } else if (!lockedSliders[k]) {
          const unlockedIdx = unlockedIndices.indexOf(i);
          next[k] = equalShare + (unlockedIdx < remainder ? 1 : 0);
        }
        // Locked sliders keep their current values
      });
      setFormFields({ airDrop: next });
      return;
    }

    // Distribute the available percentage proportionally among unlocked sliders
    let newUnlocked = unlockedIndices.map(i => 
      Math.max(0, Math.round((oldValues[i] / sumUnlocked) * availableForUnlocked))
    );
    
    // Correction for rounding errors
    let unlockedSum = newUnlocked.reduce((a, b) => a + b, 0);
    let diff = availableForUnlocked - unlockedSum;
    
    if (diff !== 0 && newUnlocked.length > 0) {
      // Add/subtract the diff to the largest (or smallest) unlocked slider
      let maxValue = Math.max(...newUnlocked);
      let idxToFix = newUnlocked.indexOf(maxValue);
      newUnlocked[idxToFix] += diff;
    }
    
    // Compose the new values
    const next = { ...formFields.airDrop };
    keys.forEach((k, i) => {
      if (i === changedIdx) {
        next[k] = newValue;
      } else if (!lockedSliders[k]) {
        const unlockedIdx = unlockedIndices.indexOf(i);
        next[k] = unlockedIdx !== -1 ? newUnlocked[unlockedIdx] : oldValues[i];
      }
      // Locked sliders keep their current values
    });
    
    setFormFields({ airDrop: next });
  };

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
          {/* Token Distribution Sliders */}
          <div className="flex flex-col gap-6 py-2 self-stretch relative">
            {[
              { key: 'publicSale', label: 'Public Sale', help: 'Percentage allocated for public sale' },
              { key: 'foundingTeam', label: 'Founding Team', help: 'Percentage allocated for founding team' },
              { key: 'treasury', label: 'Treasury', help: 'Percentage allocated for treasury' },
              { key: 'communityIncentives', label: 'Community Incentives', help: 'Percentage allocated for community incentives' },
            ].map((item, idx) => (
              <div key={item.key} className="flex flex-col gap-2.5 items-start justify-start">
                <div className="flex items-center justify-between w-full">
                  <label htmlFor={item.key} className="text-white text-2xl leading-[120%] font-medium">
                    {item.label} (<span className="text-[#AE85FF]">{formFields.airDrop[item.key]}</span>%)
                    {lockedSliders[item.key] && <span className="text-yellow-400 ml-2">🔒</span>}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLock(item.key)}
                      className={`p-1 rounded ${lockedSliders[item.key] 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title={lockedSliders[item.key] ? 'Unlock slider' : 'Lock slider'}
                    >
                      {lockedSliders[item.key] ? <FiLock size={18} /> : <FiUnlock size={18} />}
                    </button>
                    <FiHelpCircle
                      className="text-[#b59aec] cursor-pointer"
                      title={item.help}
                      size={20}
                    />
                  </div>
                </div>
                <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
                  {item.help}
                </div>
                <div className="relative w-full">
                  <input
                    id={item.key}
                    name={item.key}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={formFields.airDrop[item.key]}
                    onChange={(e) => handleSliderChange(item.key, Number(e.target.value))}
                    disabled={lockedSliders[item.key]}
                    className={`w-full  rounded-lg appearance-none cursor-pointer h-5 ${
                      lockedSliders[item.key] 
                        ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                        : 'bg-[#1B0D37] cursor-pointer'
                    }`}
                    style={{
                      accentColor: lockedSliders[item.key] ? '#6B7280' : '#AE85FF',
                      background: `linear-gradient(to right, #AE85FF 0%, #AE85FF ${formFields.airDrop[item.key]}%, #1B0D37 ${formFields.airDrop[item.key]}%, #1B0D37 100%)`
                    }}
                  />
                  {lockedSliders[item.key] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <FiLock className="text-yellow-400" size={16} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Show sum for clarity */}
            <div className="text-right w-full text-lg text-[#b59aec] pt-2">
              Total: <span className={totalSlider === 100 ? 'text-green-400' : 'text-red-400'}>{totalSlider}</span>%
            </div>
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
              min={new Date().toISOString().slice(0, 16)}              type="datetime-local"
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
              min={formFields.airDrop.airDropStartTime || new Date().toISOString().slice(0, 16)}            />
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