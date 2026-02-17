import { NextFunction, Request , Response} from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

export const createToken = (id:string,email:string,expiresIn) => {
    const payload = {id , email};
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn:"7d",
    }) 
    return token;
}

export const verifyToken = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    console.log("All cookies:", req.cookies);
    console.log("Signed cookies:", req.signedCookies);
    console.log("COOKIE_SECRET exists:", !!process.env.COOKIE_SECRET);
    
    // Try both signed and regular cookies
    const token = req.signedCookies?.[COOKIE_NAME] || req.cookies?.[COOKIE_NAME];
    console.log("Token found:", token);
    
    if (!token) {
        return res.status(401).json({ message: "Token Not Received" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; email: string };
        res.locals.jwtData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token Expired or Invalid" });
    }
}
