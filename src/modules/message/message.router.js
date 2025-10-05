import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middlleware.js";
import * as messageController from "./message.controller.js"
import { validation } from "../../middleware/validate.middleware.js";
import { sendMessageSchema } from "./message.schema.js";

const router = Router()

//Routers
router.post("/",isAuthenticated,validation(sendMessageSchema),messageController.sendmessage)
router.get("/",isAuthenticated,messageController.getmessages)


export default router

