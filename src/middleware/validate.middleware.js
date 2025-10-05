import { Types } from "mongoose";

export const validateObjectId= (value , helper)=>{
    if (Types.ObjectId.isValid(value)) return true 
    return helper.message("Invaild objectID")
}


export const validation = (schema) => {
  return (req, res, next) => {
    const data = {...req.body , ...req.params , ...req.query}
    const validation = schema.validate(data , { abortEarly: false });

    if (validation.error) {
      return next(
        new Error(
          validation.error.details.map((obj) =>{return obj.message})
        )
      );
    }

    return next();
  };
};
