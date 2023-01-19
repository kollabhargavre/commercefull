import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <header>Register</header>
      <form>
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
