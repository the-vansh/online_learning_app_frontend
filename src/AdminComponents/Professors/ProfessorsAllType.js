import React, { useEffect, useState } from "react";
import api from "../../CenteralApiHandler/Api"; 
import ProfessorCard from "../../SharedComponents/ProfessorCard"; 
import ResultPanel from "../../SharedComponents/ResultPanel"; 

export default function Professors({ProfessorType,buttonlabel}) {
  const [allActiveProfessors, setAllActiveProfessors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState(null);


  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setAllActiveProfessors([]); 
        const response = await api.get(`/admin/${ProfessorType}`);
        if (typeof response.data === "string") {
          setError(response.data); 
        } else {
          setAllActiveProfessors(response.data); 
        }
      } catch (err) {
        if (err.response && err.response.status === 500) {
          setError("Internal Server Error. Please try again later.");
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    };
    fetchProfessors();
  }, [ProfessorType,refreshKey]);

  const handleDeleteBtn = async(username) => {
       try{
           const response = await api.delete(`/admin/deleteprofessor/${username}`);
           if(response.status === 200){
              setResultMessage("Professor deleted successfully.");
              setIsSuccess(true);
              setShowResultPanel(true); 
           }
       }catch(err){
           if(err.response && err.response.status === 404) {
              setResultMessage("Professor not found.");
              setIsSuccess(false);
              setShowResultPanel(true); 
            }
            else {
              setResultMessage("An error occurred while approving the professor.");
              setIsSuccess(false);
              setShowResultPanel(true); 
            }
       }
  }
  

  const handleApprovedBtn = async(username) => {
    try {
      const response = await api.put(`/admin/verifyprofessor/${username}`); 
      if (response.status === 200) {
        setResultMessage("Professor approved successfully.");
        setIsSuccess(true);
        setShowResultPanel(true); 
      }
    }catch (err) {
      if (err.response && err.response.status === 404) {
        setResultMessage("Professor not found.");
        setIsSuccess(false);
        setShowResultPanel(true); 
      }
     else {
        setResultMessage("An error occurred while approving the professor.");
        setIsSuccess(false);
        setShowResultPanel(true); 
      }
    }
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {allActiveProfessors.map((professor) => (
        <ProfessorCard
          key={professor.professorUsername} // Unique key for each professor
          imageUrl={professor.professorImageUrl} 
          professorUsername={professor.professorUsername} 
          professorName={professor.professorName}
          degreeCompleted={professor.degreeCompleted}
          institutionName={professor.institutionName}
          professorDepartment={professor.professorDepartment}
          experience={professor.experience}
          professorPhone={professor.professorPhone}
          professorGender={professor.professorGender}
          buttonlabel={buttonlabel} 
          handleBtnFunction={buttonlabel === "approve" ? handleApprovedBtn : handleDeleteBtn} // Function to handle delete actio
        />
      ))}

       <ResultPanel
          show={showResultPanel}
          message={resultMessage}
          isSuccess={isSuccess}
          onClose={() => {
            setShowResultPanel(false);
            setRefreshKey(prevKey => prevKey + 1);  // Hide panel
          }}
       />
    </div>
  );
}
