import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
const Header = () => {

    const user= useContext(AuthContext)

  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {user?(
        <p>Logout</p>
      ):(
        <Link to='/login'>Login</Link>
      )}
      {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header
