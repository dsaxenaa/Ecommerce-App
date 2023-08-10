import 'react-toastify/dist/ReactToastify.css';

import { Footer } from './footer'
import { Header } from './header'
import {Helmet} from "react-helmet";
import React from 'react'

export const Layout = ({children, title, description, keywords,author}) => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
        </Helmet>
        <Header/>
        
        <main style={{minHeight:"80vh"}} >
            {children}
        </main>
        <Footer/>
    </div>
  )
};


Layout.defaultProps={
  title:"E-commerce App Shop-now",
  description:"MERN Stack Project",
  keywords:"mern, mongodb, react,node,css,html,bootstrap",
  author:"divv"
}
