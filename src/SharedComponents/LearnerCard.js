
export default function LearnerCard({
    learnerUsername, 
    imageUrl, 
    learnerName,
    learnerPhone,
    learnerGender,
    learnerCourse,
    enrollmentDate,
    status,
    buttonAvailable=false,
    buttonlabel, 
    handleBtnFunction
}) {
    return (
    <div>
      <div>
        <img src={imageUrl} alt={`${learnerUsername}'s profile`} width="150" height="150" />
        <h3>{learnerName}</h3>
        <p><strong>Email:</strong> {learnerUsername}</p>
        <p><strong>Phone:</strong> {learnerPhone}</p>
        <p><strong>Gender:</strong> {learnerGender}</p>
        <p><strong>Enrolled In:</strong>{learnerCourse}</p>
        <p><strong>Enrollment Date:</strong>{new Date(enrollmentDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong>{status}</p>
      </div>
      {buttonAvailable &&
      <button onClick={() => handleBtnFunction(learnerUsername)}>{buttonlabel}</button>
      }
    </div>
  );
}

