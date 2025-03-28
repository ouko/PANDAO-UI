import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import AvatarCircles from '@/components/ui/myComponents/avatarCircle'
import { clipAddress } from '@/utils/functions/ClipAddress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import axios from 'axios'
import {
  Bitcoin,
  Check,
  ChevronRight,
  CircleAlert,
  Contact,
  Copy,
  Terminal,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import extractTransactionsData from '@/utils/GetTransactionRecipt'
import { PieChart } from 'react-minimal-pie-chart'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import useCustomAlertStore from '@/store/customAlertStore'
import { CustomAlert } from './GlobalComponents/CustomAlert'
import { formatStandardDateTime } from '@/utils/functions/convertActivityData'
import { Badge } from '@/components/ui/badge'
import useBluePrintSlugStore from '@/store/blueprintSlug'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import FundHistoryGraph from './CommunityPage/ChatHistory'
import { DialogDescription } from '@radix-ui/react-dialog'
import DaoCard from './CommunityPage/components/DaoCard'
import TokenCard from './CommunityPage/components/TokenCard'
import Members from './CommunityPage/Members'
import MembersCard from './CommunityPage/components/MembersCard'
import TotalProposalsCard from './CommunityPage/components/PraposalCard'
import TotalFund from './CommunityPage/components/TotalFund'
import WithdrawCard from './CommunityPage/components/WithdrawCard'
import DiscussionCard from './CommunityPage/components/DiscussionCard'
import ExecutiveMember from './CommunityPage/components/ExecutiveMember'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
)

function removeNewLines(input) {
  return input.replace(/\n\s*/g, ' ')
}

