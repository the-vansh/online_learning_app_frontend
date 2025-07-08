import React from 'react'
import { useState } from 'react';
import DashboardInfo from './DashboardInfo/DashboardInfo';
import Courses from './Courses/Courses';
import ProfessorsAllType from './Professors/ProfessorsAllType';
import Learners from './Learner/Learner';
import Transactions from './Transactions/Transactions';
import DashBoardSidePanel from './Sidepanel/DashBoardSidePanel';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
   const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardInfo />;
      case "courses":
        return <Courses />;
      case "professors":
        return <ProfessorsAllType key={activeTab}  ProfessorType="getactiveprofessors" buttonlabel="delete"/>;
      case "newRequests":
        return <ProfessorsAllType key={activeTab}  ProfessorType="getinactiveprofessors" buttonlabel="approve"/>;
      case "learners":
        return <Learners />;
      case "transactions":
        return <Transactions />;
      default:
        return <DashboardInfo />;
    }
  };

  return (
    <div>
      <DashBoardSidePanel setActiveTab={setActiveTab} />
      <div>{renderContent()}</div>
    </div>
  );
}
