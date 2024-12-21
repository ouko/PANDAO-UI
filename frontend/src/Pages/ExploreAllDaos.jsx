import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "./GlobalComponents/Skeleton";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, Users } from "lucide-react";
import { useAccount } from "@/AccountContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ExploreAllDao = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [tags,setTags]=useState([])
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }
  const handleTagClick = async (tag) => {
    console.log(tag,"hihihi")
    if (tag.label === activeTag) {
      setActiveTag(null); // Deselect tag
      fetchBluePrint();
    } else {
      setActiveTag(tag.label);
      fetchCommunitiesByTag(tag.label);
    }
  };
  const fetchCommunitiesByTag = async (tagId) => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/all`, {
        params: { tags: tagId }
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching communities by tag:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBluePrint = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/all`
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching blueprint data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tags`
        );
        const tagOptions = response.data.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setTags(tagOptions);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
    fetchBluePrint();
  }, []);
  useEffect(() => {
    const fetchBluePrint = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/all`, {
          params: { name: searchQuery }
        });
        console.log(res.data)
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the debounced function
    const debouncedFetch = debounce(fetchBluePrint, 500); // 500ms delay
    debouncedFetch();
  }, [searchQuery]);
  const handleNavigation = (path) => {
    if (accounts && accounts.length > 0) {
      navigate(path);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="bg-blue-50">
       <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have not connected your Wallet</DialogTitle>
            <DialogDescription>
             Please connect your wallet your Radix Wallet
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen pt-20 max-w-[1200px] mx-auto ">
        <div className="flex items-center w-full justify-between pr-3">
        <div className="px-2 mt-2 text-3xl font-semibold">Explore all DAOs</div>
        <div>
          <Input
          type="text" 
          placeholder="Search for a DAO..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
          />
        </div>
        </div>
        <div className="mt-4 flex gap-3 px-2 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag.label}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTag === tag.label ? "bg-purple-600 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag.label}
            </button>
          ))}
          {activeTag && (
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
              onClick={() =>{
                setActiveTag(null)
                fetchBluePrint()
              } }
            >
              Clear Filter
            </button>
          )}
        </div>
        {!loading && data.length === 0 && (
          <div className="flex items-center justify-center bg-white mt-3 h-32 rounded-lg shadow-xl">
            No Deployed DAOs
          </div>
        )}
        {loading ? (
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-3">
            <SkeletonCard />
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />{" "}
            <SkeletonCard />
          </div>
        ) : (
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-4 px-2 pb-10">
            {data.length > 0 &&
              data.map((dao, index) => (
                <Card
                key={index}
                onClick={() => handleNavigation(`/community/detail/${dao.id}`)}
                className="flex overflow-hidden flex-col items-start justify-between p-5 h-[180px] cursor-pointer hover:shadow-md"
              >
                <div className="flex items-start gap-2">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={dao.image} alt={dao.name || 'DAO'} />
                    <AvatarFallback>{dao.name?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-semibold">{dao.name}</div>
                  </div>
                </div>
                <div className="line-clamp-2">{dao.description || 'No description available'}</div>
                <div className="flex items-center justify-between w-full mt-1">
                    <div className="flex items-center  gap-2 ">
                      <div className="flex items-center gap-2 border-2 px-2 rounded-md shadow-sm ">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1">
                              <Users className="h-4 w-4" />{' '}
                              <p className="text-sm">
                                {' '}
                                {dao.number_of_participants}{' '}
                              </p>{' '}
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Total Number of Participant</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2   border-2 px-2 rounded-md shadow-sm ">
                        {' '}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1">
                              <Banknote className="h-4 w-4" />{' '}
                              <p className="text-sm"> {dao.funds || 0} </p>{' '}
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p>Total Funds</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {dao.tags &&
                        dao.tags.slice(0, 2).map((token, index) => (
                          <Badge key={index} variant="outline">
                            {token}{' '}
                          </Badge>
                        ))}
                    </div>
                  </div>
              </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAllDao;
