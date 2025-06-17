import { useState } from 'react';
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import { toast } from 'sonner';
import TokenImageURL from '@/Pages/components/TokenImage';

const TokenView = () => {
  const { formFields, setFormFields } = useTokenWeightStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const allFieldsFilled = () => (
    formFields.token.tokenImageUrl.trim() !== '' &&
    formFields.token.name.trim() !== '' &&
    formFields.token.symbol.trim() !== '' &&
    Number(formFields.token.tokenSupply) > 0 &&
    Number(formFields.token.tokenPrice) > 0 &&
    Number(formFields.token.tokenWithDrawPrice) > 0
  );

  const handleTokenUrl = (id2) => {
    const url2 = `https://ucarecdn.com/${id2}/-/preview/1000x562/`;
    setFormFields({ token: { ...formFields.token, tokenImageUrl: url2 } });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const numericValue = parseFloat(value);
    const tokenFields = ['tokenSupply', 'tokenPrice', 'tokenWithDrawPrice', 'tokenImageUrl', 'name', 'symbol', 'isMintable', 'totalSupply'];

    if (tokenFields.includes(name)) {
      let fieldValue = type === 'checkbox' ? checked : value;
      // Validation for tokenWithDrawPrice and tokenPrice
      if (name === 'tokenWithDrawPrice') {
        if (numericValue > parseFloat(formFields.token.tokenPrice)) {
          toast.error('Token Withdraw Price cannot be greater than Token Price');
          return;
        }
      }
      if (name === 'tokenPrice') {
        if (parseFloat(formFields.token.tokenWithDrawPrice) > numericValue) {
          setFormFields({
            token: {
              ...formFields.token,
              [name]: value,
              tokenWithDrawPrice: value
            }
          });
          return;
        }
      }
      setFormFields({
        token: {
          ...formFields.token,
          [name]: fieldValue
        }
      });
      return;
    }
  };

  return (
    <>
  
      <div className='bg-[#100821] min-h-screen flex flex-col items-center justify-center mt-10'>
        <div className="h-[42px] relative w-full ">
          <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] h-[42px]"></div>
          <div className="rounded-[300px] w-[98%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
          <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
        </div>
        <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-[1221px] h-[147px] z-50 mt-10  border border-[#5228A4] flex flex-col justify-start items-start mb-10">
          <div className=" ms-6 mt-7  text-[40px] leading-[130%] font-semibold text-start">

            <span>
              <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -3 :</span>
              <span className="step-2-describe-your-dao-span2"></span>
              <span className="step-2-describe-your-dao-span3 text-amber-50"> Token</span>
            </span>
          </div>
          <div className="text-[#ffffff] text-xl ms-6 mt-4 leading-[130%] font-normal text-center">
            Start simple and learn as you go. You can always evolve your DAO in the future
          </div>
        </div>


        <div className="w-[1221px] mx-auto pt-10 gap-15 z-50 text-white shadow-lg rounded-lg  ">
          <div className="w-full gap-2.5  py-7 ">
            <label className="text-white text-2xl leading-[120%] mb-6  font-medium ">
              Token Supply:
            </label>
            <input
              type="number"
              name="tokenSupply"
              placeholder="Enter Token Supply"
              value={formFields.token.tokenSupply}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] mt-5 rounded-md text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-full gap-2.5 pb-8">
            <label className="text-white text-2xl leading-[120%] font-medium ">
              Token Price In XRD :
            </label>
            <input
              type="number"
              name="tokenPrice"
              placeholder="Enter Token Price"
              value={formFields.token.tokenPrice}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5  text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-full gap-2.5">
            <label className="text-white text-2xl leading-[120%] font-medium">
              Token Buy Back Price In XRD:
            </label>
            <input
              type="number"
              name="tokenWithDrawPrice"
              placeholder="Enter Token Withdraw Price"
              value={formFields.token.tokenWithDrawPrice}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md mt-5 text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
             <div className="flex-1 my-5">
              <label className="text-white text-2xl leading-[120%] font-medium  mt-4">
                Token Image:
              </label>


              <TokenImageURL onUploadComplete2={handleTokenUrl}  />

            </div>
          <div className="flex flex-row text-2xl gap-6 mt-10 w-full">
            <button
              type="button"
              className="flex-1 bg-primary-500 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
            >
              Back
            </button>
            {loading ? (
              <button
                type="button"
                className="flex-1 rounded-2xl p-3 text-white font-semibold bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner opacity-50 cursor-not-allowed"
                disabled
              >
                Deploying...
              </button>
            ) : (
              <button
                type="submit"
                className={`flex-1 rounded-2xl p-3 text-white font-semibold hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] shadow-inner ${!allFieldsFilled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!allFieldsFilled()}
                onClick={() => setOpen(true)}
              >
                Deploy
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default TokenView
