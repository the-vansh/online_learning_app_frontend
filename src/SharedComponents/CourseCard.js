import React from 'react'

export default function CourseCard({courseId,
    imageUrl,
    courseName,
    courseDescription,
    courseDuration,
    coursePrice,
    courseCreatedDate,
    courseType,
    courseLanguages,
    enrollmentCount,
    professornName,
    professorInstitute,
    experience,
    buttonlabel,
    handleBtnFunction,
    showAddChapterBtn = false, 
    handleAddChapterBtn,
    showVeiwAllChapterBtn=false,
    handleViewAllChapterBtn
}) {
  return (
    <div>
      <div>
        <img src={imageUrl} alt={`${courseId}'s profile`} width="150" height="150" />
        <h3>{courseName}</h3>
        <p><strong>Course Description:</strong> {courseDescription}</p>
        <p><strong>Course Duration:</strong> {courseDuration}</p>
        <p><strong>Course Price:</strong> {coursePrice}</p>
        <p><strong>Course Created Date:</strong>{new Date(courseCreatedDate).toLocaleDateString()}</p>
        <p><strong>Course Type:</strong>{courseType}</p>
        <p><strong>Course Languages:</strong>{courseLanguages}</p>
        <p><strong>Enrollment Count:</strong>{enrollmentCount}</p>
        <p><strong>By:</strong>{professornName}<strong>From</strong>{professorInstitute}<strong>And Experience</strong>{experience}</p>
      </div>
      <button onClick={() => handleBtnFunction(courseId)}>{buttonlabel}</button>

      {showAddChapterBtn && (
        <button onClick={() => handleAddChapterBtn(courseId)}>Add Chapter</button>
      )}

      {showVeiwAllChapterBtn && (
        <button onClick={()=>handleViewAllChapterBtn(courseId)}>VeiwAllChapter</button>
      )}
    </div>
  )
}
