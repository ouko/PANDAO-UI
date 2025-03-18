import { useAccount } from "@/AccountContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { FaLinkedinIn,  FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import ImageUpload from "@/Pages/components/ImageUpload";
import WorkHistoryItem from "@/Pages/UserDasboard/WorkHistory";
import EmploymentDetails from "@/Pages/onboarding-page/SignUp/employment-details";


const EditPage = ({onClose}) => {
  const { accounts } = useAccount();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [about, setAbout] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    x_url: "",
    website_url: "",
    linkedin: "",
    tiktok: "",
  });
  const [workHistory, setWorkHistory] = useState([]);
  // Fetch user data when the component mounts or when accounts change
  useEffect(() => {
    const fetchUserData = async () => {
      if (!accounts || accounts.length === 0) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/details/${accounts[0].address}`
        );
        const data = res.data;
        setUserData(data);
        setAbout(data.usermetadata.about);
        setCoverUrl(data.usermetadata.cover_url);
        setSocialLinks({
          x_url: data.usermetadata.x_url || "",
          website_url: data.usermetadata.website_url || "",
          linkedin: data.usermetadata.linkedin || "",
       
        });
        setWorkHistory(res.data.user_work|| []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accounts, navigate]);

  const handleFileId = (id) => {
    const url = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
    setFileUrl(url);
    console.log("Received file URL:", url);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedData = {
        ...userData,
        about,
        image_url: fileUrl || userData.image_url,
        cover_url: coverUrl,
        ...socialLinks,
        work_history: workHistory
      };
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-user`,
        updatedData
      );
      setUserData(updatedData);
      onClose()

      navigate("/userDashboard")
      
      toast.success("Details Updated Successfully")
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handleAddWorkHistory = () => {
    setWorkHistory([...workHistory, { company_name: "", start_date: "", end_date: "", designation: "", description: "", current: false }]);
  };

  const handleWorkHistoryChange = (index, field, value) => {
    const updatedWorkHistory = [...workHistory];
    updatedWorkHistory[index] = { ...updatedWorkHistory[index], [field]: value };
    setWorkHistory(updatedWorkHistory);
  };

  const handleRemoveWorkHistory = (index) => {
    const updatedWorkHistory = [...workHistory];
    updatedWorkHistory.splice(index, 1);
    setWorkHistory(updatedWorkHistory);
  };
  return (
    <div className=" bg-brand2 ">
         {/* <Card className="w-full relative flex md:flex-row flex-col shadow-md items-center md:items-start max-w-[1200px] mx-auto rounded-sm  text-white border-b-0 h-48">
            <img
               src={coverUrl || "/Pandao.png"}
              alt="Cover"
              className="aspect-video h-48 w-full object-cover"
            />
            <div className="absolute bottom-0  right-0  flex items-end justify-end -mr-20">
            <ImageUpdater onUploadSuccess={handleCoverId}  />

            </div>
          </Card> */}
      <Card className="border-0 rounded-t-none border-t-0   bg-brand2    flex   mt-1   mx-auto gap-3 p-5">
        <CardHeader className="p-0 mt-4 flex flex-col items-center ">
          <Avatar className="h-72 w-72 border-[5px] border-brand5">
            <AvatarImage
              src={fileUrl || userData.usermetadata?.image_url}
              className="h-72 w-72 object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ImageUpload onUploadSuccess={handleFileId} />
        </CardHeader>
        <CardContent className="text-xl font-bold flex flex-col gap-2 w-full px-2">
          <div className="text-white font-semibold  text-4xl">
            {userData.name}
          </div>
          <Textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full bg-transparent border-brand1 bg-brand1 outline-none text-white"
            maxLength="150"
          />
          <div className="text-white text-sm mt-5" >Social Accounts</div>
          <div className="flex items-center w-full gap-2">
            <FaXTwitter className="text-white" />
            <input
              value={socialLinks.x_url}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, x_url: e.target.value })
              }
              placeholder="Your X url"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg  border-brand1 outline-none text-white"
            />
          </div>
          <div className="flex items-center w-full gap-2">
            <Globe className="text-white" />
            <input
              value={socialLinks.website_url}
              onChange={(e) =>
                setSocialLinks({
                  ...socialLinks,
                  website_url: e.target.value,
                })
              }
              placeholder="Your website URL"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg  border-brand1 outline-none text-white"
            />
          </div>
          <div className="flex items-center w-full gap-2">
            <FaLinkedinIn className="text-white" />
            <input
              value={socialLinks.linkedin}
              onChange={(e) =>
                setSocialLinks({
                  ...socialLinks,
                  linkedin: e.target.value,
                })
              }
              placeholder="Your LinkedIn"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg  border-brand1 outline-none text-white"
            />
          </div>
          {/* <div className="flex items-center w-full gap-2">
            <FaTiktok className="text-white" />
            <input
              value={socialLinks.tiktok}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, tiktok: e.target.value })
              }
              placeholder="Your Tiktok"
              className="px-3 py-1 text-sm w-full bg-transparent border-2 rounded-lg outline-none text-white"
            />
          </div> */}
    
   
          {/* <div className="flex gap-2 items-center w-full">
            <Button
              onClick={handleUpdateUser}
              className="bg-green-600 hover:bg-green-700 border-2 w-full"
            >
              Save
            </Button>
          </div> */}
        </CardContent>
      </Card>
      <Card className="max-w-[1200px] mx-auto bg-brand2  border-brand2 gap-3 p-5 mt-4">
  {workHistory.map((item, index) => (
    <EmploymentDetails
      key={index}
      history={item}
      onChange={(value, field) => handleWorkHistoryChange(index, field, value)}
      onRemove={() => handleRemoveWorkHistory(index)}
      isOnboarding="false"
    />
  ))}

  <Button className="w-full my-5" onClick={handleAddWorkHistory}>
    Add Work History
  </Button>

  
</Card>

     <div className="flex items-center justify-center ">
          <button
            onClick={handleUpdateUser}
           
            className="flex-1 rounded-2xl p-3 text-white bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:from-[#C0A1FF] hover:to-[#391483] font-semibold shadow-inner"
            >
            Save All
          </button>
          </div>
          
    </div>
  );
};

export default EditPage;
