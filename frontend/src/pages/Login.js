import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const Login = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <div>
      <header>Login</header>
      <form onSubmit={loginUser}>
        <input type="email" name="email" placeholder='Enter Email' required/>
        <input type="password" name="password" placeholder='Enter Password' required/>
        <input type="submit" value="Login"/>
      </form>
      <p>Don't have an account Register <Link to='/register'>here</Link></p>
    </div>
    </div>
  )
}

export default Login
