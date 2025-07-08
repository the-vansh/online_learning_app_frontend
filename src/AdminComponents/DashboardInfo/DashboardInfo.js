import React, { useEffect, useState } from 'react'
import api from '../../CenteralApiHandler/Api'

export default function DashboardInfo() {
  const [dashboarddata,setdashboarddata]=useState({});
  const [error,setError]=useState("");

  useEffect(()=>{
      const fetchdetails=async()=>{
          try{
            const response = await api.get("/admin/getdashboarddetails");
            if(response.data==="string"){
              setError(response.data);
            }else{
              setdashboarddata(response.data);
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
      fetchdetails();
  },[])

  if(error){
    return <div>error</div>
  }
  if (!dashboarddata || Object.keys(dashboarddata).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Professor Count: {dashboarddata.professorCount}</div>
      <div>Learner Count: {dashboarddata.learnerCount}</div>
      <div>Enrollment Count: {dashboarddata.enrollmentCount}</div>
      <div>Course Count: {dashboarddata.courseCount}</div>
      <div>Last Month: {dashboarddata.enrollmentsLastMonth}</div>
      <div>Last Week: {dashboarddata.enrollmentsLastWeek}</div>
      <div>Today: {dashboarddata.enrollmentsToday}</div>
      <div>
        {Array.isArray(dashboarddata.topCourses) && dashboarddata.topCourses.length > 0 ? (
          dashboarddata.topCourses.map((course, index) => (
            <div key={index}>
              <div>{course.courseName}</div>
              <p>{course.enrollmentCount}</p>
            </div>
          ))
        ) : (
          <div>No top courses available.</div>
        )}
      </div>
    </div>
  );
}
