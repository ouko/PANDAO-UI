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
   <div className=" w-full ">

      {/* <Card className="w-full max-w-screen-xl mx-auto relative border-none shadow-md overflow-hidden rounded-lg mb-4">
        <img
          src={coverUrl || "/Pandao.png"}
          alt="Cover"
          className="aspect-video w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-4">
          <ImageUpdater onUploadSuccess={handleCoverId} />
        </div>
      </Card> */}

      <Card className="border-0 bg-transparent rounded-lg text-gray-300 mt-1 mx-auto p-4 w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 w-full">
          {/* Avatar + Upload */}
          <div className="flex flex-col items-center">
            <Avatar className="h-48 w-48 md:h-72 md:w-72 border-4 border-brand5">
              <AvatarImage
                src={fileUrl || userData.usermetadata?.image_url}
                className="object-cover h-full w-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mt-3">
              <ImageUpload onUploadSuccess={handleFileId} />
            </div>
          </div>

          {/* Info Fields */}
          <div className="flex-1 w-full">
            <div className="text-white font-semibold text-2xl md:text-4xl mb-4 text-center md:text-left">
              {userData.name}
            </div>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full bg-brand1 border-brand1 text-white outline-none"
              maxLength="150"
            />

            {/* Social Links */}
            <div className="mt-6">
              <div className="text-white text-sm mb-2">Social Accounts</div>

              {[
                {
                  icon: <FaXTwitter className="text-white" />,
                  placeholder: "Your X url",
                  value: socialLinks.x_url,
                  onChange: (e) =>
                    setSocialLinks({ ...socialLinks, x_url: e.target.value }),
                },
                {
                  icon: <Globe className="text-white" />,
                  placeholder: "Your website URL",
                  value: socialLinks.website_url,
                  onChange: (e) =>
                    setSocialLinks({
                      ...socialLinks,
                      website_url: e.target.value,
                    }),
                },
                {
                  icon: <FaLinkedinIn className="text-white" />,
                  placeholder: "Your LinkedIn",
                  value: socialLinks.linkedin,
                  onChange: (e) =>
                    setSocialLinks({ ...socialLinks, linkedin: e.target.value }),
                },
              ].map((field, i) => (
                <div key={i} className="flex items-center gap-2 w-full my-2">
                  {field.icon}
                  <input
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={field.placeholder}
                    className="flex-1 px-3 py-2 text-sm bg-transparent border rounded-lg border-brand1 outline-none text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Work History Section */}
      <Card className="w-full   bg-transparent border-transparent  mt-4 ">
        {workHistory.map((item, index) => (
          <EmploymentDetails
            key={index}
            history={item}
            onChange={(value, field) =>
              handleWorkHistoryChange(index, field, value)
            }
            onRemove={() => handleRemoveWorkHistory(index)}
            isOnboarding="false"
          />
        ))}

        <div className="flex justify-center mt-4">
          <Button
            className="w-full max-w-sm rounded-2xl"
            onClick={handleAddWorkHistory}
          >
            Add Work History
          </Button>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center items-center">
        <Button
          onClick={handleUpdateUser}
          variant="brand"
          className="w-full  my-5"
        >
          Save All
        </Button>
      </div>
    </div>
  );
};

export default EditPage;
