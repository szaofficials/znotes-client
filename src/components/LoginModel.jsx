import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/Dss.css";
import { useAuth } from "../api/auth";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ResetPassword from "../components/ResetPasswordPopup/ResetPassword";

const LoginModal = ({ onClose }) => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const ShowResetPassword = () => {
    setShowResetPassword(true);
  };

  const handleClosePopup = () => {
    setShowResetPassword(false);
  };




  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();

  const handleLogin = async (e) => { 
    e.preventDefault();
    setLoading(true); 

    try {
    
      // const response = await fetch(`http://localhost:5000/api/login`, {
      const response = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usn, password }),
      });
      

      // Handle response based on success or failure
      console.log("Login Form");

      if (response.ok) {
        const res_data = await response.json();

        // console.log("Response from Server", res_data);
        storeTokenInLS(res_data.token);

        toast.success("Ha Hogaya login");
        setUsn(""); // Reset usn state
        setPassword(""); // Reset password state
   
        navigate("/Welcome");
      } else {
        toast.error("Nice try! But aap galat ho");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false); 
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3 className="lh3">Login</h3>
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
        required="required"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
            />
            <span>USN</span>
          </div>
          <div className="input-group">
            <input
              type="password"
             required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </div>
        </div>
        <span className="forget-password" onClick={ShowResetPassword}>
          Forget Password ?
        </span>
        {/* <button onClick={handleLogin}>Login</button> */}

        <button onClick={handleLogin} disabled={loading}> {/* Disable button while loading */}
          {loading ? <Spinner/> : 'Login'} {/* Show loading text if loading, otherwise Login */}
        </button>



        <div className="or-divider-login">Or</div>
        <p className="l-link-text">
          Don't have an account?{" "}
          <Link to="/SignUp" className="sign-up">
            Sign Up
          </Link>
        </p>
      </div>
      {showResetPassword && (
        <ResetPassword
        onClose={handleClosePopup}
         
        />
      )}
    </div>
  );
};

export default LoginModal;
