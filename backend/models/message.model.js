import mongoose, { Schema } from 'mongoose'


const messageSchema = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true })

export const Message = mongoose.model("Message", messageSchema)