import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import useViewStore from '@/store/view'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'
import { useAccount } from '@/AccountContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useTokenWeightStore from '@/store/templateStore/tokenWeightStore'
import { SkeletonCard } from "@/Pages/GlobalComponents/Skeleton"

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
    <div className="bg-[#100821] min-h-screen font-[ClashDisplayVariable-Semibold,sans-serif] flex flex-col items-center justify-center">
      <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] w-[1221px] h-[247px] gap-7 border border-[#5228A4] flex flex-col justify-start items-start mb-10">
      
        <div className="font-[ClashDisplayVariable-Semibold,sans-serif] ms-6 mt-6 text-[40px] leading-[130%] font-semibold text-start">
        <Progress value={33} className="rounded-sm" />
          <span>
          
            <span className="step-2-describe-your-dao-span text-[#AE85FF]">STEP -1 :</span>
            <span className="step-2-describe-your-dao-span2"></span>
            <span className="step-2-describe-your-dao-span3 text-amber-50">Build your DAO</span>
          </span>
        </div>
        <div className="text-[#ffffff] font-[Inter-Regular,sans-serif] ms-6 text-xl leading-[130%] font-normal text-center">
          <span>
            Check out our various template models that you can use to make your process of developing your DAO less bulky. Customize these models to use as
            the basis to organize your stakeholders, defining different roles and responsibilities, setting your governance policies, and more. Using a template model
            can fasten your development process, so you should swiftly get back to pushing for more adoptions and innovations.
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center justify-start relative">
      {loading
        ? Array.from({ length: 3 }, (_, index) => <SkeletonCard key={index} />)
        : data.map((project, index) => (
            <div
              key={index}
              className={`p-2.5 flex flex-row gap-2.5 items-start justify-start shrink-0 w-[604px] h-[350px] relative cursor-pointer ${
                selectedCard === index ? "border-2 border-[#C0A1FF]" : ""
              }`}
              onClick={() => setSelectedCard(index)} 
            >
              <div className="bg-[rgba(169,126,255,0.31)] rounded-2xl border border-solid pt-6 pr-[18px] pb-[19px] pl-[18px] flex flex-col gap-[37px] items-start justify-start self-stretch flex-1 relative border-[#5228A4] backdrop-blur-md">
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
                <div className="flex w-full gap-3 mt-4">
                  <Button onClick={() => navigate(`/exploreDao/${project.slug}`)}>
                    Details
                  </Button>
                  <Button onClick={() => handleViewChange(project)}>Use</Button>
                </div>
              </div>
            </div>
          ))}
    </div>

    </div>
  )
}

export default TemplateView
