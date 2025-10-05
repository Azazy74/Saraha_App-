import joi from "joi";
import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asynchandler.js";
import bcryptjs, { hashSync } from "bcryptjs"
import jwt from "jsonwebtoken"
import { Token } from "../../../DB/models/token.model.js";
import { sendEmail } from "../../utils/sendEmails.js";
import randomstring from "randomstring"

export const signup = asyncHandler(async(req , res , next)=>{
    
    const isUser = await User.findOne({email : req.body.email})    
    if(isUser) return next(new Error("User is already exist" , {cause : 401}))

    const hashPassword= bcryptjs.hashSync(req.body.password , parseInt(process.env.RUSH_ROUNDS))

    const user = await User.create({...req.body , password :hashPassword})

    const token = jwt.sign({_id : user._id} , process.env.SECRET_KEY)

    const result = await sendEmail({to : user.email , subject : " Account Activation " , html : `<a href = "http://localhost:${process.env.PORT}/user/activeAccount/${token}">Activation Account</a>`})
    if(result == false) return next(new Error("Email is Invalid!" , {cause : 400 }))
    res.status(201).json({success : true , message : "User Created Successfully!"})
})

export const login = asyncHandler(async(req , res , next)=>{
    
    const isUser = await User.findOne({email : req.body.email})
    if (!isUser) {
    return next(new Error("Password or Email is Incorrect", { cause: 401 }))}

    if(isUser.isConfirmed == false )  return next(new Error("Account isn't Activated" , {cause : 401}))


    const match = await bcryptjs.compare(req.body.password , isUser.password)
    if(!match) return next(new Error("password or Email is Incorrect" , {cause : 401}))
        

    const token = jwt.sign({id : isUser._id} , process.env.SECRET_KEY ,   { expiresIn: "1d" })
    await Token.create({token , user : isUser._id})

    res.status(200).json({success : true , token})
})


export const activeAccount = asyncHandler(async(req , res , next)=>{
    const {token}=req.params
    const payload = jwt.verify(token,process.env.SECRET_KEY)
    const user = await User.findByIdAndUpdate(payload._id , {isConfirmed : true},{new : true})
    res.send("Activation Successfully !! Try Login now")
})


export const forgetPassword = asyncHandler(async(req , res , next)=>{
    const user = await User.findOne({email : req.body.email})
    if(!user) return next(new Error("User is not found" , {cause : 404}))

    if(!user.isConfirmed) return next(new Error("this Email is not activation" , {cause : 400}))

    const code  = randomstring.generate({
        length : 5 , 
        charset : "numeric"
    })
    user.resetCode=code
    user.save()

    await sendEmail({to : user.email , subject : " Reset Password " , 
        html : `
                    <p>You have access to Saraha App.</p>
                    <p>Follow this link to create new password for your account and this is code
                        ${code}:</p>
                    <p>Thanks,</p>
                    <p>Azazi Developer</p>`})
    res.send("check Your email for code")
})


export const resetPassword = asyncHandler(async(req , res , next)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return next(new Error("User is not found" , {cause : 404}))

    if(req.body.code != user.resetCode)return next(new Error("Code is not Correct" , {cause : 400}))
    
    user.password=bcryptjs.hashSync(req.body.password , parseInt(process.env.RUSH_ROUNDS))
    user.save()

    res.status(200).json({success : true , message : "Password Changed Successfully! You Can login Now "})
    
})


