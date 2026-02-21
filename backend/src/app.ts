import express, { Router } from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/routes.js'
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();


app.use(cors({
    origin: 'https://games-com-ai.netlify.app', // Allow only your Netlify app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Optional: Required if you are sending cookies/sessions
}));

//Convert the data into JSON-FORMAT
app.use(express.json())
//Parsing the HTTP cookie sent by the user
app.use(cookieParser(process.env.COOKIE_SECRET))
//Console logging the API-Command
app.use(morgan('dev'));
//Console logging the Route
app.use("/api/v1",appRouter)


export default app;