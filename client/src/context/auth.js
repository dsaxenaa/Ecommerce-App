import {createContext, useContext, useEffect, useState} from 'react'

import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    });


    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const newData = JSON.parse(data)
            setAuth({
                ...auth,
                user:newData.user,
                token:newData.token
            })
        }
        
    },[1])

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext);
