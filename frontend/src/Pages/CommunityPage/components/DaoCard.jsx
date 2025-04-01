import React, { useState } from 'react';
import { useAccount } from "@/AccountContext";
import { Check, Copy } from 'lucide-react';
import { clipAddress } from '@/utils/functions/ClipAddress'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Card } from '@/components/ui/card'




const DaoCard = ({ daoData, isUserParticipant, handleJoinCommunity, setQuickStartOpen, quickStartOpen }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div
      className="bg-[rgba(169,126,255,0.08)] rounded-[20px] border-solid border-[#5228A4] border pt-[13px]  pb-[13px] pl-[25px] self-stretch shrink-0 h-[295px] relative overflow-hidden"
      
    >

      <div className="flex flex-col gap-3.5 items-center justify-start w-[171px] absolute left-[43px] top-[21px]">
        <img
          className="rounded-[50%] border-solid border-primary-300 border-[5px] shrink-0 w-[152px] h-[152px] relative object-cover"
          src={daoData.image}
          alt="Community Logo"
        />
        <div className="flex flex-col gap-[3px] items-center justify-start self-stretch shrink-0 relative">
          <div className="flex flex-row gap-3 items-center justify-start shrink-0 relative">
            <div className="text-[#AE85FF] text-left font-['Inter-Regular',_sans-serif] text-[10px] font-normal uppercase relative">
              Community Name
            </div>
          </div>
          <div className="text-[#ffffff] text-center font-['ClashDisplayVariable-Semibold',_sans-serif] text-[26px] font-semibold relative self-stretch">
            {daoData.name}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[26px] items-start justify-start w-[656px] absolute left-[255px] top-[30px]">

        <div className="flex flex-col gap-1 items-start justify-start shrink-0  relative">
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative self-stretch">
            Purpose:
          </div>
          <div className="text-[#ffffff] text-center text-xl font-normal relative self-stretch">
            {daoData.purpose}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 items-start justify-start shrink-0 relative">
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative self-stretch">
            Owner address:
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#ffffff] text-center text-xl font-normal overflow-hidden text-ellipsis">
              {clipAddress(daoData.owner_address)}
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handleCopy(daoData.owner_address)}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 items-start justify-start self-stretch shrink-0 relative">
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative self-stretch">
            Component Address:
          </div>
          <div className="flex flex-row gap-4 items-center justify-start self-stretch shrink-0 relative">
            <div className="text-[#ffffff] text-center text-base font-normal relative">
              {daoData.component_address}
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-end items-start relative w-full h-full p-4">
        {/* First Box */}
        <div className="flex flex-col gap-1.5 items-start justify-start bg-[rgba(0,0,0,0.20)] rounded-[15px] border border-[rgba(255,255,255,0.12)] w-[197px] h-[75px] p-2">
          <div className="flex flex-row gap-[11px] items-center">
            <img className="w-4 h-4" src="/Error.svg" alt="Error Icon" />
            <div className="text-[#AE85FF] text-base font-normal uppercase">DAO TYPE:</div>
          </div>
          <div className="text-white text-xl font-normal">{daoData.blueprint_slug} DAO</div>
        </div>

        {/* Second Box */}
        <div className="flex flex-col gap-1.5 items-start justify-start bg-[rgba(0,0,0,0.20)] rounded-[15px] border border-[rgba(255,255,255,0.12)] w-[238px] h-[75px] p-2 ml-4">
          <div className="flex flex-row gap-[11px] items-center">
            <img className="w-4 h-4" src="/Error.svg" alt="Error Icon" />
            <div className="text-[#AE85FF] text-base font-normal uppercase">Proposal rights:</div>
          </div>
          <div className="text-white text-xl font-normal">
            {daoData.proposal_rights === "EVERYONE" ? "Creation is open to all" : "Restricted Access"}
          </div>
        </div>
      </div>


      <div className=" w-full h-full">
        <div className="absolute bottom-4 right-4 flex gap-2">
          {!isUserParticipant && (
            <Button
              className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-black font-semibold rounded-full"
              variant="radix"
              onClick={handleJoinCommunity}
            >
              Join Community
            </Button>
          )}

          {isUserParticipant && (
            <div className='flex items-center gap-2'>
              {/* <Button variant="radix" onClick={() => setTransferOpen(true)}>
          Transfer Executive Badge
        </Button>
        <Button variant="radix" onClick={() => setExecOpen(true)}>
          Mint Executive Badge
        </Button> */}
              <Button
                className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-black font-semibold rounded-full"
                variant="radix"
                onClick={() => setQuickStartOpen(true)}>
                Quick Start
              </Button>


              <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className="max-w-xl p-6 bg-white rounded-lg shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
                      Quick Start
                    </DialogTitle>
                    <DialogDescription className="flex  items-center gap-4 mt-4 w-full">
                      <Card
                        className="w-full p-6 bg-gray-100 hover:bg-gray-200 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() =>
                          navigate(`/community/detail/${params.id}/proposals?state="proposal"`)
                        }
                      >
                        <h3 className="text-xl font-medium text-gray-800">
                          Create a Proposal
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Start a new project by creating a detailed proposal.
                        </p>
                      </Card>
                      <Card
                        className="w-full p-6 bg-gray-100 hover:bg-gray-200 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                        onClick={() =>
                          navigate(`/community/detail/${params.id}/bondissue`)
                        }
                      >
                        <h3 className="text-xl font-medium text-gray-800">
                          Create a Bond
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Secure your projects with a reliable bond.
                        </p>
                      </Card>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>





    </div>
  );
};

export default DaoCard;
