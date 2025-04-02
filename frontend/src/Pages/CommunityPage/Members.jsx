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
} from 'react-icons/fi'

import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import {

  ChevronRight,

} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogTrigger,
} from '@/components/ui/dialog'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SkeletonCard } from '../GlobalComponents/Skeleton'

const Members = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()
  const params = useParams()

  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchParticipant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id
        }`,
      )
      setParticipants(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }

  useEffect(() => {
    fetchParticipant()
  }, [params.id])

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  console.log(participants.length)
  return (
    <div className=" items-start gap-3 justify-start min-h-screen overflow-hidden bg-brand1 z-50 text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[95%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">

              <div
                className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden"
              >
                
                <div className="flex flex-row  gap-10 items-center w-full">
                  <div
                    className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                    <img
                      className="w-14 h-14"
                      src="/member.svg"
                      alt="User Icon"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div
                     className="text-[#5228A4] font-semibold uppercase text-xl"
                    >
                      Total Issued Bonds:
                    </div>
                    <div
                      className="text-white text-[56px] font-medium text-center"
                    >
                      {participants.length} Members
                    </div>
                    {participants.length > 4 && (
                      <AvatarCircles
                        numPeople={participants.length - 3}
                        src1={participants[0].image_url}
                      />
                    )}
                  </div>
                </div>
              </div>




              <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4]  relative overflow-hidden">
                <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                  <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                    Members:
                  </div>
                  
                </div>




                {loading ? (
                  <div className="flex flex-col h-auto items-center  justify-center text-center mt-5">
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
                      className="bg-gradient-to-br from-[rgba(24,18,45,0.59)] via-transparent to-brand1 hover:scale-95 transition-transform duration-300 
                        flex flex-col my-4  md:flex-row items-start md:items-center justify-between gap-4 md:gap-2  mx-4 p-4 border border-brand2 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            alt="Avatar"
                            src={participant.image_url}
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left cursor-pointer text-ellipsis overflow-hidden">
                          <p className="font-medium text-brand7 text-lg">
                            {participant.name || 'Unnamed Participant'}
                          </p>
                          <div className="text-gray-600 dark:text-gray-400 text-sm truncate">
                            {clipAddress(participant.public_address || '')}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row z-20 items-start md:items-center  gap-4">
                        <Dialog>
                          <DialogTrigger>
                            <div className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium">
                              View Details
                            </div>
                          </DialogTrigger>
                          <DialogContent className="max-w-[800px] ">

                            <DialogDescription>
                              <div className="">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      alt="Avatar"
                                      src={participant.image_url}
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                  </Avatar>
                                  <div className="text-left cursor-pointer text-ellipsis  overflow-hidden">
                                    <p className="font-medium text-lg">
                                      {participant.name ||
                                        'Unnamed Participant'}
                                    </p>
                                    <div className="text-gray-600 dark:text-gray-400 text-sm truncate">
                                      {clipAddress(
                                        participant.public_address || '',
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-10">
                                  <div className="flex items-start gap-2">
                                    <FiActivity className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Activities:
                                    </p>
                                    <span className="text-black">
                                      {participant.activities}
                                    </span>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <FiDollarSign className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Total Invested:
                                    </p>
                                    <span
                                      className={`font-medium ${participant.total_invested < 0
                                        ? 'text-red-500'
                                        : 'text-green-500'
                                        }`}
                                    >
                                      {participant.total_invested.toFixed(
                                        2,
                                      )}{' '}
                                      XRD
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiTag className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Times Tokens Bought:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.token_bought}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiTag className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Times Tokens Sold:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.token_sold}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiThumbsUp className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Proposals Voted:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.proposal_voted}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiMessageSquare className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Comments on Proposals:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.commented_on_proposal}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiMessageSquare className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Discussion Comments:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.discussion_comment}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiFileText className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Proposals Created:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.proposal_created}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiFileText className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Zero Coupon Bonds Created:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.zero_coupon_bond_created}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <FiFileText className="text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium">
                                      Discussions:
                                    </p>
                                    <span className="font-medium text-black">
                                      {participant.discussion}
                                    </span>
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
  className="rounded-[26px] py-2 px-[15px]  bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium flex items-center justify-between"
>
  Visit Profile
  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
</div>

                      </div>
                    </div>
                  )))}
              </div>




              {/* {loading && (
                <div className="flex flex-col h-[200px] items-center justify-center text-center  mt-5  ">
                                      <SkeletonCard />
                                    </div>
              )} */}


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members
