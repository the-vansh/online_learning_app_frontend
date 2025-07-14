import React, { useState } from 'react'
import uploadToCloudinary from "../../CenteralApiHandler/Cloudapi";
import api from "../../CenteralApiHandler/Api";
import ResultPanel from '../../SharedComponents/ResultPanel';
export default function AddCourse({LoggedInUsername,setActiveTab}) {
  const [formData,setFormData]=useState({});
  const [previewImage,setPreviewImage]=useState(null);
  const [loading, setLoading] = useState(false);

  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false);
  const handleChange=(e)=>{
       const { name, value, type, files } = e.target;
       if(type==="file"){
          const file = files[0];
          setFormData({...formData,[name]:file});
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
           }
          }else {
          setFormData({ ...formData, [name]: value });
        }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    var responsefromcloud="";
    try {
      responsefromcloud = await uploadToCloudinary(formData.courseImage, "image");
      console.log("Image uploaded:", responsefromcloud.secureUrl);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      alert("Server Error Please try again later.");
      setLoading(false);
      return;
    }
    formData.courseId = Math.floor(Math.random() * 1000); 
    formData.courseImageUrl = responsefromcloud.secureUrl;
    formData.coursePublicId = responsefromcloud.publicId;
    delete formData.courseImage;
    formData.enrollmentCount=0;
    formData.professor={professorUsername:LoggedInUsername};
    
    try{
      console.log(formData);
       const response = await api.post("/professor/addcourse",formData);
       if(response.status === 200 || response.status === 201){
         setResultMessage("Course Added Successfully");
         setIsSuccess(true);
         setShowResultPanel(true);
       }
    }catch(error){
      setIsSuccess(false);
     
      if (error.response) {
        if (error.response.status === 409) {
          setResultMessage("User already exists with this username!");
        } else {
          setResultMessage(
            error.response.data || "An error occurred during registration."
          );
        }
      } else if (error.request) {
        setResultMessage("No response from server. Please try again later.");
      } else {
        setResultMessage("Something went wrong. Please try again.");
      }

      setShowResultPanel(true);
    }finally{
      setLoading(false);
    }
  }

  if(loading){
    <div>Adding course</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
        <h2>Add New Course</h2>

        <label>Course Name</label>
        <input
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        />

        <label>Course Description</label>
        <textarea
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>

        <label>Course Duration</label>
        <input
          type="text"
          name="courseDuration"
          value={formData.courseDuration}
          onChange={handleChange}
          placeholder="e.g., 6 weeks"
          required
        />

        <label>Course Price</label>
        <input
          type="text"
          name="coursePrice"
          value={formData.coursePrice}
          onChange={handleChange}
          placeholder="e.g., $199"
          required
        />

        <label>Course Image</label>
        <input
          type="file"
          name="courseImage"
          onChange={handleChange}
          accept="image/*"
          required
        />
         {previewImage && (
            <div >
              <img
                src={previewImage}
                alt="Preview"
              />
            </div>
          )}


        <label>Course Created Date</label>
        <input
          type="date"
          name="courseCreatedDate"
          value={formData.courseCreatedDate}
          onChange={handleChange}
          required
        />

        <label>Course Type</label>
        <input
          type="text"
          name="courseType"
          value={formData.courseType}
          onChange={handleChange}
          placeholder="e.g., Online / Offline"
          required
        />

        <label>Course Languages</label>
        <input
          type="text"
          name="courseLanguages"
          value={formData.courseLanguages}
          onChange={handleChange}
          placeholder="e.g., English, Hindi"
          required
        />

        <button type="submit">Submit</button>
    </form>

      <ResultPanel
         show={showResultPanel}
         message={resultMessage}
         isSuccess={isSuccess}
         onClose={() => {
          setShowResultPanel(false);
          setActiveTab("AllCourses") // Hide panel
         }}
      />
    </div>
  )
}
