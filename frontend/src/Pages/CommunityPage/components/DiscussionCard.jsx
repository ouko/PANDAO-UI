import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useNavigate, useParams } from 'react-router-dom';

function DiscussionCard({ communities }) {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border border-[#5228A4] pt-0 h-[352px] relative overflow-y-auto">

            {/* Sticky Header */}
            <div className="bg-[#39246b] px-4 flex items-center justify-between w-full h-[53px] sticky top-0 z-10">
                <div className="text-white text-2xl font-medium flex items-center gap-2">
                    Discussion:
                </div>
                <button
                    className="text-[#a7a7a7] text-sm font-medium"
                    onClick={() =>
                        navigate(`/community/detail/${params.id}/discussion`)
                    }
                >
                    View All &gt;
                </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-4 space-y-2">
                {communities.length === 0 ? (
                    <p className="text-gray-100 text-center">No active discussions</p>
                ) : (
                    communities.slice(0, 3).map((community, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent to-brand1 p-3 rounded-md shadow-md border border-brand3"
                        >
                            <h3 className="text-lg font-semibold text-white truncate">
                                {community.title}
                            </h3>
                            <div className="text-sm text-white flex items-center gap-2 mt-2">
                                <span>Started By:</span>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 ring-1 ring-offset-1 ring-offset-[rgba(24,18,45,0.59)] overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={community.user_image}
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{community.user_name}</span>
                                </div>
                            </div>
                            <div className="border-t mt-2 pt-1 text-xs text-white">
                                {new Date(community.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DiscussionCard;
