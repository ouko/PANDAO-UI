import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import AvatarCircles from '@/components/ui/myComponents/avatarCircle'

import {
  FiActivity,
  FiDollarSign,
  FiTag,
  FiThumbsUp,
  FiMessageSquare,
  FiFileText,
  FiAward
} from 'react-icons/fi'

import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import {

  BadgeCheck,
  ChevronRight,

} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogTrigger,
} from '@/components/ui/dialog'

import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonCard } from '../GlobalComponents/Skeleton'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const Members = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()
  const params = useParams()
  const sendTransaction = useSendTransaction()
  const [loading2, setLoading2] = useState(false)
  const queryClient = useQueryClient();
  const [openParticipantIndex, setOpenParticipantIndex] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const { data: participants = [], isLoading: loading } = useQuery({
    queryKey: ['participants', params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id}`
      );
      return res.data;
    },
  });

  const handleTransfer = async (transferAddress) => {
    if (transferAddress.trim() === "") {
      toast.error("Fill Fields")
      return
    }
    setLoading2(true)
    const data = {
      user_address: accounts[0].address,
      community_id: params.id,
      recipient: transferAddress
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/transfer-executive-token`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const responseData =
        typeof response.data === 'string'
          ? response.data.trim()
          : JSON.stringify(response.data)
      const { receipt } = await sendTransaction(responseData)
      const txId = receipt?.transaction?.intent_hash
      if (txId) {
        try {
          const submitResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
            {
              tx_id: txId,
              user_address: accounts[0].address,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          toast.success('Transfer Token Successfully!')
          setOpenParticipantIndex(null)

          queryClient.invalidateQueries({ queryKey: ['participants', params.id] });
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error selling token:', error.response?.data?.detail)
      toast.error('Something went wrong.')
    } finally {
      setLoading2(false)
    }
  }

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  console.log(participants, "fdasf")
  return (
    <div className=" items-start justify-start min-h-screen overflow-hidden z-50 text-brand7 ">
      <div className="flex md:flex-row flex-col  px-2 md:px-[12px] py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col  mx-auto gap-2">
            <div className="md:w-[100%] space-y-6 mx-[1px] ">

              <div
                className="rounded-2xl border border-[#5228A4] p-4 sm:p-7 mt-5 flex flex-col gap-4 items-start justify-center relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center w-full">
                  <div className="bg-[#554573] rounded-full p-4 sm:p-5 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto sm:mx-0">
                    <img
                      className="w-12 h-12 sm:w-14 sm:h-14"
                      src="/member.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left w-full">
                    <div className="text-brand6 font-semibold uppercase text-lg sm:text-xl">
                      Total Members:
                    </div>
                    <div className="text-gray-300 text-[36px] sm:text-[56px] font-medium">
                      {participants.length} Members
                    </div>

                    {participants.length > 4 && (
                      <div className="mt-2 sm:mt-0">
                        <AvatarCircles
                          numPeople={participants.length - 3}
                          src1={participants[0].image_url}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border border-[#5228A4]  relative overflow-hidden">
                <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                  <div className="text-[#ffffff] text-left  text-xl md:text-2xl font-medium flex items-center gap-2">

                    Members:
                  </div>

                </div>




                {loading ? (
                  <div className="flex flex-col h-auto items-center px-5  justify-center text-center mt-5">
                    {[...Array(4)].map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : participants.length === 0 ? (
                  <div className="flex items-center justify-center h-20">
                    Be the first one to join the community
                  </div>
                ) : (
                  participants.map((participant, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent py-3 to-brand1 hover:border-brand5 transition-transform duration-300 
                      flex flex-col md:flex-row items-start md:items-center my-4 justify-between gap-4 md:gap-2 mx-2 sm:mx-4 p-4 border border-brand2 rounded-lg shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row w-full sm:w-auto items-start sm:items-center gap-3 relative">
                       
                        <Avatar>
                          <AvatarImage alt="Avatar" src={participant.image_url} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left cursor-pointer text-ellipsis overflow-hidden">
                          <p className="font-medium text-brand7 text-lg">
                            {participant.name || 'Unnamed Participant'}
                          </p>
                          <div className="text-gray-200 dark:text-gray-400 text-sm truncate">
                            {clipAddress(participant.public_address || '')}
                          </div>
                        </div>
                         <div className="absolute right-0 top-0 sm:static sm:mt-0 flex items-center gap-2 sm:flex-row flex-col">
                          {participant.is_executive_member && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <BadgeCheck className="px-3 py-1 text-xs rounded-full w-8 h-8 sm:w-12 sm:h-12" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#5228A4] border-[#7F42F9] text-white">
                                  <p>This member is Executive Member</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}

                          {participant.badges && participant.badges.length > 0 && (
                            <div className="flex sm:mt-2 mt-0">
                              {participant.badges.map((badge) => (
                                <TooltipProvider key={badge.badge_id}>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="relative mr-2">
                                        <img
                                          src={badge.badge_image}
                                          alt={badge.badge_name}
                                          className="w-8 h-8 rounded-full"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/radix.webp";
                                          }}
                                        />
                                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                          {badge.badge_points}
                                        </span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#5228A4] border-[#7F42F9] text-white max-w-xs">
                                      <p className="font-bold">{badge.badge_name}</p>
                                      <p className="text-xs">{badge.badge_description}</p>
                                      <p className="text-xs mt-1">Points: {badge.badge_points}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
                        <Dialog open={openParticipantIndex === index}
                          onOpenChange={(isOpen) => setOpenParticipantIndex(isOpen ? index : null)}
                          key={index}>
                          <DialogTrigger>
                            <div className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-white text-[14px] leading-5 font-medium">
                              View Details
                            </div>
                          </DialogTrigger>
                          <DialogContent className="w-[90vw] sm:max-w-2xl p-4 sm:p-6 bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md border border-brand3 rounded-lg shadow-lg">
                            <DialogDescription>
                              <div className="space-y-6">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage alt="Avatar" src={participant.image_url} />
                                      <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left overflow-hidden">
                                      <p className="font-medium text-lg text-white">
                                        {participant.name || 'Unnamed Participant'}
                                      </p>
                                      <div className="text-gray-200 text-sm truncate">
                                        {clipAddress(participant.public_address || '')}
                                      </div>
                                    </div>
                                  </div>

                                  <Button
                                    variant="brand"
                                    className="text-white w-full sm:w- mx-4"
                                    onClick={() => handleTransfer(participant.public_address)}
                                    disabled={loading2}
                                  >
                                    Transfer Executive Badge
                                  </Button>
                                </div>

                                {participant.badges && participant.badges.length > 0 && (
                                  <div className="space-y-3">
                                    <h3 className="text-lg font-medium text-white flex items-center">
                                      <FiAward className="mr-2" /> Member Badges
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                      {participant.badges.map((badge) => (
                                        <div
                                          key={badge.badge_id}
                                          className="bg-[rgba(82,40,164,0.3)] border border-[#7F42F9] rounded-lg p-3 flex items-start gap-3 max-w-xs"
                                        >
                                          <div className="relative">
                                            <img
                                              src={badge.badge_image}
                                              alt={badge.badge_name}
                                              className="w-12 h-12 rounded-full object-cover"
                                              onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/default-badge.png";
                                              }}
                                            />
                                            <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                              {badge.badge_points}
                                            </div>
                                          </div>
                                          <div>
                                            <h4 className="font-bold text-white">{badge.badge_name}</h4>
                                            <p className="text-xs text-gray-200">{badge.badge_description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                  <div className="flex items-start gap-2">
                                    <FiActivity className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Activities:</p>
                                    <span className="text-brand7">{participant.activities}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiDollarSign className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Total Invested:</p>
                                    <span className={`font-medium ${participant.total_invested < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                      {participant.total_invested.toFixed(2)} XRD
                                    </span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiTag className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Times Tokens Bought:</p>
                                    <span className="font-medium text-brand7">{participant.token_bought}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiTag className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Times Tokens Sold:</p>
                                    <span className="font-medium text-brand7">{participant.token_sold}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiThumbsUp className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Proposals Voted:</p>
                                    <span className="font-medium text-brand7">{participant.proposal_voted}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiMessageSquare className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Comments on Proposals:</p>
                                    <span className="font-medium text-brand7">{participant.commented_on_proposal}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiMessageSquare className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Discussion Comments:</p>
                                    <span className="font-medium text-brand7">{participant.discussion_comment}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiFileText className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Proposals Created:</p>
                                    <span className="font-medium text-brand7">{participant.proposal_created}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiFileText className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Zero Coupon Bonds Created:</p>
                                    <span className="font-medium text-brand7">{participant.zero_coupon_bond_created}</span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiFileText className="text-gray-200" />
                                    <p className="text-sm text-gray-300 font-medium">Discussions:</p>
                                    <span className="font-medium text-brand7">{participant.discussion}</span>
                                  </div>
                                </div>
                              </div>
                            </DialogDescription>

                          </DialogContent>
                        </Dialog>

                        <div
                          onClick={() =>
                            navigate(`/userDashboard/userProfile/${participant.public_address}`)
                          }
                          className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1 sm:gap-2 rounded-[26px] py-2 px-[15px] cursor-pointer bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-white text-[14px] leading-5 font-medium text-center"
                        >
                          Visit Profile
                          {/* <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" /> */}
                        </div>

                      </div>
                    </div>
                  )))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members
