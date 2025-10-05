import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken"
import { User } from "../../DB/models/user.model.js";
import { Token } from "../../DB/models/token.model.js";


export const isAuthenticated = asyncHandler(async(req ,res ,next)=>{
        const {token}=req.headers
        if(!token) return next(new Error("Token is Missing",{cause : 400}))

        if(!token.startsWith(process.env.BERARE_TOKEN))return next(new Error("Token is invaild!" , {cause :401}))
        
        const newToken = token.split(process.env.BERARE_TOKEN)[1]
        
        const tokenDB = await Token.findOne({token : newToken ,isValid :true})
        if(!tokenDB)return next(new Error("Token is invaild!",{cause:400}))
        
        const payload =jwt.verify(newToken, process.env.SECRET_KEY)

        const isUser= await User.findById(payload.id)
        if(!isUser)return next(new Error ("User not found!" ,{cause:404}))
        
        req.user=isUser
        return next()
})

