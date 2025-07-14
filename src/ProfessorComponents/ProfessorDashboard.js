import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import ProfessorSidePanel from './ProfessorSidePanel/ProfessorSidePanel';
import ProfessorHome from './ProfessorHome/ProfessorHome';
import AddCourse from './AddCourse/AddCourse';
import MyAllCourses from './MyAllCourses/MyAllCourses';
import EnrolledStudents from './EnrolledStudents/EnrolledStudents';
import Transactions from './Transactions/Transactions';
import AddChapter from './AddChapter/AddChapter';
import AllChapters from './AllChapters/AllChapters';
export default function ProfessorDashboard() {
  const [activeTab,setActiveTab]=useState('Home');
  const [selectedCourseIdToAddChapter, setSelectedCourseIdToAddChapter] = useState(null); 
  const [selectedCourseIdToVeiwChapter,setSelectCourseIdToVeiwChapter]=useState(null);
  const location = useLocation();
  const LoggedInUsername = location.state?.LoggedInUsername;
//console.log(LoggedInUsername);
  const renderContent=()=>{
      switch(activeTab){
        case "Home":
          return <ProfessorHome LoggedInUsername={LoggedInUsername} />;
        case "AddCourses":
          return <AddCourse  LoggedInUsername={LoggedInUsername} setActiveTab={setActiveTab}/>;
        case "AllCourses":
          return <MyAllCourses LoggedInUsername={LoggedInUsername} setActiveTab={setActiveTab} setSelectedCourseIdToAddChapter={setSelectedCourseIdToAddChapter} setSelectCourseIdToVeiwChapter={setSelectCourseIdToVeiwChapter}/>;
        case "learners":
          return <EnrolledStudents LoggedInUsername={LoggedInUsername}  />;
        case "Addchapter":
          return <AddChapter courseId = {selectedCourseIdToAddChapter} setActiveTab={setActiveTab}/>
        case "VeiwAllChapter":
          return <AllChapters courseId={selectedCourseIdToVeiwChapter}/>
        case "transactions":
          return <Transactions/>
        default:
          return <ProfessorHome />;
      }
  }
  return (
    <div>
         <ProfessorSidePanel setActiveTab={setActiveTab} />
         <div>{renderContent()}</div>
    </div>
  )
}
