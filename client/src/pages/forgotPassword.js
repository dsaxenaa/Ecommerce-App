import "../styles/authStyles.css";

import React, { useState } from "react";

import { Layout } from "../components/layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const naviagte = useNavigate();
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          { email, newPassword , answer}
        );
        if (res.data.statusCode === 200) {
          toast.success(res.data.message);
          naviagte("/login");
        }
        else  {
          toast.error(res.data.message);
        }
      
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };
  
    return (
      <Layout title="Reset Password">
        <div className="form-container">
          <form >
            <h1 className="title"> RESET PASSWORD</h1>
            <div className="mb-3">
              <label for="exampleInputEmail" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail"
                required
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Security Question
              </label>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Your best friend's name"
                required
              />
            </div>
            <div className="mb-3">
              <label  className="form-label">
                New Password
              </label>
              <input
                value={newPassword}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            
    
             <div className="mb-3">
             <button type="button" className="btn btn-primary mt-4" onClick={handleSubmit}>
                Reset
              </button>
             </div>
              
            
          </form>
        </div>
      </Layout>
    )
}
