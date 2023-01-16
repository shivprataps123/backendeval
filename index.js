const express=require("express");
const cors=require("cors")
const {connection } = require("./configs/db");
const {userRouter}=require("./routes/user.route");
const {mediaRouter}=require("./routes/media.route");
const { authentication } = require("./middlewares/authentication.middleware");
const app=express();
require("dotenv").config()
app.use(express.json());
const port=process.env.port;
app.use(cors({
    origin:"*"
}))

 app.use("/users",userRouter);
 app.use(authentication)
app.use("/posts",mediaRouter);


app.listen(port,async()=>{
   try{
      await connection
      console.log('succesfully connect to database');
   }catch(err){
    console.log("error in db")
   }
   console.log('port is running on 2003');
})

