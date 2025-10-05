import mongoose from "mongoose";


export const connectDB = async ()=>{
    return await mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>console.log("DB is Connected!"))
    .catch((error)=> console.log("DB is Failed!"))
}