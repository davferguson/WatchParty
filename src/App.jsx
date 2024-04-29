import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/user/userSlice';
import { auth } from './firebase.js'
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from './firebase.js'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const updateOnlineStatus = async (isOnline, username) => {
    const field = "members." + username;
    const groupDbRef = doc(db, "groups", "dareds-group");
    await updateDoc(groupDbRef, {
      [field]: isOnline
    });
  };

  window.onbeforeunload = () => {
    if(user){
      updateOnlineStatus(false, user.displayName);
    }
    return;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      if(curUser) {
        // user is logged in
        updateOnlineStatus(true, curUser.displayName);
        dispatch(login({
          email: curUser.email,
          uid: curUser.uid,
          displayName: curUser.displayName,
          photoURL: curUser.photoURL,
        }));
      } else {
        // user is logged out
        // if(user){
        //   updateOnlineStatus(false, user.displayName);
        // }
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {/* if no user, render login page */}
      {!user ? <Login /> : (
        <div className="app__body">
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
