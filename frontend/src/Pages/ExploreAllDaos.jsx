import {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import Footer from "./HomeSection/homeSectionComponents/Footer";
import { ChevronDown } from "lucide-react";

// const debounce = (func, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };

const ExploreAllDao = () => {
  // const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
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
  const { data: daos = [], isLoading } = useQuery({
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
    <div className="bg-brand1 relative min-h-screen pb-16 sm:pb-20 md:pb-10 font-clash overflow-hidden">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px] animate-pulse"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      <div className="min-h-screen bg-brand1 z-50 pt-20 sm:pt-16 md:pt-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:items-center sm:justify-between w-full gap-4 sm:gap-6">
          <div className="text-center sm:text-left text-[32px] sm:text-[40px] md:text-[64px] z-50 leading-tight font-semibold bg-gradient-to-r from-white to-[#6359E9] bg-clip-text text-transparent font-clash">
            Explore All DAOs
          </div>
          <div className="w-full sm:w-auto min-w-[200px] md:min-w-[250px]">
            <Input
              type="text"
              placeholder="Search for a DAO..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-brand3 relative bg-brand1 text-brand7 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand5 focus:border-brand4 placeholder-brand6 transition duration-200"
            />
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 sm:gap-3 px-0 sm:px-2 flex-wrap relative items-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand3 scrollbar-track-transparent">
          {/* Show first 5 tags */}
          {visibleTags.map((tag) => (
            <button
              key={tag.label}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap rounded-md ${
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
              <DropdownMenuTrigger className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap rounded-md bg-brand7 text-black flex items-center">
                More Tags <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-[40vh] overflow-y-auto">
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
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-md"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
        
        {!isLoading && daos.length === 0 && (
          <div className="flex items-center justify-center relative bg-brand2 text-white mt-3 h-24 sm:h-32 rounded-lg shadow-xl text-sm sm:text-base">
            No Deployed DAOs
          </div>
        )}

        {isLoading ? (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative gap-3 sm:gap-4">
            <SkeletonCard />      
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="relative pb-10 sm:pb-20">
          <BrandCard daos={daos} />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default ExploreAllDao;