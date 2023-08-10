import React, { useEffect, useState } from "react";

import AdminMenu from "../../components/layout/adminMenu";
import CategoryForm from "../../components/forms/categoryForm";
import { Layout } from "../../components/layout/layout";
import {Modal} from 'antd'
import axios from "axios";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected,setSelected] = useState(null)
  const [updated,setUpdated] = useState("")
  const [name,setName] = useState("");
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      console.log('hi')
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{
        name
      });
      console.log(data)
      if(data?.success){
        toast.success(`${name} is created!`)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) { 
      console.log(error)
      toast.error("Something went wrong!"); 
    }
  }
  
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      // console.log(data)
      if (data?.success) {
        setCategories(data?.category);
        // console.log(categories)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  const handleUpdate=async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
       {name:updated}
       );
       if(data.success){
        toast.success(`${updated} is updated!`)
        setSelected(null)
        setUpdated("")
        setVisible(false);
        getAllCategory()
       }else{
        toast.error(data.message)
       }
      
    } catch (error) {
      toast.error("Something went wrong")
      
    }
    
  }


  const handleDelete=async (id)=>{
    try {
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(data.message)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error("Something went wrong!")
      
    }
  }


  useEffect(() => {
    getAllCategory();
  },[]);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm  handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c)=>(
                  <>
                  <tr>
                      <td key={c.id}>{c.name}</td>
                      <td><button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdated(c.name); setSelected(c)  }}>Edit</button>
                      <button className="btn btn-primary ms-2" onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
                  </tr>
                  </>
                ))}
              </tbody>
            </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
              <CategoryForm value={updated} setValue={setUpdated} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
