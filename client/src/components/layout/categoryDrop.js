import { Dropdown, Space, message } from 'antd';
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import useCategory from '../../hooks/useCtaegory';

const CategoryDrop = () => {

    
  const [categories, setCategories] = useState([])

  const data = {}
    
  const getCategories= async()=>{
      try {
          console.log('hi')
          data = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
      getCategories();
  },[])


 
  return (
    <div>
         <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                {data?.category?.map((c) => {
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" >
                        {c.name}
                      </a>
                    </li>
                  </ul>;
                })}

               

                
              </li>
          
              
    </div>
  )
}

export default CategoryDrop