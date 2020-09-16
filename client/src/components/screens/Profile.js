import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
function Profile() {
    const {state,dispatch} = useContext(UserContext)
    const [data,setData] = useState([]);

      useEffect ( ()=>{
            fetch('/mypost',{
                  headers:{
                        "Authorization":"Bearer "+localStorage.getItem("jwt")

                  }
            }).then(res =>res.json())
            .then( result =>{
                  setData(result.posts)
            })
      },[])

      return (
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                 alt="ll"/>
                 
               </div>
               <div>
        <h4>{state?state.name:"loading"}</h4>
                   <h5>Email</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6> posts</h6>
                       <h6> followers</h6>
                       <h6> following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file"  />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
              {
                  data.map( item =>{
                      
                   return <img key={item._id} className="item" src={item.photo} alt="lll"/>  
                  })
              }
          
             

           
           </div>
       </div>
      )
}

export default Profile
