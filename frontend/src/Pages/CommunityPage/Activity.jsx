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
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${
          params.id
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
      if(address == null){
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/activity/${
            params.id
          }`,
        )
      }else {
        res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/activity/${
            params.id
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
        `${import.meta.env.VITE_BACKEND_URL}/community/funds-history/${
          params.id
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
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      {showExpenses ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-6  ">
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <ActivityIcon className=" text-blue-700" />
                    </div>
                    <div>
                      <Button
                        variant="radix"
                        onClick={() => setShowExpenses(!showExpenses)}
                      >
                        Show Activity
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {expenses.length} Expenses so far.
                  </div>
                </Card>
                <FundHistoryGraph />
                <div className="bg-transparent md:w-[70%] mx-auto md:p-4 p-4 space-y-2 flex items-center flex-col">
                  <Card className="w-full p-3 mb-5">
                    <div className="text-2xl font-semibold py-3">
                      All Funds History
                    </div>

                    {expenses.map((transaction) => (
                      <Card
                        key={transaction.id}
                        className="w-full p-4 mb-4 overflow-hidden"
                      >
                        <div className="flex items-center">
                          <img
                            src={transaction.image_url}
                            alt={transaction.user_name}
                            className="w-16 h-16 rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-bold text-lg">
                              {transaction.user_name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Date:{' '}
                              {new Date(transaction.date).toLocaleString()}
                            </p>
                            <p
                              className={`text-sm font-semibold ${
                                transaction.xrd_added > 0
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}
                            >
                              XRD Added:{transaction.xrd_added}
                            </p>
                            <p className="text-sm text-gray-600">
                              Transaction Hash: {transaction.tx_hash}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-6  ">
                <Card className="bg-white md:w-[100%] mx-auto md:p-10 p-4  space-y-10 ">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-200 w-fit p-2 rounded-full">
                      <ActivityIcon className=" text-blue-700" />
                    </div>
                    <div>
                      <Button
                        variant="radix"
                        onClick={() => setShowExpenses(!showExpenses)}
                      >
                        Show Fund History
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold">
                    {activity.length} Activities so far.
                  </div>
                </Card>
                <div className="flex gap-4">
                  <Card className="bg-white md:w-[70%] mx-auto md:p-4 p-4 space-y-2 h-fit ">
                    <div className="p-2 border-b-2 -translate-x-2">
                      Activity
                    </div>
                    {!loading && (
                      <div className="space-y-4">
                        {activity &&
                          activity.map((ac, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 bg-white border-b-2 rounded-none p-3  text-black"
                            >
                              <Avatar className="shrink-0 object-cover">
                                <img src={ac.user_image_url} alt="Avatar" />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div
                                    className="group"
                                    onClick={() =>
                                      navigate(
                                        `/userDashboard/userProfile/${ac.user_address}`,
                                      )
                                    }
                                  >
                                    <div className="font-medium group-hover:underline cursor-pointer">
                                      {ac.user_name}
                                    </div>
                                    <div className="font-light group-hover:underline cursor-pointer">
                                      {clipAddress(ac.user_address)}
                                    </div>
                                  </div>
                                  {/* <div className="text-xs text-gray-700 dark:text-gray-700">2 days ago</div> */}
                                </div>
                                <p className="text-gray-800 dark:text-gray-400 font-medium">
                                  {ac.info}
                                </p>
                                <div className="py-2 flex items-center gap-2 hover:text-slate-600">
                                  <ClockIcon className="h-5 w-5" />{' '}
                                  <p>{formatStandardDateTime(ac.created_at)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                    {loading && (
                      <div className="flex flex-col h-auto items-center justify-center text-center mt-5">
                        {[...Array(8)].map((_, i) => (
                          <SkeletonCard key={i} />
                        ))}
                      </div>
                    )}
                  </Card>
                  <Card className="bg-white md:w-[30%] mx-auto md:p-4 p-4 space-y-2 h-fit">
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
                          className={`bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-2 md:w-full mx-auto p-4 border border-gray-200 rounded-lg shadow-sm ${
                            participant.public_address === address ? "bg-purple-200" : ""
                          }`}
                          
                          onClick={() => {
                            setAddress((prevAddress) => 
                              prevAddress === participant.public_address ? null : participant.public_address
                            );
                          }}
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
                        </Card>
                      ))
                    )}
                  </Card>
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
