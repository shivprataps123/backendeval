const express=require("express");
const mediaRouter=express.Router();
const {MediaModel}=require("../models/medias.model")

mediaRouter.get("/",async(req,res)=>{
    try{
     const media=new MediaModel.find()
     res.send(media)

    }catch(err){
      res.send({message:"something went wrong"})
    }
})
mediaRouter.post("/create",async(req,res)=>{
      const payload=req.body;
      try{
       const media=new MediaModel(payload)
       await media.save();
       res.send("successfully added in database")

      }catch(err){
        res.send({message:"something went wrong"})
      }
})

mediaRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id
    const media=await MediaModel.findOne({_id:ID});
    const userIDinmedia=media.userID;
    const userIDinmaking=req.body.userID;
    try{
     if(userIDinmaking!==userIDinmedia){
        res.send({message:"you are not authorised"})
     }else{
        await MediaModel.findByIdAndUpdate({_id:ID},payload);
        res.send("update the media")
     }

    }catch(err){
        console.log(err)
      res.send({message:"something went wrong"})
    }
})


mediaRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    const media=await MediaModel.findOne({_id:ID});
    const userIDinmedia=media.userID;
    const userIDinmaking=req.body.userID;
    try{
     if(userIDinmaking!==userIDinmedia){
        res.send({message:"you are not authorised"})
     }else{
        await MediaModel.findByIdAndDelete({_id:ID});
        res.send("delete the media")
     }

    }catch(err){
        console.log(err)
      res.send({message:"something went wrong"})
    }
})

module.exports={mediaRouter}