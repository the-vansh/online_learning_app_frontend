import React, { useEffect, useState } from 'react'
import api from '../../CenteralApiHandler/Api';
import LearnerCard from "../../SharedComponents/LearnerCard";
export default function EnrolledStudents({LoggedInUsername}) {
  
  const [allEnrolledLearners, setAllEnrolledLearners] = useState([]);
  const [error, setError] = useState(null);
  useEffect(()=>{
     const fetchAllEnrolledStudent=async()=>{
        try{
            const response = await api.get(`/professor/getenrollmentinfo/${LoggedInUsername}`);
            if(typeof response.data==="string"){
              setError(response.data);
            }else if(Array.isArray(response.data)){
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
     fetchAllEnrolledStudent();
  },[LoggedInUsername]);

  if(error){
    return <div>{error}</div>;
  }
  return (
    <div>
      {Array.isArray(allEnrolledLearners) && allEnrolledLearners.length>0 ? (
        allEnrolledLearners.map((enrollment) => (
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
             />
           ))):
           ( <div>No Learner available.</div>)
           }
          
    </div>
  )
}
