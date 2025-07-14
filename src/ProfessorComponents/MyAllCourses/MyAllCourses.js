import React, { useEffect, useState } from 'react'
import api from "../../CenteralApiHandler/Api";
import CourseCard from '../../SharedComponents/CourseCard';
import ResultPanel from '../../SharedComponents/ResultPanel';
export default function MyAllCourses({LoggedInUsername,setActiveTab,setSelectedCourseIdToAddChapter,setSelectCourseIdToVeiwChapter}) {
  const [mycourses,setMycourses] = useState([]);
  const [error,setError]=useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [resultMessage, setResultMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(()=>{
      const fetchMyCourses=async()=>{
       //console.log(LoggedInUserName);
        try{
          const response = await api.get(`/professor/getallcoursebyprofessor/${LoggedInUsername}`);
          if(response.data==="string"){
             setError(response.data);
          }else if(Array.isArray(response.data)){
             setMycourses(response.data);
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
    fetchMyCourses();
  },[LoggedInUsername,refreshKey]);

  const handleDeleteBtn = async(courseId)=>{
      try{ 
        console.log(courseId);
        const response = await api.delete(`/professor/deletecourse/${courseId}`);
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

  const handleAddChapterBtn = (courseId) => {
    setSelectedCourseIdToAddChapter(courseId);
    setActiveTab("Addchapter");
  };

  const handleViewAllChapterBtn=(courseId)=>{
    setSelectCourseIdToVeiwChapter(courseId);
    setActiveTab("VeiwAllChapter");
  }


  if(error){
    return <div>error</div>
  }
  return (
    <div>
       {Array.isArray(mycourses) && mycourses.length > 0 ? (
         mycourses.map((course) => (
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
             showAddChapterBtn={true} // 👈 Pass this prop
             handleAddChapterBtn={handleAddChapterBtn} // 👈
             showVeiwAllChapterBtn={true}
             handleViewAllChapterBtn={handleViewAllChapterBtn}
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
