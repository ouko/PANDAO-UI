import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { clipAddress } from '@/utils/functions/ClipAddress'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'

import { ChevronLeft, CircleHelp, HandHelping } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ProposalPending from './components/ProposalPendiing'
import ProposalExecuted from './components/ProposalExecuted'
import BondCard from './components/BondCard'

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
  const [searchParams] = useSearchParams()
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
  const [tokenChangeform, setShowTokenChangeForm] = useState(false)
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
  const [zcbId, setZcbId] = useState('')
  const [tokenPriceChangeForm, setTokenPriceChangeForm] = useState({
    proposalText: '',
    proposalDescription: '',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '00:00',
    endTime: '23:59',
    minimumQuorum: '',
    voteType: '',
    desireTokenPrice: 0,
    desireTokenBuyBackPrice: 0,
  })
  const [voteType, setVoteType] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const [manifest, setManifest] = useState('')
  const [issuedBond, setIssuedBond] = useState(null)
  const queryParam = searchParams.get('state')
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
    if (value === 'No issued Bond') {
      toast.error('Please buy a bond first.')
      return
    }
    const selectedBond = bondIssuerAddresses.find(
      (newValue) => newValue.creator_address === value,
    )
    setZcbId(selectedBond.bond_id)
    setTargetXrdAmount(selectedBond.price)
    setBondIssuerAddress(value)
  }
  const fetchVoted = async () => {
    try {
      const res2 = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL
        }/community/proposal/is-voted?proposal_id=${activeProposal.id
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
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/all/${params.id
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
        `${import.meta.env.VITE_BACKEND_URL}/community/bonds-names/all/${params.id
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
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/comments/${activeProposal.id
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
        `${import.meta.env.VITE_BACKEND_URL}/community/proposal/zcb/${activeProposal.id
        }`,
      )
      setIssuedBond(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  const validateForm = (form) => {
    const requiredFields = [
      'proposalText',
      'startDate',
      'endDate',
      'minimumQuorum',
      'proposalDescription',
      'startTime',
      'endTime',
      'voteType',
    ]

    const missingFields = requiredFields.filter((field) => !form[field])

    if (missingFields.length > 0) {
      alert('Please fill out all fields.')
      return false
    }

    return true
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
      !voteType ||
      !zcbId
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
          zcb_id: zcbId,
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
  const handleSubmitTokenChangeForm = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validateForm(tokenPriceChangeForm)) {
      return;
    }

    // Prepare start and end datetime
    const startDateTime = new Date(tokenPriceChangeForm.startDate);
    const [startHours, startMinutes] = tokenPriceChangeForm.startTime.split(':');
    startDateTime.setHours(
      parseInt(startHours, 10),
      parseInt(startMinutes, 10),
      0,
      0
    );

    const endDateTime = new Date(tokenPriceChangeForm.endDate);
    const [endHours, endMinutes] = tokenPriceChangeForm.endTime.split(':');
    endDateTime.setHours(
      parseInt(endHours, 10),
      parseInt(endMinutes, 10),
      59,
      0
    );

    try {
      setLoadingButton(true);

      // Submit proposal data
      const proposalPayload = {
        userAddress: accounts[0]?.address,
        community_id: params.id,
        minimumquorum: parseInt(tokenPriceChangeForm.minimumQuorum, 10),
        start_time: Math.floor(startDateTime.getTime() / 1000).toString(),
        end_time: Math.floor(endDateTime.getTime() / 1000).toString(),
        proposal: tokenPriceChangeForm.proposalText,
        description: tokenPriceChangeForm.proposalDescription,
        vote_type: tokenPriceChangeForm.voteType,
        desire_token_buy_back_price: tokenPriceChangeForm.desireTokenBuyBackPrice,
        desire_token_price: tokenPriceChangeForm.desireTokenPrice,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/proposal/update-token-price`,
        proposalPayload
      );

      console.log('Proposal submitted successfully:', res.data);

      // Check if response data exists before proceeding
      if (res.data) {
        const { receipt } = await sendTransaction(res.data);

        // Check if receipt exists and has the required transaction data
        if (receipt?.transaction?.intent_hash) {
          const txId = receipt.transaction.intent_hash;

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
              {
                tx_id: txId,
                user_address: accounts[0]?.address,
              },
              {
                headers: { 'Content-Type': 'application/json' },
              }
            );

            console.log(response.data);
            toast.success('Proposal Submitted Successfully');
            setLoadingButton(false);
            location.reload();
          } catch (error) {
            console.error(
              'Error during transaction submission:',
              error.response?.data
            );
            toast.error('Something went wrong during transaction submission');
            setLoadingButton(false);
          }
        } else {
          // Handle case when receipt doesn't have expected format
          toast.error('Transaction receipt is incomplete or invalid');
          setLoadingButton(false);
        }
      } else {
        // Handle case when response data is empty
        toast.error('No data received from server');
        setLoadingButton(false);
      }
    } catch (error) {
      console.error(
        'Error submitting proposal:',
        error.response?.data?.detail?.error || error.message
      );
      toast.error(
        error.response?.data?.detail?.error?.toUpperCase() ||
        'Failed to submit proposal'
      );
      setLoadingButton(false);
    }
  };

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
  const handleInputChange = (field, value) => {
    if (
      field === 'desireTokenBuyBackPrice' &&
      value > tokenPriceChangeForm.desireTokenPrice
    ) {
      toast.error(
        'Buyback price cannot be greater than the desired token price.',
      )
      return
    }

    setTokenPriceChangeForm((prev) => ({
      ...prev,
      [field]: value,
    }))
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
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id
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
    if (queryParam) {
      setActiveProposal(null)
      setShowCategories(true)
    }
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

  console.log(activeProposal, 'activer')

  return (
    <div className="items-start gap-3 justify-start z-50  min-h-screen overflow-hidden   text-brand7 px-2">
      {!form && !activeProposal && !showCategories && !tokenChangeform ? (
        <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
          <div className="space-y-6 md:w-[100%] ">
            <div className="flex md:flex-row flex-col md:w-[100%] z-50 mx-auto gap-2">
              <div className="md:w-[100%] space-y-2  ">
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
                        Total Proposal:
                      </div>
                      <div
                        className="text-white text-[56px] font-medium text-center"
                      >
                        Proposal

                      </div>

                    </div>

                  </div>
                  <div className="absolute bottom-0 right-0 p-4">
                    <Button
                      variant="brand"
                      onClick={() => {
                        setActiveProposal(null)
                        setShowCategories(true)
                      }}

                    >
                      Create Proposal
                    </Button>
                  </div>
                </div>

                <Tabs
                  defaultValue="PENDING"
                  className="w-full py-5 border-2  bg-[rgba(169,126,255,0.08)] rounded-[10px] border-[#8861d7]"
                  onValueChange={setActiveTab}
                >
                  <TabsList className="z-50 bg-brand1  p-2 flex gap-3 mx-auto shadow-md w-full items-center justify-start mb-3">
                    <TabsTrigger
                      value="PENDING"
                      disabled={false}
                      className={`tab-trigger px-6 py-2 font-semibold transition-all duration-200
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-brand3
      data-[state=active]:text-white data-[state=active]:shadow-lg
      data-[state=inactive]:bg-transparent data-[state=inactive]:text-brand7
      hover:bg-brand2 focus:outline-none focus:ring-2 focus:ring-brand3`}
                    >
                      Pending
                    </TabsTrigger>
                    <TabsTrigger
                      value="EXECUTED"
                      disabled={false}
                      className="tab-trigger px-6 py-2 font-semibold transition-all duration-200
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-brand3
      data-[state=active]:text-white data-[state=active]:shadow-lg
      data-[state=inactive]:bg-transparent data-[state=inactive]:text-brand7
      hover:bg-brand2 focus:outline-none focus:ring-2 focus:ring-brand3"
                    >
                      Executed
                    </TabsTrigger>
                  </TabsList>



                  <TabsContent value="PENDING" >
                    <div >
                      <ProposalPending
                        proposals={proposal}
                        loading={loading}
                        setActiveProposal={setActiveProposal}
                        setShowForm={setShowForm}
                        convertUnixTimestamp={convertUnixTimestamp}
                        clipAddress={clipAddress}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="EXECUTED">
                    <div>
                      <ProposalExecuted
                        proposals={proposal}
                        loading={loading}
                        setActiveProposal={setActiveProposal}
                        setShowForm={setShowForm}
                        convertUnixTimestamp={convertUnixTimestamp}
                        clipAddress={clipAddress}
                      />
                    </div>
                  </TabsContent>

                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ) : activeProposal ? (
        <div className="flex mt-6 flex-col  px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">

          <Card className="bg-white md:w-[100%] z-50 mx-auto border-2 border-[#5228A4] md:p-4 p-4 space-y-2 ">
            <div
              onClick={() => {
                setActiveProposal(null) // Reset active proposal
                setShowForm(false) // Ensure the form is hidden
              }}
              className="w-full cursor-pointer text-white flex text-[18px] items-end justify-end px-4"
            >
              <ChevronLeft /> <span>Back</span>
            </div>
            <div className="p-4 ms-2 -translate-x-2 font-bold capitalize text-white text-4xl">
              {activeProposal.proposal}
            </div>

            <div className="p-4 border-[1px] ms-4 rounded-sm border-[#5228A4] -translate-x-2 font-bold text-white capitalize text-md">
              {activeProposal.description}
            </div>

            <div className="flex space-x-2">
              {activeProposal.proposed_token_buy_back_price && (
                <Badge>
                  Proposed Buy Back Price :
                  {activeProposal.proposed_token_buy_back_price}
                </Badge>
              )}
              {activeProposal.proposed_token_price && (
                <Badge>
                  Proposed Token Price :{activeProposal.proposed_token_price}
                </Badge>
              )}
            </div>

            {!loading && (
              <div className="space-y-2">
                {!proposal && (
                  <div className="flex items-center justify-center h-10">
                    No Active Proposal
                  </div>
                )}
              </div>
            )}
            {!loading && activeProposal && (
              <div className="  gap-5 mt-3 z-50">
                {activeProposal && (
                  <div className="flex flex-col  items-start gap-4 z-50  rounded-none p-3 text-brand7">
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
                    <div className="flex items-center text-white z-50 gap-3">
                      <div className="flex items-center gap-2 text-[20px] bg-brand5 rounded-md shadow-md p-2">
                        <span>Start Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.start_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[20px] bg-brand5 rounded-md shadow-md p-2">
                        <span>End Time :</span>
                        <span className="font-semibold">
                          {convertUnixTimestamp(activeProposal.ends_time)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[20px] bg-brand5 rounded-md shadow-md p-2">
                        <span>Time Left:</span>
                        <span className="font-semibold">{timeLeft}</span>
                      </div>
                    </div>

                    {/* Voting buttons (commented out) */}
                    <div className="flex items-center z-50 justify-between w-full">
                      <div className="flex flex-col items-center gap-3">
                        {voted && (
                          <div className="flex items-center gap-2 ">
                            <Badge className="bg-green-500">
                              {' '}
                              Total Vote For : {activeProposal.voted_for}
                            </Badge>
                            <Badge variant={'destructive'}>
                              Total Vote Against :{' '}
                              {activeProposal.voted_against}
                            </Badge>
                          </div>
                        )}
                        {voted ? (
                          <Button disabled variant="outline">
                            You have already voted.
                          </Button>
                        ) : (
                          <div className="flex items-center z-50 gap-3">
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
                                className="flex items-center gap-1 z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500 to-green-700 hover:to-green-800"
                              >
                                <span>Voted For :</span>
                                <span>{activeProposal.voted_for}</span>
                              </Button>
                            )}

                            {loadingButtonAgainst ? (
                              <Button
                                size="sm"
                                disabled
                                className="flex items-center z-50 gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
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
                                className="flex items-center z-50 gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-700 hover:to-red-800"
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
                          activeProposal.number_of_people_voted >
                          0 ? (
                          <Button
                            onClick={handleExecuteActiveProposal}
                            disabled={
                              execute ||
                              activeProposal.is_active === false ||
                              timeLeft !== 'Time is up!'
                            }
                            className="flex items-center  gap-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-blue-700 hover:to-blue-800"
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

                    <div className="text-ms">
                      Published by{' '}
                      <span className="text-purple-700">
                        {clipAddress(activeProposal.id)}
                      </span>
                    </div>
                    <div className="w-full">
                      <Textarea
                        placeholder="Add a new comment..."
                        className="flex-1 z-50 text-brand7"
                        value={comment}
                        required
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button
                        onClick={handleAddComment}
                        variant="brand"
                        className="mt-4"
                        disabled={loadingCom}
                      >
                        {loadingCom ? 'Submiting...' : ' Submit'}
                      </Button>
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
                    <div className="w-[1000px] flex flex-col items-center">
                      {issuedBond && <BondCard bond={issuedBond} />}
                    </div>

                    {comments &&
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          className="my-3 flex gap-4 bg-white border-2 border-brand3 z-50 rounded-xl p-3  text-brand7"
                        >
                          <Avatar className="w-12 h-12 overflow-hidden rounded-sm">
                            <img src={comment.image_url} alt="Avatar" className="w-full h-full object-cover" />
                          </Avatar>

                          <div className="flex-1 z-50 space-y-2">
                            <div className="flex items-center justify-between">
                              <div
                                className="group"
                                onClick={() =>
                                  navigate(
                                    `/userDashboard/userProfile/${comment.public_address}`,
                                  )
                                }
                              >
                                <div className="font-medium  group-hover:underline cursor-pointer">
                                  {comment.user_name}
                                </div>
                                <div className="font-light group-hover:underline cursor-pointer">
                                  {clipAddress(comment.public_address)}
                                </div>
                              </div>
                              <div className="text-xs text-white  ">
                                {formatStandardDateTime(comment.timestamp)}
                              </div>
                            </div>
                            <p className="text-white   font-medium">
                              {comment.comment}
                            </p>
                            <div></div>
                          </div>
                        </div>
                      ))}
                  </>
                )}


              </div>
            </div>

          </div>
        </div>
      ) : form ? (
        <div className="flex flex-col items-center justify-center max-w-[1440px] mx-auto my-6 p-2">




          <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] mt-8 w-full z-50 gap-7 p-10 border-2 border-brand5 flex flex-col justify-start items-start ">
            <div className="  text-[40px] leading-[130%] z-50 font-semibold flex flex-col items-center gap-3">
              <div className="w-full cursor-pointer flex  items-center text-[22px]   m-2"
                onClick={() => {
                  setShowForm(false) // Hide the form and return to the list
                  setActiveProposal(null) // Ensure no proposal is active
                }}>
                <ChevronLeft /> <span className='' >Back</span>
              </div>
              <span className="step-2-describe-your-dao-span3 text-amber-50 whitespace-nowrap">Proposal Form</span>


            </div>


          </div>
          <div className="flex items-center justify-center z-50 p-2 w-full mx-auto">
            <form className="w-[900px] flex z-50 flex-col py-5 space-y-4  gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col w-full space-y-2 ">
                <label
                  className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                >
                  Proposal:
                </label>
                <textarea
                  className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none"
                  placeholder="Type your proposal here ..."
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                  rows="4"
                ></textarea>
              </div>

              <div className="flex flex-col w-full space-y-2">
                <label
                  className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                >
                  Proposal Description:
                </label>
                <textarea
                  className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none"
                  placeholder="Type your proposal description ..."
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  rows="4"
                ></textarea>
              </div>



              <div className="flex flex-col mt-3 gap-3 w-full space-y-4  ">
                <div className="flex flex-col w-full space-y-2">
                  <div className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch">
                    Proposal Timing
                  </div>
                  <div className="flex items-center justify-between space-x-4">

                    {/* From Date and Time */}
                    <div className="flex items-center space-x-2">
                      <div className="text-white">From:</div>
                      <label className="flex items-center bg">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          customInput={<CustomDatePicker />}
                          minDate={new Date()}
                          className="p-2 bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="ml-2 w-fit p-2 bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                      </label>
                    </div>

                    {/* To Date and Time */}
                    <div className="flex items-center space-x-2">
                      <div className="text-white ">To:</div>
                      <label className="flex items-center">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          customInput={<CustomDatePicker />}
                          minDate={new Date()}
                          className="p-2 bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="ml-2 w-fit p-2 bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                        />
                      </label>
                    </div>

                  </div>
                </div>

                <div className="flex flex-col w-full space-y-2">
                  <label
                    className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                  >
                    Minimum Quorum:
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Minimum quorum"
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
                    className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>

                <div className="flex flex-col w-full space-y-2">
                  <label
                    className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                  >
                    Vote Type:
                  </label>
                  <div className="w-full">
                    <Select
                      onValueChange={handleVoteType}
                      className="w-full bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                    >
                      <SelectTrigger className="w-full p-2 text-white bg-[#1B0D37] rounded-md shadow-xs">
                        <SelectValue placeholder="Select Vote Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1B0D37] text-white rounded-md">
                        <SelectItem value="Equality" className="p-2 hover:bg-[#5228A4]">
                          Equality
                        </SelectItem>
                        <SelectItem value="ResourceOwned" className="p-2 hover:bg-[#5228A4]">
                          Resource Owned
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col w-full space-y-2">
                  <label
                    className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                  >
                    Bond Issuer Address:
                  </label>
                  <div className="w-full">
                    <Select
                      onValueChange={handleBondAddress}
                      className="w-full bg-[#1B0D37] border border-[#5228A4] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
                    >
                      <SelectTrigger className="w-full p-2 text-white bg-[#1B0D37] rounded-md shadow-xs">
                        <SelectValue placeholder="Select Bond Issuer Address" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1B0D37] text-white rounded-md">
                        {bondIssuerAddresses.length === 0 ? (
                          <SelectItem value="No issued Bond" className="p-2 hover:bg-[#5228A4]">
                            No Issued Bond
                          </SelectItem>
                        ) : (
                          bondIssuerAddresses.map((bond, index) => (
                            <SelectItem
                              key={index}
                              value={bond.creator_address}
                              className="p-2 hover:bg-[#5228A4]"
                            >
                              {bond.bond_name} - {bond.creator_address}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>



                  {/* <Input
                      placeholder="Enter Bond Issuer Address"
                      value={bondIssuerAddress}
                      onChange={(e) => setBondIssuerAddress(e.target.value)}
                    /> */}

                </div>


                <div className="flex flex-col w-full space-y-2">
                  <label
                    className="text-brand7 text-left text-2xl leading-[120%] font-medium relative self-stretch"
                  >
                    Target XRD Amount:
                  </label>
                  <input
                    className="w-full p-4 border bg-[#1B0D37] border-[#5228A4] rounded-md text-white text-left font-inter-body-large-16-regular-font-family text-inter-body-large-16-regular-font-size leading-inter-body-large-16-regular-line-height font-inter-body-large-16-regular-font-weight shadow-xs focus:outline-none focus:ring-1 focus:ring-purple-400"
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
                <Button variant="brand"
                  disabled

                >
                  Submitting....
                </Button>
              ) : (
                <Button
                  className="rounded-[26px] z-50 py-4 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium"

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
      ) : tokenChangeform ? (
        <div className=''>

          <div className="bg-[rgba(169,126,255,0.08)] mb-2 mt-20 rounded-[20px]  z-50 gap-7 p-10 border-2 border-brand5 flex flex-col justify-start items-start ">
            <div className="w-full cursor-pointer items-center z-[999] justify-start text-[22px] flex  "
              onClick={() => {
                setShowTokenChangeForm(false) // Hide the form and return to the list
                setActiveProposal(null) // Ensure no proposal is active
              }}>
              <ChevronLeft /> <span >Back</span>
            </div>
            <div className="  text-[40px] leading-[130%] z-50 font-semibold text-start">
              <span className="step-2-describe-your-dao-span3 text-amber-50">Token Price Change Form</span>


            </div>


          </div>
          <div className="flex items-center justify-center z-50 p-2 w-full mx-auto">
            <form
              className="w-[900px] flex flex-col gap-2"
              onSubmit={handleSubmitTokenChangeForm}
            >
              <div className="flex flex-col z-50 gap-2">
                <Label className="text-2xl p-1">Proposal Name</Label>
                <Input
                  placeholder="Proposal Name..."
                  value={tokenPriceChangeForm.proposalText}
                  onChange={(e) =>
                    handleInputChange('proposalText', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col z-50 gap-2">
                <Label className="text-2xl p-1">Proposal Description</Label>
                <Textarea
                  placeholder="Type your proposal description ..."
                  value={tokenPriceChangeForm.proposalDescription}
                  onChange={(e) =>
                    handleInputChange('proposalDescription', e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col mt-3 z-50 gap-3 w-full ">
                <div className="text-2xl p-1">Proposal Timing</div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex items-center">
                    <div>From:</div>
                    <label className="flex items-center">
                      <DatePicker
                        selected={tokenPriceChangeForm.startDate}
                        onChange={(date) =>
                          handleInputChange('startDate', date)
                        }
                        customInput={<CustomDatePicker />}
                        minDate={new Date()}
                      />
                      <Input
                        type="time"
                        value={tokenPriceChangeForm.startTime}
                        onChange={(e) =>
                          handleInputChange('startTime', e.target.value)
                        }
                        className="ml-2 w-fit"
                      />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <div>To:</div>
                    <label className="flex items-center">
                      <DatePicker
                        selected={tokenPriceChangeForm.endDate}
                        onChange={(date) => handleInputChange('endDate', date)}
                        customInput={<CustomDatePicker />}
                        minDate={new Date()}
                      />
                      <Input
                        type="time"
                        value={tokenPriceChangeForm.endTime}
                        onChange={(e) =>
                          handleInputChange('endTime', e.target.value)
                        }
                        className="ml-2 w-fit"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col  gap-2">
                  <Label className="text-2xl p-1">Minimum Quorum</Label>
                  <Input
                    placeholder="Enter Minimum quorum"
                    type="number"
                    value={tokenPriceChangeForm.minimumQuorum}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      if (value > participants.length) {
                        toast.error(
                          `The minimum quorum cannot exceed ${participants.length}.`,
                        )
                        return
                      }
                      handleInputChange('minimumQuorum', value)
                    }}
                    min="0"
                    max={participants.length}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-2xl p-1">Vote Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange('voteType', value)
                    }
                  >
                    <SelectTrigger className="w-full ">
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
                  <Label className="text-2xl p-1">Desired Token Price</Label>
                  <Input
                    placeholder="Enter desired token price"
                    type="number"
                    min="0"
                    value={tokenPriceChangeForm.desireTokenPrice}
                    onChange={(e) =>
                      handleInputChange('desireTokenPrice', e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 mb-10">
                  <Label className="text-2xl p-1">
                    Desired Token Buy Back Price
                  </Label>
                  <Input
                    placeholder="Enter desired token buy-back price"
                    type="number"
                    min="0"
                    value={tokenPriceChangeForm.desireTokenBuyBackPrice}
                    onChange={(e) =>
                      handleInputChange(
                        'desireTokenBuyBackPrice',
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>

              {loadingButton ? (
                <Button variant="brand" disabled
                  className="z-50 h-12 text-xl"

                >
                  Submitting....
                </Button>
              ) : (
                <Button
                  variant="brand"
                  className="z-50 h-12 text-xl"
                  disabled={Object.values(tokenPriceChangeForm).some(
                    (value) => !value,
                  )}
                >
                  Submit Proposal
                </Button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-5  px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">


          <div className="bg-[rgba(169,126,255,0.08)] rounded-[10px] border-2 border-[#5228A4]  relative overflow-hidden ">
            <div className="bg-[#39246b] pr-[15px] pl-[15px]  flex z-50 flex-row items-center justify-between w-full h-[63px] sticky  left-0 top-0">
              <div className='flex items-center gap-2 '>
                <div
                  onClick={() => setShowCategories(false)}
                  type="button"
                  className="flex items-center text-[20px] cursor-pointer "

                >
                  <ChevronLeft /> <span >Back</span>
                </div>
                <div className='bg-purple-100 h-7  w-[1px] mx-1'></div>
                <div className="text-[#ffffff] text-left  text-2xl font-medium flex items-center gap-2">

                  What kind of proposal do you want to create?
                </div>
              </div>

              <div>
                <Dialog>
                  <DialogTrigger className='flex gap-1 items-center text-brand7 text-[16px] font-light'>
                    <span>
                      Not able to create proposal?

                    </span>

                    <CircleHelp className='size-4' />

                  </DialogTrigger>
                  <DialogContent className='bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md border-[1px] border-brand3 rounded-lg shadow-lg'>
                    <DialogHeader>
                      <DialogTitle>Please review the following points ?</DialogTitle>
                      <DialogDescription>
                        Ensure you have reviewed the following points before creating a proposal:
                        <ul className="list-disc marker:text-green-500 marker:text-1xl px-5 py-3 text font-semibold ">

                          <li>You should be a member of the community.</li>
                          <li>You should buy at least one token.</li>
                          <li>There should be a bond for sale in Issued Bond menu.</li>
                          <li>The proposal must be written in a clear and concise manner.</li>
                        </ul>

                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className=" grid grid-cols-3 gap-5 h-[250px] p-5  ">
              {ProposalTypes.map((proposal, index) => (
                <Card
                  key={index}
                  className="flex flex-col hover:shadow-lg cursor-pointer items-start gap-2  bg-brand1 border-b-2 border-[#5228A4] rounded-lg p-5 text-brand7 relative justify-between"
                >
                  <div className="font-bold  text-brand7 text-[22px] ">{proposal.title}</div>
                  <div className="text-sm   text-gray-400 text-[16px] ">{proposal.description}</div>
                  <div className="flex items-center justify-end w-full">
                    <Button
                      variant="brand"
                      onClick={() => {
                        if (proposal.title === 'Custom Proposal') {
                          setShowForm(true)
                        } else if (proposal.title === 'Token Price Change') {
                          setShowTokenChangeForm(true)
                        } else {
                          null
                        }
                      }}
                    >
                      Use
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>






        </div>
      )}
    </div>
  )
}

export default Proposals
