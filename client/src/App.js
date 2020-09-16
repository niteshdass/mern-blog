import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import CreatePost from './components/screens/CreatePost';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import UserProfile from './components/screens/UserProfile';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()
const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext)
  useEffect( ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
     
    }else{
      history.push('/signin')
    }
  },[])
  return(
  <>
<Route exact path="/">
       <Home/>
     </Route>
     <Route path="/signin">
       <Signin/>
     </Route>
     <Route path="/signup">
       <Signup/>
     </Route>
     <Route exact path="/profile">
       <Profile/>
     </Route>
     <Route path="/create">
       <CreatePost/>
     </Route>
     <Route path="/profile/:userid">
       <UserProfile/>
     </Route>
     </>)
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
              <Navbar/>
              <Routing/>
          </BrowserRouter>
    </UserContext.Provider>
    
   
   
  
  );
}

export default App;
