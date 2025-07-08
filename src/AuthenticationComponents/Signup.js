import React from 'react'
import { useState } from 'react';
import styles from './Signup.module.css';
import ResultPanel from '../SharedComponents/ResultPanel';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUniversity, FaGraduationCap, FaVenusMars, FaImage, FaBriefcase,FaBuilding } from 'react-icons/fa';
import uploadToCloudinary from '../CenteralApiHandler/Cloudapi';
import api from '../CenteralApiHandler/Api'; 


export default function Signup() {
    const [learnerFormData, setLearnerFormData] = useState({});
    const [professorFormData, setProfessorFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [learnerPreviewImage, setLearnerPreviewImage] = useState(null);
    const [professorpreviewImage, setProfessorPreviewImage] = useState(null);
    const [activeForm, setActiveForm] = useState("learner");
    const [showResultPanel, setShowResultPanel] = useState(false);
    const [resultMessage, setResultMessage] = useState(""); // Success/error text
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Choose which form to update based on activeForm
    if (activeForm === "learner") {
        if(type=== "file") {
            const file = files[0];
            setLearnerFormData({ ...learnerFormData, [name]: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setLearnerPreviewImage(reader.result);
                reader.readAsDataURL(file);
            }
        } else {
          setLearnerFormData({ ...learnerFormData, [name]: value });
        }
    } else if (activeForm === "professor") {
        if (type === "file") {
        const file = files[0];
        setProfessorFormData({ ...professorFormData, [name]: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfessorPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
        } else {
        setProfessorFormData({ ...professorFormData, [name]: value });
        }
    }
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = ""; 
    let formData =
      activeForm === "learner" ? { ...learnerFormData } : { ...professorFormData };

    try {
      imageUrl = await uploadToCloudinary(formData.profileImage, "image");
      console.log("Image uploaded:", imageUrl);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      alert("Server Error Please try again later.");
      setLoading(false);
      return;
    }
    if (activeForm === "learner") {
      formData.learnerImageUrl = imageUrl;
    } else {
      formData.professorImageUrl = imageUrl;
      formData.status="Not Approved";
    }
    delete formData.profileImage;
    
    try {
      const response = await api.post(
        activeForm === "learner"
          ? "/registerlearner"
          : "/registerprofessor",
        formData
      );
      console.log("Registration successful:", response.data);
       setResultMessage(response.data);
       setIsSuccess(true);
       setShowResultPanel(true);
    } catch (error) {
      console.error("Registration failed:", error);

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
      setIsSuccess(false);
      setShowResultPanel(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formToggle}>
        <button
          className={`${activeForm === "learner" ? styles.active : ""}`}
          onClick={() => setActiveForm("learner")}
        >
          Learner Signup
        </button>
        <button
          className={`${activeForm === "professor" ? styles.active : ""}`}
          onClick={() => setActiveForm("professor")}
        >
          Professor Signup
        </button>
      </div>

      <div
        className={`${styles.formSlider} ${
          activeForm === "professor" ? styles.slideLeft : ""
        }`}
      >
        {/* Learner Signup Form */}
        <form
          className={`${styles.signupForm} ${styles.learnerForm}`}
          onSubmit={handleSubmit}
        >
          <h2>Learner Signup</h2>

          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              name="learnerUsername"
              placeholder="Email (Personal Email)"
              value={learnerFormData.learnerUsername || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="learnerName"
              placeholder="Name"
              value={learnerFormData.learnerName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaPhone className={styles.inputIcon} />
            <input
              type="text"
              name="learnerPhoneNumber"
              placeholder="Phone Number"
              value={learnerFormData.learnerPhoneNumber || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <FaVenusMars className={styles.inputIcon} />
            <input
              type="text"
              name="learnerGender"
              placeholder="Gender"
              value={learnerFormData.learnerGender || ""}
              onChange={handleChange}
              required
            />
          </div>

           <label className={styles.fileUploadLabel}>
            <FaImage className={styles.inputIcon} /> Upload Profile Picture:
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className={styles.fileInput}
            />
          </label>

          {learnerPreviewImage && (
            <div className={styles.previewContainer}>
              <img
                src={learnerPreviewImage}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}


          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              name="learnerPassword"
              placeholder="Password"
              value={learnerFormData.learnerPassword || ""}
              onChange={handleChange}
              required
            />
          </div>

          <p className={styles.profileTip}>
             Once your profile is complete, you’ll have access to a personalized learning journey. 
          </p>

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              "Register as Learner"
            )}
          </button>
        </form>

        {/* Professor Signup Form */}
        <form
          className={`${styles.signupForm} ${styles.professorForm}`}
          onSubmit={handleSubmit}
        >
          <h2>Professor Signup</h2>

          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              name="professorUsername"
              placeholder="Email"
              value={professorFormData.professorUsername || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="professorName"
              placeholder="Name"
              value={professorFormData.professorName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaGraduationCap className={styles.inputIcon} />
            <input
              type="text"
              name="degreeCompleted"
              placeholder="Degree Completed"
              value={professorFormData.degreeCompleted || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaBuilding className={styles.inputIcon} /> {/* You can choose another icon if you prefer */}
            <input
              type="text"
              name="professorDepartment"
              placeholder="Department"
              value={professorFormData.professorDepartment || ""}
              onChange={handleChange}
              required
            />
          </div>


          <div className={styles.inputWrapper}>
            <FaUniversity className={styles.inputIcon} />
            <input
              type="text"
              name="institutionName"
              placeholder="Institution Name"
              value={professorFormData.institutionName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaBriefcase className={styles.inputIcon} />
            <input
              type="text"
              name="experience"
              placeholder="Experience (in years)"
              value={professorFormData.experience || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaPhone className={styles.inputIcon} />
            <input
              type="text"
              name="professorPhone"
              placeholder="Phone Number"
              value={professorFormData.professorPhone || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaVenusMars className={styles.inputIcon} />
            <input
              type="text"
              name="professorGender"
              placeholder="Gender"
              value={professorFormData.professorGender || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <label className={styles.fileUploadLabel}>
            <FaImage className={styles.inputIcon} /> Upload Profile Picture:
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className={styles.fileInput}
            />
          </label>

          {professorpreviewImage && (
            <div className={styles.previewContainer}>
              <img
                src={professorpreviewImage}
                alt="Preview"
                className={styles.previewImage}
              />
            </div>
          )}

          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type="password"
              name="professorPassword"
              placeholder="Password"
              value={professorFormData.professorPassword || ""}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              "Register as Professor"
            )}
          </button>
        </form>
      </div>
        <ResultPanel
          show={showResultPanel}
          message={resultMessage}
          isSuccess={isSuccess}
          onClose={() => {
            setShowResultPanel(false); // Hide panel
            if (isSuccess) {
              navigate("/login"); // Go to login on success
            }
          }}
        />
    </div>
  );
}
