import { Router } from "express";
import * as userControllers from "./user.controller.js"
import { validation } from "../../middleware/validate.middleware.js";
import { activationSchema, forgetSchema, loginSchema, resetSchema, signupSchema } from "./user.schema.js";

const router = Router()

//Routers

router.post("/signup",validation(signupSchema),userControllers.signup)

router.post("/login",validation(loginSchema),userControllers.login)

router.get("/activeAccount/:token",validation(activationSchema),userControllers.activeAccount)

router.patch("/sendforgetpassword" , validation(forgetSchema),userControllers.forgetPassword )

router.patch("/resetpassword" , validation(resetSchema),userControllers.resetPassword )




export default router

