import React from 'react'
import { useState } from 'react';
import api from "../../CenteralApiHandler/Api";
import uploadToCloudinary from "../../CenteralApiHandler/Cloudapi";
export default function AddChapter({courseId,setActiveTab}) {
   const [formData, setFormData] = useState({
    chapterNumber: "",
    chapterName: "",
    chapterCreatedDate: "",
    chapterFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 👈 Progress state
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files,type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, chapterFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setUploadProgress(0);

    if (!formData.chapterFile) {
      setError("Please select a file for the chapter.");
      return;
    }
    
    try {
      setUploading(true);

      // STEP 1: Upload file to Cloudinary
      const responsefromcloud = await uploadToCloudinary(
         formData.chapterFile,"video",
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      );

      // STEP 2: Send data to backend API
      const payload = {
        chapterId:Math.floor(Math.random() * 1000),
        chapterNumber: formData.chapterNumber,
        chapterName: formData.chapterName,
        chapterCreatedDate: formData.chapterCreatedDate,
        chapterUrl:responsefromcloud.secureUrl,
        chapterPublicId:responsefromcloud.publicId,
        course:{courseId:courseId}
      };

      const response = await api.post(
        "/professor/addchapter",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMsg("Chapter added successfully!");
        setFormData({
          chapterNumber: "",
          chapterName: "",
          chapterCreatedDate: "",
          chapterFile: null,
        });
        setUploadProgress(0);
      } else {
        setError("Failed to add chapter. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while uploading or saving chapter.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2>Add Chapter to Course ID: {courseId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Chapter Number:</label>
          <input
            type="number"
            name="chapterNumber"
            value={formData.chapterNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Chapter Name:</label>
          <input
            type="text"
            name="chapterName"
            value={formData.chapterName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Created Date:</label>
          <input
            type="date"
            name="chapterCreatedDate"
            value={formData.chapterCreatedDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Chapter File:</label>
          <input
            type="file"
            name="chapterFile"
            accept="video/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              background: "#eee",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                background: "#4caf50",
                height: "10px",
                borderRadius: "5px",
              }}
            ></div>
            <p>{uploadProgress}%</p>
          </div>
        )}

        <button type="submit" disabled={uploading} style={{ marginTop: "10px" }}>
          {uploading ? "Uploading..." : "Add Chapter"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("AllCourses")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {successMsg && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>
      )}
    </div>
  );
}
