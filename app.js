const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const app = express();


//db connection
const mongodbUrl ="mongodb+srv://nitesh:siu33005@cluster0.1hngs.mongodb.net/muskil?retryWrites=true&w=majority"
const db=mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));
  if(db){
        console.log('Database Connected')
  }
//end db connection

//models
require('./models/user');
require('./models/post');
//endmodels


//Middleware
  app.use(express.json());

//endMiddleware
///route
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
//end route



app.listen(process.env.PORT, ()=>{
      console.log(`Server start on port ${process.env.PORT}`)
})