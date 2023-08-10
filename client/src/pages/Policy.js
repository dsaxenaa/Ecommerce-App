import { Layout } from '../components/layout/layout'
import React from 'react'

export const Policy = () => {
  return (
    <Layout title={"Privacy Policy - ECommerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className='bg-dark p-2 text-white text-center'>add privacy policy</p>
          <p className='bg-dark p-2 text-white text-center'>add privacy policy</p>
          <p className='bg-dark p-2 text-white text-center'>add privacy policy</p>
          <p className='bg-dark p-2 text-white text-center'>add privacy policy</p>
          <p className='bg-dark p-2 text-white text-center'>add privacy policy</p>
        </div>
      </div>
    </Layout>
  )
}
