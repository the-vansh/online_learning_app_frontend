import React from 'react'

export default function ChapterCard({
  chapterId,
  chapterNumber,
  chapterName,
  chapterUrl,
  chapterCreatedDate,
  showdeletebtn=false,
  handleDeletebtn,
}) {
  return (
   <div> 
      <h3>
        Chapter {chapterNumber}: {chapterName}
      </h3>
      <p>
        Chapter id: {chapterId}
      </p>
      <p>Created Date: {new Date(chapterCreatedDate).toLocaleDateString()}</p>
     <video
        controls
        src={chapterUrl}
        width="320"
        height="180" // 👈 Small rectangle box
      ></video>
      {showdeletebtn &&
        <button onClick={()=>{handleDeletebtn(chapterId)}}>Delete</button>}
    </div>
  )
}
