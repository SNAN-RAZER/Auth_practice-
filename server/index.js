const express = require('express');
const mongoose  = require('mongoose');
const app =express();
const dotenv =require('dotenv');
const userRouter = require('./controller/userController');
app.use(express.json());
dotenv.config();


app.use('/api',userRouter);


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
  app.listen(process.env.PORT,()=>{
    console.log("Express server listening on port " + process.env.PORT);
  })
})



