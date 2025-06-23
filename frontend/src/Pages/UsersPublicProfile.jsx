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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "./userDashboard/Dashboard/Dash-component/NavBar";






const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async (endpoint, params = {}) => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
  return response.data;
};

const UserPublicProfile = () => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const params = useParams();
  const [coverUrl, setCoverUrl] = useState("");

  const [totalPages, setTotalPages] = useState(1);

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  // const [userData, setUserData] = useState({});
  const [edit, setEdit] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [about, setAbout] = useState("");
  const [dataAll, setDataAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const queryClient = useQueryClient();


  const [createdComminities, setCreatedCommunities] = useState([]);

  const [socialLinks, setSocialLinks] = useState({
    x_url: "",
    website_url: "",
    linkedin: "",
    tiktok: "",
  });

  const user_address = accounts[0]?.address;

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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


  const { data: userData = [] } = useQuery({
    queryKey: ['userData', params.id],
    queryFn: () => fetchData(`/user/details/${params.id}`),
    onSuccess: (data) => {
      // setUserData(data);
      setAbout(data.about);
      setSocialLinks({
        x_url: data.x_url || "",
        website_url: data.website_url || "",
        linkedin: data.linkedin || "",
        tiktok: data.tiktok || "",
      });
    },
  });


  const { data: participatedCommunities = [] } = useQuery({
    queryKey: ['participatedCommunities', userData.public_address],
    queryFn: () =>
      fetchData(`/user/community/${userData.public_address}`, { owner: false }),
    enabled: !!userData.public_address,
  });

  const { data: activityData = {} } = useQuery({
    queryKey: ['userActivity', userData.public_address, 1, 10],
    queryFn: () =>
      fetchData('/user/activity', {
        user_address: userData.public_address,
        page: 1,
        page_size: 10,
      }),
    enabled: !!userData.public_address,
  });

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


    if (accounts && accounts.length > 0 && accounts[0].address) {
      fetchBluePrint();
      // fetchUserData();
      fetchAll(accounts[0].address)
    }
  }, [accounts, params.id]);
  useEffect(() => {
    if (userData.public_address) {
      // fetchActivity(userData.public_address, 1, 10);
      fetchCreatedCommunity(userData.public_address);
      // fetchCreatedParticipated(userData.public_address);
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
   <div className="bg-brand1 relative min-h-[1200px] md:min-h-screen pb-20 font-clash overflow-hidden ">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="absolute bottom-[100px] left-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[10px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="absolute top-[600px] right-0 bg-brand2 z-0 size-[500px] rounded-full blur-[200px]"></div>
      <div className="w-full absolute overflow-hidden opacity-20 h-[600px]">
        <TileEffect4 />
      </div>
      <Navbar userData={userData || {}} isAdmin={false} />
      <div className="grid md:grid-cols-4 grid-cols-1 relative container mx-auto md:gap-5 ">
        <div className="sticky top-0 h-full pt-10 md:pt-0">
          <Sidebar userData={userData || {}} onEdit={false} isAdmin={false} />
        </div>


       <div className="bg-[rgba(169,126,255,0.08)] md:col-span-3 rounded-[20px] border md:mt-24 mt-10 border-brand2  w-full relative overflow-hidden backdrop-blur-[6.7px]">



          <Tabs defaultValue="useractivity" className="w-full">
            <TabsList className="w-full min-h-12 bg-black/60  h-full rounded-t-[20px] p-0">
              <TabsTrigger
                value="useractivity"
                className="relative w-full h-[45px] py-5  text-lg rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                User Activity
              </TabsTrigger>

              <TabsTrigger
                value="communities"
                className="relative w-full h-[45px] border-l-[2px] border-brand3 py-5 text-lg rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-brand5/20 data-[state=active]:border-b-2 data-[state=active]:border-brand5"
              >
                Participated
              </TabsTrigger>
            </TabsList>

            <TabsContent value="useractivity">
              <section className="py-2">
                <UserActivity activityData={activityData?.data || []} />
              </section>
            </TabsContent>

            <TabsContent value="communities">
              <section className="py-2">
                <CommunitiesParticipated participatedCommunities={participatedCommunities} />
              </section>
            </TabsContent>
          </Tabs>


        </div>
      </div>
    </div>


  );
};

export default UserPublicProfile;
