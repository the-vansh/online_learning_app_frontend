import React from 'react'
import { useState } from 'react';
import styles from './Signup.module.css';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUniversity, FaGraduationCap, FaVenusMars, FaImage } from 'react-icons/fa';

export default function Signup() {
    const [learnerFormData, setLearnerFormData] = useState({});
    const [professorFormData, setProfessorFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [activeForm, setActiveForm] = useState("learner");

    const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Choose which form to update based on activeForm
    if (activeForm === "learner") {
        setLearnerFormData({ ...learnerFormData, [name]: value });
    } else if (activeForm === "professor") {
        if (type === "file") {
        const file = files[0];
        setProfessorFormData({ ...professorFormData, [name]: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
        } else {
        setProfessorFormData({ ...professorFormData, [name]: value });
        }
    }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = activeForm === "learner" ? learnerFormData : professorFormData;
    setLoading(true);

    setTimeout(() => {
      console.log("Form Data:", formData);
      setLoading(false);
    }, 2000);
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
              placeholder="Email"
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

          {previewImage && (
            <div className={styles.previewContainer}>
              <img
                src={previewImage}
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
    </div>
  );
}
