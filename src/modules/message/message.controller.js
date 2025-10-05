import { asyncHandler } from "../../utils/asynchandler.js";
import { Message } from "../../../DB/models/message.model.js";
import { User } from "../../../DB/models/user.model.js";

export const sendmessage = asyncHandler(async(req , res , next) => {
    
    const isUser = await User.findById(req.body.recieverId)
    if(!isUser)return next(new Error("User is not Found!" , {cause : 404}))

    await Message.create(req.body)
    res.status(201).json({success : true , message : "Message Sent Successfully!"})
})


export const getmessages = asyncHandler(async(req ,res ,next)=>{
    const user = req.user
    const result = await Message.find({recieverId : user._id})
    if(result.length==0) return next(new Error("NO Messaages Founded!" , {cause: 404}))
    res.status(200).json({success : true , result})
})