import React from "react";

export default function ProfessorCard({ 
  imageUrl,              // Profile picture URL
  professorUsername,     // Email of professor
  professorName,         
  degreeCompleted,       
  institutionName,       
  professorDepartment,   
  experience,            
  professorPhone,        
  professorGender,
  buttonlabel,
  handleBtnFunction           // Function to handle delete action    
}) {
  return (
    <div>
      <div>
        {/* Profile Image */}
        <img src={imageUrl} alt={`${professorName}'s profile`} width="150" height="150" />
        
        {/* Professor Details */}
        <h3>{professorName}</h3>
        <p><strong>Email:</strong> {professorUsername}</p>
        <p><strong>Degree Completed:</strong> {degreeCompleted}</p>
        <p><strong>Institution Name:</strong> {institutionName}</p>
        <p><strong>Department:</strong> {professorDepartment}</p>
        <p><strong>Experience:</strong> {experience}</p>
        <p><strong>Phone:</strong> {professorPhone}</p>
        <p><strong>Gender:</strong> {professorGender}</p>
      </div>
      <button onClick={()=>{handleBtnFunction(professorUsername)}}>{buttonlabel}</button>
    </div>
  );
}
