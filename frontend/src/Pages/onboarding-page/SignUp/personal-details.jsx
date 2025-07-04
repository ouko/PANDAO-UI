import useStepStore from "@/store/stepStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

    // Initialize public address in store
    useEffect(() => {
        if (accounts && accounts.length > 0) {
            setPublicAddress(accounts[0].address);
        }
    }, [accounts, setPublicAddress]);

    const { data: tagsData = [], isLoading, error } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    const [selectedTags, setSelectedTags] = useState(storedTags || []);
    const [useWalletName, setUseWalletName] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({
        username: false,
        email: false,
        bio: false,
        display_image: false,
        tags: false
    });

    // Individual validation states
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isBioValid, setIsBioValid] = useState(true);
    const [isTagsValid, setIsTagsValid] = useState(true);
    const [isDisplayImageValid, setIsDisplayImageValid] = useState(true);

    // Validation effect
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_ ]{3,}$/; // allow spaces

        const isValidUsername = username?.trim().length >= 3 && usernameRegex.test(username);
        const isValidEmail = email?.trim().length > 0 && emailRegex.test(email);
        const isValidBio = bio?.trim().length >= 10 && bio.trim().length <= 300;
        const isValidDisplayImage = typeof display_image === 'string' && display_image.trim().length > 0;
        const isValidTags = Array.isArray(selectedTags) && selectedTags.length >= 5 && selectedTags.length <= 10;

        // Only validate fields that have been touched or when submitting
        const validUsername = !touched.username || isValidUsername;
        const validEmail = !touched.email || isValidEmail;
        const validBio = !touched.bio || isValidBio;
        const validDisplayImage = !touched.display_image || isValidDisplayImage;
        const validTags = !touched.tags || isValidTags;

        setIsUsernameValid(validUsername);
        setIsEmailValid(validEmail);
        setIsBioValid(validBio);
        setIsDisplayImageValid(validDisplayImage);
        setIsTagsValid(validTags);

        // Form is only valid if all fields are actually valid (not just not-invalid)
        setIsFormValid(isValidUsername && isValidEmail && isValidBio && isValidDisplayImage && isValidTags);
    }, [username, email, bio, display_image, selectedTags, touched]);

    // Sync wallet name
    useEffect(() => {
        if (useWalletName && accounts && accounts.length > 0) {
            const walletName = accounts[0].label || '';
            setName(walletName);
        }
    }, [useWalletName, accounts, setName]);

    const toggleTag = (tagName) => {
        const updated = selectedTags.includes(tagName)
            ? selectedTags.filter((t) => t !== tagName)
            : [...selectedTags, tagName];
        setSelectedTags(updated);
        setTags(updated);
    };

    const handleFileId = (id) => {
        const fileUrl = `https://ucarecdn.com/${id}/-/preview/1000x562/`;
        setDisplayImage(fileUrl);
    };

    const handleSendEmail = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/email-verification?user_email=${email}`,
                {},
                { headers: { 'Content-Type': 'application/json' } }
            );
        } catch (err) {
            console.error('Email verification error:', err);
        }
    };

    const handleNextClick = () => {
        // Mark all fields as touched when trying to submit
        setTouched({
            username: true,
            email: true,
            bio: true,
            display_image: true,
            tags: true
        });

        // Only proceed if form is valid
        if (isFormValid) {
            useSignupFormStore.getState().setName(username);
            useSignupFormStore.getState().setEmail(email);
            useSignupFormStore.getState().setBio(bio);
            useSignupFormStore.getState().setTags(selectedTags);
            handleSendEmail();
            handleNext();
        }
    };

    return (
        <div className="w-full relative justify-center items-start flex h-full container">
            <div className="flex flex-col pt-10 gap-8 text-white">
                <div className="flex gap-8">
                    <div className="w-full">
                        <InputField
                            label="Enter your Name"
                            placeholder="John Doe"
                            value={username || ''}
                            onChange={(e) => {
                                setName(e.target.value);
                                setTouched(prev => ({...prev, username: true}));
                            }}
                            onBlur={() => setTouched(prev => ({...prev, username: true}))}
                            disabled={useWalletName}
                            isValid={isUsernameValid}
                            showError={touched.username}
                        />
                        <label className="flex items-center gap-2 text-white text-sm mt-3">
                            <input
                                type="checkbox"
                                className="border-2 border-primary-300 rounded-sm"
                                checked={useWalletName}
                                onChange={() => setUseWalletName(!useWalletName)}
                            />
                            Same as wallet name
                        </label>
                    </div>
                    <InputField
                        label="Enter your E-mail"
                        placeholder="Enter your email"
                        value={email || ''}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setTouched(prev => ({...prev, email: true}));
                        }}
                        onBlur={() => setTouched(prev => ({...prev, email: true}))}
                        isValid={isEmailValid}
                        showError={touched.email}
                    />
                </div>
                <InputField
                    label="Your Public Address"
                    placeholder="Your Public Address"
                    value={public_address || ''}
                    disabled
                    onChange={(e) => setPublicAddress(e.target.value)}
                />
                <InputField
                    label="Enter your Bio"
                    placeholder="Tell us something about yourself!"
                    isTextArea
                    value={bio || ''}
                    onChange={(e) => {
                        setBio(e.target.value);
                        setTouched(prev => ({...prev, bio: true}));
                    }}
                    onBlur={() => setTouched(prev => ({...prev, bio: true}))}
                    isValid={isBioValid}
                    showError={touched.bio}
                />
                <DropdownMenu>
                    <div className="relative inline-block w-full">
                        <label className="text-white text-xl font-medium">
                            Choose 5 communities you might be interested in
                        </label>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={`bg-[#1B0D37] border p-2  py-4  rounded-md w-full flex flex-wrap gap-2 min-h-[40px] items-center mt-2 ${
                                    !touched.tags || isTagsValid ? 'border-brand5' : 'border-rose-500'
                                }`}
                                onClick={() => setTouched(prev => ({...prev, tags: true}))}
                            >
                                {selectedTags.length > 0 ? (
                                    selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-purple-600 text-white px-2 py-1 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-neutral-400">Select a tag</span>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                           <DropdownMenuContent
                            align="start"
                            className="max-h-60 w-[30rem] bg-[#1B0D37] rounded-md border border-[#5228A4] overflow-y-auto outline-none text-white ">
        {isLoading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : error ? (
          <DropdownMenuItem>Error loading tags</DropdownMenuItem>
        ) : (
          tagsData.map((tag) => (
            <DropdownMenuItem
              key={tag.id}
              onClick={() => toggleTag(tag.name)}
              className={`cursor-pointer ${
                selectedTags.includes(tag.name)
                  ? "bg-brand2 text-white"
                  : "hover:bg-brand2 hover:text-white"
              }`}
            >
              {tag.name} {selectedTags.includes(tag.name) && "✓"}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
                        {touched.tags && !isTagsValid && (
                            <span className="text-rose-500 text-sm">
                                Select between 5 and 10 tags.
                            </span>
                        )}
                    </div>
                </DropdownMenu>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="display_image" className="text-xl font-bold">
                        Upload your Profile picture here
                    </Label>
                    <ImageUpload 
                        onUploadSuccess={(id) => {
                            handleFileId(id);
                            setTouched(prev => ({...prev, display_image: true}));
                        }} 
                        imageUrl={display_image} 
                    />
                    {touched.display_image && !isDisplayImageValid && (
                        <span className="text-rose-500 text-sm">
                            Profile image is required.
                        </span>
                    )}
                </div>
                <button
                    onClick={handleNextClick}
                    disabled={!isFormValid}
                    className={`rounded-3xl text-white text-2xl font-semibold py-3 px-4 w-full ${
                        isFormValid
                            ? 'bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] hover:from-[#C0A1FF] hover:to-[#391483]'
                            : 'bg-gray-500 cursor-not-allowed'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

// Updated InputField component
const InputField = ({ 
    label, 
    placeholder, 
    isTextArea = false, 
    value, 
    onChange, 
    onBlur,
    disabled = false, 
    isValid,
    showError = true 
}) => (
    <div className="flex flex-col gap-2.5 w-full">
        <label className="text-white text-xl font-medium">{label}</label>
        {isTextArea ? (
            <textarea
                className={`bg-[#1B0D37] rounded-md border p-4 w-full ${
                    showError && !isValid ? 'border-rose-500' : 'border-brand5'
                }`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                rows={4}
            />
        ) : (
            <input
                className={`bg-[#1B0D37] border-brand5 rounded-md border p-4 w-full ${
                    disabled ? 'opacity-70 cursor-not-allowed' : 
                    (showError && !isValid ? 'border-rose-500' : 'border-brand5')
                }`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        )}
    </div>
);

export default PersonalDetail;
