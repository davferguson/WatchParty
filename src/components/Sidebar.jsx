import React from 'react'
import './Sidebar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js'

function Sidebar() {

    const logoutOfApp = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          alert(error.message);
        });
      }

  return (
    <div className="sidebar">
        <h4>Sidebar</h4>
        <button onClick={logoutOfApp}>Logout</button>
    </div>
  )
}

export default Sidebar