import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
function Signup() {
      const history = useHistory();
      const [email,setEmail] = useState("")
      const [name,setName] = useState("")
      const [password,setPassword] = useState("")

      const postData = ()=>{
            fetch("/signup",{
                  method:"post",
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                        name,
                        password,
                        email, 
                  })
            }).then(res=>res.json())
            .then(data =>{
                  if(data.error){
                        M.toast({html:data.error})
                  }else{
                        M.toast({html:data.message})
                        history.push('/signin')
                  }
            })
      }
      return (
            <div className="mycard">
            <div className="card auth-card">
                  <h2>Register</h2>
                  <input
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange={ (e)=>setName(e.target.value)}
                  />
                  <input
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  onChange={ (e)=>setEmail(e.target.value)}

                  />
                  <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={ (e)=>setPassword(e.target.value)}
                  />
                  <button onClick={ ()=>postData()} type="submit" className="btn waves-effect waves-light">
                        Sign-Up
                  </button>
                  <h5>
                        <Link to="/signin">You Have an Account?</Link>
                  </h5>
            </div>
      </div>
      )
}

export default Signup
