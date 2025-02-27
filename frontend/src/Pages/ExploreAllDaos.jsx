import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "./GlobalComponents/Skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, Users } from "lucide-react";
import { useAccount } from "@/AccountContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import BrandCard from '@/components/ui/myComponents/brand-card'
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
    <div className="bg-brand1  overflow-hidden">
      <div className="absolute left-1/3 bg-brand4 y-50 size-[300px] rounded-full blur-[200px]"></div>
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

      <div className="min-h-screen bg-brand1 pt-20 max-w-[1200px] mx-auto ">
        <div className="flex items-center w-full justify-between pr-3">
          <div className="text-[40px] md:text-[64px]  leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash">
            Explore All DAOs
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search for a DAO..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-brand3 bg-brand1 text-brand7 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand5 focus:border-brand4 placeholder-brand6 transition duration-200"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-3 px-2 flex-wrap relative">
          {tags.map((tag) => (
            <button
              key={tag.label}
              className={`px-4 py-2 text-sm rounded-md ${
                activeTag === tag.label ? "bg-brand2 text-white" : "bg-brand7 text-black"
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
          <div className="flex items-center justify-center bg-brand2 text-white mt-3 h-32 rounded-lg shadow-xl">
            No Deployed DAOs
          </div>
        )}

        {loading ? (
          <div className="mt-5 grid md:grid-cols-3 grid-cols-1 gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <BrandCard daos={data} />
        )}

      </div>
    </div>
  );
};

export default ExploreAllDao;
