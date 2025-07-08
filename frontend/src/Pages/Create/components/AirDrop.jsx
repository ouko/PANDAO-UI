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
          <div className="text-xl hidden font-bold text-white mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Total Tokens: {formFields.token.totalSupply || 0}
          </div>

          <div className="flex flex-col gap-8 py-4 self-stretch relative">
            {[
              { key: 'publicSale', label: 'Public Sale', help: 'Percentage allocated for public sale' },
              { key: 'foundingTeam', label: 'Founding Team', help: 'Percentage allocated for founding team' },
              { key: 'treasury', label: 'Treasury', help: 'Percentage allocated for treasury' },
              { key: 'communityIncentives', label: 'Community Incentives', help: 'Percentage allocated for community incentives' },
            ].map((item, idx) => (
              <div key={item.key} className="group relative bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:transform ">
                <div className="flex items-center justify-between w-full mb-4">
                  <label htmlFor={item.key} className="text-white text-2xl leading-[120%] font-semibold tracking-wide flex items-center gap-2">
                    {item.label}
                    <div className="flex items-center justify-between border border-brand5 px-3 py-2 rounded-md bg-gray-900 gap-3">
                      <span className="text-white font-semibold text-lg">
                        {formFields.airDrop[item.key]}%
                      </span>
                      <div className="flex items-baseline gap-1">
                        (<span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-lg font-medium">
                          {((formFields.token.totalSupply || 0) * (formFields.airDrop[item.key] / 100)).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                        </span>
                        <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-sm font-medium">
                          tokens
                        </span>)
                      </div>
                    </div>



                    {lockedSliders[item.key] && <span className="text-yellow-400 ml-3 animate-bounce">🔒</span>}
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLock(item.key)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${lockedSliders[item.key]
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 shadow-lg shadow-yellow-500/20'
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 hover:text-gray-300'
                        }`}
                      title={lockedSliders[item.key] ? 'Unlock slider' : 'Lock slider'}
                    >
                      {lockedSliders[item.key] ? <FiLock size={20} /> : <FiUnlock size={20} />}
                    </button>
                    <FiHelpCircle
                      className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors duration-300 hover:scale-110"
                      title={item.help}
                      size={22}
                    />
                  </div>
                </div>

                <div className="text-purple-300 text-sm leading-[140%] font-medium mb-6 px-2 opacity-80">
                  {item.help}
                </div>

                <div className="relative w-full group">
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
                    className={`w-full rounded-xl appearance-none cursor-pointer h-6 transition-all duration-300 ${lockedSliders[item.key]
                      ? 'bg-gray-600/50 cursor-not-allowed opacity-50'
                      : 'bg-slate-800/50 cursor-pointer hover:h-7 shadow-inner'
                      }`}
                    style={{
                      accentColor: lockedSliders[item.key] ? '#6B7280' : '#AE85FF',
                      background: `linear-gradient(to right, 
               #AE85FF 0%, 
               #AE85FF ${formFields.airDrop[item.key]}%, 
               rgba(30, 20, 60, 0.8) ${formFields.airDrop[item.key]}%, 
               rgba(30, 20, 60, 0.8) 100%),
               linear-gradient(45deg, #1e1a3d 25%, transparent 25%, transparent 75%, #1e1a3d 75%, #1e1a3d),
               linear-gradient(45deg, #1e1a3d 25%, transparent 25%, transparent 75%, #1e1a3d 75%, #1e1a3d)`
                    }}
                  />

                  {/* Animated progress overlay */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 transition-all duration-300 pointer-events-none"
                    style={{ width: `${formFields.airDrop[item.key]}%` }}
                  />

                  {/* Glow effect */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-sm transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{ width: `${formFields.airDrop[item.key]}%` }}
                  />

                  {lockedSliders[item.key] && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-slate-800/80 backdrop-blur-sm rounded-full p-2">
                        <FiLock className="text-yellow-400 drop-shadow-lg" size={18} />
                      </div>
                    </div>
                  )}

                  {/* Value indicator */}
                  <div
                    className="absolute -top-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    style={{ left: `${Math.max(0, Math.min(90, formFields.airDrop[item.key] - 5))}%` }}
                  >
                    {formFields.airDrop[item.key]}%
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced total display */}
            <div className="relative hidden mt-8 p-6 bg-gradient-to-r from-slate-900/40 to-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl">
              <div className="text-right w-full text-2xl font-bold pt-2">
                <span className="text-slate-300">Total Allocation: </span>
                <span className={`transition-all duration-500 text-3xl font-black ${totalSlider === 100
                  ? 'text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text  drop-shadow-lg'
                  : 'text-transparent bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text '
                  }`}>
                  {totalSlider}%
                </span>

                {/* Status indicator */}
                <div className="mt-3 flex items-center justify-end gap-2">
                  <div className={`w-3 h-3 rounded-full ${totalSlider === 100 ? 'bg-emerald-400  shadow-lg shadow-emerald-400/50' : 'bg-red-400  shadow-lg shadow-red-400/50'
                    }`} />
                  <span className={`text-sm font-medium ${totalSlider === 100 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                    {totalSlider === 100 ? 'Perfect Balance' : 'Needs Adjustment'}
                  </span>
                </div>
              </div>


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
              min={new Date().toISOString().slice(0, 16)} type="datetime-local"
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
              min={formFields.airDrop.airDropStartTime || new Date().toISOString().slice(0, 16)} />
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