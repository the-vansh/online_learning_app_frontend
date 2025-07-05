import axios from "axios";

const cloudinaryApi = axios.create({
  baseURL: process.env.REACT_APP_CLOUD_URL, // Cloudinary base URL
});

const uploadToCloudinary = async (file,typeofcontent) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET); // Ensure you have this environment variable set
    const response = await cloudinaryApi.post(`/${typeofcontent}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Cloudinary URL:", response.data.secure_url);
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

export default uploadToCloudinary;