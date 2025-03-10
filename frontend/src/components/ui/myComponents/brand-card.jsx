import React, { useState } from "react";
import { Users, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAccount } from "@/AccountContext";

const BrandCard = ({ daos }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { accounts } = useAccount();

  console.log(daos, "faisl")
  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path);
    } else {
      setOpen(true);
    }
  };

  const renderStat = (icon, value, tooltip) => (
    <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm bg-[#5228A4] border-[#7F42F9]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            {icon}
            <p className="text-sm text-white">{value}</p>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (

    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have not connected your Wallet</DialogTitle>
            <DialogDescription>
              Please connect your wallet your Radix Wallet
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 z-30">
        {daos.map((dao, index) => (
          <Card
            key={index}
            onClick={() => handleNavigation(`/community/detail/${dao.id}`)}
            className="flex overflow-hidden flex-col items-start justify-between p-5 h-[200px] cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-[#2b1b49] rounded-lg"
          >
            <div className="flex flex-col items-start  space-y-5 overflow-hidden w-full">
              <div className="w-full overflow-hidden flex items-start justify-start gap-4 ">
                <img
                  src={dao.image}
                  alt={dao.name || "DAO"}
                  className="size-[60px]  object-cover rounded-md"
                />
                <div className="flex flex-col ">
                  <div className="text-xl font-semibold text-white">{dao.name}</div>
                  <div className="line-clamp-1 text-[#B59AEC] mt-1">
                    {dao.description || "No description available"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {dao.tags?.slice(0, 2).map((tag, index) => (
                  <div
                    key={index}
                    className="rounded-full p-[2px] bg-gradient-to-r from-brand2 via-brand5 to-brand2"
                  >
                    <div className="w-full rounded-full bg-brand1 flex justify-center items-center">
                      <h1 className="text-white font-bold text-[12px] px-3 py-[0.5]">
                        {tag}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end w-full mt-1 ">
              <div className="flex items-center gap-2">
                {renderStat(
                  <Users className="h-4 w-4 text-white" />,
                  dao.number_of_participants,
                  "Total Number of Participants"
                )}
                {renderStat(
                  <Banknote className="h-4 w-4 text-white" />,
                  dao.funds || 0,
                  "Total Funds"
                )}
              </div>

            </div>
          </Card>
        ))}
      </div>
    </>

  );
};

export default BrandCard;
