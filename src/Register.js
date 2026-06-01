import React, { useState } from "react";
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Auth.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="input-box">
          <FaUser className="icon user" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaEnvelope className="icon email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock className="icon password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="explore-btn">
          <FaUserPlus /> Register
        </button>
      </form>
    </div>
  );
}