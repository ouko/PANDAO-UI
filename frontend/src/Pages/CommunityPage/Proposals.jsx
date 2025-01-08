import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

import { ChevronLeft, HandHelping } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomDatePicker from './components/CustomDatePicker'
import { Input } from '@/components/ui/input'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { toast } from 'sonner'
import { convertUnixTimestamp } from '@/utils/functions/ConvertDate'
import { formatStandardDateTime } from '@/utils/functions/convertActivityData'
import { Badge } from '@/components/ui/badge'
import { ProposalTypes } from '@/utils/data/proposalType'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SkeletonCard } from '../GlobalComponents/Skeleton'

const formatTime = (duration) => {
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((duration % (1000 * 60)) / 1000)
  return `${hours}h ${minutes}m ${seconds}s`
}
const Proposals = () => {
  const { accounts } = useAccount()
  const [timeLeft, setTimeLeft] = useState('')
  const [execute, setExecute] = useState(false)
  const [activeTab, setActiveTab] = useState('PENDING')
  const [activeProposal, setActiveProposal] = useState(null)
  const [vote, setVote] = useState(Boolean)
  const [voted, setVoted] = useState(false)
  const [participants, setParticipants] = useState([])

  const navigate = useNavigate()
  const params = useParams()
  const [proposal, setProposal] = useState('')
  const [comment, setComment] = useState('')
  const [loadingCom, setLoadingCom] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingCommnets, setLoadingComments] = useState(true)
  const [loadingAgainst, setLoadingAgainst] = useState(true)
  const [loadingFor, setLoadingFor] = useState(true)
  const [loadingButtonAgainst, setLoadingButtonAgainst] = useState(false)
  const [loadingButtonFor, setLoadingButtonFor] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  const [form, setShowForm] = useState(false)
  const [bondIssuerAddress, setBondIssuerAddress] = useState('')
  const [bondIssuerAddresses, setBondIssuerAddresses] = useState([])
  const [targetXrdAmount, setTargetXrdAmount] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('23:59')
  const [comments, setComments] = useState([])
  const [minimumQuorum, setMinimumQuorum] = useState('')
  const [proposalText, setProposalText] = useState('')
  const [voteType, setVoteType] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const [manifest, setManifest] = useState('')
  const [issuedBond, setIssuedBond] = useState(null)

  const [manifestForVoteAgainst, setManifestForVoteAgainst] = useState('')
  const [manifestForVoteFor, setManifestForVoteFor] = useState('')
  const sendTransaction = useSendTransaction()
  const handleAddComment = async () => {
    if (!activeProposal || !activeProposal.id) {
      toast.error('Proposal not loaded')
      return
    }
    if (comment.trim() === '') {
      toast.error('Add Something')
      return
    }
    const data = {
      user_addr: accounts[0].address,

      comment: comment,
      proposal_id: activeProposal.id,
    }
    setLoadingCom(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments`,
        data,
      )
      console.log('Comment Response:', response.data)
      toast.success('Comment Added')
      setComment('')
      fetchProposalsComments()
      setLoadingCom(false)
    } catch (error) {
      console.error('Error adding comment:', error)
    } finally {
      setLoadingCom(false)
      setComment('')
    }
  }
  const handleVoteType = (value) => {
    setVoteType(value)
  }
  const handleBondAddress = (value) => {
    if(value === "No issued Bond"){
      toast.error("Please buy a bond first.")
      return
    }
    const selectedBond = bondIssuerAddresses.find(
      (newValue) => newValue.creator_address === value,
    )
    setTargetXrdAmount(selectedBond.price)
    setBondIssuerAddress(value)
  }
  const fetchVoted = async () => {
    try {
      const res2 = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/community/proposal/is-voted?proposal_id=${
          activeProposal.id
        }&user_address=${accounts[0]?.address}`,
      )

      if (res2.status == 200) {
        console.log(res2, 'faisalasasa')
        setVoted(res2.data.voted)
      }
    } catch (error) {
      console.log(error, 'erorro')
    }
  }
  const fetchProposals = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/all/${
          params.id
        }?status=${activeTab}`,
      )
      console.log(res.data, 'res.data')
      setProposal(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchBondNames = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/bonds-names/all/${
          params.id
        }`,
      )
      console.log(res.data, 'res.dataaaaaaaa')
      setBondIssuerAddresses(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  const fetchProposalsComments = async () => {
    if (!activeProposal || !activeProposal.id) {
      console.error('Proposal not available for fetching comments.')
      return
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments/${
          activeProposal.id
        }`,
      )
      setComments(res.data)
      console.log(res.data)
      setLoadingComments(false)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }

  const fetchProposalsBonds = async () => {
    if (!activeProposal || !activeProposal.id) {
      console.error('Proposal not available for fetching comments.')
      return
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/zcb/${
          activeProposal.id
        }`,
      )
      setIssuedBond(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form inputs
    if (
      !proposalText ||
      !startDate ||
      !endDate ||
      !minimumQuorum ||
      !proposalDescription ||
      !bondIssuerAddress ||
      !targetXrdAmount ||
      !startTime ||
      !endTime ||
      !voteType
    ) {
      alert('Please fill out all fields.')
      return
    }
    const startDateTime = new Date(startDate)
    const [startHours, startMinutes] = startTime.split(':')
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0)

    const endDateTime = new Date(endDate)
    const [endHours, endMinutes] = endTime.split(':')
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 59, 0)
    try {
      setLoadingButton(true)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/build/praposal`,

        {
          userAddress: accounts[0].address,
          community_id: params.id,
          minimumquorum: parseInt(minimumQuorum),
          start_time: JSON.stringify(
            Math.floor(startDateTime.getTime() / 1000),
          ),
          end_time: JSON.stringify(Math.floor(endDateTime.getTime() / 1000)),
          proposal: proposalText,
          description: proposalDescription,
          bond_issuer_address: bondIssuerAddress,
          target_xrd_amount: targetXrdAmount,
          vote_type: voteType,
        },
      )

      // Handle successful submission (e.g., navigate to success page, show confirmation)
      console.log('Proposal submitted successfully:', res.data)
      setManifest(res.data)
      const { receipt } = await sendTransaction(manifest).finally(() => {
        setLoading(false)
        setLoadingButton(false)
      })
      let txId = receipt.transaction.intent_hash
      if (txId) {
        try {
          const response = await axios.post(
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
          console.log(response.data)
          toast.success('Proposal Submitted')
          setLoadingButton(false)
          location.reload()
        } catch (error) {
          toast.error('Something went wrong')
          setLoadingButton(false)
        }
      }
    } catch (error) {
      console.error(
        'Error submitting proposal:',
        error.response.data.detail.error,
      )
      toast.error(error.response.data.detail.error.toUpperCase())
    } finally {
      setLoadingButton(false)
    }
  }
  const handleAgainst = async () => {
    setVote(true)
    setLoadingButtonAgainst(true)

    try {
      if (!voted) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,
          {
            proposal_address: activeProposal.proposal_address,
            userAddress: accounts[0].address,
            vote_against: vote,
          },
        )

        console.log('Vote submitted successfully:', res.data)
        setManifestForVoteAgainst(res.data) // Store vote data for further use

        // Send the transaction
        const { receipt } = await sendTransaction(res.data) // Use the response data for the transaction
        let txId = receipt.transaction.intent_hash

        if (txId) {
          try {
            // Post transaction ID to backend
            const response = await axios.post(
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

            console.log(response.data)
            setActiveProposal(null)
            toast.success('Vote Submitted')
            fetchProposals()
          } catch (error) {
            toast.error('Something went wrong while submitting the transaction')
            console.error(error)
          }
        }
      } else {
        toast.error('You already Voted')
      }
    } catch (error) {
      if (error.response.data.detail.error === 'does not hold any token') {
        toast.error('Please buy some token first before voting')
        return
      }
      toast.error('Something Went wrong')
      console.error('Error submitting vote:', error)
    } finally {
      setLoadingAgainst(false)
      setLoadingButtonAgainst(false)
    }
  }

  const handleFor = async () => {
    setVote(false)
    setLoadingButtonFor(true)

    try {
      if (!voted) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/vote`,
          {
            proposal_address: activeProposal.proposal_address,
            userAddress: accounts[0].address,
            vote_against: vote,
          },
        )

        console.log('Vote submitted successfully:', res.data)
        setManifestForVoteFor(res.data) // Store vote data for further use

        // Send the transaction
        const { receipt } = await sendTransaction(res.data) // Use the response data for the transaction
        let txId = receipt.transaction.intent_hash

        if (txId) {
          try {
            // Post transaction ID to backend
            const response = await axios.post(
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

            console.log(response.data)
            setActiveProposal(null)
            toast.success('Vote Submitted')
            fetchProposals()
          } catch (error) {
            toast.error('Something went wrong while submitting the transaction')
            console.error(error)
          }
        }
      } else {
        toast.error('You have already voted')
      }
    } catch (error) {
      if (error.response.data.detail.error === 'does not hold any token') {
        toast.error('Please buy some token first before voting')
        return
      }
      toast.error('Something Went wrong')
      console.error('Error submitting vote:', error)
    } finally {
      setLoadingFor(false)
      setLoadingButtonFor(false)
    }
  }
  const handleExecuteActiveProposal = async () => {
    setExecute(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/execute`,
        {
          proposal_address: activeProposal.proposal_address,
          proposal_id: 0,
        },
      )

      console.log('Vote submitted successfully:', res.data)
      setManifestForVoteAgainst(res.data)

      // Send the transaction
      const { receipt } = await sendTransaction(res.data)
      let txId = receipt.transaction.intent_hash

      if (txId) {
        try {
          // Post transaction ID to backend
          const response = await axios.post(
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

          console.log(response.data)
          toast.success('Executed')
        } catch (error) {
          toast.error('Something went wrong while submitting the transaction')
          console.error(error)
        }
      }
    } catch (error) {
      if (error.response.data.detail.error === 'does not hold any token') {
        toast.error('Please buy some token first before Executing')
        return
      }
      toast.error('Something Went wrong')
      console.error('Error submitting vote:', error)
    } finally {
      setExecute(false)
    }
  }
  const handleStartDateChange = (date) => {
    setStartDate(date)
    // Ensure endDate is not before startDate
    if (date > endDate) {
      setEndDate(date)
    }
  }

  const handleEndDateChange = (date) => {
    // Ensure endDate is not before startDate
    if (date >= startDate) {
      setEndDate(date)
    } else {
      toast.error('End date cannot be before start date')
    }
  }
  const fetchParticipant = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${
          params.id
        }`,
      )
      setParticipants(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }

  useEffect(() => {
    if (activeProposal) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now()
        const endTime = activeProposal.ends_time * 1000
        const duration = endTime - currentTime

        if (duration > 0) {
          setTimeLeft(formatTime(duration))
        } else {
          clearInterval(intervalId)
          setTimeLeft('Time is up!')
        }
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [activeProposal])
  useEffect(() => {
    fetchProposals()
    fetchBondNames()
    fetchParticipant()
  }, [params.id])
  useEffect(() => {
    fetchProposalsComments()
    fetchProposalsBonds()
    fetchVoted()
  }, [activeProposal])
  useEffect(() => {
    fetchProposals()
  }, [activeTab])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  return (
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-blue-50  text-black px-2">
      {!form && !activeProposal && !showCategories ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[100%] mx-auto gap-2">
              <div className="md:w-[100%] space-y-2  ">
                <div className="w-full  flex items-end justify-end">
                  <Button
                    onClick={() => {
                      setActiveProposal(null)
                      setShowCategories(true)
                    }}
                    variant="radix"
                  >
                    Create Proposal
                  </Button>
                </div>
                <Tabs
                  defaultValue="PENDING"
                  className="w-full"
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="PENDING">Pending</TabsTrigger>
                    <TabsTrigger value="EXECUTED">Executed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="PENDING">
                    <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
                      <div className="p-2 border-b-2 -translate-x-2">
                        All Proposals.
                      </div>
                      {!loading && (
                        <div className="space-y-4">
                          {!proposal.length > 0 && (
                            <div className="flex items-center justify-center h-10">
                              No Pending Proposal
                            </div>
                          )}
                        </div>
                      )}
                      {!loading && proposal && (
                        <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
                          {proposal.map((proposalItem, index) => (
                            <Card
                              key={index}
                              onClick={() => {
                                setActiveProposal(proposalItem)
                                setShowForm(null)
                              }}
                              className="flex flex-col hover:shadow-lg cursor-pointer items-start gap-2 bg-white border-b-2 rounded-none p-3 text-black relative"
                            >
                              <Badge
                                variant={
                                  proposalItem.is_active
                                    ? ' success'
                                    : 'destructive'
                                }
                                className={`absolute right-2 ${
                                  proposalItem.is_active
                                    ? 'bg-green-600 text-white'
                                    : ''
                                } `}
                              >
                                {proposalItem.is_active
                                  ? 'Pending'
                                  : 'Executed'}
                              </Badge>

                              <div className="capitalize font-semibold text-xl">
                                {proposalItem.proposal}
                              </div>
                              <div className="capitalize font-semibold text-md">
                                {proposalItem.description}
                              </div>
                              <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                                  <span>Start Time :</span>
                                  <span className="font-semibold">
                                    {convertUnixTimestamp(
                                      proposalItem.start_time,
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                                  <span>End Time :</span>
                                  <span className="font-semibold">
                                    {convertUnixTimestamp(
                                      proposalItem.ends_time,
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs">
                                Published by{' '}
                                <span className="text-purple-700">
                                  {clipAddress(proposalItem.id)}
                                </span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}

                      {loading && (
                        <div className="flex flex-col h-[200px] items-center justify-center text-center  mt-5  ">
                                              <SkeletonCard />
                                            </div>
                      )}
                    </Card>
                  </TabsContent>
                  <TabsContent value="EXECUTED">
                    <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
                      <div className="p-2 border-b-2 -translate-x-2">
                        All Proposals.
                      </div>
                      {!loading && (
                        <div className="space-y-4">
                          {!proposal.length > 0 && (
                            <div className="flex items-center justify-center h-10">
                              No Executed Proposal
                            </div>
                          )}
                        </div>
                      )}
                      {!loading && proposal && (
                        <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
                          {proposal.map((proposalItem, index) => (
                            <Card
                              key={index}
                              onClick={() => {
                                setActiveProposal(proposalItem)
                                setShowForm(null)
                              }}
                              className="flex flex-col hover:shadow-lg cursor-pointer items-start gap-2 bg-white border-b-2 rounded-none p-3 text-black relative"
                            >
                              <Badge
                                variant={
                                  proposalItem.is_active
                                    ? ' success'
                                    : 'destructive'
                                }
                                className={`absolute right-2 ${
                                  proposalItem.is_active
                                    ? 'bg-green-600 text-white'
                                    : ''
                                } `}
                              >
                                {proposalItem.is_active
                                  ? 'Pending'
                                  : 'Executed'}
                              </Badge>

                              <div className="capitalize font-semibold text-xl">
                                {proposalItem.proposal}
                              </div>
                              <div className="capitalize font-semibold text-md">
                                {proposalItem.description}
                              </div>
                              <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                                  <span>Start Time :</span>
                                  <span className="font-semibold">
                                    {convertUnixTimestamp(
                                      proposalItem.start_time,
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                                  <span>End Time :</span>
                                  <span className="font-semibold">
                                    {convertUnixTimestamp(
                                      proposalItem.ends_time,
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs">
                                Published by{' '}
                                <span className="text-purple-700">
                                  {clipAddress(proposalItem.id)}
                                </span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}

                      {loading && (
                       <div className="flex flex-col h-[200px] items-center justify-center text-center  mt-5  ">
                                             <SkeletonCard />
                                           </div>
                      )}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ) : activeProposal ? (
        <div className="flex  flex-col  px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div
            onClick={() => {
              setActiveProposal(null) // Reset active proposal
              setShowForm(false) // Ensure the form is hidden
            }}
            className="w-full cursor-pointer flex items-start m-2"
          >
            <ChevronLeft /> <span>Back</span>
          </div>
          <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
            <div className="p-2 border-b-2 -translate-x-2 font-bold capitalize text-4xl">
              {activeProposal.proposal}
            </div>
            {!loading && (
              <div className="space-y-4">
                {!proposal && (
                  <div className="flex items-center justify-center h-10">
                    No Active Proposal
                  </div>
                )}
              </div>
            )}
            {!loading && activeProposal && (
              <div className="  gap-5 mt-3">
                {activeProposal && (
                  <div className="flex flex-col  items-start gap-4 bg-white  rounded-none p-3 text-black">
                    {/* <div className="capitalize font-semibold text-xl">
                        {activeProposal.proposal}
                      </div> */}
                    {activeProposal.result && (
                      <div>
                        <strong>Result :</strong>
                        <span className="capitalize pl-2">
                          {activeProposal.result}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                        <span>Start Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.start_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                        <span>End Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.ends_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-100 shadow-md p-2">
                        <span>Time Left:</span>
                        <span className="font-semibold">{timeLeft}</span>
                      </div>
                    </div>

                    {/* Voting buttons (commented out) */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-center gap-3">
                        {voted && (
                          <div className='flex items-center gap-2 '>
                            <Badge className="bg-green-600"> Total Vote For : {activeProposal.voted_for}</Badge>
                            <Badge variant={"destructive"}>Total Vote Against : {activeProposal.voted_against}</Badge>
                          </div>
                        )}
                        {voted ? (
                          <Button disabled variant="outline">
                            You have already voted.
                          </Button>
                        ) : (
                          <div className="flex items-center gap-3">
                            {loadingButtonFor ? (
                              <Button
                                size="sm"
                                disabled
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-green-700 hover:to-green-800"
                              >
                                Voting...
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={handleFor}
                                disabled={
                                  activeProposal.is_active === false ||
                                  timeLeft === 'Time is up!' ||
                                  voted === true
                                }
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-green-700 hover:to-green-800"
                              >
                                <span>Voted For :</span>
                                <span>{activeProposal.voted_for}</span>
                              </Button>
                            )}

                            {loadingButtonAgainst ? (
                              <Button
                                size="sm"
                                disabled
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
                              >
                                Voting...
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={handleAgainst}
                                disabled={
                                  activeProposal.is_active === false ||
                                  timeLeft === 'Time is up!'
                                }
                                className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
                              >
                                <span>Voted Against :</span>
                                <span>{activeProposal.voted_against}</span>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        {activeProposal.minimum_quorum <=
                        activeProposal.number_of_people_voted > 0 ? (
                          <Button
                            onClick={handleExecuteActiveProposal}
                            disabled={
                              execute ||
                              activeProposal.is_active === false ||
                              timeLeft !== 'Time is up!'
                            }
                            className="flex items-center gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-blue-700 hover:to-blue-800"
                          >
                            {execute
                              ? 'Executing....'
                              : activeProposal.is_active === false
                              ? 'Already Executed'
                              : 'Execute Proposal'}
                          </Button>
                        ) : (
                          <Button disabled>
                            Cannot be executed due to minimum quorum does not
                            meet
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="text-xs">
                      Published by{' '}
                      <span className="text-purple-700">
                        {clipAddress(activeProposal.id)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="flex flex-col h-[200px] items-center justify-center text-center  mt-5  ">
                                    <SkeletonCard />
                                  </div>
            )}
          </Card>
          <div className="grid mt-3  md:grid-cols-3 grid-cols-1 gap-3 px-1">
            <div className="bg-white col-span-2 rounded-md p-2">
              <div>
                {loadingCommnets && proposal ? (
                 <div className="flex flex-col h-[200px] items-center justify-center text-center  mt-5  ">
                                       <SkeletonCard />
                                     </div>
                ) : (
                  <>
                    {comments &&
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 bg-white border-b-2 rounded-none p-3  text-black"
                        >
                          <Avatar className="shrink-0 object-cover">
                            <img src={comment.image_url} alt="Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div
                                className="group"
                                onClick={() =>
                                  navigate(
                                    `/userDashboard/userProfile/${comment.public_address}`,
                                  )
                                }
                              >
                                <div className="font-medium group-hover:underline cursor-pointer">
                                  {comment.user_name}
                                </div>
                                <div className="font-light group-hover:underline cursor-pointer">
                                  {clipAddress(comment.public_address)}
                                </div>
                              </div>
                              <div className="text-xs text-gray-700 dark:text-gray-700">
                              {formatStandardDateTime(comment.timestamp)}
                              </div>
                            </div>
                            <p className="text-gray-800 dark:text-gray-400 font-medium">
                              {comment.comment}
                            </p>
                            <div>
                         
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}

                <div className="flex flex-col items-end gap-2 mt-1">
                  <Textarea
                    placeholder="Add a new comment..."
                    className="flex-1 text-black"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    onClick={handleAddComment}
                    variant="radix"
                    disabled={loadingCom}
                  >
                    {loadingCom ? 'Submiting...' : ' Submit'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-white shadow-sm flex items-center justify-center p-4 rounded-md">
              {issuedBond && (
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                  {/* Bond Title */}
                  <div className="text-2xl font-bold text-blue-800 mb-4 text-center">
                    {issuedBond.name}
                  </div>

                  {/* Bond Image */}
                  {issuedBond.asset_url && (
                    <div className="mb-4">
                      <img
                        src={issuedBond.asset_url}
                        alt={issuedBond.asset_name || 'Asset'}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}

                  <p>
                    <strong>Asset Name:</strong>
                    {issuedBond.asset_name || 'N/A'}
                  </p>

                  {/* Bond Description */}
                  <div className="mb-4 text-gray-700">
                    <strong>Description:</strong>
                    <p>{issuedBond.description}</p>
                  </div>
                  {/* Bond Details */}
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Contract Identity:</strong>{' '}
                      {issuedBond.contract_identity || 'N/A'}
                    </p>
                    <p>
                      <strong>Number of Bonds:</strong>{' '}
                      {issuedBond.number_of_bonds}
                    </p>
                    <p>
                      <strong>Currency:</strong> {issuedBond.currency}
                    </p>
                    <p>
                      <strong>Interest Rate:</strong> {issuedBond.interest_rate}
                      %
                    </p>
                    <p>
                      <strong>Discount:</strong> {issuedBond.discount}
                    </p>
                    <p>
                      <strong>Price:</strong>{' '}
                      {issuedBond.price ? (
                        <>
                          {issuedBond.price} <strong>XRD</strong>
                        </>
                      ) : (
                        'Not available'
                      )}
                    </p>
                    <p>
                      <strong>Notional Principle:</strong>{' '}
                      {issuedBond.notional_principle}
                    </p>
                    <p>
                      <strong>Bond Position:</strong> {issuedBond.bond_position}
                    </p>
                    <p>
                      <strong>Contract Type:</strong> {issuedBond.contract_type}
                    </p>
                    <p>
                      <strong>Contract Role:</strong> {issuedBond.contract_role}
                    </p>
                  </div>

                  {/* Dates and Blockchain Details */}
                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p
                      className={
                        new Date(issuedBond.initial_exchange_date) < new Date()
                          ? 'text-red-500'
                          : ''
                      }
                    >
                      <strong>Initial Exchange Date:</strong>{' '}
                      {new Date(
                        issuedBond.initial_exchange_date,
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Maturity Date:</strong>{' '}
                      {new Date(issuedBond.maturity_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Created on Blockchain:</strong>{' '}
                      {issuedBond.created_on_blockchain ? 'Yes' : 'No'}
                    </p>
                    <p className="truncate">
                      <strong>Creator Address:</strong>{' '}
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => {
                          navigator.clipboard.writeText(issuedBond.creator)
                          toast.success('Copied address')
                        }}
                      >
                        {issuedBond.creator}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : form ? (
        <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto my-6 p-2">
          <div
            onClick={() => {
              setShowForm(false) // Hide the form and return to the list
              setActiveProposal(null) // Ensure no proposal is active
            }}
            className="w-full cursor-pointer flex items-start m-2"
          >
            <ChevronLeft /> <span>Back</span>
          </div>
          <div className="text-4xl font-semibold p-4  bg-white w-full text-center">
            Proposal Form
          </div>
          <div className="flex items-center justify-center p-2 w-full mx-auto">
            <form className="w-1/2 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label className="text-2xl p-1">Proposal</Label>
                <Textarea
                  placeholder="Type your proposal here ..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-lg p-1">Proposal Description</Label>
                <Textarea
                  placeholder="Type your proposal description ..."
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-3 gap-3 w-full ">
                <div className="text-xl p-1">Proposal Timing</div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center">
                    <div>From:</div>
                    <label className=" flex items-center">
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        customInput={<CustomDatePicker />}
                        minDate={new Date()}
                      />
                      <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="ml-2 w-fit"
                      />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <div>To:</div>
                    <label className="flex items-center ">
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        customInput={<CustomDatePicker />}
                        minDate={new Date()}
                      />
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="ml-2 w-fit"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Minimum Quorum</Label>
                  <Input
                    placeholder="Enter Minimum quorum"
                    type="number"
                    value={minimumQuorum}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value > participants.length) {
                        toast.error(`The minimum quorum cannot exceed ${participants.length}.`);
                        return;
                      }
                      setMinimumQuorum(value);
                    }}
                    min="0"
                    max={participants.length}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Vote Type</Label>
                  <Select onValueChange={handleVoteType}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Vote Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equality">Equality</SelectItem>
                      <SelectItem value="ResourceOwned">
                        Resource Owned
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Bond Issuer Address</Label>
                  <Select onValueChange={handleBondAddress}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Bond Issuer Address" />
                    </SelectTrigger>
                    <SelectContent>
                      {bondIssuerAddresses.length === 0 ? (
                        <SelectItem value="No issued Bond">
                          No Issued Bond
                        </SelectItem>
                      ) : (
                        bondIssuerAddresses.map((bond, index) => (
                          <SelectItem key={index} value={bond.creator_address}>
                            {bond.bond_name} - {bond.creator_address}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>

                  {/* <Input
                      placeholder="Enter Bond Issuer Address"
                      value={bondIssuerAddress}
                      onChange={(e) => setBondIssuerAddress(e.target.value)}
                    /> */}
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Target XRD Amount</Label>
                  <Input
                    placeholder="Enter Target XRD Amount"
                    type="number"
                    value={targetXrdAmount}
                    onChange={(e) => setTargetXrdAmount(e.target.value)}
                    min="0"
                    disabled
                  />
                </div>
              </div>
              {loadingButton ? (
                <Button variant="radix" disabled className="w-full mt-2">
                  Submitting....
                </Button>
              ) : (
                <Button
                  variant="radix"
                  className="w-full mt-2"
                  disabled={
                    !targetXrdAmount ||
                    !minimumQuorum ||
                    !bondIssuerAddress ||
                    !voteType ||
                    !proposalText ||
                    !proposalDescription ||
                    !startTime ||
                    !endTime
                  }
                >
                  Submit Proposal
                </Button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex  flex-col  px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div
            onClick={() => {
              setShowCategories(false)
            }}
            className="w-full cursor-pointer flex items-start m-2"
          >
            <ChevronLeft /> <span>Back</span>
          </div>
          <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 space-y-2 ">
            <div className="p-2 border-b-2 -translate-x-2">
              What kind of proposal do you want to create?
            </div>

            <div className=" grid md:grid-cols-3 grid-cols-1 gap-5 mt-3">
              {ProposalTypes.map((proposal, index) => (
                <Card
                  key={index}
                  className="flex flex-col hover:shadow-lg cursor-pointer items-start gap-2 bg-white border-b-2 rounded-none p-3 text-black relative justify-between"
                >
                  <div className="font-bold">{proposal.title}</div>
                  <div className="text-sm">{proposal.description}</div>
                  <div className="flex items-center justify-end w-full">
                    <Button
                      variant="radix"
                      onClick={() => {
                        if (proposal.title === 'Custom Proposal') {
                          setShowForm(true)
                        }
                      }}
                    >
                      Use
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Proposals
