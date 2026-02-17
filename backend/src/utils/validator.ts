import { NextFunction, Request, Response } from "express"
import { body ,validationResult ,ValidationChain} from "express-validator"


export const validate = (validations: ValidationChain[]) => {
    return async (req:Request , res:Response , next: NextFunction) => {
        for( let validation of validations){
            const result = await validation.run(req);
            if(result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array()
            });
        }
        
        next();
    }
}

export const validateLogIn = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min : 6}).withMessage("Password is required with min 6 characters")
]

export const validateSignUp = [
    body("name").notEmpty().withMessage("Name is required"),
    ...validateLogIn
]

export const chatCompletionValidation = [
    body("message").notEmpty().withMessage("Message is required")
]

