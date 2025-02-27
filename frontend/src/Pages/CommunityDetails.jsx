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
  const [copied, setCopied] = useState(false)
  const sendTransaction = useSendTransaction()
  const [loading, setLoading] = useState(false)
  const [loadingMint, setLoadingMint] = useState(false)
  const [manifest, setManifest] = useState('')
  const [token, setToken] = useState(0)
  const [tokenToSell, setTokenToSell] = useState(0)
  const [fundHistory, setFundHistory] = useState([]) // New state for fund history
  const [transferAddress, setTransferAddress] = useState("");

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
          toast.success('Token Sold Successfully!')
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

    if (tranferAddress.trim()!=="") {
      
      toast.error("Fill Fields")
      return
    }

    const data = {
      user_address: accounts[0].address,
      community_id: params.id,
      recipient: tranferAddress

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

  useEffect(() => {
    fetchDetails()
    fetchParticipant()
    fetchComments()
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
    <div className="pt-20 pb-10 items-start gap-3 justify-start min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-purple-50 text-black px-2">
      <CustomAlert />
      <div className="flex md:flex-row flex-col gap-6 px-4 md:px-6 py-8 md:py-12 max-w-[1440px] mx-auto ">
        {data && (
          <div className="space-y-6 md:w-[100%] ">
            <Card className="bg-white md:w-[90%] mx-auto md:p-5 p-6 shadow-lg flex  md:flex-row flex-col gap-3 overflow-hidden">
              <Avatar className="h-28 w-28 border-[5px] border-purple-400">
                <AvatarImage
                  src={data.image}
                  className="h-28 w-28 object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <div className="flex md:flex-row flex-col items-center justify-between gap-5">
                  <h1 className="text-3xl font-bold text-left w-full">
                    {data.name}
                  </h1>

                  <div className="flex items-end md:items-start md:justify-end w-full gap-2">
                    {!isUserParticipant && (
                      <Button variant="radix" onClick={handleJoinCommunity}>
                        Join Community
                      </Button>
                    )}
                    {isUserParticipant && (
                      <div className='flex items-center gap-2'>
                        <Button
                          variant="radix"
                          onClick={() => setTransferOpen(true)}
                        >
                          Transfer Executive Badge
                        </Button>
                        <Button
                          variant="radix"
                          onClick={() => setExecOpen(true)}
                        >
                          Mint Executive Badge
                        </Button>
                        <Button
                          variant="radix"
                          onClick={() => setQuickStartOpen(true)}
                        >
                          🚀 Quick Start
                        </Button>

                      </div>

                    )}
                  </div>
                </div>
                <div className="flex ">
                  <div className="grid gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Community Overview
                      </h2>
                      <p className=" mt-2">{data.description}</p>
                    </div>
                    <div>
                      <h2 className="text-md font-semibold">Pupose</h2>
                      <p className="text-gray-800 dark:text-gray-400 mt-2">
                        {data.purpose || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-md font-semibold">Owner Address</h2>
                      <div className="flex items-center  gap-2">
                        <p className="text-gray-900 dark:text-gray-400 mt-2 text-ellipsis overflow-hidden">
                          {clipAddress(data.owner_address || 'N/A')}
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => handleCopy(data.owner_address)}
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-md font-semibold">
                        Component Address
                      </h2>
                      <p className="text-gray-900 dark:text-gray-400 mt-2 text-ellipsis w-fit ">
                        {data.component_address || 'N/A'}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-md font-semibold">Proposal Rights</h2>
                      {data.proposal_rights === 'TOKEN_HOLDER_THRESHOLD' ? (
                        <div className="mt-2">
                          <p>
                            Proposal submission is restricted. You need to hold
                            at least{' '}
                            <span className="font-bold">
                              {data.proposal_minimum_token || 10}{' '}
                            </span>{' '}
                            tokens to make a proposal.
                          </p>
                        </div>
                      ) : data.proposal_rights === 'ADMIN' ? (
                        <div className="mt-2">
                          <p>Proposal creation is restricted to Admin only.</p>
                        </div>
                      ) : (
                        <div className="mt-2">
                          Proposal creation is open to all.
                        </div>
                      )}
                    </div>
                    {/* <div>
                    <h2 className="text-md font-semibold">Tags</h2>
                    <div className="flex items-center gap-1">
                        {data.tags &&
                          data.tags.map((token, index) => (
                            <Badge key={index} variant="outline">
                              {token}{' '}
                            </Badge>
                          ))}
                      </div>
                  </div> */}
                  </div>
                  <div className=" mt-4 w-full space-y-2">
                    <Alert className="w-full ">
                      <CircleAlert className="h-4 w-4" />
                      <AlertTitle>Proposal Rights</AlertTitle>
                      <AlertDescription>
                        {data.proposal_rights === 'TOKEN_HOLDER_THRESHOLD' ? (
                          <div className="mt-2">
                            <p>
                              Proposal submission is restricted. You need to
                              hold at least{' '}
                              <span className="font-bold">
                                {data.proposal_minimum_token || 10}{' '}
                              </span>{' '}
                              tokens to make a proposal.
                            </p>
                          </div>
                        ) : data.proposal_rights === 'ADMIN' ? (
                          <div className="mt-2">
                            <p>
                              Proposal creation is restricted to Admin only.
                            </p>
                          </div>
                        ) : (
                          <div className="mt-2">
                            Proposal creation is open to all.
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                    <Alert className="w-full ">
                      <CircleAlert className="h-4 w-4" />
                      <AlertTitle>DAO TYPE</AlertTitle>
                      <AlertDescription>
                        {data.blueprint_slug === 'Insurance' ? (
                          <div className="mt-2">
                            <p>This is an ANN Organization</p>
                          </div>
                        ) : (
                          <div>Investment DAO</div>
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex md:flex-row flex-col md:w-[90%] mx-auto gap-2">
              <div className="md:w-[60%] space-y-3">
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg flex items-center justify-between ">
                  <div className="font-semibold tracking-wide">
                    Total Proposals
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      onClick={() =>
                        navigate(`/community/detail/${params.id}/proposals`)
                      }
                      className="bg-purple-600 shadow-lg min-w-28 flex items-center justify-center rounded-lg text-white py-1 px-2 cursor-pointer "
                    >
                      New Proposal
                    </div>
                  </div>
                </Card>
                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg flex items-center justify-between ">
                  <div className="font-semibold tracking-wide">Total Funds</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-600 shadow-lg min-w-28 flex items-center justify-center rounded-lg text-white p-1">
                      {Math.round(data.funds_in_usd * 10000) / 10000} $
                    </div>{' '}
                    <div className="bg-purple-600 shadow-lg min-w-28 flex items-center justify-center rounded-lg text-white p-1">
                      {data.funds} XRD
                    </div>
                  </div>
                </Card>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg ">
                  <h1 className="font-semibold tracking-wide">Discussions</h1>
                  {communities.length === 0 && (
                    <div className="flex items-center justify-center">
                      No active discussions
                    </div>
                  )}
                  {communities.length > 0 && (
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {communities.slice(0, 4).map((community, index) => (
                        <Card
                          key={index}
                          onClick={() =>
                            navigate(
                              `/community/detail/${params.id}/discussion`,
                            )
                          }
                          className="p-4 flex flex-col gap-2 hover:shadow-lg shadow-md cursor-pointer"
                        >
                          <div className="text-lg font-semibold">
                            {community.title}
                          </div>
                          <div className="text-sm flex items-center gap-2">
                            <div>Started By - </div>
                            <div className="flex items-center gap-1">
                              <div>
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={community.user_image} />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>{community.user_name}</div>
                            </div>
                          </div>
                          <div className="w-full border-t-2 pt-2">
                            {formatStandardDateTime(community.created_at)}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>

                <FundHistoryGraph />
                <div className="bg-transparent w-full mx-auto  flex items-center  ">
                  <Card
                    onClick={() =>
                      navigate(`/community/detail/${params.id}/discussion`)
                    }
                    className=" group  p-3 w-64 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer "
                  >
                    <p>See all Discussions </p>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </Card>
                </div>
              </div>
              <div className="md:w-[40%] space-y-6 w-[100%]  ">
                <div className="flex flex-col gap-2 w-full ">
                  <Card className="bg-white md:w-[100%] w-full mx-auto md:p-10 p-4 shadow-lg space-y-10 md:h-80">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit rounded-full">
                        <img src="/radix.webp" className="h-10 w-10" />
                      </div>
                      <div className="flex items-center gap-1">
                        {data.total_token > 0 && data.token_bought > 0 && (
                          <div>
                            <Dialog
                              open={openSellModal}
                              onOpenChange={setSellModal}
                            >
                              <DialogTrigger asChild>
                                <Button variant="radix">Sell Token</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Sell Token</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Token
                                    </Label>
                                    <Input
                                      id="name"
                                      className="col-span-3"
                                      placeholder="How many Token you want to Sell"
                                      type="number"
                                      onChange={(e) =>
                                        setTokenToSell(e.target.value)
                                      }
                                      required
                                      min={0}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  {loading ? (
                                    <Button variant="radix" disabled>
                                      Selling...
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="radix"
                                      onClick={handleSellToken}
                                      disabled={!tokenToSell}
                                    >
                                      Sell Token
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                        {data.total_token > data.token_bought && (
                          <div>
                            <Dialog
                              open={openBuyModal}
                              onOpenChange={setBuyModal}
                            >
                              <DialogTrigger asChild>
                                <Button variant="radix">Buy Token</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Buy Token</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                      htmlFor="name"
                                      className="text-right"
                                    >
                                      Token
                                    </Label>
                                    <Input
                                      id="name"
                                      className="col-span-3"
                                      placeholder="How many Token you want to buy"
                                      type="number"
                                      onChange={(e) => setToken(e.target.value)}
                                      required
                                      min={0}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  {loading ? (
                                    <Button variant="radix" disabled>
                                      Buying...
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="radix"
                                      onClick={handleBuyToken}
                                      disabled={!token}
                                    >
                                      Buy Token
                                    </Button>
                                  )}
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl flex flex-col gap-3 font-semibold">
                        <span>{data.total_token} Tokens</span>
                        <div className="flex flex-col text-base">
                          <span>Token Price: {data.token_price}</span>
                          <span>
                            Token Price in USD:{' '}
                            {Math.round(data.token_price_in_usd * 10000) /
                              10000}{' '}
                            $
                          </span>
                          <span>
                            Token Buy Back Price : {data.token_buy_back_price}
                          </span>
                          <span>
                            Token Buy Back Price in USD:{' '}
                            {Math.round(
                              data.token_buy_back_price_in_usd * 10000,
                            ) / 10000}{' '}
                            $
                          </span>
                        </div>
                      </div>
                      <div className="h-36 w-36 -translate-y-3 ">
                        <PieChart
                          data={[
                            {
                              title: 'Total Token',
                              value: data.total_token - data.token_bought,
                              color: '#BF40BF',
                            },
                            {
                              title: 'Token Bought',
                              value: data.token_bought,
                              color: '#770737',
                            },
                          ]}
                        />
                        <div className="text-sm w-full flex-col items-center justify-center md:flex hidden ">
                          <div className="flex items-center justify-between w-28">
                            Total Token:{' '}
                            <span className="bg-[#BF40BF] h-4 w-4"></span>
                          </div>
                          <div className="flex items-center justify-between w-28">
                            Bought :{' '}
                            <span className="bg-[#770737] h-4 w-4"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="bg-white md:w-[100%] w-full mx-auto md:p-10 p-4 shadow-lg space-y-10">
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 w-fit p-2 rounded-full">
                        <Users className=" text-blue-700" />
                      </div>
                      <div>
                        <Button
                          onClick={() =>
                            navigate(`/community/detail/${params.id}/members`)
                          }
                          variant="radix"
                        >
                          View members
                        </Button>
                      </div>
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
                </div>

                <Card className="bg-white md:w-[100%] mx-auto md:p-4 p-4 shadow-lg space-y-2 ">
                  {participants.length === 0 && <div>No Participants</div>}
                  {participants.length > 0 &&
                    participants.slice(0, 4).map((participant, index) => (
                      <Card
                        key={index}
                        onClick={() =>
                          navigate(
                            `/userDashboard/userProfile/${participant.public_address}`,
                          )
                        }
                        className="bg-white flex items-center gap-2 md:w-[100%] mx-auto  p-2 border-none shadow-none"
                      >
                        <Avatar>
                          <AvatarImage
                            alt="Avatar"
                            src={participant.image_url}
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="text-left hover:text-blue-600 cursor-pointer text-ellipsis overflow-hidden">
                          <p className="font-medium">
                            {participant.name || 'Unnamed Participant'}
                          </p>
                          <div className="text-gray-black dark:text-gray-400 text-sm truncate">
                            {participant.participant || ''}
                          </div>
                        </div>
                      </Card>
                    ))}
                </Card>
                <div className="bg-transparent w-full mx-auto  flex items-center   ">
                  <Card
                    onClick={() =>
                      navigate(`/community/detail/${params.id}/members`)
                    }
                    className="p-3 w-32 text-center flex items-center justify-center hover:text-blue-700 cursor-pointer group"
                  >
                    <p>See all</p>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 duration-300 transition-transform" />
                  </Card>
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
    </div>
  )
}

export default CommunityDetails
