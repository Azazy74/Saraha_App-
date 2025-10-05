import  express from "express";
import dotenv from "dotenv"
import { connectDB }  from "./DB/connection.js";
import userRouter from "./src/modules/user/user.router.js"
import messageRouter from "./src/modules/message/message.router.js"
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

await connectDB()

app.use("/user",userRouter)
app.use("/message",messageRouter)




//Global Erorr Handler 
app.use((error,req,res,next)=>{
   const statuscode = error.cause||500
   return res.status(statuscode).json({success : false , message : error.message})
})

//NOT Found Page handler 
app.use((req,res)=>{
    return res.status(404).json({success : false , message:" Error 404 Page Not Found"})
})

app.listen(PORT, () => console.log("Server running on port " + PORT));