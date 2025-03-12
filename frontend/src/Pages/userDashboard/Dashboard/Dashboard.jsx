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
import Sidebar from './Dash-component/Sidebar'
import WorkExperience from './Dash-component/WorkExperience'
import CommunitiesParticipated from './Dash-component/CommunitiesParticipated'
import BondList from './Dash-component/BondList'
import UserActivity from './Dash-component/UserActivity'
import UserCommunities from './Dash-component/UserCommunities'





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
                    <div>

                        <Sidebar
                            userData={userData}
                            accounts={accounts}
                            copied={copied}
                            handleCopy={handleCopy}
                            clipAddress={clipAddress}
                            dataAll={dataAll}
                            navigate={navigate}
                        />
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
                                <WorkExperience />

                                <div>
                                    <UserCommunities />
                                </div>

                                <CommunitiesParticipated participatedCommunities={participatedComminities} />


                                <BondList
                                    bonds={createdBonds}
                                    check={check}
                                    setCheck={setCheck}
                                    loading={loading}
                                    handleRetrieveBond={handleRetreiveBond}
                                    setOpenPay={setOpenPay}
                                    setSelectedBond={setSelectedBond}
                                    setSelectedInfo={setSelectedInfo}
                                    setShowInfo={setShowInfo}
                                />
                            </section>)}


                        {activeTab === 1 && (
                            <section className="px-4 py-6">
                                <UserActivity activityData={activityData} />
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
                            </section> )}

                        {activeTab === 3 && (
                            <section className="px-4 py-6">
                                <CommunitiesParticipated participatedCommunities={participatedComminities} />

                            </section>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;