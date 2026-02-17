import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to retry with exponential backoff
const retryWithBackoff = async (
  fn: () => Promise<any>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
) => {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if it's a 429 error (rate limit)
      if (error.response?.status === 429) {
        const retryAfter = error.response?.headers?.['retry-after'];
        const waitTime = retryAfter
          ? parseInt(retryAfter) * 1000
          : initialDelayMs * Math.pow(2, attempt); // exponential backoff

        console.log(`Rate limited (429). Retrying after ${waitTime}ms (attempt ${attempt + 1}/${maxRetries})`);
        await delay(waitTime);
      } else {
        // Don't retry on other errors
        throw error;
      }
    }
  }

  throw lastError;
};

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });

    // grab chat of user
    const chat = user.chat.map(({ role, content }) => ({
      role,
      content,
    }));
    chat.push({ content: message, role: "user" });
    user.chat.push({ content: message, role: "user" });

    // send all chat with new one to Gemini API
    const genAI = configureOpenAI();
    const model = genAI.getGenerativeModel({ 
                  model: "gemini-2.5-flash", 
                  systemInstruction: "You are a specialized Gaming Expert. Your goal is to help users with game walkthroughs, lore, hardware specs, and gaming news. If a user asks a non-gaming question, politely steer them back to gaming topics.Use game Slangs like nerf buff and GG give pro tips after every strategy explanation",
                });
    
    // Convert chat history to Gemini format
    // Gemini expects : {role:"user"}
    const history = chat.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // get latest response with retry logic
    const chatResponse = await retryWithBackoff(
      async () => {
        // Start chat session with history
        const chatSession = model.startChat({ history });

        // Send the new message
        const result = await chatSession.sendMessage(message);

        // Get the response text
        const response = result.response;
        return response.text();
      },
      3, // max retries
      1000 // initial delay in ms
    );

    // Save assistant's response to database
   user.chat.push({ content: chatResponse, role: "assistant"});
   await user.save();
   return res.status(200).json({chat : user.chat});
  } finally {
    
  }
};

export const sendchatToUser = async (
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
    return res.status(200).json({ message: "OK", chat: user.chat });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deletechat = async (
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
    //@ts-ignore
    user.chat = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};