import React from 'react'
import { useState } from 'react';
import styles from './Login.module.css'; // Assuming you have a CSS module for styling
import api from '../CenteralApiHandler/Api'; // Import your API handler
import ResultPanel from '../SharedComponents/ResultPanel'; // Import your ResultPanel component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "learner", // default role
  });
  const [loading, setLoading] = useState(false); // spinner state
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); // Success/error text
  const [isSuccess, setIsSuccess] = useState(false);
  const [role, setRole] = useState(""); // Default role
  const navigate = useNavigate(); // Initialize useNavigat


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show spinner
    try{
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setRole(response.data.role); // Set the role from response
      // Show success message
      setResultMessage("Login successful!");
      setIsSuccess(true);
      setShowResultPanel(true);

    }catch(error){
      console.error("Login failed:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setResultMessage("Invalid username or password.");
        } else {
          setResultMessage("Login failed. Please try again.");
        }
      } else if (error.request) {
        setResultMessage("No response from server. Check your network.");
      } else {
        setResultMessage("Something went wrong. Try again.");
      }
      setIsSuccess(false);
      setShowResultPanel(true);
    }finally{
      setLoading(false); // hide spinner
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Login</h2>

        {/* Email */}
        <div className={styles.inputWrapper}>
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className={styles.inputWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div className={styles.roleGroup}>
          <label>
            <input
              type="radio"
              name="role"
              value="learner"
              checked={formData.role === "learner"}
              onChange={handleChange}
            />
            Learner
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="professor"
              checked={formData.role === "professor"}
              onChange={handleChange}
            />
            Professor
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={styles.loginButton}
          disabled={loading} // disable button while loading
        >
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
       <ResultPanel
          show={showResultPanel}
          message={resultMessage}
          isSuccess={isSuccess}
          onClose={() => {
            setShowResultPanel(false); // Hide panel
            if (isSuccess) {
              navigate(`/dashboard/${role}`); // Go to login on success
            }
          }}
        />
    </div>
  );
}
