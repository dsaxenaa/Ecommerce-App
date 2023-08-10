import "../styles/authStyles.css";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Layout } from "../components/layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.js";

export const Login = () => {
  const naviagte = useNavigate();
  const location = useLocation();
  const [auth,setAuth] = useAuth()

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      console.log(res.data);
      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        setAuth({
          ...auth,user:res.data.data.user,
          token:res.data.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data.data))
        naviagte(location.state || "/");
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
    <Layout title="Login">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title"> Login</h1>
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
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          {/* <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <div className="mb-3">
          <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
          </div>
  
           <div className="mb-3">
           <button type="button" className="btn btn-primary mt-4" onClick={()=>naviagte('/forgot-password')}>
              Forget Password
            </button>
           </div>
            
          
        </form>
      </div>
    </Layout>
  );
};
