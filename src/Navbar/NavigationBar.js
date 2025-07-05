import React from 'react'

import { Link } from 'react-router-dom'
import Logout from '../AuthenticationComponents/Logout'; // Import the Logout component
export default function NavigationBar() {
  return (
   <>
    <nav >
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
    </nav>
    <Logout/>
   </>
  )
}
