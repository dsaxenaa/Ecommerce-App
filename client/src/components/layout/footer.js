import { Link } from 'react-router-dom'
import React from 'react'

export const Footer = () => {
  return (
    <div className='footer'> 
        <h4 className='text-center'>All Right Reserved &copy; Divv</h4>
        <p className='text-center'>
          <Link to="/about" >About</Link> |
          <Link to="/contact-us" > Contact us</Link> | 
          <Link to="/policy" > Privay Policy</Link>
        </p>
    </div>
  )
}
