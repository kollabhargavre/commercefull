import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const Post = () => {
    let {user} = useContext(AuthContext)




    let post = async(e)=>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image',e.target.image.value)
        form_data.append('description',e.target.description.value)
        let response = await axios.post('http://127.0.0.1:8000/posts',form_data,{
            headers:{
                "Content-type": "multipart/form_data"
            }
        })
        .then(res =>{
            console.log(res.data)
        })
    }



  return (
    <div>
      <form onSubmit={post}>
        <textarea name="description" placeholder='description'/>
        <input type='file' name='file' accept='image/jpg, image.jpeg, image.png'/>
        <input type="submit" value="tweet"/>
      </form>
    </div>
  )
}

export default Post
