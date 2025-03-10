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
import { use } from 'react'
import UserTransaction from '@/Pages/UserDasboard/UserTransactions/UserTransactions'
import NavBar from './Dash-component/NavBar'
import TileEffect from '@/components/ui/myComponents/grid-bg-2'



const Dashboard = () => {
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

    const [notifications, setNotifications] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [expenseDatas, setExpenseDatas] = useState([])
    const [loading4, setLoading4] = useState(false)
    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        { id: 0, label: "MyProfile", content: "This is the MyProfile tab content." },
        { id: 1, label: "UserActivity", content: "This is the UserActivity tab content." },
        { id: 2, label: "Transaction", content: "This is the Transaction tab content." },
        { id: 3, label: "Community", content: "This is the Community tab content." },
    ];




    useEffect(() => {
        const fetchUserNotifications = async () => {
            if (accounts && accounts.length > 0 && accounts[0]?.address && !hasFetched) {
                await fetchNotifications(accounts[0].address);
                setHasFetched(true);
            }
        };

        fetchUserNotifications();
    }, [accounts, hasFetched]);

    const fetchWithdrawal = async (user_address) => {
        setLoading4(true)
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/user/token-withdraw-request/${user_address}`
            )
            if (response.status === 200) {
                console.log(response.data, 'Fetched data')
                setExpenseDatas(response.data)
            } else {
                console.warn('Unexpected response status:', response.status)
            }
        } catch (error) {
            console.error('Error fetching withdrawal data:', error.response?.data || error.message)
        } finally {
            setLoading4(false)
        }
    }

    useEffect(() => {
        fetchWithdrawal(accounts[0]?.address)
    }, [])


    const fetchNotifications = async (user_address) => {
        if (!user_address) {
            console.error("User address is not provided.");
            return;
        }

        try {
            const endpoint = `${import.meta.env.VITE_BACKEND_URL}/user/notification/all/${user_address}`;
            console.log(`Fetching notifications from: ${endpoint}`);

            const res = await axios.get(endpoint);
            console.log("Fetched Notifications:", res.data);

            if (Array.isArray(res.data)) {
                setNotifications(res.data);
            } else {
                console.error("Unexpected response format:", res.data);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error fetching notifications:", error.response.data);
            } else if (error.request) {
                console.error("No response from server:", error.request);
            } else {
                console.error("Error setting up request:", error.message);
            }
        }
    };
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
                `${import.meta.env.VITE_BACKEND_URL
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
                    `${import.meta.env.VITE_BACKEND_URL
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
                    `${import.meta.env.VITE_BACKEND_URL}/user/expense/${accounts[0].address
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
                    `${import.meta.env.VITE_BACKEND_URL}/user/pending-transactions/${accounts[0].address
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
                    `${import.meta.env.VITE_BACKEND_URL}/user/details/${accounts[0].address
                    }`,
                )
                setWorkData(res.data.user_work)
                setUserData(res.data)
                // // setAbout(res.data.about)
                // setCoverUrl(res.data.usermetadata.cover_url)
                // setSocialLinks({
                //     x_url: res.data.usermetadata.x_url || '',
                //     website_url: res.data.usermetadata.website_url || '',
                //     linkedin: res.data.usermetadata.linkedin || '',
                // })
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        const fetchCreatedCommunity = async (user_address) => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL
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
                    `${import.meta.env.VITE_BACKEND_URL
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
            fetchNotifications(accounts[0].address, 1, 10)

            fetchAll(accounts[0].address)
            fetchUserExpense()
            fetchFailedTransactions()
        }
    }, [accounts, currentPage, pageSize])

    useEffect(() => {
        if (accounts && accounts.length > 0 && accounts[0].address) {
            fetchCreatedBonds(accounts[0].address)
        }
    }, [check])
    if (!accounts || accounts.length === 0) {
        navigate('/')
        return null
    }

    return (
        <div>
            <NavBar userImage={userData.usermetadata?.image_url} />

            <div className="absolute top-[850px] left-[-10%] bg-brand3 z-20 size-[400px] rounded-full blur-[150px]"></div>
            <div>
                <div className="flex flex-row items-start bg-[#100821]  justify-between relative">
                    <div className="w-full h-full absolute pt overflow-hidden opacity-20">
                        <TileEffect />
                    </div>


                  
                    <div className="bg-[rgba(169,126,255,0.24)] mt-20 ms-6  rounded-[20px] justify-center items-center flex border border-brand2 p-[13px_25px] w-[393px] h-[921px] relative overflow-hidden backdrop-blur-[6.7px]">
                       
                        <Avatar className="w-[182.76px] h-[182.76px] absolute left-1/2 top-[62px] transform -translate-x-1/2 border-[5px] border-brand3">
                            {userData.usermetadata?.image_url ? (
                                <AvatarImage
                                    src={userData.usermetadata.image_url}
                                    className="object-cover"
                                />
                            ) : (
                                <AvatarFallback>{userData.name?.slice(0, 2) || 'CN'}</AvatarFallback>
                            )}
                        </Avatar>



                        <div className=" absolute top-[268px] ">
                            <div className="text-white text-center font-semibold text-[26px]  left-1/2 top-[268px] ">
                                {userData.name || 'Unknown User'}
                            </div>

                            <div className="py-1 w-[300px] rounded-sm flex flex-wrap items-center text-brand5 justify-center relative group">
                                {clipAddress(accounts[0]?.address || '')}
                                <button
                                    onClick={() => handleCopy(accounts[0]?.address || '')}
                                    disabled={copied}
                                    className="py-0 text-white rounded-md px-2 h-5 text-xs absolute top-2 -right-2 group-hover:block"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>


                        </div>


                        <div className="flex flex-col gap-10 items-start justify-start w-[322px] absolute left-1/2 top-[369px] transform -translate-x-1/2">

                            <div className="flex flex-col gap-5 w-full">
                                <div className="text-[#DACCF6] font-semibold text-xl">E-mail:</div>
                                <div className="text-[#f2f2f2] text-base">
                                    {userData.email || 'No email provided'}
                                </div>
                            </div>

                       
                            <div className="flex flex-col gap-5 w-full">
                                <div className="text-[#DACCF6] font-semibold text-xl">BIO:</div>
                                <div className="text-[#f2f2f2] text-base">
                                    {userData.usermetadata?.bio || 'No bio available'}
                                </div>
                            </div>




                         
                            <div className="flex flex-col gap-5 w-full h-full">
                                <div className="text-xl font-bold text-[#DACCF6]">
                                    Communities you might be interested in:
                                </div>

                                <div className="flex flex-wrap gap-3.5 py-2">
                                    {userData?.interested_tag?.length > 0 ? (
                                        userData.interested_tag.map((tag, index) => (
                                            <div
                                                key={index}
                                                className="bg-[rgba(42,30,75,0.57)] rounded-3xl border-3 border-[#7e63b7] p-[3px_25px] flex items-center"
                                            >
                                                <div className="text-white text-base">{tag}</div>
                                            </div>
                                        ))
                                    )
                                        : (
                                            <div className="text-white text-base">No interested tags</div>
                                        )}
                                </div>

                                <div className="w-full mt-4 flex flex-col gap-2 h-full">
                                    {dataAll.length === 0 && (
                                        <div className="flex items-center justify-center text-center h-full">
                                            No active communities.
                                        </div>

                                    )}
                                </div>
                            </div>


                        </div>

                    
                        <button onClick={() => navigate('/userDashboard/edit')} className="bg-primary-400 rounded-br-lg w-[53px] h-11 absolute left-[-1px] top-[-1px]">
                            <img className="w-[43px] h-[43px]" src="/edit.svg" alt="Edit" />
                        </button>


                    </div>







                   

                    <div className="bg-[rgba(169,126,255,0.24)] rounded-[20px] border mt-20 border-brand2  mr-10 w-[1015px] h-[1884px] relative overflow-hidden backdrop-blur-[6.7px]">
                        <div className="flex border-b bg-brand1 border-brand1">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.id}
                                    className={`flex-1 py-2 px-6 text-center font-medium text-lg ${activeTab === tab.id
                                        ? 'text-brand3 border-b-4 border-brand4'
                                        : 'text-white hover:text-primary-500'
                                        } ${index !== 0 ? 'border-l border-brand5' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>


                        {activeTab === 0 && (
                            <section className="px-4 py-6">
                                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
    <h1 className="text-white text-2xl font-medium">
        Work Experience:
    </h1>
</div>

<div className="flex flex-col items-center justify-center w-full">
    
    <div className="bg-[rgba(109,54,219,0.21)] rounded-[20px] border border-brand3 p-6 flex flex-col gap-2.5 items-start justify-center h-[120px] w-[770px] mx-auto mb-6">
        <div className="flex flex-row gap-[67px] items-start justify-between w-full">
            <div className="flex flex-row gap-[27px] items-end justify-start">
                <img
                    className="w-[66.02px] h-[64.94px] object-cover"
                    src="/radix.webp"
                    alt="Company Logo"
                />
                <div className="flex flex-col gap-[11px] items-start justify-start w-[342px]">
                    <div className="text-white font-semibold text-[26px]">
                        Senior Backend Developer
                    </div>
                    <div className="text-[#bdbdbd] font-medium text-base">
                        Creatix Studio
                    </div>
                </div>
            </div>
            <div className="text-primary-200 text-right font-medium text-xl">
                March 2022 - Present
            </div>
        </div>
    </div>

    {/* Previous Jobs */}
    <div className="text-[#9c9c9d] font-normal text-xl mb-4">
        Previous:
    </div>
    
    <div className="bg-[rgba(109,54,219,0.21)] rounded-[20px] border border-brand3 mb-10 p-6 flex flex-col gap-2.5 items-start justify-center h-[120px] w-[770px] mx-auto">
        <div className="flex flex-row gap-[113px] items-start justify-between w-full">
            <div className="flex flex-row gap-[27px] items-center">
                <img
                    className="w-[66.02px] h-[62.09px] object-cover"
                    src="/logo1.png"
                    alt="Company Logo"
                />
                <div className="flex flex-col gap-[9px] items-start w-[253px]">
                    <div className="text-white font-semibold text-[26px]">
                        Backend Developer
                    </div>
                    <div className="text-[#bdbdbd] font-medium text-base">
                        CodeSphere Technologies
                    </div>
                </div>
            </div>
            <div className="text-primary-200 text-right font-medium text-xl">
                July 2019 - February 2022
            </div>
        </div>
    </div>
</div>


                                     <div>

                                       <div className="bg-[#39246b] p-3 flex flex-col items-start rounded-md mb-6">
                                         <h2 className="text-white text-2xl font-medium mb-4">Created Communities:</h2>
                                         </div>

                                            <div className="flex flex-row gap-2.5 items-start mb-10 justify-start">
                                         <div className="relative rounded-2xl border-transparent p-6 flex flex-col gap-2.5 w-[409px] h-[237px] bg-gradient-to-l from-[rgba(109,54,219,0.21)] to-[rgba(109,54,219,0.21)] backdrop-blur-sm">
                                            <div className="flex flex-col gap-9 items-start w-full">
                                                <div className="flex flex-row gap-4 w-full">
                                                    <img className="rounded-lg w-[63px] h-[60px] object-cover" src="/pic2.svg" alt="Image" />
                                                    <div className="flex flex-col gap-2 w-full">
                                                        <div className="text-white text-2xl font-medium">Heading</div>
                                                        <div className="text-brand4 text-base">Sub-heading</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row gap-6 items-center">
                                                    <div className="flex flex-row gap-2.5 items-center">
                                                        <span className="text-white text-base">Governance</span>
                                                    </div>
                                                    <div className="flex flex-row gap-2.5 items-center">
                                                        
                                                        <span className="text-white text-base">Voting</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row gap-6 items-center justify-between w-full">
                                                    <div className="flex gap-3">
                                                        <div className="bg-primary-500 rounded-md py-1 px-2 flex items-center gap-1">
                                                            <img src="vector0.svg" alt="Icon" className="w-4 h-4" />
                                                            <span className="text-white text-base">10</span>
                                                        </div>
                                                        <div className="bg-primary-500 rounded-md py-1 px-2 flex items-center gap-1">
                                                            <img src="group-12611527130.svg" alt="Icon" className="w-6 h-4" />
                                                            <span className="text-white text-base">0</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    
                                </div>

                                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                                    <h2 className="text-white text-2xl font-medium">
                                        Communities Participated:
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {participatedComminities.length === 0 ? (
                                        <div className="flex items-center justify-center h-24 text-white">
                                            No participated communities.
                                        </div>
                                    ) : (
                                        participatedComminities.slice(0, 3).map((activity, index) => (
                                            <div
                                                key={index}
                                                className="bg-[rgba(109,54,219,0.21)] rounded-2xl border border-brand2 p-4 flex items-center gap-4"
                                            >
                                                <img
                                                    className="w-16 h-16 object-cover rounded-md"
                                                    src={activity.community_image}
                                                    alt={activity.community_name}
                                                />
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="text-white text-lg font-semibold">
                                                        {activity.community_name}
                                                    </h3>
                                                    <p className="text-[#bdbdbd] text-sm font-medium">
                                                        Community
                                                    </p>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        navigate(`/community/detail/${activity.community_id}`)
                                                    }
                                                    className="text-primary-200 cursor-pointer"
                                                >
                                                    <SquareArrowOutUpRight className="h-5 w-5" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div>
                                    <div className="bg-[#39246b] p-3 flex justify-between items-center rounded-md mb-6 mt-10">
                                        <h2 className="text-white text-2xl font-medium">
                                            Created Bonds:
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <div>Purchased Bonds</div>
                                            <Switch
                                                checked={check}
                                                onCheckedChange={() => setCheck(!check)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="w-full md:col-span-3 flex mt-1 flex-col shadow-md items-center md:items-start max-w-[1400px] mx-auto rounded-sm p-5 text-black">
                                            {createdBonds.length > 0 &&
                                                createdBonds.map((bond) => (
                                                    <div
                                                        key={bond.bond_id}
                                                        className={`w-full shadow-sm rounded-md border border-brand1 p-4 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 hover:border-brand1 ${check &&
                                                            bond.maturity_date &&
                                                            new Date(bond.maturity_date) < new Date()
                                                            ? 'ring-2 ring-brand2'
                                                            : check &&
                                                                bond.maturity_date &&
                                                                new Date(bond.maturity_date) > new Date()
                                                                ? 'ring-2 ring-purple-950'
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
                                                                className="w-16 h-16 rounded-sm object-cover"
                                                            />
                                                            <div>
                                                                <h2 className="text-lg font-bold">
                                                                    {bond.name || 'Unnamed Bond'}
                                                                </h2>
                                                                <p className="text-sm text-gray-600">
                                                                    Community: {bond.community?.name || 'N/A'}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Description: {bond.description || 'No description provided'}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 md:mt-0 flex flex-col space-y-1 items-start md:items-end">
                                                            <p className="text-sm text-gray-600">
                                                                Price: {bond.price ? `${bond.price} XRD` : 'Not Available'}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Interest Rate: {bond.interest_rate ? `${bond.interest_rate}%` : 'N/A'}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Maturity Date: {bond.maturity_date
                                                                    ? new Date(bond.maturity_date).toLocaleDateString('en-US', {
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

                                            {createdBonds.length === 0 && (
                                                <div className="flex items-center justify-center h-28 w-full font-normal text-xl">
                                                    No Bond Created
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>




                            </section>
                        )}


                        {activeTab === 1 && (
                            <section className="px-4 py-6">
                                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                                    <h2 className="text-white text-2xl font-medium">User Activity:</h2>
                                </div>

                                        <div className="w-full mt-4 flex flex-col gap-4">
                                            {activityData.length === 0 ? (
                                                <div className="flex items-center justify-center h-24 text-white">
                                                    No user activities.
                                                </div>
                                            ) : (
                                                activityData.slice(0, 3).map((activity, index) => (
                                                    <div key={index} className="bg-[rgba(109,54,219,0.21)] rounded-2xl border border-brand3 p-4 flex items-center gap-4">
                                                        <Avatar className="w-16 h-16 object-cover rounded-md">
                                                            <AvatarImage src={activity.user_image_url} className="object-cover" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col flex-1">
                                                            <h3 className="text-white text-lg font-semibold">{activity.info}</h3>
                                                            <p className="text-[#bdbdbd] text-sm font-medium">
                                                                {formatStandardDateTime(activity.created_at)}
                                                            </p>
                                                        </div>
                                                        <div onClick={() => navigate(`/community/detail/${activity.community_id}`)} className="text-primary-200 cursor-pointer">
                                                            <Activity className="h-5 w-5" />
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                               
                            </section>
                        )}

                        {activeTab === 2 && (
                            <section className="px-4 py-6">
                                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                                    <h2 className="text-white text-2xl font-medium">User Transection:</h2>
                                </div>

                                <div className="flex flex-wrap gap-5 justify-center mb-6">
                                    <UserTransaction
                                        expneseData={expneseData}
                                        failedTransaction={failedData}
                                    />


                                </div>
                            </section>
                        )}

                        {activeTab === 3 && (
                            <section className="px-4 py-6">
                                <div className="bg-[#39246b] p-3 flex items-center justify-start rounded-md mb-6">
                                    <h2 className="text-white text-2xl font-medium">Communities Participated:</h2>
                                </div>

                                <div className="w-full mt-4 flex flex-col  gap-2 h-full">
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
                                                    className="p-4 border-2 rounded-lg border-brand3 group hover:shadow-md "
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

                            </section>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;