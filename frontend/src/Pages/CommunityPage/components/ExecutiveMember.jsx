import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function ExecutiveMember({ participants }) {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] p-4 h-auto relative overflow-hidden">

            <div className="bg-[#39246b] px-4 flex flex-row items-center justify-between w-full h-[53px] absolute left-0 top-0 rounded-t-lg">
                <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                    Executive Member:
                </div>
                <button
                    className="text-gray-400 text-sm font-medium hover:text-white"
                    onClick={() => navigate(`/community/detail/${params.id}/members`)}
                >
                    View All &gt;
                </button>
            </div>

            <div className=" mx-auto p-4 mt-[60px] space-y-2 rounded-b-lg">
                {participants.length === 0 ? (
                    <div className="text-gray-200 text-center">No Participants</div>
                ) : (
                    participants.slice(0, 4).map((participant, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/userDashboard/userProfile/${participant.public_address}`)}
                            className=" bg-gradient-to-br from-[rgba(85,61,181,0.22)] via-transparent to-brand1 flex items-center gap-2 p-2 border border-brand3 shadow-sm cursor-pointer rounded-xl hover:scale-105 transition"
                        >
                            <Avatar>
                                <AvatarImage alt="Avatar" src={participant.image_url} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className="text-left w-full overflow-hidden">
                                <div className="font-medium flex items-center text-white justify-between w-full">
                                    <span>{participant.name || 'Unnamed Participant'}</span>
                                    {participant.is_executive_member && (
                                        <Badge className="bg-brand3 px-3 py-1 text-xs rounded-full">
                                            Executive Member
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-gray-300 text-sm truncate">
                                    {participant.participant || ''}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ExecutiveMember;
