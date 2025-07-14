import dotenv from 'dotenv'
import connectDB from './db/connectToMongoDb.js'
import { server } from './socket/socket.js'
import app from "./app.js"

dotenv.config({
    path: './.env'
})

// const __dirname = path.resolve();

const PORT = process.env.PORT || 5000

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERRR : ", error)
            throw error
        })

        server.listen(process.env.PORT || 5000, () => {
            console.log(`⚙️ Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed ", err)
    })
