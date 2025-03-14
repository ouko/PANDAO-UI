import { useAccount } from "@/AccountContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ userData}) => {
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();
  const { accounts } = useAccount();
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="bg-[rgba(169,126,255,0.24)] mt-24 ms-6  rounded-[20px] justify-center items-center flex border border-brand2 p-[13px_25px] w-[393px] min-h-[921px] h-full relative overflow-hidden backdrop-blur-[6.7px]">
      <Avatar className="w-[182.76px] h-[182.76px] absolute left-1/2 top-[62px] transform -translate-x-1/2 border-[5px] border-brand5">
        {userData.usermetadata?.image_url ? (
          <AvatarImage
            src={userData.usermetadata.image_url}
            className="object-cover"
          />
        ) : (
          <AvatarFallback>{userData.name?.slice(0, 2) || "CN"}</AvatarFallback>
        )}
      </Avatar>

      <div className="absolute top-[268px]">
        <div className="text-white text-center font-semibold text-[26px]">
          {userData.name || "Unknown User"}
        </div>

        <div className="py-1 w-[300px] rounded-sm flex flex-wrap items-center text-brand5 justify-center relative group">
          {clipAddress(accounts[0]?.address || "")}
          <button
            onClick={() => handleCopy(accounts[0]?.address || "")}
            disabled={copied}
            className="py-0 text-white rounded-md px-2 h-5 text-xs absolute top-2 -right-2 group-hover:block"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-10 items-start justify-start w-[322px] absolute left-1/2 top-[369px] transform -translate-x-1/2">
        {/* Email */}
        {userData.email && (
          <div className="flex flex-col gap-5 w-full">
            <div className="text-[#DACCF6] font-semibold text-xl">E-mail:</div>
            <div className="text-[#f2f2f2] text-base">
              {userData.email || "No email provided"}
            </div>
          </div>
        )}

        {/* Bio */}
        <div className="flex flex-col gap-5 w-full">
          <div className="text-[#DACCF6] font-semibold text-xl">BIO:</div>
          <div className="text-[#f2f2f2] text-base">
            {userData.usermetadata?.bio || "No bio available"}
          </div>
        </div>

        {/* Communities */}
        <div className="flex flex-col gap-5 w-full h-full">
          <div className="text-xl font-bold text-[#DACCF6]">
            Communities you might be interested in:
          </div>
          <div className="flex flex-wrap gap-3.5 py-2">
            {userData?.interested_tag?.length > 0 ? (
              userData.interested_tag.map((tag, index) => (
                <div
                  key={index}
                  className="bg-brand1 rounded-3xl border-2 border-brand3  p-[3px_25px] flex items-center"
                >
                  <div className="text-white text-base">{tag}</div>
                </div>
              ))
            ) : (
              <div className="text-white text-base">No interested tags</div>
            )}
          </div>

        
        </div>
      </div>

      <button
        onClick={() => navigate("/userDashboard/edit")}
        className="bg-primary-400 rounded-br-lg w-[53px] h-11 absolute left-[-1px] top-[-1px]"
      >
        <img className="w-[43px] h-[43px]" src="/edit.svg" alt="Edit" />
      </button>
    </div>
  );
};

export default Sidebar;
