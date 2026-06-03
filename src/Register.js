import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./Auth.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://authify-backend-0ilf.onrender.com";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.email || !data.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Registered Successfully ✅");

        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(result.message || "Registration Failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error ❌");
    }
  };

  return (
    <div className="container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {message && <p className="msg">{message}</p>}

        <div className="input-box">
          <FaUser className="icon user" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaEnvelope className="icon email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock className="icon password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
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