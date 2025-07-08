import React, { useState } from 'react'
import ProfessorSidePanel from './ProfessorSidePanel/ProfessorSidePanel';
import ProfessorHome from './ProfessorHome/ProfessorHome';
import AddCourse from './AddCourse/AddCourse';
import MyAllCourses from './MyAllCourses/MyAllCourses';
import EnrolledStudents from './EnrolledStudents/EnrolledStudents';
import Transactions from './Transactions/Transactions';
export default function ProfessorDashboard() {
  const [activeTab,setActiveTab]=useState('Home');
  const renderContent=()=>{
      switch(activeTab){
        case "Home":
          return <ProfessorHome />;
        case "AddCourses":
          return <AddCourse />;
        case "AllCourses":
          return <MyAllCourses/>;
        case "learners":
          return <EnrolledStudents />;
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
