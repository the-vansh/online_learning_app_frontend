import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';import ResultPanel from '../SharedComponents/ResultPanel'; // Import your ResultPanel component
export default function Logout() {
   
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const [showResultPanel, setShowResultPanel] =useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [isSuccess, setIsSuccess] =useState(false); //
    const handleLogout = () => { 
        setResultMessage("Logout successful!!");
        setIsSuccess(true); // Set success state
        setShowResultPanel(true); // Show result panel
    };
    if (!isLoggedIn) {
        return null; 
    }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <ResultPanel 
        show={showResultPanel} 
        message={resultMessage} 
        isSuccess={isSuccess} 
        onClose={() => {
          setShowResultPanel(false);
          localStorage.removeItem("token"); 
          localStorage.removeItem("role");
          navigate("/login"); // Redirect to login after logout
        }}/> 
    </div>
  )
}
