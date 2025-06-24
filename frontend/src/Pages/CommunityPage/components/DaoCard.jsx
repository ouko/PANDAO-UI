import { useState, useEffect } from 'react';
import { Check, Copy, Info } from 'lucide-react';
import { clipAddress } from '@/utils/functions/ClipAddress'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Card } from '@/components/ui/card'
import { useAccount } from '@/AccountContext';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useBluePrintSlugStore from '@/store/blueprintSlug';
import PropTypes from 'prop-types';


const DaoCard = ({ daoData, isUserParticipant,  setExecOpen, onSuccess, isOwner }) => {
  const [copied, setCopied] = useState(false);
  const [copied1, setCopied1] = useState(false);
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  const [userBondEarnings, setUserBondEarnings] = useState(null);
  const [loadingEarnings, setLoadingEarnings] = useState(false);
  const { slug } = useBluePrintSlugStore()

  const { accounts } = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch user bond earnings when component mounts or when accounts/params change
  useEffect(() => {
    if (accounts && accounts.length > 0 && params.id && isUserParticipant) {
      fetchUserBondEarnings();
    }
  }, [accounts, params.id, isUserParticipant]);

  // Function to fetch user bond earnings
  const fetchUserBondEarnings = async () => {
    if (!accounts || accounts.length === 0) return;
    
    setLoadingEarnings(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/bond/user-earnings/${accounts[0].address}`,
        {
          params: {
            community_id: params.id
          }
        }
      );
      
      if (response.data) {
        console.log('User Bond Earnings:', response.data);
        setUserBondEarnings(response.data);
      }
    } catch (error) {
      console.error('Error fetching user bond earnings:', error);
      toast.error('Failed to fetch bond earnings');
    } finally {
      setLoadingEarnings(false);
    }
  };


  const handleJoinCommunity = async () => {
    const data = {
      community_id: params.id,
      participant_address: accounts[0].address,
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant`,
        data,
      )
      if (response.data !== null) {
        console.log('Response:', response.data)
        toast.success('Welcome to the Community')
        onSuccess()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log('Error joining community:', error)
      toast.error('Something went wrong')
    }
  }

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const handleCopy2 = (address) => {
    navigator.clipboard.writeText(address);
    setCopied1(true);
    setTimeout(() => {
      setCopied1(false);
    }, 1000);
  };

  return (

    <>
      <div
        className="bg-[rgba(169,126,255,0.08)]  rounded-[20px] border-solid border-[#5228A4] border pt-[13px]  pb-[13px] pl-[25px] self-stretch shrink-0 h-[410px] relative overflow-hidden"

      >

        <div className="flex flex-col gap-3.5 items-center justify-start w-[171px] absolute left-[43px] top-[21px]">
          <img
            className="rounded-[50%] border-solid border-primary-300 border-[5px] shrink-0 w-[152px] h-[152px] object-cover"
            src={daoData.image}
            alt="Community Logo"
          />
          <div className="flex flex-col gap-[3px] items-center justify-start self-stretch shrink-0 ">
            <div className="flex flex-row gap-3 items-center justify-start shrink-0 ">
              <div className="text-[#AE85FF] text-left font-['Inter-Regular',_sans-serif] text-[10px] font-normal uppercase">
                Community Name
              </div>
            </div>
            <div className="text-[#ffffff] text-center font-['ClashDisplayVariable-Semibold',_sans-serif] text-[26px] font-semibold  self-stretch">
              {daoData.name ? (
                daoData.name
              ) : (
                <div className="w-full h-10 bg-purple-300 animate-pulse rounded mx-auto opacity-80" />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] items-start justify-start  absolute left-[255px] top-[30px]">

          <div className="flex flex-col gap-1 items-start justify-start shrink-0  marker:">
            <div className="text-[#AE85FF] text-left text-base font-normal uppercase  self-stretch">
              Purpose:
            </div>
            <div className="text-[#ffffff] w-[380px]  text-xl font-normal">
              {daoData.purpose ? (
                daoData.purpose
              ) : (
                <div className="w-full h-4 bg-purple-300 animate-pulse rounded mx-auto opacity-80" />
              )}
            </div>

          </div>

          <div className="flex flex-col gap-1.5 items-start justify-start shrink-0  z-30">
            <div className="text-[#AE85FF] text-left text-base font-normal uppercase  self-stretch">
              Owner address:
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[#ffffff] text-center text-xl font-normal overflow-hidden">
                {daoData.owner_address ? (
                  clipAddress(daoData.owner_address)
                ) : (
                  <div className="h-5 w-40 bg-purple-300 animate-pulse rounded mx-auto opacity-80" />
                )}
              </div>

              <p
                className="cursor-pointer"
                onClick={() => handleCopy(daoData.owner_address)}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 items-start justify-start shrink-0  z-30">
            <div className="text-[#AE85FF] text-left text-base font-normal uppercase  self-stretch">
              Component Address:
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[#ffffff] text-center text-xl font-normal overflow-hidden">
                {daoData.owner_address ? (
                  clipAddress(daoData.component_address)
                ) : (
                  <div className="h-5 w-40 bg-purple-300 animate-pulse rounded mx-auto opacity-80" />
                )}
              </div>

              <p
                className="cursor-pointer"
                onClick={() => handleCopy2(daoData.component_address)}
              >
                {copied1 ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 items-start justify-start self-stretch shrink-0 z-30">
  <div className="text-[#AE85FF] text-left text-base font-normal uppercase self-stretch">
    Description:
  </div>
  <div className="flex flex-col gap-1 items-start w-[526px]">
    <div className={`text-[#ffffff] text-start text-[16px] font-normal ${!showFullDescription ? 'line-clamp-2 sm:line-clamp-3 md:line-clamp-2' : ''}`}>
      {daoData.description || 'No description available'}
        </div>
    {daoData.description && (
      <button
        onClick={() => setShowFullDescription(!showFullDescription)}
        className="text-purple-400 text-sm underline hover:text-purple-300 transition-colors mt-1 focus:outline-none focus:ring-1 focus:ring-purple-400"
        aria-expanded={showFullDescription}
      >
        {showFullDescription ? "See less" : "See more"}
      </button>
    )}
  </div>
</div>

        </div>

        <div className="flex justify-end items-start  w-full h-full p-4">
          {/* First Box */}
          <Card className="flex flex-col gap-1.5 items-start justify-start bg-[rgba(0,0,0,0.20)] rounded-[15px] border border-[rgba(255,255,255,0.12)]  px-5 py-3">
            <div className="flex flex-row gap-[11px] items-center">
              <Info className='text-purple-400' />
              <div className="text-[#AE85FF] text-base font-normal uppercase">DAO TYPE:</div>
            </div>
            <div className="text-white text-xl font-normal">{daoData.blueprint_slug} DAO</div>
          </Card>

          {/* Second Box */}
          <Card className="flex flex-col gap-1.5 items-start justify-start bg-[rgba(0,0,0,0.20)] rounded-[15px] border border-[rgba(255,255,255,0.12)] px-5 py-3 ">
            <div className="flex flex-row gap-[11px] items-center">
              <Info className='text-purple-400' />
              <div className="text-[#AE85FF] text-base font-normal uppercase">Proposal rights:</div>
            </div>
            <div className="text-white text-xl font-normal">
              {daoData.proposal_rights === "EVERYONE" ? "Creation is open to all" : "Restricted Access"}
            </div>
          </Card>
        </div>


        <div className=" w-full h-full">
          <div className="absolute bottom-4 text-white right-4 flex gap-2">
            {!isUserParticipant && (
              <Button
                variant="brand"
                onClick={handleJoinCommunity}
              >
                Join Community
              </Button>
            )}

            {isUserParticipant && (
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                  {/* <Button
                    className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-white font-semibold rounded-full"

                    onClick={() => setTransferOpen(true)}>
                    Transfer Executive Badge
                  </Button> */}
                  {isOwner && <Button
                    variant="brand"
                    onClick={() => setExecOpen(true)}>
                    Mint Executive Badge
                  </Button>}

                  <Button
                    variant="brand"
                    className="text-white"
                    onClick={() => setQuickStartOpen(true)}>
                    Quick Start
                  </Button>
                </div>
                
                {/* Display user bond earnings */}
                {loadingEarnings ? (
                  <div className="text-brand7 text-sm mt-2">Loading bond earnings...</div>
                ) : userBondEarnings ? (
                  <div className="bg-[rgba(169,126,255,0.15)] p-3 w-full px-8 rounded-lg mt-2">
                    <h3 className="text-brand7 font-medium text-sm mb-1">Your Bond Earnings</h3>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-xs  ">Total Earnings:</span>
                        <span className=" text-xs text-green-400 font-medium">
                          {userBondEarnings.total_earnings || '0'} XRD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-xs">Total Return:</span>
                        <span className="text-green-400 text-xs font-medium">
                          {userBondEarnings.total_return_value || '0'} XRD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-xs">Total Bonds:</span>
                        <span className="text-white text-xs font-medium">
                          {userBondEarnings.total_bonds || '0'}
                        </span>
                      </div>
                     
                      <Button 
                        variant="link" 
                        className="text-brand7 text-xs p-0 mt-1 hover:text-brand5"
                        onClick={() => navigate(`/community/detail/${params.id}/bondrecipt`)}
                      >
                        View All Bonds
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>





      </div>
      <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-2xl w-full  p-6 bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md border-[1px] border-brand3 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-brand7 w-full text-center">
              Quick Start
            </DialogTitle>
            <DialogDescription className="flex flex-col md:flex-row items-center gap-4 mt-4 w-full">
              <Card
                className="w-full p-6 bg-[rgba(121,84,196,0.8)] border-[1px] border-brand2 hover:bg-[rgba(169,126,255,0.34)] transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/community/detail/${params.id}/proposals?state="proposal"`)
                }
              >
                <h3 className="text-xl font-medium text-gray-300">
                  Create a Proposal
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Start a new project by creating a detailed proposal.
                </p>
              </Card>

              {slug === 'insurance' ? (
                <Card
                  className="w-full p-6 bg-[rgba(121,84,196,0.8)] border-[1px] border-brand2 hover:bg-[rgba(169,126,255,0.34)] transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    navigate(`/community/detail/${params.id}/annissue`)
                  }
                >
                  <h3 className="text-xl font-medium text-gray-300">
                    Create AAN
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Create an Automated Assurance  (AAN) for insurance claims.
                  </p>
                </Card>
              ) : (
                <Card
                  className="w-full p-6 bg-[rgba(121,84,196,0.8)] border-[1px] border-brand2 hover:bg-[rgba(169,126,255,0.34)] transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    navigate(`/community/detail/${params.id}/bondissue`)
                  }
                >
                  <h3 className="text-xl font-medium text-gray-300">
                    Create a Bond
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Secure your projects with a reliable bond.
                  </p>
                </Card>
              )}
            </DialogDescription>


          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>

  );
};
DaoCard.propTypes = {
  daoData: PropTypes.object.isRequired,
  isUserParticipant: PropTypes.bool.isRequired,
  setExecOpen: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};
export default DaoCard;
