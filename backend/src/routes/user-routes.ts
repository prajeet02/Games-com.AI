import { Router } from "express";
import { getAllUsers, getLogInUser, verifyUser ,getLogOutUser} from "../controllers/user-controller.js";
import { getSignUpUser } from "../controllers/user-controller.js";
import { validate, validateSignUp ,validateLogIn} from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers)                                      // domain/api/v1/user/
userRoutes.post("/signup", validate(validateSignUp) ,getSignUpUser)   // domain/api/v1/user/signup
userRoutes.post("/login", validate(validateLogIn) ,getLogInUser)      // domain/api/v1/user/login
userRoutes.get("/auth-status",verifyToken,verifyUser);                // domain//api/v1/user/auth-status;
userRoutes.get("/logout",verifyToken,getLogOutUser);                  // domain//api/v1/user/logout

export default userRoutes;

