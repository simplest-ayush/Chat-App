import mongoose, { Schema } from 'mongoose'


const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true })


export const Conversation = mongoose.model("Conversation", conversationSchema)
