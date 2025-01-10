import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '@/AccountContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import {
  Activity,
  Check,
  ChevronLeft,
  ClockIcon,
  Copy,
  Globe,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { Switch } from '@/components/ui/switch'

import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { clipAddress } from '@/utils/functions/ClipAddress'
import { formatStandardDateTime } from '@/utils/functions/convertActivityData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Timeline from './UserDasboard/WorkTimeLine'
import UserTransaction from './UserDasboard/UserTransactions/UserTransactions'
import { Badge } from '@/components/ui/badge'
import { useSendTransaction } from '@/hooks/useSendTransaction'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/utils/functions/ConvertDate'
import { Separator } from '@/components/ui/separator'

const UserDashboard = () => {
  const { accounts } = useAccount()
  const [showInfo, setShowInfo] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [openPay, setOpenPay] = useState(false)
  const [xrdToPay, setXrdToPay] = useState(0)
  const navigate = useNavigate()
  const [coverUrl, setCoverUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [expneseData, setExpenseData] = useState([])
  const [failedData, setFailedData] = useState([])
  const [activityData, setActivityData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [copied, setCopied] = useState(false)
  const [data, setData] = useState([])
  const [dataAll, setDataAll] = useState([])
  const [workData, setWorkData] = useState([])
  const [userData, setUserData] = useState({})
  const [check, setCheck] = useState(true)
  const [createdComminities, setCreatedCommunities] = useState([])
  const [createdBonds, setCreatedBonds] = useState([])
  const sendTransaction = useSendTransaction()
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

  const [manifest, setManifest] = useState('')
  const [selectedBond, setSelectedBond] = useState(null)

  const [participatedComminities, setParticipatedCommunities] = useState([])

  // const [edit, setEdit] = useState(false);
  // const [fileUrl, setFileUrl] = useState("");
  const [about, setAbout] = useState('')
  const [socialLinks, setSocialLinks] = useState({
    x_url: '',
    website_url: '',
    linkedin: '',
    tiktok: '',
  })

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  // const handleRetreiveBond=()=>{
  //  try {
  //    console.log('hi')
  //  } catch (error) {
  //   console.error('Error fetching activity data:', error)
  //  }
  // }
  const handleRetreiveBond = async (bond) => {
    const data = {
      bond_id: bond.bond_id,
      user_address: accounts[0].address,
    }
    setLoading2(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/zcb/withdraw-all`,
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

          toast.success('Withdraw Successfully!')
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error Withdraw token:', error.response.data.detail)

      toast.error('Something went wrong while Withdrawing.')
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading2(false)
    }
  }
  const handleDeposit = async (bond) => {
    const data = {
      bond_id: bond.bond_id,
      user_address: accounts[0].address,
      xrd_to_add: xrdToPay,
    }
    setLoading3(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/manifest/zcb/add-xrds`,
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

          toast.success('Deposit Successfully!')
        } catch (submitError) {
          console.error('Error submitting transaction:', submitError)
          toast.error('Failed to submit transaction.')
        }
      } else {
        console.error('Transaction ID not found in receipt:', receipt)
        toast.error('Transaction failed. Please try again.')
      }
    } catch (error) {
      console.error('Error Depositing token:', error.response.data.detail)

      toast.error('Something went wrong while Depositing.')
    } finally {
      // Ensure loading is stopped regardless of success or failure
      setLoading3(false)
    }
  }
  const fetchCreatedBonds = async (user_address) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/created-bonds/${user_address}?is_accepted=${check}`,
      )
      setCreatedBonds(res.data)
    } catch (error) {
      console.error('Error fetching activity data:', error)
    }
  }
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community`,
        )
        setData(res.data)
      } catch (error) {
        console.error('Error fetching blueprint data:', error)
      }
    }
    const fetchActivity = async (user_address, page, page_size) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/activity`,
          {
            params: {
              user_address,
              page,
              page_size,
            },
          },
        )
        setActivityData(res.data.data)
        setTotalPages(res.data.page)
        console.log(res.data, 'data')
      } catch (error) {
        console.error('Error fetching activity data:', error)
      }
    }
    const fetchAll = async (user_address) => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/community/user/interest/user_add?user_addr=${user_address}`,
        )
        setDataAll(res.data)
        console.log(res.data, 'hi faisal')
      } catch (error) {
        console.error('Error fetching blueprint data:', error)
      } finally {
        setLoading(false)
      }
    }
    const fetchUserExpense = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/expense/${
            accounts[0].address
          }`,
        )
        console.log(res.data, 'hi00000hi')
        setExpenseData(res.data)
      } catch (error) {
        console.error('Error fetching blueprint data:', error)
      } finally {
        setLoading(false)
      }
    }
    const fetchFailedTransactions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/pending-transactions/${
            accounts[0].address
          }`,
        )
        console.log(res.data, 'hi00000hi')
        setFailedData(res.data)
      } catch (error) {
        console.error('Error fetching blueprint data:', error)
      } finally {
        setLoading(false)
      }
    }
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${
            accounts[0].address
          }`,
        )
        setWorkData(res.data.user_work)
        setUserData(res.data)
        setAbout(res.data.about)
        setCoverUrl(res.data.usermetadata.cover_url)
        setSocialLinks({
          x_url: res.data.usermetadata.x_url || '',
          website_url: res.data.usermetadata.website_url || '',
          linkedin: res.data.usermetadata.linkedin || '',
        })
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    const fetchCreatedCommunity = async (user_address) => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/community/${user_address}?owner=true`,
        )
        setCreatedCommunities(res.data)
      } catch (error) {
        console.error('Error fetching activity data:', error)
      }
    }

    const fetchCreatedParticipated = async (user_address) => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/community/${user_address}?owner=false`,
        )
        setParticipatedCommunities(res.data)
      } catch (error) {
        console.error('Error fetching activity data:', error)
      }
    }
    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchBluePrint()
      fetchUserData()
      fetchActivity(accounts[0].address, 1, 10)
      fetchCreatedCommunity(accounts[0].address)
      fetchCreatedParticipated(accounts[0].address)
      fetchCreatedBonds(accounts[0].address)

      fetchAll(accounts[0].address)
      fetchUserExpense()
      fetchFailedTransactions()
    }
  }, [accounts, currentPage, pageSize])

  useEffect(() => {
    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchCreatedBonds(
        'account_tdx_2_12xzluwp8mes7dt67zvdvaz0hn6gtvdspmv9xrknq0wt2r766uxd8p4',
      )
    }
  }, [check])
  if (!accounts || accounts.length === 0) {
    navigate('/')
    return null
  }
  // const handlePageChange = (newPage) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };
  return (
    <>
      <div className=" relative flex items-start gap-3 justify-start min-h-screen bg-slate-100 text-black pb-7 pt-2 px-7">
        <Tabs defaultValue="overview" className="w-full flex gap-2 max-w-[1700px] mx-auto ">
          <TabsList className="  flex  items-start justify-start   mx-auto  bg-white shadow-lg border-2 w-72 h-screen mt-2 sticky top-4 ">
            <div className="flex flex-col w-full  h-full">
              <div
                onClick={() => navigate(-1)}
                className="bg-white rounded-xl absolute bottom-5  p-2 flex items-start justify-start mr-2 cursor-pointer hover:text-gray-600"
              >
                <ChevronLeft /> <span>Back </span>
              </div>
              <div className="flex items-center justify-center font-bold text-2xl p-3">
                Pandao
              </div>
              <Separator />
              <div className="flex flex-col items-start mt-2 w-full space-y-2">
                <TabsTrigger value="overview" asChild className="w-full p-0">
                  <Button
                    variant="ghost"
                    className="w-full data-[state=active]:bg-gradient-to-b from-[#c4b5fd]  to-[#8b5cf6] data-[state=active]:text-white"
                  >
                    Overview
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="activity" asChild className="w-full p-0">
                  <Button
                    variant="ghost"
                    className="w-full data-[state=active]:bg-gradient-to-b from-[#c4b5fd]  to-[#8b5cf6] data-[state=active]:text-white"
                  >
                    User Activity
                  </Button>
                </TabsTrigger>
                <TabsTrigger value="expenses" asChild className="w-full p-0">
                  <Button
                    variant="ghost"
                    className="w-full data-[state=active]:bg-gradient-to-b from-[#c4b5fd]  to-[#8b5cf6] data-[state=active]:text-white"
                  >
                    User Trasaction
                  </Button>
                </TabsTrigger>
                <TabsTrigger
                  value="participated"
                  asChild
                  className="w-full p-0"
                >
                  <Button
                    variant="ghost"
                    className="w-full data-[state=active]:bg-gradient-to-b from-[#c4b5fd]  to-[#8b5cf6] data-[state=active]:text-white"
                  >
                    Community Participated
                  </Button>
                </TabsTrigger>
              </div>
            </div>
          </TabsList>

          <TabsContent value="overview" className="w-full ">
            {userData && (
              <div className="flex flex-col w-full ">
                <Card className="w-full flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm  text-black border-b-0 h-48">
                  {userData.usermetadata?.cover_url ? (
                    <img
                      src={coverUrl || '/Pandao.png'}
                      alt="Cover"
                      className="aspect-video h-48 w-full object-cover"
                    />
                  ) : (
                    <img
                      src="/Pandao.png"
                      alt="Cover"
                      className="aspect-video h-48 w-full object-cover"
                    />
                  )}
                </Card>
                <Card className="w-full rounded-t-none border-t-0 flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black ">
                  <CardHeader className="p-0 -translate-y-32 ">
                    <Avatar className="size-48 border-[5px] border-purple-400">
                      {userData.usermetadata?.image_url && (
                        <AvatarImage
                          src={userData.usermetadata.image_url}
                          className="size-48 object-cover"
                        />
                      )}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent className="text-xl  relative font-bold flex flex-col gap-2 w-full p-5 justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="text-black font-semibold text-3xl">
                        {userData.name}
                      </div>
                      <div className="text-black font-light text-base text-left px-0">
                        {userData.usermetadata?.about}
                      </div>
                      <div className="text-black font-light text-base text-left px-0">
                        {userData.usermetadata?.bio}
                      </div>
                      <div className="py-1 w-[300px]  rounded-sm flex flex-wrap text-ellipsis overflow-hidden relative group">
                        {clipAddress(accounts[0].address)}
                        <button
                          onClick={() => handleCopy(accounts[0].address)}
                          disabled={copied}
                          className="py-0  text-black rounded-md px-2 h-6 text-xs absolute top-2 -right-2 group-hover:block "
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {socialLinks.x_url && (
                        <div className="flex items-center w-full gap-2">
                          <FaXTwitter className="text-black" />
                          <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                            {socialLinks.x_url}
                          </div>
                        </div>
                      )}
                      {socialLinks.website_url && (
                        <div className="flex items-center w-full gap-2">
                          <Globe className="text-black" />
                          <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                            {socialLinks.website_url}
                          </div>
                        </div>
                      )}
                      {socialLinks.linkedin && (
                        <div className="flex items-center w-full gap-2">
                          <FaLinkedinIn className="text-black" />
                          <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                            {socialLinks.linkedin}
                          </div>
                        </div>
                      )}{' '}
                      {/* {socialLinks.tiktok && (
                  <div className="flex items-center w-full gap-2">
                    <FaTiktok className="text-black" />
                    <div className="px-3 py-1 text-sm w-full bg-transparent  text-black">
                      {socialLinks.tiktok}
                    </div>
                  </div>
                )} */}
                    </div>

                    <Button
                      onClick={() => navigate('/userDashboard/edit')}
                      className="bg-slate-700 border-2 absolute right-0 top-2"
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
                <div className="grid md:grid-cols-3 grid-cols-1 w-full max-w-[1400px] mx-auto">
                  <Card className="md:col-span-1 flex mt-1  flex-col shadow-md items-center md:items-start w-full mx-auto rounded-sm p-5 text-black  ">
                    <div className="text-xl font-bold">Created Communities</div>
                    <div className="w-full mt-4 flex flex-col gap-2 h-full ">
                      {createdComminities.length === 0 && (
                        <div className="flex items-center justify-center text-center h-full ">
                          No comminities created
                        </div>
                      )}
                      {createdComminities &&
                        createdComminities.length > 0 &&
                        createdComminities.map((activity, index) => (
                          <div
                            key={index}
                            className="p-4 border-2 rounded-lg group hover:shadow-md "
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-12 w-12 mt-1">
                                  <AvatarImage
                                    src={activity.community_image}
                                    className="h-12 w-12 object-cover"
                                  />

                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span>{activity.community_name}</span>
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() =>
                                  navigate(
                                    `/community/detail/${activity.community_id}`,
                                  )
                                }
                                className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                              >
                                <SquareArrowOutUpRight className="h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>
                  <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black col-span-2  ">
                    <div className="text-xl font-bold">
                      {' '}
                      Communities Participated
                    </div>
                    <div className="w-full mt-4 flex flex-col gap-2 h-full">
                      {participatedComminities.length === 0 && (
                        <div className="flex items-center justify-center text-center h-full">
                          No participated comminities.
                        </div>
                      )}
                      {participatedComminities.length > 0 &&
                        participatedComminities
                          .slice(0, 3)
                          .map((activity, index) => (
                            <div
                              key={index}
                              className="p-4 border-2 rounded-lg group hover:shadow-md "
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-12 w-12 mt-1">
                                    <AvatarImage
                                      src={activity.community_image}
                                      className="h-12 w-12 object-cover"
                                    />

                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span>{activity.community_name}</span>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    navigate(
                                      `/community/detail/${activity.community_id}`,
                                    )
                                  }
                                  className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                                >
                                  <SquareArrowOutUpRight className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </Card>

                  <Card className="w-full md:col-span-3 flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-xl font-bold"> Created Bonds </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={check}
                          onCheckedChange={() => {
                            setCheck(!check)
                          }}
                        />
                        <div>Purchased Bonds</div>
                      </div>
                    </div>

                    {createdBonds.length === 0 && (
                      <div className="flex items-center justify-center h-28 w-full">
                        No Bond Created
                      </div>
                    )}
                    {createdBonds.length > 0 &&
                      createdBonds.map((bond) => (
                        <div
                          key={bond.bond_id}
                          className={`w-full  shadow-sm rounded-md p-4 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center ${
                            check &&
                            bond.maturity_date &&
                            new Date(bond.maturity_date) < new Date()
                              ? 'ring-2 ring-red-300'
                              : check &&
                                bond.maturity_date &&
                                new Date(bond.maturity_date) > new Date()
                              ? 'ring-2 ring-green-300'
                              : ''
                          }`}
                        >
                          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <img
                              src={
                                bond.community?.image ||
                                'https://via.placeholder.com/150'
                              }
                              alt={bond.community?.name || 'Bond Image'}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h2 className="text-lg font-bold">
                                {bond.name || 'Unnamed Bond'}
                              </h2>
                              <p className="text-sm text-gray-600">
                                Community: {bond.community?.name || 'N/A'}
                              </p>
                              <p className="text-sm text-gray-600">
                                Description:{' '}
                                {bond.description || 'No description provided'}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 md:mt-0 flex flex-col space-y-1 items-start md:items-end">
                            <p className="text-sm text-gray-600">
                              Price:{' '}
                              {bond.price
                                ? `${bond.price} XRD`
                                : 'Not Available'}
                            </p>
                            <p className="text-sm text-gray-600">
                              Interest Rate:{' '}
                              {bond.interest_rate
                                ? `${bond.interest_rate}%`
                                : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600">
                              Maturity Date:
                              {bond.maturity_date
                                ? new Date(
                                    bond.maturity_date,
                                  ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                : 'Not specified'}
                            </p>
                            <div className="flex items-center gap-3">
                              {check && (
                                <Button
                                  className="mt-3"
                                  variant="secondary"
                                  onClick={() => {
                                    setSelectedInfo(bond)
                                    setShowInfo(true)
                                  }}
                                >
                                  Show Info
                                </Button>
                              )}
                              {check && !bond.has_withdrawn && (
                                <Button
                                  disabled={loading2}
                                  className="mt-3"
                                  onClick={() => handleRetreiveBond(bond)}
                                >
                                  Withdraw
                                </Button>
                              )}

                              {check && bond.has_withdrawn && (
                                <Button
                                  disabled={loading2}
                                  className="mt-3"
                                  onClick={() => {
                                    setOpenPay(true)
                                    setSelectedBond(bond)
                                  }}
                                >
                                  Deposit
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </Card>
                </div>
                <Dialog open={showInfo} onOpenChange={setShowInfo}>
                  <DialogTrigger></DialogTrigger>

                  <DialogContent className="max-w-5xl">
                    {selectedInfo && (
                      <Card className="w-full max-w-5xl">
                        <div className='flex pt-5 items-center w-full text-center text-3xl justify-center font-bold'>
                          Bond Bucket Summary
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between w-full ">
                            <h2 className="text-2xl font-bold capitalize">
                              {selectedInfo.name}
                            </h2>
                            <div className="flex gap-3">
                              <div className="border-2 p-2 bg-green-100">
                                <span className="font-semibold">
                                 Total Amount Put In Bucket:
                                </span>{' '}
                                {selectedInfo.amount_stored || '0'}
                              </div>
                              <div className="border-2 p-2 bg-green-100">
                                <span className="font-semibold">
                                Total Amount To Repay:
                                </span>{' '}
                                {selectedInfo.amount_owned || '0'}
                              </div>
                              <div className="border-2 p-2 bg-blue-100">
                                <span className="font-semibold">
                                  Amount Left To Store:
                                </span>{' '}
                                {selectedInfo.amount_owned -
                                  selectedInfo.amount_stored || '0'}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Basic Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Bond ID:
                                    </span>{' '}
                                    {selectedInfo.bond_id}
                                  </p>
                                  <p>
                                    <span className="font-medium">Name:</span>{' '}
                                    {selectedInfo.name || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Contract Type:
                                    </span>{' '}
                                    {selectedInfo.contract_type || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Currency:
                                    </span>{' '}
                                    {selectedInfo.currency.toUpperCase()}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Financial Terms
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Interest Rate:
                                    </span>{' '}
                                    {selectedInfo.interest_rate}%
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Notional Principle:
                                    </span>{' '}
                                    {selectedInfo.notional_principle}
                                  </p>
                                  <p>
                                    <span className="font-medium">Price:</span>{' '}
                                    {selectedInfo.price}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Number of Bonds:
                                    </span>{' '}
                                    {selectedInfo.number_of_bonds}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Discount:
                                    </span>{' '}
                                    {selectedInfo.discount}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Position:
                                    </span>{' '}
                                    {selectedInfo.bond_position
                                      .charAt(0)
                                      .toUpperCase() +
                                      selectedInfo.bond_position.slice(1)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Important Dates
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Initial Exchange:
                                    </span>{' '}
                                    {formatDate(
                                      selectedInfo.initial_exchange_date,
                                    )}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Maturity:
                                    </span>{' '}
                                    {formatDate(selectedInfo.maturity_date)}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Asset Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Asset Name:
                                    </span>{' '}
                                    {selectedInfo.asset_name}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Amount Stored:
                                    </span>{' '}
                                    {selectedInfo.amount_stored || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Amount Owned:
                                    </span>{' '}
                                    {selectedInfo.amount_owned || 'N/A'}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Created on Blockchain:
                                    </span>{' '}
                                    {selectedInfo.created_on_blockchain
                                      ? 'Yes'
                                      : 'No'}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-xl font-medium text-gray-500">
                                  Community Details
                                </h3>
                                <div className="mt-2 space-y-2">
                                  <p>
                                    <span className="font-medium">
                                      Community Name:
                                    </span>{' '}
                                    {selectedInfo.community.name}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Total Tokens:
                                    </span>{' '}
                                    {selectedInfo.community.total_token}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Tokens Bought:
                                    </span>{' '}
                                    {selectedInfo.community.token_bought}
                                  </p>
                                  <p>
                                    <span className="font-medium">Funds:</span>{' '}
                                    {selectedInfo.community.funds}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>
          <TabsContent value="activity" className="w-full  ">
            <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black min-h-screen  ">
              <div className="text-xl font-bold">User Activity</div>
              <div className="w-full mt-4 flex flex-col gap-2 ">
                {activityData.map((activity, index) => (
                  <div key={index} className="p-4 border-2 rounded-lg group ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage
                            src={activity.user_image_url}
                            className="h-8 w-8 object-cover"
                          />

                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span>{activity.info}</span>
                          </div>
                          <div className="text-sm flex items-center gap-1 font-light">
                            <ClockIcon className="h-3 w-3" />{' '}
                            <span>
                              {formatStandardDateTime(activity.created_at)}
                            </span>{' '}
                          </div>
                        </div>
                      </div>

                      <div className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600">
                        <Activity className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="flex justify-between mt-4">
              <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div> */}
            </Card>
          </TabsContent>
          <TabsContent value="expenses" className="w-full ">
            <UserTransaction
              expneseData={expneseData}
              failedTransaction={failedData}
            />
          </TabsContent>
          <TabsContent value="participated" className="w-full ">
            <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black col-span-2  min-h-screen ">
              <div className="text-xl font-bold"> Communities Participated</div>
              <div className="w-full mt-4 flex flex-col gap-2 h-full">
                {participatedComminities.length === 0 && (
                  <div className="flex items-center justify-center text-center h-full">
                    No participated comminities.
                  </div>
                )}
                {participatedComminities.length > 0 &&
                  participatedComminities.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 rounded-lg group hover:shadow-md "
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-12 w-12 mt-1">
                            <AvatarImage
                              src={activity.community_image}
                              className="h-12 w-12 object-cover"
                            />

                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{activity.community_name}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            navigate(
                              `/community/detail/${activity.community_id}`,
                            )
                          }
                          className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>
          <div className="  flex flex-col  items-start justify-start   mx-auto   shadow-lg border-2 max-w-[600px] h-screen mt-2 sticky top-4 p-0 ">
            <Card className="w-full md:col-span-3 flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black m-0  ">
              <div className="text-xl font-bold">
                {' '}
                Communities you might be interested In
              </div>
              <div className="flex  py-2">
                {userData.interested_tag &&
                  userData.interested_tag.map((tag, index) => (
                    <div key={index}>
                      <Badge variant="outline">{tag}</Badge>
                    </div>
                  ))}
              </div>
              <div className="w-full mt-4 flex flex-col gap-2 h-full">
                {dataAll.length === 0 && (
                  <div className="flex items-center justify-center text-center h-full">
                    No active communities.
                  </div>
                )}
                {dataAll.length > 0 &&
                  dataAll.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 rounded-lg group hover:shadow-md "
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-12 w-12 mt-1">
                            <AvatarImage
                              src={activity.image}
                              className="h-12 w-12 object-cover"
                            />

                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 text-xl px-4">
                              <span>{activity.name}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4">
                              <span className="line-clamp-2">
                                {activity.description}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/community/detail/${activity.id}`)
                          }
                          className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600 cursor-pointer"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
            <Card className="w-full flex mt-1  flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black  ">
              <div className="text-xl font-bold"> Work History</div>
              <div className="w-full mt-4 flex flex-col gap-2 h-full">
                {workData && workData.length === 0 && (
                  <div className="flex items-center justify-center text-center h-full">
                    Please Add Work Details
                  </div>
                )}
                {workData && workData.length > 0 && (
                  <Timeline items={workData} />
                )}
              </div>
            </Card>
          </div>
        </Tabs>
        <Dialog open={openPay} onOpenChange={setOpenPay}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How much amount do you want deposit?</DialogTitle>
              {selectedBond && (
                <DialogDescription className="flex flex-col gap-4">
                  <p> Please enter the amount you want to deposit </p>
                  <Input
                    value={xrdToPay}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      const maxAllowed =
                        selectedBond.amount_owned - selectedBond.amount_stored

                      if (value > maxAllowed) {
                        toast.error(
                          `Value cannot exceed ${maxAllowed}. Please enter a valid amount.`,
                        )
                      } else {
                        setXrdToPay(value)
                      }
                    }}
                    type="number"
                    min="0"
                    max={selectedBond.amount_owned - selectedBond.amount_stored}
                  />

                  <div className="flex items-center justify-end w-full">
                    <Button
                      variant="radix"
                      onClick={() => handleDeposit(selectedBond)}
                      disabled={loading3}
                    >
                      {loading3 ? 'Depositing...' : 'Deposit'}
                    </Button>
                  </div>
                </DialogDescription>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default UserDashboard
