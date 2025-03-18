import { useAccount } from "@/AccountContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPage from "./EditPage";

const Sidebar = ({ userData, isAdmin = true ,onEdit}) => {
  const [copied, setCopied] = useState(false);
const [open,setOpen]=useState(false)
  const navigate = useNavigate();
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

  console.log(userData,"faisal")
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent className="sm:max-w-7xl max-h-[500px] bg-brand2 border-brand4 overflow-y-auto">
          <EditPage onClose={handleClose}/>
        </DialogContent>
      </Dialog>

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
          <div className="flex flex-col gap-4">
          <div className="text-[#DACCF6] font-semibold text-xl">Social:</div>
        {userData.usermetadata?.x_url && (
          <a 
            href={userData.usermetadata.x_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f2f2f2] hover:text-[#DACCF6] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>{userData.usermetadata.x_url}</span>
          </a>
        )}
        {userData.usermetadata?.linkedin && (
          <a 
            href={userData.usermetadata.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f2f2f2] hover:text-[#DACCF6] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
            <span>{userData.usermetadata.linkedin}</span>
          </a>
        )}
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
        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="bg-primary-400 rounded-br-lg w-[53px] h-11 absolute left-[-1px] top-[-1px]"
          >
            <img className="w-[43px] h-[43px]" src="/edit.svg" alt="Edit" />
          </button>
        )}
      </div>
    </>

  );
};

export default Sidebar;
