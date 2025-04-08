import { useAccount } from '@/AccountContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'


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
import MembersCard from './components/MembersCard'
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
  const [quickStartOpen, setQuickStartOpen] = useState(false)
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
  const [loading, setLoading] = useState(false)
  const [loadingMint, setLoadingMint] = useState(false)
  const [manifest, setManifest] = useState('')
  const [selectedId, setSelectedId] = useState("")
  const [transferAddress, setTransferAddress] = useState("");
  const [withDrawModal, setWithDrawModal] = useState(false);
  const [withdrawAmount, setwithdrawAmout] = useState(0)




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
const handleSuccess=()=>{
  fetchDetails()
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
          <div className="space-y-6 w-full  ">

            <DaoCard daoData={data} isUserParticipant={isUserParticipant}
              handleJoinCommunity={handleJoinCommunity}
              setQuickStartOpen={setQuickStartOpen}
              setTransferOpen={setTransferOpen}
              setExecOpen={setExecOpen}

            />

            <div className="flex md:flex-row flex-col w-full mx-auto gap-2">
              <div className="md:w-[50%] space-y-3">


                <TokenCard data={data} onSuccess={handleSuccess}/>
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
                <ExecutiveMember participants={participants} />
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
        <DialogContent className="max-w-2xl p-6 bg-[rgba(169,126,255,0.34)] backdrop-blur-md border-[1px] border-brand3 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-brand7 w-full text-center">
              Quick Start
            </DialogTitle>
            <DialogDescription className="flex  items-center gap-4 mt-4 w-full">
              <Card
                className="w-full p-6 bg-[rgba(121,84,196,0.8)] border-[1px] border-brand2 hover:bg-[rgba(169,126,255,0.34)] transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/community/detail/${params.id}/proposals?state="proposal"`)
                }
              >
                <h3 className="text-xl font-medium text-gray-300">
                  Create a Proposal
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Start a new project by creating a detailed proposal.
                </p>
              </Card>
              <Card
                className="w-full p-6 bg-[rgba(121,84,196,0.8)] border-[1px] border-brand2 hover:bg-[rgba(169,126,255,0.34)]  transition-shadow duration-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/community/detail/${params.id}/bondissue`)
                }
              >
                <h3 className="text-xl font-medium text-gray-300">
                  Create a Bond
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Secure your projects with a reliable bond.
                </p>
              </Card>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
                className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-white font-semibold rounded-full"
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
                className="bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.25)] px-5 py-2 text-white font-semibold rounded-full"
                onClick={handleTransfer} disabled={loadingMint}>
                Transfer Executive Badge
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

      </Dialog>
      <Dialog open={withDrawModal} onOpenChange={setWithDrawModal}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-[600px] pt-10 bg-[rgba(169,126,255,0.34)] text-white backdrop-blur-md  border-[1px] border-brand3 rounded-lg shadow-lg max-w-5xl overflow-y-auto max-h-[80vh]">
          <DialogHeader className="w-full overflow-auto">
            <DialogTitle className="text-2xl font-semibold text-gray-300 w-full text-center">
              Fund Withdraw Request
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center gap-4 mt-4 w-full overflow-y-auto">

              <div className="w-full">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setwithdrawAmout(e.target.value)}
                  min={0}
                />
              </div>

              <Button
                className="rounded-[26px] py-2 px-[15px] bg-gradient-to-b from-[rgba(192,161,255,1)] to-[rgba(130,69,255,1)] shadow-inner text-black text-[14px] leading-5 font-medium"
                onClick={handleWithdrawRequest} disabled={loadingMint}>
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
