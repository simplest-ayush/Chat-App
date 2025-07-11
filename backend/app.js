import path from "path"
import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))  //to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("/public"))
app.use(cookieParser())

app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')))

app.use(express.static(path.join(__dirname, "/frontend/dist")));

// here we will import the routes
import authRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import sidebarUsersRouter from './routes/sidebarUsers.routes.js'


// routes declaration
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/message', messageRouter)
app.use('/api/v1/users', sidebarUsersRouter)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

export default app;