import "../styles/ProductDetailsStyles.css";

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Layout } from '../components/layout/layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCart } from "../context/cart";

const ProductDetails = () => {

    const [cart,setCart] = useCart()
    const {id} = useParams()
    const navigate = useNavigate()
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])

    const getProduct=async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${id}`)
            setProduct(data?.product)
            getRelatedProducts(data?.product?._id, data?.product?.category?._id)  
        } catch (error) {
            console.log(error)
            toast("Something went wrong!")
        }
       
    }
    
    useEffect(()=>{
       if(id)
       {
        getProduct();
       } 
    },[id])
    
    const getRelatedProducts = async(id,cid)=>{
        try {
            console.log(cid)
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-related/${id}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error)
            toast("Something went wrong!")
        }
    }


  return (
    <Layout>
        <div className='row container product-details'>
            <div className='col-md-6'>
            <img
                     src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                     className="card-img-top"
                     alt={product.name}
                     height={500}
                     width={300}
                   />
            </div>
            <div className='col-md-6 product-details-info'>
                <h1 className='text-center'> Product Details </h1>
                {/* <h2>id {product._id}</h2> */}
                <h4>Name: {product.name}</h4>
                <h4>Description: {product.description}</h4>
                <h4>Price: {product.price}</h4>
                <h4>Category: {product?.category?.name}</h4>
                {/* <h3>Shipping: {product.shipping}</h3> */}
                <button className='btn btn-secondary ms-1' onClick={()=>{
                      setCart([...cart, product])
                      localStorage.setItem('cart', JSON.stringify([...cart,product]))
                      toast.success("Item added to cart")
                      }} >Add to Cart</button>
            </div>
        </div>
        <hr/>
        <div className='row container similar-products'>
            <h1>Similar Products</h1>
            {relatedProducts.length<1 && <h5 className='text-center'>No Similar Products</h5>}
            {relatedProducts?.map((p) => (
                 <div className="card m-2" style={{ width: "18rem" }}>
                   <img
                     src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                     className="card-img-top"
                     alt={p.name}
                     height={200}
                   />
                   <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
                 </div>
             ))}
        </div>
    </Layout>
  )
}

export default ProductDetails