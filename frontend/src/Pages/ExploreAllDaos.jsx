import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Banknote, ChevronDown, Users } from "lucide-react";
import { useAccount } from "@/AccountContext";
import { Input } from "@/components/ui/input";
import BrandCard from '@/components/ui/myComponents/brand-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SkeletonCard } from "@/components/ui/myComponents/card-skeleton";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ExploreAllDao = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  // Fetch tags with TanStack Query
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tags`);
      return response.data.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));
    }
  });

  // Fetch DAOs with TanStack Query
  const { data: daos = [], isLoading, refetch } = useQuery({
    queryKey: ['daos', searchQuery, activeTag],
    queryFn: async () => {
      const params = {};
      if (searchQuery) params.name = searchQuery;
      if (activeTag) params.tags = activeTag;
      
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/community/all`, { params });
      return res.data;
    },
    enabled: true,
  });

  // Handle search with debounce
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    if (tag.label === activeTag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag.label);
    }
  };

  // Clear tag filter
  const clearFilter = () => {
    setActiveTag(null);
  };

  // Handle navigation with wallet check
  
  // Split tags into visible and dropdown
  const visibleTags = tags.slice(0, 5);
  const dropdownTags = tags.slice(5);

  return (
    <div className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      <div className="min-h-screen bg-brand1 z-50 pt-20 max-w-[1200px] mx-auto">
        <div className="flex items-center w-full justify-between pr-3">
          <div className="text-[40px] md:text-[64px] z-50 leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent text-center font-clash">
            Explore All DAOs
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search for a DAO..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-brand3 relative bg-brand1 text-brand7 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand5 focus:border-brand4 placeholder-brand6 transition duration-200"
            />
          </div>
        </div>
        
        <div className="mt-4 flex gap-3 px-2 flex-wrap relative items-center">
          {/* Show first 5 tags */}
          {visibleTags.map((tag) => (
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
          
          {/* Dropdown for remaining tags */}
          {dropdownTags.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-sm rounded-md bg-brand7 text-black flex items-center">
                More Tags <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dropdownTags.map((tag) => (
                  <DropdownMenuItem 
                    key={tag.label}
                    className={activeTag === tag.label ? "bg-brand2 text-white" : ""}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Clear filter button */}
          {activeTag && (
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
        
        {!isLoading && daos.length === 0 && (
          <div className="flex items-center justify-center relative bg-brand2 text-white mt-3 h-32 rounded-lg shadow-xl">
            No Deployed DAOs
          </div>
        )}

        {isLoading ? (
          <div className="mt-5 grid md:grid-cols-3 relative grid-cols-1 gap-3">
            <SkeletonCard />      
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="relative">
          <BrandCard daos={daos}  />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAllDao;