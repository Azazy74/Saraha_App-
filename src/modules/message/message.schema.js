import joi from "joi";
import { validateObjectId } from "../../middleware/validate.middleware.js";

export const sendMessageSchema = joi.object({
    content : joi.string().required(),
    recieverId : joi.custom(validateObjectId).required()
}).required()