import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Banknote, Check, Filter, Users } from 'lucide-react'

// UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SkeletonCard } from '@/Pages/GlobalComponents/Skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Store and Context
import useViewStore from '@/store/view'
import { useAccount } from '@/AccountContext'

// API Functions
const fetchDAOs = async (sortBy) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/community?sort=${sortBy}`
  )
  return Array.isArray(response.data) ? response.data : []
}

// Filter Options
const SORT_OPTIONS = [
  { id: 'participants', label: 'Participants' },
  { id: 'funds', label: 'Funds' },
  { id: 'name', label: 'Name' },
]

const ExploreSection = () => {
  const { setView } = useViewStore()
  const { accounts } = useAccount()
  const navigate = useNavigate()

  // State for filter and dialogs
  const [selectedOption, setSelectedOption] = useState('participants')
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false)
  const [walletDialogOpen, setWalletDialogOpen] = useState(false)

  // Set active view on component mount
  useEffect(() => {
    setView('1')
  }, [setView])

  // Fetch data with React Query
  const { data: daos = [], isLoading } = useQuery({
    queryKey: ['daos', selectedOption],
    queryFn: () => fetchDAOs(selectedOption),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  // Handle filter option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    setFilterPopoverOpen(false)
  }

  // Check wallet connection before navigation
  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path)
    } else {
      setWalletDialogOpen(true)
    }
  }

  // Render DAO stats with tooltip
  const renderStat = (icon, value, tooltip) => (
    <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm bg-[#5228A4] border-[#7F42F9]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            {icon}
            <p className="text-sm text-white">{value}</p>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )

  return (
    <div>
      {/* Wallet connection dialog */}
      <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have not connected your Wallet</DialogTitle>
            <DialogDescription>
              Please connect your wallet to your Radix Wallet
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col items-start p-3 md:p-0 justify-start mx-auto container z-50">
        {/* DAO List Section */}
        <div className="mt-20 w-full px-4 z-50">
          <div className="flex flex-col items-center justify-center shrink-0 h-auto min-h-[148px] py-6 md:py-8">
            <div className="text-3xl sm:text-5xl md:text-6xl leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash">
              Explore Top DAOs
            </div>
            <div className="text-[#B59AEC] text-center font-mono text-sm sm:text-base md:text-lg leading-6 font-normal w-full max-w-4xl px-4">
              Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </div>
          </div>

          {/* Filter Button */}
          {/* <div className="flex items-end justify-end">
            <Popover open={filterPopoverOpen} onOpenChange={setFilterPopoverOpen}>
              <PopoverTrigger className="bg-purple-950 p-2 rounded-md">
                <Filter className="items-end h-5 w-5" />
              </PopoverTrigger>
              <PopoverContent className="mr-[100px] p-2">
                {SORT_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md ${
                      selectedOption === option.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {selectedOption === option.id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div> */}

          {/* DAO Cards */}
          {isLoading ? (
            <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-3">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
          ) : daos.length > 0 ? (
            <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 z-30">
              {daos.slice(0, 3).map((dao, index) => (
                <Card
                  key={index}
                  onClick={() => handleNavigation(`/community/detail/${dao.id}`)}
                  className="flex overflow-hidden flex-col items-start justify-between p-5 h-[300px] cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-[#2b1b49] rounded-lg"
                >
                  <div className="flex flex-col items-start gap-2  overflow-hidden w-full">
                    <div className="w-full overflow-hidden p-[2px] bg-gradient-to-t from-brand2 via-brand5 to-brand2">

                      <img src={dao.image} alt={dao.name || 'DAO'} className='h-[80px] w-full object-cover' />
                    </div>
                    <div className='flex flex-col mt-3'>
                      <div>
                        <div className="text-xl font-semibold text-white">{dao.name}</div>
                      </div>
                      <div className="line-clamp-2 text-[#B59AEC] mt-1">
                        {dao.description || 'No description available'}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {dao.tags &&
                        dao.tags.slice(0, 2).map((token, index) => (
                          <div key={index} className="rounded-full p-[2px] bg-gradient-to-r from-brand2 via-brand5 to-brand2">
                            <div className="w-full  rounded-full bg-brand1 flex justify-center items-center">
                              <h1 className="text-white  font-bold text-[10px] px-3 py-[0.5]">Governance</h1>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end w-full mt-1 ">
                    <div className="flex items-center gap-2">
                      {renderStat(
                        <Users className="h-4 w-4 text-white" />,
                        dao.number_of_participants,
                        "Total Number of Participants"
                      )}
                      {renderStat(
                        <Banknote className="h-4 w-4 text-white" />,
                        dao.funds || 0,
                        "Total Funds"
                      )}
                    </div>

                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center bg-white mt-3 h-32 rounded-lg shadow-xl">
              <p>No Deployed DAOs</p>
            </div>
          )}
        </div>
      </div>

      {/* See All Button */}
      <div className="pb-10 flex justify-center items-center ">
        <button
          onClick={(e) => {
            e.preventDefault()
            navigate('/explore')
          }}
          className="relative w-[219px] h-[49px] mt-10 shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer z-50"
        >
          <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
          <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
          <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
          <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#c1bbcf] bg-clip-text text-transparent z-[60]">
            See All
          </span>
        </button>
      </div>
    </div>
  )
}

export default ExploreSection