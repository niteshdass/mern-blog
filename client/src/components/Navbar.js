import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)
  const renderList = () =>{
    if(state){
      return [
        

        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">CreatePost</Link></li>,
        <li>
          <button onClick={ ()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin")
          }} type="submit" className="btn waves-effect waves-light">
                        Logout
                  </button>
        </li>
      ]
    }else{
      return[
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
      return (
            <nav>
            <div className="nav-wrapper white">
              <Link to={state?"/":"/signin"} className="brand-logo ">House-Rent</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
               
               {renderList()}
              </ul>
            </div>
          </nav>
      )
}

export default Navbar
