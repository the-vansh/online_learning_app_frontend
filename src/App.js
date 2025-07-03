import './App.css';
import Signup from './AuthenticationComponents/Signup';
//import { BrowserRouter,Router,Route } from 'react-router-dom';
import NavigationBar from './Navbar/NavigationBar';
function App() {
  return (
    <>
    <NavigationBar />
    <Signup />
    </>
  );
}

export default App;
