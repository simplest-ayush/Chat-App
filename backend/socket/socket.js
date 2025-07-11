import { Server } from "socket.io";
import http from "http";
import app from "../app.js"


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};   //{userId: socketId}

io.on("connection", (socket) => {
    // console.log("A user connected : ", socket.id);

    const userId = socket.handshake.query.userId;
    // console.log("userId is : ", userId)

    if (userId != "undefined") {
        userSocketMap[String(userId)] = socket.id;
    }

    // socket.on("connect", () => console.log("Socket connected", socket._id));

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))


    // The socket.on() method is used to listen for specific events emitted by the client or server in a WebSocket connection, typically when using libraries like Socket.IO. It allows you to define a handler function that will execute whenever the specified event occurs.
    socket.on("disconnect", () => {
        // console.log("User disconnected!! ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})


export { io, server }