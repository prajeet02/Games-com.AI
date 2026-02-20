import { Request , Response , NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import path from "node:path";

export const getAllUsers = async (req:Request, res:Response) => {
    try {
        //get all Users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR",cause: error.message})
    }
}


// SignUp
export const getSignUpUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {name , email , password} = req.body;

        // Validation
        if(!name || !email || !password){
            return res.status(400).json
            ({
                message:"ERROR",
                cause:"All fields are required"
            });
        }
        const hashedPassowrd =  await hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassowrd
        });
        // Save to Database
        await newUser.save();

        res.clearCookie("auth_token",{
            path: '/',
            httpOnly: true,
            secure:true,
            domain:"games-com-ai.netlify.app",
        })

        const token = createToken(newUser._id.toString(), newUser.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token",token, {
            path: '/',
            httpOnly: true,
            secure:true,
            domain:"games-com-ai.netlify.app",
            expires,
        })


        return res.status(201).json({
            message:"User created succesfully",
            user: newUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"ERROR",
            cause: error.message
        })
    }
}



// Login
export const getLogInUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log("Login Request Received")
        const {email , password} = req.body;
        
        const user = await User.findOne({email});
        console.log("Email",email);
        console.log("User found in DB:", user);  // ← Added debug log

        console.log("Validating the User")
        // Validation
        if(!user){
            console.log("User NOT found - returning 400 error");  // ← Added debug log
            return res.status(400).json({message:"ERROR", cause:"User not found in Database"})
        }

        console.log("User has been validated", user)

        const isPasswordCorrect = await compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).send("Incorrect Password");
        }

        console.log("Password has been validated");

        res.clearCookie("auth_token",{
            path: '/',
            httpOnly: true,
            secure:true,
            domain:"games-com-ai.netlify.app",
    })

        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth_token",token, {
            path: '/',
            httpOnly: true,
            secure:true,
            domain:"games-com-ai.netlify.app",
            expires,
        })

        return res.status(200).json({message:"OK" , name:user.name,email:user.email });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"ERROR",
            cause: error.message
        })
    }
}


export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        return res.status(401).send("User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        return res.status(401).send("Permissions didn't match");
      }
      return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };


export const getLogOutUser = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.log("Logout Request Recieved");
    res.clearCookie("auth_token", {path:"/",httpOnly:true,secure:true,domain:"games-com-ai.netlify.app"});
    return res.status(200).json({message:"OK"});
}

