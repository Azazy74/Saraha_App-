import joi from "joi"

export const signupSchema= joi.object({
            name : joi.string().min(5).max(20).required(),
            email: joi.string().email().required(),
            age : joi.number().min(18).max(80),
            password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            confirmPassword : joi.string().valid(joi.ref("password")).required()
}).required()

export const loginSchema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
}).required()


export const activationSchema = joi.object({
        token : joi.string().required()
}).required()

export const forgetSchema = joi.object({
        email : joi.string().email().required()
}).required()

export const resetSchema = joi.object({
        email : joi.string().email().required(),
        code : joi.string().length(5).required(),
        password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword : joi.string().valid(joi.ref("password")).required()
}).required()
    
    

    
    
  