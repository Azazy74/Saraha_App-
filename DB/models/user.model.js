import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name : {type : String , required : true , min: 5 , max :20},
    email : {type : String , required : true , trim:true , unique : true},
    age : {type : Number , min: 18 , max:80 },
    password : {type : String , required : true},
    isConfirmed  : { type : Boolean , default : false}, 
    resetCode : {type : String , unique : true}, 

},{
    timestamps : true
})

export const User = mongoose.model("user",userSchema)