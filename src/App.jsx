import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import SignInPage from './pages/SignInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route 
          path='/home' 
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
