import React,{createContext, useContext,useState,useEffect} from 'react'
import {useNavigate,Link, Navigate, BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{

    const navigate =useNavigate();

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)
    let [loading, setLoading] = useState(true)
    let loginUser = async(e)=>{
        e.preventDefault()
        let response = await axios.post('http://127.0.0.1:8000/token/',{
            'email':e.target.email.value,
           'password':e.target.password.value
        })
        .catch(err=>alert(err))
        let data = await response.data
        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            alert("Something went wrong")
        }
        
    }
    let logoutUser =()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("/login")
    }


    let updateToken = async()=>{
        console.log("update token called")
        let response = await axios.post('http://127.0.0.1:8000/token/refresh/',{
            'refresh': authTokens?.refresh
        })
        .catch(err=>logoutUser)
        let data = await response.data
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourminutes = 1000*60*4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },fourminutes)
        return ()=>clearInterval(interval)
        
    },[authTokens,loading])






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