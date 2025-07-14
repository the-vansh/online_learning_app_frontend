import axios from "axios";
const cloudinaryApi = axios.create({
  baseURL: process.env.REACT_APP_CLOUD_URL, // Cloudinary base URL
});

const uploadToCloudinary = async (file,typeofcontent,onUploadProgress) => {
  try {
    const formData = new FormData();
    console.log("inside upload function");
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET); // Ensure you ha
    const response = await cloudinaryApi.post(`/${typeofcontent}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...(onUploadProgress && { onUploadProgress }), 
    });
    console.log("Cloudinary URL:", response.data.secure_url);
    console.log("PublicId: ", response.data.public_id);
    return {
      secureUrl: response.data.secure_url,
      publicId: response.data.public_id
    };

  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

export default uploadToCloudinary;