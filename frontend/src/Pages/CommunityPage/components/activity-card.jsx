import { Clock } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ActivityCard({ ac, navigate, clipAddress, formatStandardDateTime }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex items-start gap-5 bg-gradient-to-br from-[rgba(54,40,101,0.83)] via-transparent to-brand1  border border-purple-600 rounded-2xl p-5 text-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Avatar & Glowing Effect */}
            <div className="relative flex-shrink-0">
                <div
                    className={`absolute inset-0 rounded-xl bg-purple-600 blur transition-opacity duration-300 ${
                        isHovered ? "opacity-60" : "opacity-40"
                    }`}
                />
                <div className="h-16 w-16 rounded-xl overflow-hidden shadow-md ring-2 ring-purple-400 relative z-10">
                    <img
                        src={ac.image_url}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between w-full space-y-2">
                {/* Name and Address */}
                <div
                    className="cursor-pointer group"
                    onClick={() => navigate(`/userDashboard/userProfile/${ac.user_address}`)}
                >
                    <div className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition">
                        {ac.name}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-200 transition mt-0.5">
                        {clipAddress(ac.user_address)}
                    </div>
                </div>

                {/* Activity Info */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-100 bg-indigo-900 bg-opacity-40 px-4 py-2 rounded-lg space-x-2">
                        <span className="text-purple-400">Activity Info:</span> 
                        <span className="text-white capitalize">{ac.transaction_info}</span>
                    </div>

                    {ac.funds_effected != null && (
                        <div className="text-xs font-semibold text-white bg-purple-700 px-4 py-1.5 rounded-full mx-1 inline-block space-x-2">
                            <span className="text-purple-400">Funds Effected:</span> 
                            <span className="text-white">{ac.funds_effected} Tokens</span>
                        </div>
                    )}

                    <div className="text-xs font-semibold text-white bg-purple-800 px-4 py-1.5 rounded-full inline-block space-x-2">
                        <span className="text-purple-400">Activity Type:</span> 
                        <span className="text-white capitalize">{ac.activity_type}</span>
                    </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                    <Clock className="h-4 w-4" />
                    <span className="opacity-80">{formatStandardDateTime(ac.created_at)}</span>
                </div>
            </div>
        </div>
    );
}

// ✅ PropTypes Validation
ActivityCard.propTypes = {
    ac: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        user_address: PropTypes.string.isRequired,
        transaction_info: PropTypes.string.isRequired,
        funds_effected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        activity_type: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    clipAddress: PropTypes.func.isRequired,
    formatStandardDateTime: PropTypes.func.isRequired,
};
