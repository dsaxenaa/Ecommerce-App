import "../styles/CategoryProductStyle.css"

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Layout } from '../components/layout/layout'
import axios from 'axios'

const CategoryProduct = () => {
    const params = useParams()
    const naviagte = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const getProducts = async()=>{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/category-product/${params.slug}`)
        setProducts(data?.products)
        setCategory(data?.category)
    }
    
    useEffect(()=>{
        if(params?.slug){
            getProducts()   
     }    
    },[params?.slug])

  return ( 
    <Layout>
        <div className='container mt-3 category'>
            <h4 className='text-center'>Category - {category.name}</h4>
            <h6 className='text-center'>{products?.length} results found! </h6>
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
                     <button className='btn btn-primary ms-1' onClick={()=> naviagte(`/product/${p._id}`)}>More Details</button>
                     <button className='btn btn-secondary ms-1'>Add to Cart</button>
                   </div>
                 </div>
             ))}
           </div>
           {/* <div className="m-2 p-3">
            {products && products.length<total &&(
              <button className="btn btn-warning"
              onClick={(e)=>{
                e.preventDefault()
                setPage(page+1)
              }}
              >
                {loading? "Loading ": "Load More"}
              </button>
            )}
           </div> */}
            
          </div>
        
        
    </Layout>
  )
}

export default CategoryProduct