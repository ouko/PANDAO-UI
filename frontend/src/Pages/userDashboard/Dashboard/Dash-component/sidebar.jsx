import { useAccount } from "@/AccountContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import EditPage from "./EditPage";

const Sidebar = ({ userData, isAdmin = true ,onEdit}) => {
  const [copied, setCopied] = useState(false);
const [open,setOpen]=useState(false)
  const { accounts } = useAccount();
  const handleClose=()=>{
    setOpen(false)
    onEdit()
  }
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent className="sm:max-w-7xl max-h-[500px] bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md border-[1px] border-brand3 overflow-y-auto">
          <EditPage onClose={handleClose} />
        </DialogContent>
      </Dialog>

      <div className="bg-[rgba(169,126,255,0.08)] mt-10 md:mt-24 flex flex-col space-y-6 rounded-[20px]  justify-center items-center border border-brand2 p-4 sm:p-5 h-[500px] md:h-[800px]  relative overflow-hidden backdrop-blur-[6.7px]">
        
        {/* Avatar + Name + Address */}
        <div className="flex flex-col md:flex-col sm:flex-row items-center gap-4 md:gap-5 mt-4 md:mt-0 w-full sm:w-auto">
          <Avatar className="size-[100px] sm:size-[120px] md:size-[180px] border-[4px] border-brand5">
            {userData.usermetadata?.image_url ? (
              <AvatarImage src={userData.usermetadata.image_url} className="object-cover" />
            ) : (
              <AvatarFallback>{userData.name?.slice(0, 2) || "CN"}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col items-center  w-full sm:w-auto text-center sm:text-left">
            <div className="text-white font-semibold text-xl sm:text-2xl md:text-[26px]">
              {userData.name || "Unknown User"}
            </div>

            <div className="flex items-center justify-center sm:justify-start text-brand5 text-sm mt-1 gap-1">
              {clipAddress(accounts[0]?.address || "")}
              <button
                onClick={() => handleCopy(accounts[0]?.address || "")}
                disabled={copied}
                className="text-white px-1"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6 w-full">
          
          {userData.email && (
            <div className="flex flex-col gap-1">
              <div className="text-[#DACCF6] font-semibold text-base sm:text-xl">E-mail:</div>
              <div className="text-[#f2f2f2] break-all">{userData.email}</div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="text-brand5 font-semibold text-base sm:text-xl">BIO:</div>
            <div className="text-[#f2f2f2]">{userData.usermetadata?.bio || "No bio available"}</div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-2">
            <div className="text-brand5 font-semibold text-base sm:text-xl">Social:</div>

            {userData.usermetadata?.x_url && (
              <a
                href={userData.usermetadata.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#f2f2f2] hover:text-[#DACCF6] transition-colors text-sm"
              >
                {/* X Icon */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="truncate">{userData.usermetadata.x_url}</span>
              </a>
            )}

            {userData.usermetadata?.linkedin && (
              <a
                href={userData.usermetadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#f2f2f2] hover:text-[#DACCF6] transition-colors text-sm"
              >
                {/* LinkedIn Icon */}
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                <span className="truncate">{userData.usermetadata.linkedin}</span>
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3">
            <div className="text-brand5 font-bold text-base sm:text-xl">Communities you might be interested in:</div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {userData?.interested_tag?.length > 0 ? (
                userData.interested_tag.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-brand1 text-white text-xs sm:text-sm rounded-3xl border-2 border-brand3 px-4 py-1"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <div className="text-white text-sm">No interested tags</div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="bg-primary-400 rounded-br-lg w-[45px] h-10  absolute left-[-1px] top-[-28px] sm:top-[-25px]"
          >
            <img className="w-[35px] h-[35px] md:w-[40px] md:h-[40px]" src="/edit.svg" alt="Edit" />
          </button>
        )}
      </div>
    </>

  );
};

export default Sidebar;
