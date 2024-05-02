import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useSelector(selectUser);
  if(!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute