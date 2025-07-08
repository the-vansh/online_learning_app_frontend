import React, { useEffect, useState } from 'react'
import api from '../../CenteralApiHandler/Api'
import ResultPanel from '../../SharedComponents/ResultPanel';
import CourseCard from '../../SharedComponents/CourseCard';

export default function Courses() {
  const [allcourses,setAllCourses] = useState([]);
  const [error,setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(()=>{
      const fetchAllCourses = async()=>{
          try{
            const response = await api.get("/admin/getallcourses");
            //console.log(response.data);
            if (typeof response.data === "string") {
               setError(response.data);
            } else if (Array.isArray(response.data)) {
                setAllCourses(response.data);
            } else {
                setAllCourses([]);
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
      fetchAllCourses();
  },[refreshKey])

  const handleDeleteBtn = async(courseId)=>{
      try{ 
        const response = await api.delete(`/admin/deletecourse/${courseId}`);
        if(response.status===200){
           setResultMessage("Course deleted successfully.");
           setIsSuccess(true);
           setShowResultPanel(true); 
        }
      }catch(err){
          if(err.response && err.response.status === 404) {
           setResultMessage("Course not found.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
         else {
           setResultMessage("An error occurred while deleting the Course.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
      }
  }
  if(error){
    return <div>{error}</div>;
  }
   return(
     <div>
       {Array.isArray(allcourses) && allcourses.length > 0 ? (
         allcourses.map((course) => (
           <CourseCard
             key={course.courseId}
             courseId={course.courseId}
             imageUrl={course.courseImageUrl}
             courseName={course.courseName}
             courseDescription={course.courseDescription}
             courseDuration={course.courseDuration}
             coursePrice={course.coursePrice}
             courseCreatedDate={course.courseCreatedDate}
             courseType={course.courseType}
             courseLanguages={course.courseLanguages}
             enrollmentCount={course.enrollmentCount}
             professornName={course.professor.professorName}
             professorInstitute={course.professor.institutionName}
             experience={course.professor.experience}
             buttonlabel={"Delete"}
             handleBtnFunction={handleDeleteBtn}
           />
         ))
       ) : (
         <div>No courses available.</div>
       )}
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
