import useTokenWeightStore from '@/store/templateStore/tokenWeightStore';
import useViewStore from '@/store/view';
import { toast } from 'sonner';
import TokenImageURL from '@/Pages/components/TokenImage';

const TokenView = () => {
  const { formFields, setFormFields } = useTokenWeightStore();
  const { setView } = useViewStore();


  const allFieldsFilled = () => {
    // For debugging
    console.log('Token fields:', formFields.token);
    
    return (
      formFields.token.name.trim() !== '' &&
      formFields.token.symbol.trim() !== '' &&
      formFields.token.totalSupply > 0 &&
      formFields.token.tokenPrice > 0 &&
      formFields.token.tokenWithDrawPrice > 0 &&
      formFields.token.tokenImageUrl && formFields.token.tokenImageUrl.trim() !== ''
    );
  };

  const handleTokenUrl = (id2) => {
    const url2 = `https://ucarecdn.com/${id2}/-/preview/1000x562/`;
    setFormFields({ token: { ...formFields.token, tokenImageUrl: url2 } });
  };

  const handleViewChange = (e) => {
    e.preventDefault();
    if (allFieldsFilled()) {
      setView('5');
    } else {
      toast.warning('Please fill all required token fields before proceeding');
    }
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
  
  <div className="z-50 container mx-auto flex flex-col items-center justify-center mt-10 w-full">


<div className="h-[42px] relative w-full ">
  <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] w-full h-[42px]"></div>
  <div className="rounded-[300px] w-[48%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
  <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
</div>

{/* Step 2 Section */}
<div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-full mt-10 gap-7 p-10 border border-[#5228A4] flex flex-col justify-start items-start mb-10">
  <div className="  text-[40px] leading-[130%] font-semibold text-start">


    <span>
      <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -3 :</span>
      <span className="step-2-describe-your-dao-span2"></span>
      <span className="step-2-describe-your-dao-span3 text-amber-50">Token Details</span>
    </span>
  </div>
  <div className="text-[#ffffff]   text-xl leading-[130%] font-normal text-center">
Fill in the details of your token
  </div>
</div>


        <div className="w-[1221px] mx-auto pt-10 gap-15 z-50 text-white shadow-lg rounded-lg">
          <div className="grid grid-cols-1 gap-3 w-full">
            <div className="w-full gap-2.5 py-2 flex flex-col">
              <label className="text-white text-lg font-medium">Token Name:</label>
              <input type="text" name="name" value={formFields.token.name} onChange={handleInputChange} className="w-full p-3 border bg-[#1B0D37] border-[#5228A4] rounded-md" />
            </div>
            <div className="w-full gap-2.5 py-2 flex flex-col">
              <label className="text-white text-lg font-medium">Token Symbol:</label>
              <input type="text" name="symbol" value={formFields.token.symbol} onChange={handleInputChange} className="w-full p-3 border bg-[#1B0D37] border-[#5228A4] rounded-md" />
            </div>
            <div className="w-full gap-2.5 py-2  items-center hidden">
              <label className="text-white text-lg font-medium mr-2">Is Mintable:</label>
              <input type="checkbox" name="isMintable" checked={formFields.token.isMintable} onChange={handleInputChange} className="mr-2" />
              <span className="text-white">Mintable</span>
            </div>
            <div className="w-full gap-2.5 py-2 flex flex-col">
              <label className="text-white text-lg font-medium">Total Supply:</label>
              <input type="number" name="totalSupply" value={formFields.token.totalSupply} onChange={handleInputChange} className="w-full p-3 border bg-[#1B0D37] border-[#5228A4] rounded-md" />
            </div>
            <div className="w-full gap-2.5 py-2 flex flex-col">
              <label className="text-white text-lg font-medium">Token Price (XRD):</label>
              <input type="number" name="tokenPrice" value={formFields.token.tokenPrice} onChange={handleInputChange} className="w-full p-3 border bg-[#1B0D37] border-[#5228A4] rounded-md" />
            </div>
            <div className="w-full gap-2.5 py-2 flex flex-col">
              <label className="text-white text-lg font-medium">Token Withdraw Price (XRD):</label>
              <input type="number" name="tokenWithDrawPrice" value={formFields.token.tokenWithDrawPrice} onChange={handleInputChange} className="w-full p-3 border bg-[#1B0D37] border-[#5228A4] rounded-md" />
            </div>
            <div className="w-full gap-2.5 py-2">
              <label className="text-white text-lg font-medium">Token Image URL:</label>
              <TokenImageURL onUploadComplete2={handleTokenUrl} />
            </div>
          </div>
          <div className="flex flex-row text-2xl gap-6 mt-10 w-full">
            <button
              type="button"
              className="flex-1 bg-primary-500 rounded-2xl p-3 text-white hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] font-semibold shadow-inner"
              onClick={(e) => {
                e.preventDefault();
                setView('3');
              }}
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
    </>
  )
}

export default TokenView
