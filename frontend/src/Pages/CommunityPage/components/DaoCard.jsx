import React, { useState } from 'react';
import { useAccount } from "@/AccountContext";
import { Check, Copy } from 'lucide-react';
import { clipAddress } from '@/utils/functions/ClipAddress'




const DaoCard = ({ daoData }) => {
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
      className="bg-[rgba(169,126,255,0.08)] rounded-[20px] border-solid border-[#5228A4] border pt-[13px] pr-[25px] pb-[13px] pl-[25px] self-stretch shrink-0 h-[295px] relative overflow-hidden"
      style={{ backdropFilter: 'blur(6.7px)' }}
    >
      {/* Profile Section */}
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
      {/* Information Section */}
      <div className="flex flex-col gap-[26px] items-start justify-start w-[656px] absolute left-[255px] top-[30px]">
        {/* Purpose */}
        <div className="flex flex-col gap-1 items-start justify-start shrink-0  relative">
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative self-stretch">
            Purpose:
          </div>
          <div className="text-[#ffffff] text-center text-xl font-normal relative self-stretch">
            {daoData.purpose}
          </div>
        </div>
        {/* Owner Address */}
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
        {/* Component Address */}
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
      {/* DAO Type */}
      <div className="bg-[rgba(0,0,0,0.20)] rounded-[15px] border-solid border-[rgba(255,255,255,0.12)] border w-[197px] h-[75px] absolute left-[597px] top-[19px]" />
      <div className="flex flex-col gap-1.5 items-start justify-start absolute left-[617px] top-8">
        <div className="flex flex-row gap-[11px] items-center justify-start shrink-0 relative">
          <img className="shrink-0 w-4 h-4 relative overflow-visible" src="/Error.svg" alt="Error Icon" />
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative">DAO TYPE:</div>
        </div>
        <div className="text-[#ffffff] text-center text-xl font-normal relative">{daoData.blueprint_slug} DAO</div>
      </div>
      {/* Proposal Rights */}
      <div className="bg-[rgba(0,0,0,0.20)] rounded-[15px] border-solid border-[rgba(255,255,255,0.12)] border w-[238px] h-[75px] absolute left-[803px] top-[19px]" />
      <div className="flex flex-col gap-1.5 items-start justify-start absolute left-[824px] top-8">
        <div className="flex flex-row gap-[11px] items-center justify-start shrink-0 relative">
          <img className="shrink-0 w-4 h-4 relative overflow-visible" src="/Error.svg" alt="Error Icon" />
          <div className="text-[#AE85FF] text-left text-base font-normal uppercase relative">Proposal rights:</div>
        </div>
        <div className="text-[#ffffff] text-center text-xl font-normal relative">
          {daoData.proposal_rights === 'EVERYONE' ? 'Creation is open to all' : 'Restricted Access'}
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
