import React from 'react'
import {FaHome,FaPlusCircle,FaBook,FaUsers,FaMoneyBillWave} from 'react-icons/fa';
export default function ProfessorSidePanel({setActiveTab}) {
  return (
    <div>
        <div onClick={() => setActiveTab("Home")}>
          <FaHome /> Home
        </div>
        <div onClick={() => setActiveTab("AddCourses")}>
          <FaPlusCircle /> Add Course
        </div>
        <div onClick={() => setActiveTab("AllCourses")}>
          <FaBook /> All Courses
        </div>
        <div onClick={() => setActiveTab("learners")}>
          <FaUsers /> Learners
        </div>
        <div onClick={() => setActiveTab("transactions")}>
          <FaMoneyBillWave /> Transactions
        </div>
    </div>
  )
}
