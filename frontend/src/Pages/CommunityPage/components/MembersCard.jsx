
import { useNavigate, useParams } from 'react-router-dom';
import AvatarCircles from '@/components/ui/myComponents/avatarCircle'


const MembersCard = ({ participants }) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border border-[#5228A4]  pt-[13px] pr-[25px] pb-[13px] pl-[25px] self-stretch shrink-0 h-[152px] relative overflow-hidden">
     
      <div className="bg-[#39246b] pr-[15px] pl-[15px] flex flex-row items-center justify-between w-full h-[53px] absolute left-0 top-0">
        <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">
          
          Members:
        </div>
        < button className="text-[#a7a7a7] text-left  text-[14px] leading-5 font-medium"
      
          onClick={() => navigate(`/community/detail/${params.id}/members`)}
         
        >
          View All &gt;
        </button>
      </div>

 
      <div className="text-[#ffffff] text-left  text-4xl font-medium absolute left-[39px] top-20">
        {participants.length} Members
      </div>

  
      {participants.length > 4 && (
        <div className="absolute right-[39px] top-20">
          <AvatarCircles
            numPeople={participants.length - 3}
            src1={participants[0].image_url}
          />
        </div>
      )}
    </div>
  );
};

export default MembersCard;
