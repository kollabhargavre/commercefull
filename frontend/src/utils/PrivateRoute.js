import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'



const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)

    
  return (
    <div>
      user?children:<Navigate to="/login"/>
    </div>
  )
}

export default PrivateRoute
