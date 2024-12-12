// Login.jsx: Login Component
import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from '../../context/TokenContext';
import LoadingModal from "../LoadingModal/LoadingModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setTokenContext } = useToken();
  const [loading, setLoading] = useState(false);

  // Handle user login
  const handleLogin = async () => {
    setLoading(true);
    try {
      // Login the user
      const loginResponse = await axios.post(
        "http://localhost:5001/users/login", 
        { username, password }
      );

     
      setTokenContext(loginResponse.data.token);
      localStorage.setItem("token", loginResponse.data.token);
      console.log("Token received:", loginResponse.data.token);


  
      navigate("/quiz");
    } catch (error) {
      alert("Login failed. Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      {loading && <LoadingModal isVisible={loading} />}
      <div className="login-container">
        <img src="RegisterImg.png" alt="profile" className="image" />
        <div className="head-login-container">
          <h1>Login</h1>
          <p>Please login to continue</p>
        </div>

        <div className="info-login-container">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" onClick={handleLogin}>Login</button>
          <div className="login-signup">
            <span>Don't have an account? </span>
            <Link to={'/register'}>
              <button className="login-redirect">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
