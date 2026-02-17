import { Router } from "express";
import { verifyToken, } from "../utils/token-manager.js";
import { chatCompletionValidation, validate } from "../utils/validator.js";
import { deletechat, generateChatCompletion } from "../controllers/chat-controller.js";

const chatRoutes = Router();

chatRoutes.post("/new",
    verifyToken,
    validate(chatCompletionValidation),
    generateChatCompletion);
    
chatRoutes.get("/all-chats", verifyToken,
    validate(chatCompletionValidation),
    generateChatCompletion);

chatRoutes.delete("/delete",verifyToken,
    deletechat)


export default chatRoutes;


