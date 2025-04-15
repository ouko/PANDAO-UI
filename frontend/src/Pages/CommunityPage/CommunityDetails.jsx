import { useAccount } from '@/AccountContext'
import { Button } from '@/components/ui/button'


import axios from 'axios'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSendTransaction } from '@/hooks/useSendTransaction'
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
  const [data, setData] = useState([])
  const [participants, setParticipants] = useState([])
  const [communities, setCommunities] = useState([])
  const [withDrawRequest, setWithDrawRequest] = useState([])
  const sendTransaction = useSendTransaction()
  const [loadingMint, setLoadingMint] = useState(false)
  const [transferAddress, setTransferAddress] = useState("");


  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/detail/${params.id}`,
      )

      if (res.status == 200) {
        console.log(res.data.blueprint_slug, 'res')
        setSlug(res.data.blueprint_slug)
        setData(res.data)

        // Fetch fund history data

      }
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
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

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/discussion/${params.id}`,
      )
      setCommunities(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }
  const fetchWithdrawRequest = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/token-withdraw/request?c_id=${params.id}`,
      )
      setWithDrawRequest(res.data)
    } catch (error) {
      console.error('Error fetching blueprint data:', error)
    }
  }


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
        `${import.meta.env.VITE_BACKEND_URL
        }/mint/executive-token`,
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

      console.log('Response:', responseData)

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

          console.log('Submit Transaction Response:', submitResponse.data)
          toast.success('Minted Successfully!')
setExecOpen(false)
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
      console.error('Error selling token:', error.response.data.detail)
      toast.error('Something went wrong.')
      setExecOpen(false)

    } finally {
      setLoadingMint(false)
      setExecOpen(false)

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
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/transfer-executive-token`,
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

      console.log('Response:', responseData)

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

          console.log('Submit Transaction Response:', submitResponse.data)
          toast.success('Transfer Token Successfully!')

        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')

      }
    } catch (error) {
      console.error('Error selling token:', error.response.data.detail)
      toast.error('Something went wrong.')
    } finally {
      setLoadingMint(false)
    }
  }



  const handleSuccess = () => {
    fetchDetails()
  }
  const handleSuccess2 = () => {
    fetchParticipant()
  }
  useEffect(() => {
    fetchDetails()
    fetchParticipant()
    fetchComments()
    fetchWithdrawRequest()
  }, [params.id])

  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }

  const isUserParticipant = participants.some(
    (participant) => participant.public_address === accounts[0].address,
  )
  return (
    <div className=" pb-10 items-start font-clash gap-3 justify-start min-h-screen overflow-hidden mt-5 text-black px-2">
      <CustomAlert />
      <div className="flex md:flex-row flex-col   md:py-12  ">
        {data && (
          <div className=" w-full  ">

            <DaoCard daoData={data}
              isUserParticipant={isUserParticipant}
              setTransferOpen={setTransferOpen}
              setExecOpen={setExecOpen}
              onSuccess={handleSuccess2}

            />

            <div className="flex md:flex-row flex-col w-full mx-auto gap-[16px] ">
              <div className=" w-full space-y-4">


                <TokenCard data={data} onSuccess={handleSuccess} />
                <TotalFund data={data} />



                <WithdrawCard
                  withDrawRequest={withDrawRequest}
                />

                <DiscussionCard communities={communities} />




                <div className="bg-transparent w-full mx-auto  flex items-center  ">

                </div>
              </div>
              <div className=" w-full space-y-4 ">
                {/* <MembersCard participants={participants} /> */}
                <div>
                  <TotalProposalsCard />
                </div>
                <ExecutiveMember participants={participants} />
                <FundHistoryGraph />


                <div className="bg-transparent w-full mx-auto  flex items-center   ">

                </div>
              </div>
            </div>
          </div>
        )}
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
              {/* <div className='w-full'>
                <Label>
                  Executive Id
                </Label>
                <Input
                  value={executiveId}
                  onChange={(e) => setExecutiveId(e.target.value)}
                  type="number"
                  min={0}
                />
              </div> */}
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
