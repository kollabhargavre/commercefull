import React,{createContext, useContext,useState,useEffect} from 'react'
import {useNavigate,Link, Navigate, BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{

    const navigate =useNavigate();

    let [authTokens, setAuthTokens] = useState([])
    let [user, setUser] = useState([])

    let loginUser = async(e)=>{
        console.log("loggedin")
        e.preventDetails();
        let response = await axios.get('http://127.0.0.1:8000/token/',{
            'email':e.target.email.value,
            'password':e.target.password.value
        })
        let data = await response.data
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            alert("login sucess")
            navigate("/")
            
        }
        
    }
    let logoutUser =()=>{
        setAuthTokens(null)
        setUser(null)
        navigate("/login")
    }







    let contextData = {
        loginUser:loginUser,
        logoutUser:logoutUser,
        authTokens:authTokens,
        user:user

    }
    return (
        
        <AuthContext.Provider value = {contextData}>
            {children}
        </AuthContext.Provider>
    )
}