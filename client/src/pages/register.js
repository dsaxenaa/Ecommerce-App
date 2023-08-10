import "../styles/authStyles.css";

import React, { useState } from "react";

import { Layout } from "../components/layout/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const naviagte = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,address,phone)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, address, phone, answer }
      );
      console.log(res.data);
      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        naviagte("/login");
      }
      if (res.data.statusCode === 201) {
        toast.error(res.data.message);
      }
      if (res.data.statusCode === 409) {
        toast.error(res.data.message);
      }
      if (res.data.statusCode === 500) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="Register now">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title"> Register Page</h1>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>
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
            <label for="exampleInputPhone" className="form-label">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputAddress" className="form-label">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputAddress"
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
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Security Question
            </label>
            <input
              value={answer}
              onChange={(e) =>setAnswer(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Your best friend's name"
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
          <div id="emailHelp" className="form-text">
            We'll never share your personal details with anyone else.
          </div>
         
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          
        </form>
      </div>
    </Layout>
  );
};
