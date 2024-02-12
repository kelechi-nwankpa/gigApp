import React, { useEffect } from 'react';
import "./Register.scss";
import { useState } from 'react';
import upload from '../../utils/upload';
import axiosRequest from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email:"",
    password:"",
    country:"",
    phone:"",
    desc:"",
    isSeller: false
  })


  const handleSubmit = async(e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
       await axiosRequest.post("/auth/register",{
        ...user,
        img: url
       })
       navigate("/")
      
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    
    setUser((prev)=>{ return {
      ...prev,
      [e.target.name]: e.target.value
    }});
  }


  const handleSeller = (e) => {

    setUser((prev)=> ({
      ...prev,
      isSeller: e.target.checked
    }));
  }

  return (

    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
            value={user.username}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            value={user.email}
          />
          <label htmlFor="">Password</label>
          <input value={user.password} name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
            value={user.country}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="pn">
            <label htmlFor="">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="+1 234 567 89"
              onChange={handleChange}
              value={user.phone}
            />
          </div>
          {/* <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          /> */}
          <div className="desc">
            <label htmlFor="">Description</label>
            <textarea
              placeholder="A short description of yourself"
              name="desc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
              value={user.desc}
            ></textarea>
          </div>
          {/* <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea> */}
        </div>
      </form>
    </div>


  )
}

export default Register;