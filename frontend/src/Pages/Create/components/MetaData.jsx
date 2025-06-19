import PropTypes from 'prop-types';
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';

function MetaData() {
  const { setView } = useViewStore();
  const { formFields, setFormFields } = useTokenWeightStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      metaData: {
        ...formFields.metaData,
        [name]: value
      }
    });
  };

  const allFieldsFilled = () => {
  const meta = formFields.metaData;
  return (
    meta.website.trim() !== '' &&
    meta.discord.trim() !== '' &&
    meta.telegram.trim() !== '' &&
    meta.forum.trim() !== ''
  );
};

  const handleViewChange = () => {
    if (allFieldsFilled()) {
      setView('6'); // Move to next step (AirDrop)
    }
  };

  return (
    <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full">
      <div className="h-[42px] relative w-full ">
      <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
      <div className="rounded-[300px] w-[65%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
      <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[85%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
    </div>

      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-7 p-10 border border-[#5228A4] flex flex-col justify-start items-start mb-10">
        <div className="text-[40px] leading-[130%] font-semibold text-start">
          <span>
            <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -5 :</span>
            <span className="step-2-describe-your-dao-span2"></span>
            <span className="step-2-describe-your-dao-span3 text-amber-50">Meta Data</span>
          </span>
      </div>
        <div className="text-[#ffffff] text-xl leading-[130%] font-normal text-center">
        Add your community&apos;s social media and website links
      </div>
    </div>

      <div className="w-[1221px] mx-auto pt-10 gap-4 shadow-lg rounded-lg">
        <div className="space-y-4">
          {/* Website */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="website"
            >
              Website URL
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Your community&apos;s official website
            </div>
            <input
              name="website"
              value={formFields.metaData.website}
              onChange={handleInputChange}
              id="website"
              type="url"
              placeholder="https://example.com"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Discord */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="discord"
            >
              Discord
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Your community&apos;s Discord invite link
            </div>
            <input
              name="discord"
              value={formFields.metaData.discord}
              onChange={handleInputChange}
              id="discord"
              type="url"
              placeholder="https://discord.gg/your-invite"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Telegram */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="telegram"
            >
              Telegram
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Your community&apos;s Telegram group link
            </div>
            <input
              name="telegram"
              value={formFields.metaData.telegram}
              onChange={handleInputChange}
              id="telegram"
              type="url"
              placeholder="https://t.me/your-group"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Forum */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch shrink-0 relative">
            <label
              className="text-white text-left text-2xl leading-[120%] font-medium relative self-stretch"
              htmlFor="forum"
            >
              Forum
            </label>
            <div
              className="text-[#b59aec] text-left text-sm leading-[120%] font-normal relative self-stretch"
            >
              Your community&apos;s forum or discussion board URL
            </div>
            <input
              name="forum"
              value={formFields.metaData.forum}
              onChange={handleInputChange}
              id="forum"
              type="url"
              placeholder="https://forum.example.com"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 text-2xl w-full">
            <button
              onClick={() => setView('4')}
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
  );
}

MetaData.propTypes = {
  setView: PropTypes.func.isRequired
};

export default MetaData;
