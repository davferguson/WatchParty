import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import SignInPage from './pages/SignInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './features/user/userSlice.js';

function App() {
  const[isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user && !userState && user.displayName != ''){
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }))
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? <div/> : (
    <div className="app">
      <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
