import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const { authUser } = useAuthContext();
    const sendMessage = async ({ message, image }) => {
        if (!selectedConversation || !selectedConversation._id) {
            toast.error("No conversation is selected", { duration: 2000 })
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            if (message) {
                formData.append("message", message);
            }
            if (image) {
                formData.append("image", image);
            }
            const res = await fetch(`/api/v1/message/send/${selectedConversation._id}`, {
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ message: message })
                body: formData
            })

            // console.log("Raw response : ", res);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error response : ", errorText);
                throw new Error("Failed to send message");
            }



            const data = await res.json()
            // console.log("API Response : ", data);

            if (data.error) {
                throw new Error(data.error)
            }

            const newMessage = {
                _id: data.data._id || Date.now(),
                senderId: authUser?.data?.user?._id,
                receiverId: selectedConversation._id,
                message: data.data.message || message,
                image: data.data.image || image,
                createdAt: data.data.createdAt || new Date().toISOString(),
            };

            const updatedMessages = [...(messages?.data || []), newMessage];
            // setMessages({ ...messages, data: updatedMessages });
            // setMessages(prev => [...(Array.isArray(prev) ? prev : []), newMessage])
        } catch (error) {
            toast.error(error.message, { duration: 2000 })
        } finally {
            setLoading(false)
        }
    }
    return { sendMessage, loading }
}

export default useSendMessage
