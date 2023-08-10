import "../styles/homepage.css";

import React, { useEffect, useState } from 'react'

import FilterMenu from './filterMenu.js';
import { Layout } from '../components/layout/layout.js'
import axios from 'axios';
import { toast } from "react-toastify";
import {useAuth} from "../context/auth"
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [cart,setCart] = useCart()
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [products,setProducts] = useState([])
  const [total,setTotal] = useState(0)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const naviagte = useNavigate()

  const getAllProducts = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`)
      setProducts(data.products);
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!checked.length || !radio.length)
    getAllProducts()
  },[checked.length, radio.length])

  const filterProduct =async()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/product-filters`,{
        checked,radio
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
      toast("Something went wrong!")
    }
  }


  useEffect(()=>{
    getTotal()
  },[])
  
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked,radio])


  useEffect(()=>{
    if(page===1) return
    loadMore()
  },[page])

  const loadMore = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  const getTotal= async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
      toast("Something went wrong!")
      
    }
  }


  
  return (
  
    <Layout title={"All Products- Best Offers"} >
      <img
        src="/images/banner1.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"20%"}
      />
      <div className='container-fluid m-3 home-page'>
        <div className='row'>
          <div className='col-md-2' >
            <FilterMenu radio={radio} setRadio={setRadio} checked={checked} setChecked={setChecked}/>
          </div>
          <div className='col-md-9 '>
          <h1 className='text-center'>All Products</h1>
           <div className='d-flex flex-wrap p-5'>
             
             {products?.map((p) => (
                 <div className="card m-2" style={{ width: "18rem" }}>
                   <img
                     src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                     className="card-img-top"
                     alt={p.name}
                     height={200}
                   />
                  <div className="card-body">
                     <h5 className="card-title">{p.name}</h5>
                     <p className="card-text">{p.description.substring(0,30)}</p>
                     <p className="card-text"> $ {p.price}</p>
                     <button className='btn btn-primary ms-1 mt-1' onClick={()=> naviagte(`/product/${p._id}`)}>More Details</button>
                     <button className='btn btn-secondary ms-1 mt-2' onClick={()=>{
                      setCart([...cart, p])
                      localStorage.setItem('cart', JSON.stringify([...cart,p]))
                      toast.success("Item added to cart")
                      }} >Add to Cart</button>
                   </div>
                 </div>
             ))}
           </div>
           <div className="m-2 p-3">
            {products && products.length<total &&(
              <button className="btn btn-warning loadmore"
              onClick={(e)=>{
                e.preventDefault()
                setPage(page+1)
              }}
              >
                {loading? "Loading ": "Load More"}
              </button>
            )}
           </div>
            
          </div>
          
        </div>
        
      </div>
    </Layout>
  )
}
