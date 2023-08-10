import React, { useEffect, useState } from "react";

import { Layout } from "../../components/layout/layout";
import UserMenu from "../../components/layout/userMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Profile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");


  const [auth,setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, address, phone }
      );
      const data = res.data
      // console.log(res.data.updatedUser)
    if(data.success){
      setAuth({...auth, user:data?.updatedUser})
      let ls = localStorage.getItem("auth")
      ls= JSON.parse(ls)
      ls.user = data.updatedUser;
      localStorage.setItem('auth',JSON.stringify(ls))
      toast.success("User Updated Successfully")
    }else{
      toast.error(res?.error)
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };


  useEffect(()=>{
    const {email, name, phone, address} = auth?.user
    setAddress(address)
    setName(name)
    setPhone(phone)
    setEmail(email)
  },[auth?.user])

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
              <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title"> USER PROFILE</h1>
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
              disabled
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
              placeholder="New Password"
            />
          </div>    
            <button type="submit" className="btn btn-primary mt-4">
              UPDATE
            </button>
          
        </form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
