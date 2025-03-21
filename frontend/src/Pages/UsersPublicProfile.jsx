import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "@/AccountContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Activity,
  Check,
  ChevronLeft,
  ClockIcon,
  Copy,
  Globe,
  SquareArrowOutUpRight,
} from "lucide-react";

import { FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { clipAddress } from "@/utils/functions/ClipAddress";
import { Button } from "@/components/ui/button";
import { formatStandardDateTime } from "@/utils/functions/convertActivityData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TileEffect4 from "@/components/ui/myComponents/grid-bg-4";
import Sidebar from "./userDashboard/Dashboard/Dash-component/sidebar";
import UserActivity from "./userDashboard/Dashboard/Dash-component/UserActivity";
import CommunitiesParticipated from "./userDashboard/Dashboard/Dash-component/CommunitiesParticipated";

const UserPublicProfile = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [coverUrl, setCoverUrl] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [about, setAbout] = useState("");
  const [dataAll, setDataAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);


  const [createdComminities, setCreatedCommunities] = useState([]);
  const [participatedComminities, setParticipatedCommunities] = useState([]);
  const [socialLinks, setSocialLinks] = useState({
    x_url: "",
    website_url: "",
    linkedin: "",
    tiktok: "",
  });

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  //   const handleFileId = (id) => {
  //     const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
  //     setFileUrl(url);
  //     console.log("Received file URL:", url);
  //   };
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
        }
      );
      setActivityData(res.data.data);
      setTotalPages(res.data.page);
      console.log(res.data, "data");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };
  const fetchCreatedCommunity = async (user_address) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL
        }/user/community/${user_address}?owner=true`
      );
      setCreatedCommunities(res.data);
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };
  const fetchCreatedParticipated = async (user_address) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL
        }/user/community/${user_address}?owner=false`
      );
      setParticipatedCommunities(res.data);
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    const fetchAll = async (user_address) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL
          }/community/user/interest/user_add?user_addr=${user_address}`,
        )
        setDataAll(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${params.id}`
        );
        setUserData(res.data);
        setAbout(res.data.about);
        setSocialLinks({
          x_url: res.data.x_url || "",
          website_url: res.data.website_url || "",
          linkedin: res.data.linkedin || "",
          tiktok: res.data.tiktok || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchBluePrint();
      fetchUserData();
      fetchAll(accounts[0].address)
    }
  }, [accounts, params.id]);
  useEffect(() => {
    if (userData.public_address) {
      fetchActivity(userData.public_address, 1, 10);
      fetchCreatedCommunity(userData.public_address);
      fetchCreatedParticipated(userData.public_address);
    }
  }, [userData.public_address]);
  //   const handleUpdateUser = async () => {
  //     try {
  //       const updatedData = {
  //         ...userData,
  //         about,
  //         image_url: fileUrl || userData.image_url,
  //         ...socialLinks,
  //       };
  //       await axios.patch(
  //         `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
  //         updatedData
  //       );
  //       setUserData(updatedData);
  //       setEdit(false);
  //     } catch (error) {
  //       console.error("Error updating user data:", error);
  //     }
  //   };

  if (!accounts || accounts.length === 0) {
    navigate("/");
    return null;
  }

  if (params.id === accounts[0].address) {
    navigate("/userDashboard");
    return null;
  }

  return (
    <div className="bg-brand1 relative min-h-screen pb-20 font-clash overflow-hidden">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>

      <div className="flex flex-row items-start justify-between relative max-w-[1600px] mx-auto gap-5">
       <div className="sticky top-0 h-full">

       <Sidebar userData={userData || {}} onEdit={false} />

       </div>


       <div className="bg-[rgba(169,126,255,0.08)] rounded-[20px] border mt-24 border-brand2 mr-10 w-full relative overflow-hidden backdrop-blur-[6.7px]">
  {/* Tab navigation */}
  <div className="flex border-b bg-black/60 border-brand1 py-2">
    {['User Activity', 'Communities Participated'].map((label, index) => (
      <button
        key={index}
        className={`flex-1 py-2 px-6 text-center font-medium relative text-lg ${
          activeTab === index
            ? "text-brand6"
            : "text-white hover:text-primary-500"
        } ${index !== 0 ? "border-l border-brand5" : ""}`}
        onClick={() => setActiveTab(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {activeTab === index && (
            <div className="absolute bottom-0 bg-gradient-to-l from-brand3 to-brand5 h-1 w-[80%]"></div>
          )}
        </div>
        {label}
      </button>
    ))}
  </div>

  {/* Tab content */}
  {activeTab === 0 && (
    <section className="py-6">
      <UserActivity activityData={activityData} />
    </section>
  )}

  {activeTab === 1 && (
    <section className="py-6">
      <CommunitiesParticipated participatedCommunities={participatedComminities} />
    </section>
  )}
</div>


      </div>



    </div>


  );
};

export default UserPublicProfile;
