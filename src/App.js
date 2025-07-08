import './App.css';
import Signup from './AuthenticationComponents/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavigationBar from './Navbar/NavigationBar';
import Login from './AuthenticationComponents/Login';
import LearnerDashboard from './LearnerComponents/LearnerDashboard';
import ProfessorDashboard from './ProfessorComponents/ProfessorDashboard';
import AdminDashboard from './AdminComponents/AdminDashboard';
import ProtectedRoute from './SharedComponents/ProtectedRoute';
function App() {
  return (
    <>
     <BrowserRouter>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to the Online Learning App</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/grantaccess/learner" element={<ProtectedRoute><LearnerDashboard/></ProtectedRoute>} />
        <Route path="/grantaccess/professor" element={<ProtectedRoute><ProfessorDashboard /></ProtectedRoute>} />
        <Route path="/grantaccess/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
