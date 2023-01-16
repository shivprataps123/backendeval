const mongoose=require("mongoose");
const mediaSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String

})
const MediaModel=mongoose.model("medias",mediaSchema);

module.exports={MediaModel}