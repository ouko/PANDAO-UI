import { useAccount } from '@/AccountContext'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { CustomAlert } from '../GlobalComponents/CustomAlert'
import useBluePrintSlugStore from '@/store/blueprintSlug'

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import FundHistoryGraph from './ChatHistory'
import { DialogDescription } from '@radix-ui/react-dialog'
import DaoCard from './components/DaoCard'
import TokenCard from './components/TokenCard'
import TotalProposalsCard from './components/PraposalCard'
import TotalFund from './components/TotalFund'
import WithdrawCard from './components/WithdrawCard'
import DiscussionCard from './components/DiscussionCard'
import ExecutiveMember from './components/ExecutiveMember'
import { CardShimmer } from '@/components/ui/shimmer'
import { CardShimmer2 } from '@/components/ui/shimmer2'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
)

const CommunityDetails = () => {
  const { accounts } = useAccount()
  const [execOpen, setExecOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const { setSlug } = useBluePrintSlugStore()
  const [executiveName, setExecutiveName] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  const [transferAddress, setTransferAddress] = useState("")
  const queryClient = useQueryClient()
  const sendTransaction = useSendTransaction()
  const [loadingMint, setLoadingMint] = useState(false)

  const { data: communityData, isLoading: isLoadingCommunity } = useQuery({
    queryKey: ['community', params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/detail/${params.id}`,
      )
      if (res.status === 200) {
        setSlug(res.data.blueprint_slug)
        return res.data
      }
      throw new Error('Failed to fetch community data')
    },
  })

  const { data: participants = [], isLoading: isLoadingParticipants } = useQuery({
    queryKey: ['participants', params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/participant/${params.id}`,
      )
      return res.data
    },
  })

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['participants', params.id] });
    queryClient.invalidateQueries({ queryKey: ['community', params.id] });
    queryClient.invalidateQueries({ queryKey: ['withdrawRequests', params.id] });
  };

  const { data: communities = [], isLoading: isLoadingCommunities } = useQuery({
    queryKey: ['discussions', params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/${params.id}`,
      )
      return res.data
    },
  })

  const { data: withDrawRequest = [], isLoading: isLoadingWithdraw } = useQuery({
    queryKey: ['withdrawRequests', params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/token-withdraw/request?c_id=${params.id}`,
      )
      return res.data
    },
  })

  const handleClickMint = async () => {
    if (!executiveName) {
      toast.error("Fill Fields")
      return
    }

    const data = {
      user_address: accounts[0].address,
      community_id: params.id,
      name: executiveName
    }

    setLoadingMint(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/mint/executive-token`,
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
          await axios.post(
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

          toast.success('Minted Successfully!')
          setExecOpen(false)
          // Invalidate relevant queries
          queryClient.invalidateQueries({ queryKey: ['participants', params.id] })
          queryClient.invalidateQueries({ queryKey: ['community', params.id] })
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
          setExecOpen(false)
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
        setExecOpen(false)
      }
    } catch (error) {
      console.error('Error selling token:', error.response?.data?.detail)
      toast.error('Something went wrong.')
      setExecOpen(false)
    } finally {
      setLoadingMint(false)
    }
  }

  const handleTransfer = async () => {
    if (transferAddress.trim() === "") {
      toast.error("Fill Fields")
      return
    }

    const data = {
      user_address: accounts[0].address,
      community_id: params.id,
      recipient: transferAddress
    }

    setLoadingMint(true)

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
          if (response.status === 200) {
            toast.success('Transfer Token Successfully!')
            handleSuccess()
          }

        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
          handleSuccess()
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
        handleSuccess()
      }
    } catch (error) {
      console.error('Error selling token:', error.response?.data?.detail)
      toast.error('Something went wrong.')
      handleSuccess()
    } finally {
      setLoadingMint(false)
      setTransferOpen(false)
    }
  }

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }

  const isUserParticipant = participants.some(
    (participant) => participant.public_address === accounts[0].address,
  )
  const isOwner = participants.some(
    (participant) =>
      participant.public_address === accounts[0].address &&
      participant.is_owner === true
  )

  console.log(isOwner, participants, "fasial")
  const isLoading = isLoadingCommunity || isLoadingParticipants || isLoadingCommunities || isLoadingWithdraw

  return (
    <div className="pb-10 items-start font-clash gap-2 justify-start min-h-screen overflow-hidden mt-5 text-black px-2">
      <CustomAlert />
      <div className="flex md:flex-row flex-col md:py-12">
        {isLoading ? (
          <div className="w-full mx-4 space-y-6">
            <CardShimmer />
            <div className="flex md:flex-row flex-col w-full mx-auto gap-[16px]">

              <CardShimmer2 />



              <div className="w-full   space-y-4">
                <CardShimmer />
                <CardShimmer />
                <CardShimmer />
              </div>
            </div>
          </div>
        ) : communityData ? (
          <div className="w-full mx-4">
            <DaoCard
              daoData={communityData}
              isUserParticipant={isUserParticipant}
              setTransferOpen={setTransferOpen}
              setExecOpen={setExecOpen}
              isOwner={isOwner}
              onSuccess={handleSuccess}
            />

            <div className="flex md:flex-row flex-col w-full mx-auto gap-[16px]">
              <div className="w-full space-y-4">
                <TokenCard data={communityData} onSuccess={handleSuccess} />
                <TotalFund data={communityData} />
                <WithdrawCard withDrawRequest={withDrawRequest} participant={participants} onSuccess={handleSuccess} />

              </div>
              <div className="w-full space-y-4">
                <div>
                  <TotalProposalsCard />
                </div>
                <ExecutiveMember participants={participants} />
                <FundHistoryGraph />
                <DiscussionCard communities={communities} />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Dialog open={execOpen} onOpenChange={setExecOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-full  p-6 bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md border-[1px] border-brand3 rounded-lg shadow-lg ">
          <DialogHeader className="max-w-4xl w-full">
            <DialogTitle className="text-2xl font-semibold text-gray-100 w-full text-center">
              Mint Executive Badges
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 ">
              <div>
                Mint Executive Badges
              </div>
              <div className='w-full'>
                <Label>
                  Executive
                </Label>
                <Input
                  value={executiveName}
                  onChange={(e) => setExecutiveName(e.target.value)}
                />
              </div>
              <Button
                variant="brand"
                onClick={handleClickMint}
                disabled={loadingMint}
              >
                Mint Executive Badge
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={transferOpen} onOpenChange={setTransferOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-half pt-10 bg-[rgba(169,126,255,0.34)] text-gray-300 backdrop-blur-md  border-[1px] border-brand3 rounded-lg shadow-lg max-w-5xl overflow-y-auto max-h-[80vh]">
          <DialogHeader className="w-full overflow-auto">
            <DialogTitle className="text-2xl font-semibold text-gray-300 w-full text-center">
              Transfer Executive Badges
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 w-full overflow-y-auto">
              {participants.map((participant, index) => (
                <div key={index} className="w-[500px] text-center border-b pb-4 mb-4">
                  <p className="text-lg font-medium text-gray-300">
                    Name:{participant.name}</p>
                  <p
                    className="text-sm text-gray-300 break-all cursor-pointer hover:text-blue-500"
                    onClick={() => setTransferAddress(participant.public_address)}
                  >
                    {participant.public_address}
                  </p>
                  <p className="text-sm text-red-500 font-semibold">
                    Total Invested: {participant.total_invested}
                  </p>
                </div>
              ))}

              <div className="w-full">
                <Label>Executive Badges</Label>
                <Input
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                />
              </div>

              <Button
                variant="brand" onClick={handleTransfer} disabled={loadingMint}>
                Transfer Executive Badge
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

      </Dialog>

    </div>
  )
}

export default CommunityDetails
