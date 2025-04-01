import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useNavigate, useParams } from 'react-router-dom';

function DiscussionCard({communities}) {
    const navigate = useNavigate();
      const params = useParams();
    
    return (
        <div className="bg-[rgba(169,126,255,0.08)]  rounded-[10px] border border-[#5228A4] pt-[13px] pr-[25px] pb-[13px] pl-[25px] self-stretch shrink-0 h-[152px] relative overflow-hidden">
      
            <div className="bg-[#39246b]  pr-[15px] pl-[15px] flex flex-row items-center justify-between w-full h-[53px] absolute left-0 top-0">
                <div className="text-[#ffffff]  text-left  text-2xl font-medium flex items-center gap-2">

                    Discussion:
                </div>


                < button className="text-[#a7a7a7] text-left  text-[14px] leading-5 font-medium"
                    onClick={() =>
                        navigate(
                            `/community/detail/${params.id}/discussion`,
                        )
                    }
                    
                >
                    View All &gt;
                </button>
            </div>

            <div className="pt-14 px-4 pb-2 overflow-y-auto h-full">
                {communities.length === 0 ? (
                    <p className="text-gray-100 text-center">No active discussions</p>
                ) : (
                    communities.map((community, index) => (
                        <div key={index} className="bg-white p-3 rounded-md shadow-md border border-gray-200 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 truncate">{community.title}</h3>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-2">
                                <span>Started By:</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={community.user_image} alt={community.user_name} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium text-gray-700 truncate">{community.user_name}</span>
                                </div>
                            </div>
                            <div className="border-t mt-2 pt-1 text-xs text-gray-500">
                                {new Date(community.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        
        </div>
    )
}

export default DiscussionCard