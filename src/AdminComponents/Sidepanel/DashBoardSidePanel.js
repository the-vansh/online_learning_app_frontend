import React from 'react'
import {FaTachometerAlt,FaBookOpen, FaChalkboardTeacher,FaUserPlus, FaUsers,FaMoneyBillWave} from 'react-icons/fa';
export default function DashBoardSidePanel({setActiveTab}) {
   return (
    <div>
      <div onClick={() => setActiveTab("dashboard")}>
        <FaTachometerAlt /> Dashboard
      </div>
      <div onClick={() => setActiveTab("courses")}>
        <FaBookOpen /> Courses
      </div>
      <div onClick={() => setActiveTab("professors")}>
        <FaChalkboardTeacher /> Professors
      </div>
      <div onClick={() => setActiveTab("newRequests")}>
        <FaUserPlus /> New Requests
      </div>
      <div onClick={() => setActiveTab("learners")}>
        <FaUsers /> Learners
      </div>
      <div onClick={() => setActiveTab("transactions")}>
        <FaMoneyBillWave /> Transactions
      </div>
    </div>
  );
}
