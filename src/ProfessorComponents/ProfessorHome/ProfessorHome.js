import React, { useEffect, useState } from 'react'
import api from '../../CenteralApiHandler/Api';

export default function ProfessorHome({ LoggedInUsername }) {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(`/professor/getstats/${LoggedInUsername}`);
       if (typeof response.data === "string") {
          setError(response.data);
          console.log(response.data);
        } else if (response.data && typeof response.data === "object") {
          console.log(response.data);
          setStats(response.data); // ✅ Set the whole object
        }
      } catch (err) {
        if (err.response && err.response.status === 500) {
          setError("Internal Server Error. Please try again later.");
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    };
    fetchStats();
  }, [LoggedInUsername]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
   <div>
      {Object.entries(stats).map(([key, value], index) => (
        <div key={index}>
          <strong>{key}:</strong> {JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
}
