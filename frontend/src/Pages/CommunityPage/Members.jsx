import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AvatarCircles from '@/components/ui/myComponents/avatarCircle'
import { Textarea } from '@/components/ui/textarea'
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
  ArrowBigLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        <div className="space-y-6 md:w-[100%] ">
          <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
            <div className="md:w-[100%] space-y-6  ">
              <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                <div className="flex items-center justify-between">
                  <div className="bg-slate-200 w-fit p-2 rounded-full">
                    <Users className=" text-blue-700" />
                  </div>
                  {/* <div>
                      <Button variant="radix" >
                        Manage members
                      </Button>
                    </div> */}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-semibold">
                    {participants.length} Members
                  </div>
                  {participants.length > 4 && (
                    <AvatarCircles
                      numPeople={participants.length - 3}
                      src1={participants[0].image_url}
                    />
                  )}
                </div>
              </Card>


              <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2">
                <div className="p-2 border-b-2 -translate-x-2">Members</div>
                {loading ? (
                  <div className="flex flex-col h-auto items-center justify-center text-center mt-5">
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

                    <Card

                      key={index}
                      className="bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2 md:w-full mx-auto p-4 border border-gray-200 rounded-lg shadow-sm"
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
                          <p className="font-medium text-lg">
                            {participant.name || 'Unnamed Participant'}
                          </p>
                          <div className="text-gray-600 dark:text-gray-400 text-sm truncate">
                            {clipAddress(participant.public_address || '')}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Dialog>
                          <DialogTrigger>
                            <div className="text-left group border-2 px-3 py-2 rounded-md hover:text-blue-600 cursor-pointer hover:shadow-sm text-ellipsis overflow-hidden flex items-center text-sm">
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
                                  <div className="text-left cursor-pointer text-ellipsis overflow-hidden">
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
                            navigate(
                              `/userDashboard/userProfile/${participant.public_address}`,
                            )
                          }
                          className="text-left group border-2 px-3 py-2 rounded-md hover:text-blue-600 cursor-pointer hover:shadow-sm text-ellipsis overflow-hidden flex items-center text-sm"
                        >
                          Visit Profile{' '}
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  )))}
              </Card>




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
