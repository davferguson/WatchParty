import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/user/userSlice';
import { auth } from './firebase.js'
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      alert(error.message);
    });
  }

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
          <h1>Welcome, {user.displayName}</h1>
          <button onClick={logoutOfApp}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
