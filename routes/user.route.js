const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../models/users.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();
const key=process.env.secret_key;
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try{
       bcrypt.hash(password,5,async(err,secure_password)=>{
        if(err){
            console.log(err);
        }else{
            const user=new UserModel({email,password:secure_password,name,gender})
            await user.save();
            res.send("user registered")
        }
       })
    }catch(err){
        res.send({message:"something went wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        const hashed_password=user[0].password;
        if(user.length>0){
            bcrypt.compare(password,hashed_password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},key);
                    res.send({message:"login successfull",token:token})
                }else{
                    console.log(err);
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("wrong credentials")
            console.log(err);
        }
     
    }catch(err){
        res.send({message:"something went wrong"})
    }
})


module.exports={userRouter}