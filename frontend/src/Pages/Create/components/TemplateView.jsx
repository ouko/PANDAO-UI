import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import useViewStore from '@/store/view'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore'

import { Check } from 'lucide-react'
import { DaoCard } from '@/components/ui/myComponents/dao-card'

const TemplateView = () => {
  const { setView } = useViewStore();
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const { setFormFields } = useTokenWeightStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null); // ✅ Define selectedCard state

  const handleViewChange = (project) => {
    if (project.slug === "FinancialDAO") {
      setView("5");
    } else {
      setView("3");
    }
    setFormFields({ package_addr: project.package_addr });
  };

  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blueprint`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBluePrint();
  }, []);

  if (!accounts || accounts.length === 0 || !data) {
    navigate("/");
    return null;
  }
  return (
    <div className="container mx-auto flex flex-col  mt-20">

      <div className="h-[42px] relative w-full ">
        <div className="bg-[rgba(255,255,255,0.15)] rounded-[300px] h-[42px]"></div>
        <div className="rounded-[300px] w-[20%] h-[22px] absolute left-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[rgba(218,204,255,0)] via-[rgba(203,182,255,0.81)] to-[rgba(109,54,219,1)] shadow-md"></div>
        <div className="bg-[#8f58ff] rounded-full w-[24.55px] h-[21px] absolute left-[75%] top-1/2 -translate-y-1/2 blur-[18.95px]"></div>
      </div>

       
       <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] p-10  gap-7 border border-[#5228A4] flex flex-col justify-start items-start my-10 z-50" >

        <div className="font-[ClashDisplayVariable-Semibold,sans-serif]  text-[40px] leading-[130%] font-semibold text-start">

          <span>

            <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -1 :</span>
            <span className="step-2-describe-your-dao-span2"></span>
            <span className="step-2-describe-your-dao-span3 text-amber-50">Build your DAO</span>
          </span>
        </div>
        <div className="text-[#ffffff] font-[Inter-Regular,sans-serif]  text-xl leading-[130%] font-normal text-left ">
          <span>
            Check out our various template models that you can use to make your process of developing your DAO less bulky. Customize these models to use as
            the basis to organize your stakeholders, defining different roles and responsibilities, setting your governance policies, and more. Using a template model
            can fasten your development process, so you should swiftly get back to pushing for more adoptions and innovations.
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 items-center justify-start relative">
        {loading
          ? Array.from({ length: 3 }, (_, index) => <DaoCard key={index} />)
          : [...data].map((project, index) => (
            <div
              key={index}
              className={` flex flex-row gap-2.5 items-start justify-start shrink-0  p-1 relative rounded-2xl cursor-pointer ${selectedCard === index ? "bg-gradient-to-r from-blue-500 to-purple-500" : ""
                }`}
              onClick={() => setSelectedCard(index)}
             >
              {selectedCard === index && <div className='size-8 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center absolute -top-2 -right-2 z-20 rounded-full'>
                <Check className='text-white' />
                 </div>}
                   <div className="bg-brand1 rounded-2xl border border-solid pt-6 pr-[18px] pb-[19px] pl-[18px] flex h-full w-full flex-col gap-[37px] items-start justify-start self-stretch flex-1 relative border-[#5228A4] ">
                <h2 className="text-[#ffffff] text-left font-semibold text-[32px] leading-[130%] relative self-stretch">
                  {project.slug}
                </h2>
                <p className="text-[#ffffff] text-left text-xl leading-[130%] font-normal relative self-stretch line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-row gap-[25px] items-center justify-start shrink-0 relative">
                  {project.tags?.map((text, i) => (
                    <div
                      key={i}
                      className="bg-[rgba(0,0,0,0.18)] rounded-[50px] pt-px pr-6 pb-px pl-6 flex flex-row gap-2.5 items-center justify-start shrink-0 h-[28.54px] relative"
                    >
                      <span className="text-[#ffffff] text-base leading-6 font-normal">
                        {text}
                      </span>

                    </div>
                  ))}
                </div>
                {/* <div className="flex w-full gap-3 mt-4">
                  <Button onClick={() => navigate(`/exploreDao/${project.slug}`)}>
                    Details
                  </Button>
                  <Button onClick={() => handleViewChange(project)}>Use</Button>
                </div> */}
              </div>
            </div>
          ))}
      </div>
      <div className='z-50 flex items-center justify-center mt-10'>
        <button
          onClick={handleViewChange}
          type="button"
          disabled={!!selectedCard}
          className="w-1/4 text-2xl rounded-2xl p-3 text-white font-semibold shadow-inner bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483] disabled:bg-slate-900 disabled:cursor-not-allowed "
        >
          NEXT STEP
        </button>

      </div>

    </div>
  )
}

export default TemplateView
