import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'



function CreatePost() {
      const history = useHistory();
const [title,setTitle] = useState("")
const [body,setBody] = useState("")
const [image,setImage] = useState("")
const [url,setUrl] = useState("");

useEffect(() => {
      if(url){
      fetch("/createpost",{
            method:"post",
            headers:{
                  
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
             
                  title,
                  body,
                  pic:url 
            })
      }).then(res=>res.json())
      .then(data =>{
            console.log(url)
            console.log(localStorage.getItem("user"))
            console.log(data)
            if(data.error){
                  M.toast({html:data.error})
            }else{
                  M.toast({html:"Post  Succecc"})
                  history.push('/')
            }
      })
}
}, [url])




const postData = ()=>{
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","dcytixln0")
      fetch("https://api.cloudinary.com/v1_1/dcytixln0/image/upload",{
            method:"post",
            body:data
      }).then(res =>res.json())
      .then(data  =>{
            setUrl(data.url)
            console.log(url)
      }).catch(error =>{
            console.log(error)
      })

      
}
      return (
            <div className="card input-field"
                  style={{
                        margin:"10px auto",
                        maxWidth:"500px",
                        padding:"20px",
                        textAlign:"center"

                  }}
            
            >
                  <input
                  type="text"
                  placeholder="title"
                  name="title"
                  value={title}
                  onChange={ (e)=>setTitle(e.target.value)}

                  />
                  <input
                  type="text"
                  placeholder="body"
                  name="body"
                  value={body}
                  onChange={ (e)=>setBody(e.target.value)}

                  />
                  <div className="file-field input-field">
                        <div className="btn">
                              <span>File</span>
                              <input type="file"
                              onChange={ (e)=>setImage(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                              <input className="file-path validate" type="text"/>
                        </div>
                  </div>
                  <button onClick={ ()=>postData()} type="submit" className="btn waves-effect waves-light">
                        CreatePost
                  </button>
                 
            </div>
      )
}

export default CreatePost
