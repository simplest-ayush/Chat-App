import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Message } from '../models/message.model.js'
import { Conversation } from '../models/conversation.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const sendMessage = asyncHandler(async (req, res) => {
    try {
        const { message } = req.body;
        let imageUrl = null;
        if (req.file) {
            const imageLocalPath = req.file.path;
            if (imageLocalPath) {
                imageUrl = await uploadOnCloudinary(imageLocalPath);
            }
            // console.log(imageUrl);

        }
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!isValidObjectId(senderId)) {
            throw new ApiError(400, "Invalid senderId")
        }

        if (!isValidObjectId(receiverId)) {
            throw new ApiError(400, "Invalid receiverId");
        }

        if (!message || typeof message !== "string" || message.trim() === "") {
            throw new ApiError(400, "Message cannot be empty or invalid")
        }

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message: message.trim(),
            image: imageUrl?.url,
            createdAt: new Date(),
        })

        if (!newMessage) {
            throw new ApiError(500, "Couldn't send message")
        }

        if (Array.isArray(conversation.messages)) {
            conversation.messages.push(newMessage._id)
        } else {
            throw new ApiError(500, "Conversation messages field is not an array")
        }

        //this will run in parallel which will save some time 
        await Promise.all([conversation.save(), newMessage.save()])

        // console.log("New Message created : ", newMessage);

        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId);
        // console.log("receiver socket id is : ", receiverSocketId);

        if (receiverSocketId) {
            // io.to(<socketId>).emit() is used to send event to specific clients
            // console.log("Emitting newMessage to:", receiverSocketId, "and", getReceiverSocketId(senderId));
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log("Receiver is not online")
        }
        if (senderSocketId) {
            io.to(getReceiverSocketId(senderId)).emit("newMessage", newMessage);
        } else {
            console.log("Sender socket not found");

        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    newMessage,
                    "Message sent successfully"
                )
            )

    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const getMessage = asyncHandler(async (req, res) => {
    try {
        const senderId = req.user._id
        const { id: userToChatId } = req.params

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json({
                data: [],
                message: "No conversation found",
            })
        }

        const messages = conversation.messages;
        // console.log("In message controller message is : ", messages);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    messages,
                    "Conversation fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(400, error.message)
    }
})

export {
    sendMessage,
    getMessage
}