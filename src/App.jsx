import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/user/userSlice';
import { auth } from './firebase.js'
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      if(curUser) {
        // user is logged in
        dispatch(login({
          email: curUser.email,
          uid: curUser.uid,
          displayName: curUser.displayName,
          photoURL: curUser.photoURL,
        }))
      } else {
        // user is logged out
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
