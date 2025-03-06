import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const ImageUpload = ({ onUploadSuccess }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [signature, setSignature] = useState("");
  const [expire, setExpire] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
        }
      } catch (error) {
        setUploadStatus("Failed to fetch upload signature.");
      }
    };

    fetchSignature();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadStatus("");

    if (!signature || !expire) {
      setUploadStatus("Failed to get upload signature. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", import.meta.env.VITE_UPLOAD_PUBLIC_KEY);
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
      if (onUploadSuccess) {
        onUploadSuccess(response.data.file);
      }
    } catch (error) {
      setUploadStatus("File upload failed.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">

      <label className="cursor-pointer bg-brand1 text-white px-1 rounded-md py-2.5  border border-brand5 hover:bg-brand2 w-full">
        <span className="bg-brand5 p-2 rounded-md"> 
        Choose File
        </span>
    
        <input
          type="file"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />
      </label>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-2 aspect-square h-32 w-32 rounded-full object-cover"
        />
      )}
      <p>{loading ? "Uploading..." : uploadStatus}</p>
    </div>
  );
};

ImageUpload.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
};

export default ImageUpload;
