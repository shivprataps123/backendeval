const jwt=require("jsonwebtoken")
require("dotenv").config();
const key=process.env.secret_key;


const authentication=(req,res,next)=>{
    if(token){
        const decoded=jwt.verify(token,key)
        if(decoded){
            const userID=decoded.userID;
            req.body.userId=userID
            next()
        }else{
            res.send({message:"Please login first"})
        }
    }else{
        res.send({message:"Please login first"})
    }
}

module.exports={authentication}