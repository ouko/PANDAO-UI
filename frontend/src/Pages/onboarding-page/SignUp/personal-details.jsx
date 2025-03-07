import useStepStore from "@/store/stepStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import ImageUpload from "@/Pages/components/ImageUpload";
import { Label } from "@/components/ui/label";
import { useSignupFormStore } from "@/store/onboarding/signup-form";
import { useAccount } from "@/AccountContext";

const fetchTags = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    return response.data;
};

const PersonalDetail = () => {
    const { handleNext } = useStepStore();
    const { accounts } = useAccount();
    const {
        username,
        email,
        bio,
        display_image,
        tags: storedTags,
        setName,
        setEmail,
        setBio,
        setDisplayImage,
        setTags,
        public_address,
        setPublicAddress
    } = useSignupFormStore();

    const { data: tagsData = [], isLoading, error } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    const [selectedTags, setSelectedTags] = useState(storedTags || []);
    const [useWalletName, setUseWalletName] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Form validation effect
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid =
            username?.trim().length > 0 &&
            email?.trim().length > 0 &&
            emailRegex.test(email) &&
            bio?.trim().length > 0 &&
            display_image &&
            selectedTags.length >= 5;
    
        setIsFormValid(valid);
    }, [username, email, bio, display_image, selectedTags]);

    // Handle wallet name checkbox
    useEffect(() => {
        if (useWalletName && accounts && accounts.length > 0) {
            // Get wallet name from accounts
            const walletName = accounts[0].label || "";
            setName(walletName);

        }
    }, [useWalletName, accounts, setName, setPublicAddress]);

    const toggleTag = (tagName) => {
        const updatedTags = selectedTags.includes(tagName)
            ? selectedTags.filter((tag) => tag !== tagName)
            : [...selectedTags, tagName];

        setSelectedTags(updatedTags);
        setTags(updatedTags); // Update the Zustand store
    };

    const handleFileId = (id) => {
        const fileUrl = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
        setDisplayImage(fileUrl);
    };
    const handleSendEmail = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/email-verification?user_email=${
              email
            }`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          console.log('API Response:', response.data)
        } catch (error) {
          console.error('Error in API call:', error)
        }
      }
    const handleNextClick = () => {
        useSignupFormStore.getState().setName(username);
        useSignupFormStore.getState().setEmail(email);
        useSignupFormStore.getState().setBio(bio);
        useSignupFormStore.getState().setTags(selectedTags);
        handleNext();
    };
  
    console.log(username, email, public_address, bio, storedTags, display_image, "fasial")
    return (
        <div className="w-full relative justify-center items-start gap-8 flex h-full">
            <div className="flex flex-col pt-10 gap-8 text-white">
                <div className="flex gap-8">
                    <div className="w-full">
                        <InputField
                            label="Enter your Name"
                            placeholder="John Doe"
                            value={username || ""}
                            onChange={(e) => setName(e.target.value)}
                            disabled={useWalletName}
                        />

                        <label className="flex items-center gap-2 text-white text-sm mt-3">
                            <input
                                type="checkbox"
                                className="border-2 border-primary-300 rounded-sm pt-3"
                                checked={useWalletName}
                                onChange={() => setUseWalletName(!useWalletName)}
                            />
                            Same as wallet name
                        </label>
                    </div>

                    <InputField
                        label="Enter your E-mail"
                        placeholder="Enter your email"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <InputField
                    label="Your Public Address"
                    placeholder="Your Public Address"
                    value={accounts[0].address}
                    disabled
                    onChange={(e) => setPublicAddress(e.target.value)}
                />
                <InputField
                    label="Enter your Bio"
                    placeholder="Tell us something about yourself!"
                    isTextArea
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                />

                {/* Dropdown for tags */}
                <DropdownMenu>
                    <div className="relative inline-block w-full">
                        <label className="text-white text-xl font-medium">Choose 5 communities you might be interested in</label>

                        <DropdownMenuTrigger asChild>
                            <button className="bg-[#1B0D37] border-brand5 mt-2 border p-2 rounded-md w-full flex flex-wrap gap-2 min-h-[40px] items-center">
                                {selectedTags.length > 0 ? (
                                    selectedTags.map((tag) => (
                                        <span key={tag} className="bg-purple-600 text-white px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-neutral-400">Select a tag</span>
                                )}
                            </button>
                        </DropdownMenuTrigger>

                        {/* Dropdown Content */}
                        <DropdownMenuContent align="start" className="max-h-60 w-[30rem] overflow-y-auto">
                            {isLoading ? (
                                <DropdownMenuItem>Loading...</DropdownMenuItem>
                            ) : error ? (
                                <DropdownMenuItem>Error loading tags</DropdownMenuItem>
                            ) : (
                                tagsData.map((tag) => (
                                    <DropdownMenuItem key={tag.id} onClick={() => toggleTag(tag.name)}>
                                        {tag.name} {selectedTags.includes(tag.name) ? "✅" : ""}
                                    </DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </div>
                </DropdownMenu>

                <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                        <div key={tag} className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded-md">
                            {tag}
                            <button onClick={() => toggleTag(tag)} className="text-white">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="display_image"
                        className="text-xl font-bold"
                    >
                        Upload your Profile picture here
                    </Label>
                    <ImageUpload onUploadSuccess={handleFileId} />

                </div>

                <button
                    onClick={() => {
                        handleSendEmail()
                        handleNextClick()
                      }}
                    disabled={!isFormValid}
                    className={`rounded-3xl text-white text-2xl font-semibold py-3 px-4 w-full ${isFormValid
                        ? "bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]"
                        : "bg-gray-500 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PersonalDetail;

// Updated InputField component to handle value, onChange, and disabled props
const InputField = ({ label, placeholder, isTextArea = false, value, onChange, disabled = false }) => {
    return (
        <div className="flex flex-col gap-2.5 w-full">
            <label className="text-white text-xl font-medium">{label}</label>
            {isTextArea ? (
                <textarea
                    className={`bg-[#1B0D37] rounded-md border border-brand5 p-4 w-full h-24 resize-none ${disabled ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            ) : (
                <input
                    className={`bg-[#1B0D37] rounded-md border border-brand5 p-4 w-full ${disabled ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            )}
        </div>
    );
};