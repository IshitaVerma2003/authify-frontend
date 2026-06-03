import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import bgVideo from "./assets/bg.mp4";
import "./Auth.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://authify-backend-0ilf.onrender.com";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const phone = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (!username || !phone || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered Successfully ✅");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/dashboard");
      } else {
        setMessage(data.message || "Registration Failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error ❌");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signed In Successfully ✅");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login Failed ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error ❌");
    }
  };

  return (
    <div className="auth-page">
      <video autoPlay muted loop className="bg-video">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay">
        <div className="auth-card">
          <div className="toggle-buttons">
            <button
              onClick={() => {
                setIsRegister(false);
                setMessage("");
              }}
              className="explore-btn"
            >
              <FaSignInAlt /> Sign In
            </button>

            <button
              onClick={() => {
                setIsRegister(true);
                setMessage("");
              }}
              className="explore-btn"
            >
              <FaUserPlus /> Register
            </button>
          </div>

          {message && <p className="msg">{message}</p>}

          {!isRegister ? (
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>

              <div className="input-box">
                <FaEnvelope className="icon email" />
                <input type="email" placeholder="Email" />
              </div>

              <div className="input-box">
                <FaLock className="icon password" />
                <input type="password" placeholder="Password" />
              </div>

              <button type="submit" className="explore-btn">
                <FaSignInAlt /> Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2>Register</h2>

              <div className="input-box">
                <FaUser className="icon user" />
                <input type="text" placeholder="Username" />
              </div>

              <div className="input-box">
                <FaPhone className="icon phone" />
                <input type="text" placeholder="Phone" />
              </div>

              <div className="input-box">
                <FaEnvelope className="icon email" />
                <input type="email" placeholder="Email" />
              </div>

              <div className="input-box">
                <FaLock className="icon password" />
                <input type="password" placeholder="Password" />
              </div>

              <button type="submit" className="explore-btn">
                <FaUserPlus /> Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}