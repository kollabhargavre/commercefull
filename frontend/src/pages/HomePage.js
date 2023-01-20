import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'

const HomePage = () => {

  let {user, authTokens} = useContext(AuthContext)
  let [notes, setNotes] = useState([])


  let getPosts = async()=>{
    let response = await axios.get("http://127.0.0.1:8000/posts/",{
      headers:{
        "Content-type":"application/json",
        "Authorization":"Bearer "+String(authTokens.access)
      }
    })
    .catch(err=>console.log(err))
    let data = await response.data
    setNotes(data)
    
  }


  useEffect(()=>{
    getPosts()
  },[])

  return (
    <div>
      This is HomePage
      <ul>
        {notes.map(note=>(
          <li key={note.id}><img src={note.image}/></li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