const CommunityDetails = () => {
  const { accounts } = useAccount()
  const [openBuyModal, setBuyModal] = useState(false)
  const [quickStartOpen, setQuickStartOpen] = useState(false)
  const [execOpen, setExecOpen] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [openSellModal, setSellModal] = useState(false)
  const { setOpen, setText } = useCustomAlertStore()
  const { setSlug } = useBluePrintSlugStore()
  const [executiveId, setExecutiveId] = useState("")
  const [executiveName, setExecutiveName] = useState("")
  const [tranferAddress, setTranferAddress] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  const [data, setData] = useState([])
  const [participants, setParticipants] = useState([])
  const [communities, setCommunities] = useState([])
  const [withDrawRequest, setWithDrawRequest] = useState([])
  const [copied, setCopied] = useState(false)
  const sendTransaction = useSendTransaction()
  const [loading, setLoading] = useState(false)
  const [loadingMint, setLoadingMint] = useState(false)
  const [manifest, setManifest] = useState('')
  const [token, setToken] = useState(0)
  const [tokenToSell, setTokenToSell] = useState(0)
  const [selectedId, setSelectedId] = useState("")
  const [fundHistory, setFundHistory] = useState([]) // New state for fund history
  const [transferAddress, setTransferAddress] = useState("");
  const [withDrawModal, setWithDrawModal] = useState(false);
  const [withdrawAmount, setwithdrawAmout] = useState(0)
  const handleTrans = () => {
    console.log("Transferring badge to:", transferAddress);
    // Implement transfer logic here
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

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
        fetchParticipant()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log('Error joining community:', error)
      toast.error('Something went wrong')
    }
  }
  // const handleClaimToken = async () => {
  //   console.log("selectedAccount:", accounts[0].address);
  //   if (!accounts[0].address) {
  //     alert("Please select an account first.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/manifest/build/deploy_token_weighted_dao`,
  //       formFields,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setManifest(response.data)
  //   } catch (error) {
  //     window.alert(error);
  //   }

  //   const { receipt } = await sendTransaction(manifest).finally(() =>
  //     setLoading(false)
  //   );

  //   let txId = receipt.transaction.intent_hash;
  //   if (txId) {
  //     try {
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_URL}/submit-tx`,
  //         {
  //           tx_id: txId,
  //           user_address: accounts[0].address,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       window.alert(error);
  //     }
  //   }

  //   // create a transaction recipt
  //   const recipt = await extractTransactionsData(txId);
  //   console.log(recipt);

  // };


  const handleBuyToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: token,
    }
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/build/buy_token/token_weighted_dao`,
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

      setManifest(responseData)

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

          toast.success('Token Bought Successfully!')
          setText('Token Bought')
          fetchDetails()
          setOpen(true)
          setBuyModal(false)
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error buying token:', error.response.data.detail)
      if (error.response.data.detail === 'not a community participant') {
        setText('Please join the community')
        setOpen(true)
        return
      }
      toast.error('Something went wrong while buying tokens.')
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading(false)
    }
  }


  const handleWithDrawSign = async (id) => {
    console.log("id", id)
    const data = {
      community_id: params.id,
      user_address: accounts[0].address,
      id,
    }
    console.log("id", data)
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/sign-withdraw-request`,
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
      setManifest(responseData)

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
          toast.success('Sign Withdraw Request Successfully!')
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error selling token:', error)


      toast.error('Something went wrong while selling tokens.')
    } finally {
      setLoading(false)
      setSelectedId("")
    }
  }
  const handleSellToken = async () => {
    const data = {
      community_id: params.id,
      userAddress: accounts[0].address,
      tokenSupply: tokenToSell,
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/build/sell_token/token_weighted_dao`,
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
      setManifest(responseData)

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
          toast.success('Withdraw Request Sign Successfully!')
          setText('Token Sold')
          setOpen(true)
          setSellModal(false)
          setTokenToSell(0)
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
          setTokenToSell(0)
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
        setTokenToSell(0)
      }
    } catch (error) {
      console.error('Error selling token:', error.response.data.detail)

      // Handle specific error cases
      if (error.response.data.detail === 'not a community participant') {
        setText('Please join the community')
        setOpen(true)
        setTokenToSell(0)
        return
      }

      toast.error('Something went wrong while selling tokens.')
    } finally {
      setLoading(false)
      setTokenToSell(0)
    }
  }

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
        if (res.data.fund_history) {
          setFundHistory(res.data.fund_history) // Populate fund history data
        }
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
      setManifest(responseData)

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
      setManifest(responseData)

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
  const handleWithdrawRequest = async () => {
    if (withdrawAmount.trim() === "") {

      toast.error("Fill Fields")
      return
    }

    const data = {
      user_address: accounts[0].address,
      community_id: params.id,
      amount: withdrawAmount

    }

    setLoadingMint(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL
        }/manifest/generate-token-withdraw-request`,
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
      setManifest(responseData)

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
          toast.success('Successfully!')

        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed .')
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
  console.log(participants, 'hey')
  return (
    <div className=" pb-10 items-start font-clash gap-3 justify-start min-h-screen overflow-hidden mt-5 text-black px-2">
      <CustomAlert />
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6  md:py-12 max-w-[1440px] mx-auto ">
        {data && (
          <div className="space-y-6 md:w-[100%] ">

           <DaoCard daoData={data} isUserParticipant={isUserParticipant}
             handleJoinCommunity={handleJoinCommunity} 
             setQuickStartOpen={setQuickStartOpen}
             />

            <div className="flex md:flex-row flex-col md:w-[100%] mx-auto gap-2">
              <div className="md:w-[50%] space-y-3">


              <TokenCard data={data}
                  handleSellToken={handleSellToken}
                  handleBuyToken={handleBuyToken}
                  loading={loading}
                />
                <TotalFund data={data} setWithDrawModal={setWithDrawModal} /> 
               

               
                <WithdrawCard
                  withDrawRequest={withDrawRequest}
                  handleWithDrawSign={handleWithDrawSign}
                  loading={loading}
                 
                />

             <DiscussionCard communities={communities} />
                
                

                
                <div className="bg-transparent w-full mx-auto  flex items-center  ">
                  
                </div>
              </div>
              <div className=" px-4 md:w-[50%] space-y-6   ">
              <MembersCard participants={participants} />
                  <div>
                    <TotalProposalsCard />
                  </div>
                 <ExecutiveMember participants={participants}/>
                 <FundHistoryGraph />

               
                <div className="bg-transparent w-full mx-auto  flex items-center   ">
                 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog open={quickStartOpen} onOpenChange={setQuickStartOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-xl p-6 bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
              Quick Start
            </DialogTitle>
            <DialogDescription className="flex  items-center gap-4 mt-4 w-full">
              <Card
                className="w-full p-6 bg-gray-100 hover:bg-gray-200 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/community/detail/${params.id}/proposals?state="proposal"`)
                }
              >
                <h3 className="text-xl font-medium text-gray-800">
                  Create a Proposal
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Start a new project by creating a detailed proposal.
                </p>
              </Card>
              <Card
                className="w-full p-6 bg-gray-100 hover:bg-gray-200 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/community/detail/${params.id}/bondissue`)
                }
              >
                <h3 className="text-xl font-medium text-gray-800">
                  Create a Bond
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Secure your projects with a reliable bond.
                </p>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={execOpen} onOpenChange={setExecOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-full  p-6 bg-white rounded-lg shadow-lg ">
          <DialogHeader className="max-w-4xl w-full">
            <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
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
                variant="radix"
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
        <DialogContent className="w-half pt-10 bg-white rounded-lg shadow-lg max-w-5xl overflow-y-auto max-h-[80vh]">
          <DialogHeader className="w-full overflow-auto">
            <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
              Transfer Executive Badges
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 w-full overflow-y-auto">
              {participants.map((participant, index) => (
                <div key={index} className="w-full text-center border-b pb-4 mb-4">
                  <p className="text-lg font-medium text-gray-700">
                    Name:{participant.name}</p>
                  <p
                    className="text-sm text-gray-500 break-all cursor-pointer hover:text-blue-500"
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

              <Button variant="radix" onClick={handleTransfer} disabled={loadingMint}>
                Transfer Executive Badge
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

      </Dialog>
      <Dialog open={withDrawModal} onOpenChange={setWithDrawModal}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-half pt-10 bg-white rounded-lg shadow-lg max-w-5xl overflow-y-auto max-h-[80vh]">
          <DialogHeader className="w-full overflow-auto">
            <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
              Fund Withdraw Request
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 w-full overflow-y-auto">

              <div className="w-full">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setwithdrawAmout(e.target.value)}
                />
              </div>

              <Button variant="radix" onClick={handleWithdrawRequest} disabled={loadingMint}>
                Withdraw Request
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default CommunityDetails
