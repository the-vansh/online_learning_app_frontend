import React, {useEffect,useState} from 'react'
import api from '../../CenteralApiHandler/Api';
import LearnerCard from '../../SharedComponents/LearnerCard';
import ResultPanel from '../../SharedComponents/ResultPanel';

export default function Learner() {
  const [allEnrolledLearners, setAllEnrolledLearners] = useState([]);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
     const fetchlearners = async()=>{
      try{
        const response = await api.get('/admin/allenrolledstudent');
       
        //  console.log(response.data[0].learner);
        //   console.log(response.data[0].course);
        if (typeof response.data === "string") {
          setError(response.data); 
        }else{
          setAllEnrolledLearners(response.data); 
        }
      }catch(err){
        if (err.response && err.response.status === 500) {
          setError("Internal Server Error. Please try again later.");
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
     }
     fetchlearners();
  }, [refreshKey]);
 
  const handleDeleteBtn = async(username) => {
    try{
        const response = await api.delete(`/admin/deletelearner/${username}`);
        if(response.status === 200){
           setResultMessage("Learner deleted successfully.");
           setIsSuccess(true);
           setShowResultPanel(true); 
        }
    }catch(err){
        if(err.response && err.response.status === 404) {
           setResultMessage("Learner not found.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
         else {
           setResultMessage("An error occurred while deleting the learner.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
    }
  }

  if(error){
    return <div>{error}</div>;
  }
  return (
    <div>
      {allEnrolledLearners.map((enrollment) => (
        <LearnerCard
          key={enrollment.enrollmentId} // Unique key for each learner
          learnerUsername={enrollment.learner.learnerUsername}
          imageUrl={enrollment.learner.learnerImageUrl} // Email of learner
          learnerName={enrollment.learner.learnerName}
          learnerPhone={enrollment.learner.learnerPhoneNumber}
          learnerGender={enrollment.learner.learnerGender}
          learnerCourse={enrollment.course.courseName}
          enrollmentDate={enrollment.enrollmentDate} // Enrollment date
          status={enrollment.status}
          buttonlabel="delete" // Button label
          handleBtnFunction={handleDeleteBtn}// Function to handle delete action
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
  )
}
