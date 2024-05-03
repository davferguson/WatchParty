import React, { useState } from 'react'
import './Login.css'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js'
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice.js';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dispatch(login({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      }));
      navigate("/")
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  const register = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
        photoURL: profilePic,
      })
      .then(() => {
        // display success message
        setEmail("");
        setPassword("");
        setName("");
        setProfilePic("");
        alert("Register success! Please Sign In");
      })
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="login">
        <h2>Login</h2>
        <form name='login-form'>
            <input name='login-name' value={name} onChange={e => setName(e.target.value)} placeholder='Username' type='text' />

            <input name='login-profile-pic' value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder='Profile pic URL (optional)' type="text" />

            <input name='login-email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />

            <input name='login-password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" />

            <button type='submit' onClick={loginToApp}>Sign In</button>
        </form>

        <p>
            Not a member?{" "}
            <span className="login__register" onClick={register}>Register Now</span>
        </p>
    </div>
  )
}

export default Login