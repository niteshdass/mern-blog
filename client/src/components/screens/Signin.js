import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
function Signin() {
      const {state,dispatch} = useContext(UserContext)
      const history = useHistory();
      const [email,setEmail] = useState("")
      const [password,setPassword] = useState("")

      const postData = ()=>{
            fetch("/signin",{
                  method:"post",
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                   
                        password,
                        email, 
                  })
            }).then(res=>res.json())
            .then(data =>{
                  console.log(data)
                  if(data.error){
                         M.toast({html:data.error})
                  }else{
                        localStorage.setItem("jwt",data.token)
                         localStorage.setItem("user",JSON.stringify(data.user))
                         dispatch({type:"USER",payload:data.user})
                        M.toast({html:"Signin Succecc"})
                        history.push('/')
                  }
            })
      }
      return (
            <div className="mycard">
                  <div className="card auth-card">
                        <h2>Log-In</h2>
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
                        Sign-In
                  </button>
                        <h5>
                              <Link to="/signup">You Have no Account?</Link>
                        </h5>
                  </div>
            </div>
      )
}

export default Signin
