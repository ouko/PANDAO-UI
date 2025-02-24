import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useViewStore from '@/store/view'
import axios from 'axios'
import {
  Banknote,
  Building2,
  Check,
  Filter,
  GraduationCap,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkeletonCard } from '../GlobalComponents/Skeleton'
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
import { useAccount } from '@/AccountContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

const ExploreSection = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState('participants')
  const [open, setOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Wallet connection dialog state
  const { setView } = useViewStore()
  const { accounts } = useAccount()
  const navigate = useNavigate()


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchBluePrint = async () => {
        try {
          setLoading(true)
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/community?sort=${selectedOption}`
          )
          if (Array.isArray(res.data)) {
            setData(res.data)
          } else {
            console.error('Error: Received data is not an array', res.data)
            setData([])
          }
        } catch (error) {
          console.error('Error fetching blueprint data:', error)
          setData([])
        } finally {
          setLoading(false)
        }
      }

      fetchBluePrint()
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId) // Cleanup timeout
  }, [selectedOption])

  useEffect(() => {
    setView('1')
  }, [setView])

  const options = [
    { id: 'participants', label: 'Participants' },
    { id: 'funds', label: 'Funds' },
    { id: 'name', label: 'Name' },
  ]

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId)
    setOpen(false)
  }

  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path)
    } else {
      setIsDialogOpen(true)
    }
  }

  // if (!accounts || accounts.length === 0 || !data) {
  //   navigate("/");
  //   return null;
  // }

  return (
    <div className="bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)]">
      {/* Wallet connection dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

      <div className="flex flex-col items-start p-3 md:p-0 justify-start -translate-y-24 mx-auto max-w-[1200px] ">
        {/* DAO Creation and Learning Section */}
        {/* <div className="w-full min-h-1/2 grid md:grid-cols-3 grid-cols-1 gap-3">
          <Card className="p-5 w-full gap-4 flex flex-col items-center justify-between bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90">
            <div className="w-full">
              <Building2 className="h-14 w-14 text-blue-900" />
            </div>
            <div className="w-full text-2xl text-purple-800 font-semibold mt-2">Create your DAO</div>
            <p className="font-extralight text-slate-600 w-full">
              Create your own DAO on Radix Blockchain
            </p>
            <div className="w-full">
              <Button
                onClick={() => navigate('/create')}
                className="relative w-[119px] h-[29px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
              >
                <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
                <span className="text-center font-roboto font-bold text-[15px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                  Create a DAO
                </span>
              </Button>
            </div>
          </Card>
          <Card className="p-5 w-full gap-4 flex flex-col items-center justify-between bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90">
            <div className="w-full">
              <GraduationCap className="h-14 w-14 text-blue-800" />
            </div>
            <div className="w-full text-2xl text-purple-800 font-semibold mt-2">Learn about DAOs</div>
            <p className="font-extralight text-slate-600 w-full">
              Learn about DAOs and how to create them using Radix
            </p>
            <div className="w-full  ">
        
              <Button
                onClick={() => navigate('/resources')}
                className="relative w-[200px] h-[29px] shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
              >
                <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
                <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
                <span className="text-center font-roboto font-bold text-[15px] leading-normal bg-gradient-to-r from-white to-[#b894ff] bg-clip-text text-transparent">
                  Learn about DAOs
                </span>
              </Button>

            </div>
          </Card>
        </div> */}

        {/* DAO List Section */}
        <div className="mt-20 w-full px-4">
          <div className="flex flex-col items-center justify-center shrink-0 h-auto min-h-[148px] bg-gradient-to-br from-[#100821] to-[rgb(8,6,42)] py-6 md:py-8">
            <div className=" text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center">
              Explore Top DAOs
            </div>
            {/* Popover for sorting */}
            <div className="text-[#B59AEC] text-center font-['Consolas-Regular',_sans-serif] text-base sm:text-lg md:text-xl leading-6 font-normal w-full max-w-4xl px-4">
              Lorem ipsum dolor sit amet consectetur. Aliquam risus sit vehicula congue diam sapien
            </div>

          </div>

          <div className='flex items-end justify-end'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="bg-purple-950 p-2 rounded-md">
                <Filter className="items-end h-5 w-5" />
              </PopoverTrigger>
              <PopoverContent className="mr-[100px] p-2">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-md ${selectedOption === option.id ? 'bg-gray-100' : ''
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
          </div>

          {/* DAO Cards */}
          {loading ? (
            <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-3">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
            </div>
          ) : data.length > 0 ? (
            <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-4">
              {data.slice(0, 6).map((dao, index) => (
                <Card
                  key={index}
                  onClick={() => handleNavigation(`/community/detail/${dao.id}`)}
                  className="flex overflow-hidden flex-col items-start justify-between p-5 h-[180px] cursor-pointer hover:shadow-md bg-gradient-to-r from-[#100821] to-[#1c0f32] border-2 border-[#2b1b49] rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={dao.image} alt={dao.name || 'DAO'} />
                      <AvatarFallback>{dao.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xl font-semibold text-white">{dao.name}</div>
                    </div>
                  </div>
                  <div className="line-clamp-2 text-[#B59AEC]">{dao.description || 'No description available'}</div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm bg-[#5228A4] border-[#7F42F9]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <p className="text-sm text-white">{dao.number_of_participants}</p>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Total Number of Participants</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm bg-[#5228A4] border-[#7F42F9]">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1">
                              <Banknote className="h-4 w-4" />
                              <p className="text-sm text-white">{dao.funds || 0}</p>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Total Funds</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 border-fuchsia-800">
                      {dao.tags &&
                        dao.tags.slice(0, 2).map((token, index) => (
                          <Badge key={index} variant="outline" className="border-[#7F42F9] text-white">
                            {token}
                          </Badge>
                        ))}
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
      <div className=" pb-10 flex justify-center items-center">
        <button
          onClick={() => handleNavigation('/explore')}
          className="relative w-[219px] h-[49px] mt-10 shrink-0 flex items-center justify-center rounded-full border border-violet-900 bg-black overflow-hidden cursor-pointer"
        >
          <div className="absolute w-[230.02px] h-[59.52px] bg-primary-400 rounded-full opacity-70 blur-[25.75px]"></div>
          <div className="absolute w-[230.02px] h-[59.52px] bg-[#4a2692] rounded-full blur-[25.75px] top-[34px]"></div>
          <div className="absolute w-[230.02px] h-[59.52px] bg-[#22133e] rounded-full blur-[25.75px] top-[-34px]"></div>
          <span className="text-center font-roboto font-bold text-[22px] leading-normal bg-gradient-to-r from-white to-[#c1bbcf] bg-clip-text text-transparent">
            See All
          </span>
        </button>
      </div>
    </div>
  )
}

export default ExploreSection