import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenContext";
import LoadingModal from "../LoadingModal/LoadingModal";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [samePassword, setSamePassword] = useState(false);
    const { setTokenContext } = useToken();
    const [memo, setMemo] = useState("Please register to continue");
    const [memoColor, setMemoColor] = useState("black");
    const [loading, setLoading] = useState(false);

    // Handle registration
    const handleRegister = async () => {
        if (!samePassword) {
            return;
        }
        setLoading(true);

        try {
            // Register the user
            const response = await axios.post(
                "http://localhost:5001/users/register", 
                { username, password }
            );

            // Login the user after registration
            const loginResponse = await axios.post(
                "http://localhost:5001/users/login", 
                { username, password }
            );

            // Set token in the context and local storage
            setTokenContext(loginResponse.data.token);
            localStorage.setItem("token", loginResponse.data.token);
            console.log("Token received:", loginResponse.data.token);

            navigate("/quiz");
        } catch (error) {
            alert("Registration failed. Try again");
        } finally {
            setLoading(false);
        }
    };

    // Confirm password input
    const confirmPassword = (e) => {
        const confirmPasswordValue = e.target.value;
        setCheckPassword(confirmPasswordValue);

        if (confirmPasswordValue !== password) {
            setMemo("Password typed in does not match");
            setMemoColor("red");
            setSamePassword(false);
        } else {
            setMemo("Please register to continue");
            setMemoColor("black");
            setSamePassword(true);
        }
    };

    return (
        <div className="Register">
            {loading && <LoadingModal isVisible={loading} />}
            <div className="register-container">
                <img src="RegisterImg.png" alt="profile" className="register-image" />

                <div className="head-register-container">
                    <h1>Register</h1>
                    <p className="memo" style={{ color: memoColor }}>{memo}</p>
                </div>

                <div className="info-register-container">
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        id="check-password"
                        onChange={(e) => confirmPassword(e)}
                        required
                    />
                    <button className="register-button" onClick={handleRegister}>Create Account</button>
                    <div className="register-signup">
                        <span>Already have an account? </span>
                        <Link to={'/login'}>
                            <button className="register-redirect">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
