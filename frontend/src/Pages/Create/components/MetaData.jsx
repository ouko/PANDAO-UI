import PropTypes from 'prop-types';
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';
import { FiHelpCircle } from 'react-icons/fi';

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
    <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full px-4">
      {/* Progress Bar */}
      <div className="h-[42px] relative w-full">
        <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
        <div className="rounded-[300px] w-[60%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
        <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
      </div>

      {/* Step Section */}
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-4 p-6 md:p-10 border border-[#5228A4] flex flex-col items-start mb-10">
        <div className="text-2xl md:text-4xl font-semibold text-start text-white">
          <span className="text-[#AE85FF]">STEP -4 :</span>{' '}
          <span className="text-amber-50">Meta Data</span>
        </div>
        <div className="text-[#ffffff] text-base md:text-xl font-normal text-left">
          Add your community&apos;s social media and website links
        </div>
      </div>

      <div className="w-full max-w-screen-lg text-white mx-auto pt-6 md:pt-10 gap-4 shadow-lg rounded-lg space-y-6">
        <div className="space-y-4">
          {/* Website */}
          {/* Website */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="website" className="text-white text-2xl leading-[120%] font-medium">
                Website URL
              </label>
              <FiHelpCircle
                title="Your community's official website"
                className="text-[#b59aec] cursor-pointer"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Your community`&apos;s official website
            </div>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://example.com"
              value={formFields.metaData.website}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Discord */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="discord" className="text-white text-2xl leading-[120%] font-medium">
                Discord
              </label>
              <FiHelpCircle
                title="Your community's Discord invite link"
                className="text-[#b59aec] cursor-pointer"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Your community`&apos;s Discord invite link
            </div>
            <input
              id="discord"
              name="discord"
              type="url"
              placeholder="https://discord.gg/your-invite"
              value={formFields.metaData.discord}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Telegram */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="telegram" className="text-white text-2xl leading-[120%] font-medium">
                Telegram
              </label>
              <FiHelpCircle
                title="Your community's Telegram group link"
                className="text-[#b59aec] cursor-pointer"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Your community`&apos;s Telegram group link
            </div>
            <input
              id="telegram"
              name="telegram"
              type="url"
              placeholder="https://t.me/your-group"
              value={formFields.metaData.telegram}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Forum */}
          <div className="flex flex-col gap-2.5 items-start justify-start py-2 self-stretch relative">
            <div className="flex items-center justify-between w-full">
              <label htmlFor="forum" className="text-white text-2xl leading-[120%] font-medium">
                Forum
              </label>
              <FiHelpCircle
                title="Your community's forum or discussion board URL"
                className="text-[#b59aec] cursor-pointer"
                size={20}
              />
            </div>
            <div className="text-[#b59aec] text-sm leading-[120%] font-normal self-stretch">
              Your community`&apos;s forum or discussion board URL
            </div>
            <input
              id="forum"
              name="forum"
              type="url"
              placeholder="https://forum.example.com"
              value={formFields.metaData.forum}
              onChange={handleInputChange}
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
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
