import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';import ResultPanel from '../SharedComponents/ResultPanel'; 
import styles from './Logout.module.css';
export default function Logout() {
   
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showResultPanel, setShowResultPanel] =useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [isSuccess, setIsSuccess] =useState(false); //

    const handleLogout = () => { 
       setShowConfirmDialog(true);
    };
    const confirmLogout = () => {
    // User confirmed logout
      setShowConfirmDialog(false); // Hide confirmation
      setResultMessage("Logout successful!");
      setIsSuccess(true);
      setShowResultPanel(true); // Show success message
    };

    const cancelLogout = () => {
      // User canceled logout
      setShowConfirmDialog(false);
    };
    if (!isLoggedIn) {
        return null; 
    }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {/* {showConfirmDialog && (
        <div className="confirmDialog">
          <div className="confirmBox">
            <p>Are you sure you want to logout?</p>
            <div className="confirmActions">
              <button onClick={confirmLogout} className="yesBtn">Yes</button>
              <button onClick={cancelLogout} className="cancelBtn">Cancel</button>
            </div>
          </div>
        </div>
      )} */}

       {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className={styles.confirmDialog}>
          <div className={styles.confirmBox}>
            <p className={styles.confirmText}>Are you sure you want to logout?</p>
            <div className={styles.confirmActions}>
              <button
                onClick={confirmLogout}
                className={styles.yesBtn}
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
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
