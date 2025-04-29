import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import {
  ActivityIcon,
  ChevronRight,
  ClockIcon,
  MessageCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { SkeletonCard } from '../GlobalComponents/Skeleton'
import { formatStandardDateTime } from '@/utils/functions/convertActivityData'
import FundHistoryGraph from './ChatHistory'
import { useQuery } from '@tanstack/react-query'
import { SkeletonActivity } from '../GlobalComponents/SkeletonActivity'
import ActivityCard from './components/activity-card'

const Activity = () => {
  const { accounts } = useAccount()
  const navigate = useNavigate()
  const params = useParams()
  const [showExpenses, setShowExpenses] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [participants, setParticipants] = useState([])
  const [address, setAddress] = useState(null)

  const [activity, setActivity] = useState([])
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
  const fetchComments = async () => {
    try {
      let res
      if (address == null) {
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/activity/${params.id
          }`,
        )
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/activity/${params.id
          }?user_address=${address}`,
        )
      }

      setActivity(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/funds-history/${params.id
        }`,
      )

      if (res.status == 200) {
        console.log(res.data, 'res-----res')
        setExpenses(res.data)
      }
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  useEffect(() => {
    fetchComments()
    fetchActivity()
    fetchParticipant()
  }, [params.id, address])

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }

  const [selectedActivityType, setSelectedActivityType] = useState('ALL');
  const ACTIVITY_TYPES = [
    "take_out_invested_xrds",
    "proposal_executed",
    "discussion_comment",
    "participate",
    "proposal_comment",
    "withdraw_sign",
    "executive_mint",
    "token_bought",
    "community_create",
    "appointed_executive_badge",
    "proposal_voted",
    "proposal_created",
    "withdraw_request",
    "zero_coupon_bond_created",
    "discussion"
  ];
  const activityTypeLabels = {
    take_out_invested_xrds: "take out invested xrd",
    proposal_executed: "proposal executed",
    discussion_comment: "discussion comment",
    participate: "participate",
    proposal_comment: "proposal comment",
    withdraw_sign: "withdraw sign",
    executive_mint: "executive mint",
    token_bought: "token bought",
    community_create: "community create",
    appointed_executive_badge: "appointed executive badge",
    proposal_voted: "proposal voted",
    proposal_created: "proposal created",
    withdraw_request: "withdraw request",
    zero_coupon_bond_created: "zero coupon bond created",
    discussion: "discussion"
  };

  return (
    <div className=" items-start gap-3 justify-start min-h-screen overflow-hidden  text-black px-2">
      {showExpenses ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col  mx-auto gap-2">
              <div className="md:w-[100%] space-y-6  ">


                <div className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden">

                  <div className="flex flex-row  gap-10 items-center w-full">
                    <div
                      className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                      <img
                        className="w-14 h-14"
                        src="/6.svg"
                        alt="User Icon"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div
                        className="text-[#5228A4] font-semibold uppercase text-xl"
                      >
                        Total Expenses:
                      </div>
                      <div
                        className="text-white text-[56px] font-medium text-center"
                      >
                        {expenses.length} Expenses so far.
                      </div>

                    </div>
                  </div>
                  <div className='absolute bottom-0 right-0 p-4'>
                    <Button
                      variant="brand"
                      onClick={() => setShowExpenses(!showExpenses)}
                    >
                      Show Activity
                    </Button>
                  </div>
                </div>
                <FundHistoryGraph />
                <div className="">
                  <Card className="bg-brand1 rounded-[10px] border-2 border-[#5228A4] h-full w-full relative overflow-hidden mb-5">
                    <div className="bg-[#39246b] pr-[15px] pl-[15px] flex z-50 flex-row items-center justify-between w-full h-[63px] sticky left-0 top-0">
                      <div className="text-[#ffffff] text-2xl font-medium">All Funds History</div>
                    </div>
                    {!loading && (
                      <div className="space-y-4 px-3 py-3 rounded-2xl">
                        {expenses && expenses.map((transaction) => (
                          <Card
                            key={transaction.id}
                            className="flex items-start gap-4 bg-brand1 hover:scale-95 transition-transform duration-300 border-[1px] border-[#5228A4] rounded-2xl p-3 text-white"
                          >
                            <Avatar className="h-16 w-20 object-cover rounded-lg mt-1 overflow-hidden shadow-md">
                              <img
                                src={transaction.image_url}
                                alt={transaction.user_name}
                                className="w-full h-full object-cover"
                              />
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="group">
                                  <div className="font-medium text-brand7 text-xl group-hover:underline cursor-pointer">
                                    {transaction.user_name}
                                  </div>
                                  <p className="text-sm text-gray-300">Transaction Hash: {transaction.tx_hash}</p>

                                </div>
                              </div>
                              <div className="py-2">
                                <p className={` text-xl font-semibold ${transaction.xrd_added > 0 ? 'text-green-500' : 'text-red-500'}`}>XRD Added: {transaction.xrd_added}</p>


                              </div>
                              <div className="font-light text-gray-300 items-end justify-end  flex group-hover:underline cursor-pointer">
                                Date: {new Date(transaction.date).toLocaleString()}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                    {loading && (
                      <div className="flex flex-col h-auto items-center justify-center text-center mt-5">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="h-16 w-full bg-gray-700 rounded-2xl animate-pulse mb-4"></div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col w-full  mx-auto gap-2">
              <div className="md:w-[100%] space-y-6  ">


                <div className="rounded-2xl border-2 border-[#5228A4] p-7 mt-5 flex flex-col gap-2.5 items-start justify-center relative overflow-hidden">

                  <div className="flex flex-row  gap-10 items-center w-full">
                    <div
                      className="bg-[#554573] rounded-full p-5 flex items-center justify-center w-24 h-24">
                      <img
                        className="w-14 h-14"
                        src="/6.svg"
                        alt="User Icon"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div
                        className="text-[#5228A4] font-semibold uppercase text-xl"
                      >
                        Total Activities:
                      </div>
                      <div
                        className="text-white text-[56px] font-medium text-center"
                      >
                        {activity.length} Activities so far.
                      </div>

                    </div>
                  </div>
                  <div className='absolute bottom-0 right-0 p-4'>
                    <Button variant="brand"
                      onClick={() => setShowExpenses(!showExpenses)}
                    >
                      Show Fund History
                    </Button>
                  </div>
                </div>



                <div className="flex gap-4">
                  <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] h-full  relative overflow-hidden w-full">
                    <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0 " >
                      <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                        Activity:
                      </div>

                    </div>
                    {!loading && (
                      <div className="space-y-4 px-3 py-3 rounded-2xl h-[600px] overflow-y-auto ">
                        {/* Activity Type Filter Dropdown */}
                        <div className="mb-4 flex items-center gap-2 justify-between sticky top-0 z-50 h-12 p-4 bg-[#39246b]">
                          <label htmlFor="activityTypeFilter" className="text-sm font-medium text-white">Filter by Activity Type:</label>
                          <select
                            id="activityTypeFilter"
                            className="rounded px-2 py-1 bg-brand3 text-white border border-brand6"
                            value={selectedActivityType}
                            onChange={e => setSelectedActivityType(e.target.value)}
                          >
                            <option value="ALL">All</option>
                            {ACTIVITY_TYPES.map(type => (
                              <option key={type} value={type}>{activityTypeLabels[type]}</option>
                            ))}
                          </select>
                        </div>
                        {activity &&
                          activity
                            .filter(ac => selectedActivityType === 'ALL' || ac.activity_type === selectedActivityType)
                            .map((ac, index) => (
                              <ActivityCard
                                key={index}
                                ac={ac}
                                navigate={navigate}
                                clipAddress={clipAddress}
                                formatStandardDateTime={formatStandardDateTime}
                              />
                             

                            ))}
                      </div>
                    )}
                    {loading && (
                      <div className="flex flex-col h-auto items-center justify-center text-center mt-5">
                        {[...Array(8)].map((_, i) => (
                          <SkeletonActivity key={i} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4] h-full    relative overflow-hidden w-[45%] ">
                    <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
                      <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                        Members:
                      </div>

                    </div>
                    {loading ? (
                      <div className="flex flex-col h-auto W-[800px] px-4 items-center justify-center text-center mt-5">
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
                          className={`bg-gradient-to-br from-[rgba(17,12,36,0.85)] to-brand3 hover:scale-[0.98] transition-transform duration-300 
                                    flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2 
                                    mx-2 my-2 p-4 border border-[#5228A4] rounded-lg shadow-md cursor-pointer 
                                    ${participant.public_address === address
                              ? "bg-gradient-to-br from-[rgba(103,103,133,0.85)] via-transparent to-brand1"
                              : ""
                            }`}
                          onClick={() => {
                            setAddress((prevAddress) =>
                              prevAddress === participant.public_address ? null : participant.public_address
                            );
                          }}
                        >
                          {/* Avatar + Info */}
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <Avatar className="w-12 h-12 ring-2 ring-brand6 shadow-sm">
                              <AvatarImage
                                alt="Avatar"
                                src={participant.image_url}
                                className="object-cover"
                              />
                              <AvatarFallback className="text-xs bg-brand6 text-white">👤</AvatarFallback>
                            </Avatar>

                            <div className="text-left flex-1 min-w-0">
                              <p className="font-semibold text-lg text-brand7 truncate">
                                {participant.name || 'Unnamed Participant'}
                              </p>
                              <p className="text-sm text-gray-300 truncate">
                                {clipAddress(participant.public_address || '')}
                              </p>
                            </div>
                          </div>
                        </div>

                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Activity
