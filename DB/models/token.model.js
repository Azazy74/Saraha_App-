import mongoose from "mongoose";

const tokenSchema=new mongoose.Schema({
    token : {type: String  , required : true },
    isValid : {type : Boolean , default : true}, 
    user : {type : mongoose.Schema.Types.ObjectId , ref :"User"}, 
    expiredAt : {type : String},
    agent : {type : String }
},
{
    timestamps : true
})

export const Token = mongoose.model("token",tokenSchema)