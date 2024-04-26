import React, { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const loginToApp = (e) => {
    e.preventDefault();
  };

  const register = (e) => {

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