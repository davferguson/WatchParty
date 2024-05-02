import React from 'react'
import './Sidebar.css'
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/user/userSlice.js';
import { selectGroup } from '../features/firestore/groupSlice.js';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const user = useSelector(selectUser);
  const group = useSelector(selectGroup);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const logoutOfApp = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          dispatch(logout());
          navigate("/", { replace: true });
        }).catch((error) => {
          alert(error.message);
        });
      }

  return (
    <div className="sidebar">
        <h2>Hello, {user.displayName}</h2>
        <button onClick={logoutOfApp}>Logout</button>
        <h4>Users:</h4>
        {group ? Object.keys(group.members).map((keyName) => (
          <h4>{keyName}: {group.members[keyName] ? <span className='online'>(online)</span> : <span className='offline'>(offline)</span>}</h4>
        )) : <h4>no one</h4>}
    </div>
  )
}

export default Sidebar