import React from 'react';
//import axios from "axios";
import "./Login.scss";
import { useState } from 'react';
import axiosRequest from '../../utils/axiosRequest.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async(e)=>{
      e.preventDefault();

      try {
        const result = await axiosRequest.post("auth/login", {
           username,
           password
        })
  
        localStorage.setItem("currentUser", JSON.stringify(result.data));
        navigate("/");
        
      } catch (err) {

  
        setError(err.response.data)
      }

  }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input name="username" type="text" placeholder="johndoe" onChange={(e)=>setUsername(e.target.value)}/>

        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>

        <button type="submit">Login</button>
        {error && error}
      </form>
      
    </div>
  )
}

export default Login;