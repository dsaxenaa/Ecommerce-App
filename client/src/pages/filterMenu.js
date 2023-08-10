import "../styles/homepage.css";

import { Checkbox, Radio } from 'antd';
import React, { useEffect, useState } from 'react'

import { Prices } from './prices';
import axios from 'axios';

const FilterMenu = ({radio, setRadio, checked, setChecked}) => {    
    const [categories,setCategories] = useState([])
  

    const handleFilter = (value, id) => {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    };

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategories(data.category);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);


  return (
    <div>
          <h4 className='text-center'>Filter by Category </h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group  onChange={(e)=> setRadio(e.target.value)} >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>

          
        </div>
  
  )
}

export default FilterMenu