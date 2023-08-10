import React, { useEffect, useState } from 'react'

import {Outlet} from 'react-router-dom'
import { Spinner } from '../spinner';
import axios from 'axios';
import { useAuth } from '../../context/auth';

export const Admin = () => {

    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck =async ()=>{
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            console.log(res.data)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token])

  return (
    ok?<Outlet/> : <Spinner path=""/>
  )
}
