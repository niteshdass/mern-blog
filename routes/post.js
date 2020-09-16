const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Post = mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')

router.get('/allpost',(req,res)=>{
      Post.find()
      .populate("postBy","_id name")
      .then(post =>{
            res.status(200).json({posts:post})
      }).catch(error =>{
            console.log(error)
      })
})
router.post('/createpost',requireLogin,(req,res)=>{
      const {title,body,pic} = req.body;
      console.log(title,body,pic)
      if(!title || !body ){
           return res.status(400).json({error:"Please Fulll fill form"})  
      }
      req.user.password = undefined;
      const post = new Post({
           
            title,
            body,
            photo:pic,
            postBy:req.user
      })
      post.save().then( result =>{
            res.status(200).json({post:result});
      }).catch( err =>{
            console.log(err);
      })
     

    

     
})

router.get('/mypost',requireLogin,(req,res)=>{
      Post.find({postBy:req.user._id})
      .populate("postBy","_id name")
      .then(post =>{
            res.status(200).json({posts:post})
      }).catch(err =>{
            console.log(err)
      })
})

router.get('/getsubpost',requireLogin,(req,res)=>{

      // if postedBy in following
      Post.find({postedBy:{$in:req.user.following}})
      .populate("postBy","_id name")
      .populate("comments.postedBy","_id name")
      .sort('-createdAt')
      .then(posts=>{
          res.json({posts})
      })
      .catch(err=>{
          console.log(err)
      })
  })
  

router.put('/like',requireLogin,(req,res)=>{
      Post.findByIdAndUpdate(req.body.postId,{
            $push:{likes:req.user._id}
      },{
            new:true
      }).exec((err,result)=>{
            if(err){
                  return res.status(200).json({error:err})
            }else{
                  res.json(result)
            }
      })
})

router.put('/unlike',requireLogin,(req,res)=>{
      Post.findByIdAndUpdate(req.body.postId,{
            $pull:{likes:req.user._id}
      },{
            new:true
      }).exec((err,result)=>{
            if(err){
                  return res.status(200).json({error:err})
            }else{
                  res.json(result)
            }
      })
})
router.put('/comment',requireLogin,(req,res)=>{
      const comment = {
          text:req.body.text,
          postedBy:req.user._id
      }
      Post.findByIdAndUpdate(req.body.postId,{
          $push:{comments:comment}
      },{
          new:true
      })
      .populate("comments.postedBy","_id name")
      .populate("postedBy","_id name")
      .exec((err,result)=>{
          if(err){
              return res.status(422).json({error:err})
          }else{
              res.json(result)
          }
      })
  })


  router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
      Post.findOne({_id:req.params.postId})
      .populate("postedBy","_id")
      .exec((err,post)=>{
          if(err || !post){
              return res.status(422).json({error:err})
          }
          if(post.postBy._id.toString() === req.user._id.toString()){
                post.remove()
                .then(result=>{
                    res.json(result)
                }).catch(err=>{
                    console.log(err)
                })
          }
      })
  })



module.exports = router;