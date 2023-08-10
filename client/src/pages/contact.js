import {BiMailSend, BiPhoneCall, BiSupport} from "react-icons/bi"

import { Layout } from '../components/layout/layout'
import React from 'react'

export const Contact = () => {
  return (
    <Layout title={"Contact us - ECommerce app"}>
      <div className='row contactus'>
        <div className='col-md-5'>
          <img src='/images/contactus.jpeg'
          alt="contact-us"
          style={{width:"100%"}}
          />
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='mt-2 text-justify text-center'> For any query and info about products,
          feel free to call us anytime!</p>
          <p className="mt-3"><BiMailSend/> : www.help@ecommerceapp.com</p>
          <p className="mt-3"><BiPhoneCall/> : 012 345 6789 </p>
          <p className="mt-3"><BiSupport/> : 1800-0000-0000</p>

        </div>
        
      </div>
    </Layout>
  )
}
