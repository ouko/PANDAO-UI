import useStepStore from "@/store/stepStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import ImageUpload from "@/Pages/components/ImageUpload";
import { Label } from "@/components/ui/label";

const fetchTags = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    return response.data;
};
const handleFileId = (id) => {
    const fileUrl = `https://ucarecdn.com/${id}/-/preview/1000x562/`
  
  }
const PersonalDetail = () => {
    const { handleNext } = useStepStore();
    const { data: tags = [], isLoading, error } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });
    const [selectedTag, setSelectedTag] = useState([]);
    const toggleTag = (tagName) => {
        setSelectedTag((prev) =>
            prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]
        );
    };
    return (
        <div className="   w-full relative justify-center items-start gap-8 flex  h-full">


            <div className="flex flex-col pt-10 gap-8  text-white ">

                <div className="flex gap-8 ">
                    <div className="w-full">
                        <InputField label="Enter your Name" placeholder="John Doe" />

                        <label className="flex items-center gap-2 text-white text-sm mt-3">
                            <input type="checkbox" className="border-2 border-primary-300 rounded-sm pt-3" />
                            Same as wallet name
                        </label>
                    </div>


                    <InputField label="Enter your E-mail" placeholder="Enter your email" />

                </div>


                <InputField
                    label="Enter your Bio"
                    placeholder="Tell us something about yourself!"
                    isTextArea
                />

                {/* Dropdown for tags */}
                <DropdownMenu>
                    <div className="relative inline-block w-full">
                        <label className="text-white text-xl font-medium ">    Choose 5 communities you might be interested in</label>

                        <DropdownMenuTrigger asChild>
                            <button className="bg-[#1B0D37] border-brand5 mt-2 border p-2 rounded-md w-full flex flex-wrap gap-2 min-h-[40px] items-center">
                                <span className="text-neutral-400">Select a tag</span>
                            </button>
                        </DropdownMenuTrigger>

                        {/* Dropdown Content */}
                        <DropdownMenuContent align="start" className="max-h-60 w-[30rem] overflow-y-auto">
                            {isLoading ? (
                                <DropdownMenuItem>Loading...</DropdownMenuItem>
                            ) : error ? (
                                <DropdownMenuItem>Error loading tags</DropdownMenuItem>
                            ) : (
                                tags.map((tag) => (
                                    <DropdownMenuItem key={tag.id} onClick={() => toggleTag(tag.name)}>
                                        {tag.name} {selectedTag.includes(tag.name) ? "✅" : ""}
                                    </DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </div>
                </DropdownMenu>
                <div className="flex flex-wrap gap-2 ">
                    {selectedTag.map((tag) => (
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
                            className="text-xl  font-bold"
                        >
                           Upload your Profile picture here
                        </Label>
                        <ImageUpload onUploadSuccess={handleFileId} />
                    </div>
                  
                




            <button onClick={handleNext} className="rounded-3xl hover:bg-gradient-to-b hover:from-[#C0A1FF] hover:to-[#391483]   bg-gradient-to-b from-[#C0A1FF] to-[#7D3DFF] text-white text-2xl font-semibold py-3 px-4 w-full">
                Next
            </button>
        </div>



        </div >
    );
};





export default PersonalDetail
const InputField = ({ label, placeholder, isTextArea = false, isTagInput = false }) => {
    return (
        <div className="flex flex-col gap-2.5 w-full" >
            <label className="text-white text-xl font-medium">{label}</label>
            {isTextArea ? (
                <textarea
                    className="bg-[#1B0D37] rounded-md border border-brand5 p-4 w-full h-24 resize-none"
                    placeholder={placeholder}
                />
            ) : isTagInput ? (
                <div className="bg-[#1B0D37] rounded-md border border-brand5 p-3 flex gap-2 items-center h-14">


                </div>
            ) : (
                <input
                    className="bg-[#1B0D37] rounded-md border border-brand5 p-4 w-full"
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};
