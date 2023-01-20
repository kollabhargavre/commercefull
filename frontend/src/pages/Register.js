import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'


const Register = () => {


  let navigate = useNavigate()
  let [message, setMessage] = useState(null)
  let register = async(e)=>{
    e.preventDefault()
    if(e.target.password.value!=e.target.confirmpassword.value){
      alert("Passwords didn't match")
    }
    let response = await axios.post('http://127.0.0.1:8000/register',{
      "username":e.target.username.value,
      "email":e.target.email.value,
      "password":e.target.password.value
    })
    .catch(err=>setMessage(err.response.data))
    if(message){
      return 
    }
    let data = await response.data
    if(response.status === 200){
      alert("you are registered now login")
      navigate('/')
    }
  }
  return (
    <div>
      {message && <p>{message}</p>}
      <header>Register</header>
      <form onSubmit={register}>
      <input type="text" name="username" placeholder="Enter Username" required/>
        <input type="email" name="email" placeholder="Enter email" required/>
        <input type="password" name="password" placeholder="Enter Password" required/>
        <input type="password" name="confirmpassword" placeholder="Confirm Password" required/>
        <input type="submit" value="Register"/>
      </form>
      <p>Already have an account login <Link to='/login'>here</Link></p>
    </div>
  )
}

export default Register
