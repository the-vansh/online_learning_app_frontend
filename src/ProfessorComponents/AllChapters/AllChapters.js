import React, { useEffect, useState } from 'react'
import api from "../../CenteralApiHandler/Api";
import ChapterCard from '../../SharedComponents/ChapterCard';
import ResultPanel from '../../SharedComponents/ResultPanel';

export default function AllChapters({courseId}) {
  const [allchapters,setAllChapters] = useState([]);
  const [error,setError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);
    
    const [showResultPanel, setShowResultPanel] = useState(false);
    const [resultMessage, setResultMessage] = useState(""); 
    const [isSuccess, setIsSuccess] = useState(false);

  useEffect(()=>{
     const fetchAllChapters = async()=>{
        try{
          const response = await api.get(`/professor/getallcoursechapter/${courseId}`);
          if(response.data==="string"){
             setError(response.data);
          }else if(Array.isArray(response.data)){
             setAllChapters(response.data);
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
    fetchAllChapters();
  },[courseId,refreshKey]);

  const handleDeleteBtn=async(chapterId)=>{
      try{
         const response =await api.delete(`/professor/deletechapter/${chapterId}`);
         if(response.status===200){
           setResultMessage("Chapter deleted successfully.");
           setIsSuccess(true);
           setShowResultPanel(true); 
         }
      }catch(err){
         if(err.response && err.response.status === 404) {
           setResultMessage("Chapter not found.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
         else {
           setResultMessage("An error occurred while deleting the Chapter.");
           setIsSuccess(false);
           setShowResultPanel(true); 
         }
      }
  }

  if(error){
    return <div>error</div>
  }

  
  return (
    <div>
    {Array.isArray(allchapters) && allchapters.length > 0 ? (
            allchapters.map((chapter) => (
             <ChapterCard
                key={chapter.chapterId}
                chapterId={chapter.chapterId}
                chapterNumber={chapter.chapterNumber}
                chapterName={chapter.chapterName}
                chapterUrl={chapter.chapterUrl}
                chapterCreatedDate={chapter.chapterCreatedDate}
                showdeletebtn={"true"}
                handleDeletebtn={handleDeleteBtn}
             />
            ))
          ) : (
            <div>No Chapters available.</div>
          )}

        <ResultPanel
          show={showResultPanel}
          message={resultMessage}
          isSuccess={isSuccess}
          onClose={() => {
            setShowResultPanel(false);
            setRefreshKey(prevKey => prevKey + 1);  // Hide panel
          }}
       />
    </div>
  )
}
