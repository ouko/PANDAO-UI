import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Paperclip } from "lucide-react";

const CommunityImageUrl = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [signature, setSignature] = useState("");
  const [expire, setExpire] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/image-upload/signature`
        );
        if (response.status === 200) {
          setSignature(response.data.signature);
          setExpire(response.data.expire);
        } else {
          setUploadStatus("Failed to fetch upload signature.");
          setIsSuccess(false);
        }
      } catch (error) {
        setUploadStatus("Failed to fetch upload signature.");
        setIsSuccess(false);
      }
    };

    fetchSignature();
  }, []);

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      setIsSuccess(false);
      return;
    }

    if (!signature || !expire) {
      setUploadStatus("Failed to get upload signature. Please try again.");
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append(
      "UPLOADCARE_PUB_KEY",
      import.meta.env.VITE_UPLOAD_PUBLIC_KEY
    );
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://upload.uploadcare.com/base/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("File uploaded successfully.");
      setIsSuccess(true);
      if (onUploadSuccess) {
        onUploadSuccess(response.data.file);
      }
      console.log("Response:", response.data.file);
    } catch (error) {
      setUploadStatus("File upload failed.");
      setIsSuccess(false);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center border border-[#5228A4] bg-[#1B0D37] h-[63px] cursor-pointer relative overflow-hidden">
        <label
          htmlFor="communityImage"
          className="flex-1 p-4 text-white text-left cursor-pointer z-10 overflow-hidden whitespace-nowrap overflow-ellipsis"
        >
          {loading ? "Uploading..." : selectedFile ? selectedFile.name : "Choose Community Image"}
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="communityImage"
          onChange={handleFileChange}
          required
        />
        <label
          htmlFor="communityImage"
          className="bg-primary-500 px-5 cursor-pointer z-10"
        >
          <Paperclip className="w-6 h-6 text-white" />
        </label>
      </div>
      {uploadStatus && (
        <p
          className={`text-sm ${uploadStatus.includes("success") ? "text-white" : "text-red-500"}`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

CommunityImageUrl.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
};

export default CommunityImageUrl;
