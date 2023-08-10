import { Layout } from '../components/layout/layout'
import { Link } from 'react-router-dom'
import React from 'react'

export const PageNotFound = () => {
  return (
    <Layout title={"Page not found"}>
      <div className='pnf'>
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page not found.</h2>
        <Link to="/" className='pnf-btn'>Go Back</Link>
      </div>
    </Layout>
  )
}
