const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {JWT_SECREET} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')



router.get('/protected',requireLogin,(req,res)=>{
      res.send("Hello world")
})
router.post('/signup',(req,res)=>{
      const {name,email,password} = req.body;
      if(!name || !email || !password){
           return res.status(400).json({error:"Please Fulll fill form"})  
      }
     User.findOne({email:email}).then((savedUser)=>{
            if(savedUser){
                  return res.status(400).json({error:"User alreeady exist"})  
            }
            bcrypt.hash(password,12).then(hashedpassword=>{
                  const user = new User({
                        email,
                        name,
                        password:hashedpassword
                  })
                  user.save().then(uesr=>{
                        return res.status(400).json({message:"Well Done!!"})  
                       
                  }).catch(error =>{
                       
                        console.log(error)
                  })
            })

            
      }).catch((err)=>{
           
            console.log(err)
      })

    

     
})


//signin router
router.post('/signin',(req,res)=>{
      const {email,password} = req.body;
      if( !email || !password){
           return res.status(400).json({error:"Please Fulll fill form"})  
      } 
     User.findOne({email:email}).then((savedUser)=>{
            if(!savedUser){ 
                  return res.status(400).json({error:"Email or Password is Invalid"})  
            }
           bcrypt.compare(password,savedUser.password).then(doMatch =>{
            if(doMatch){
                 const token= jwt.sign({_id:savedUser._id},JWT_SECREET);
                 const {_id,name,email,followers,following} = savedUser;
                 res.json({token,user:{_id,name,email,followers,following}})
                // return res.status(200).json({message:"Sign in Successs"})
            }else{
                  return res.status(400).json({error:"Email or Password is Invalid"})   
            }
           }).catch((err)=>{
           
            console.log(err)
      })   

            
      })

    

     
})

//end sign in router
module.exports = router;