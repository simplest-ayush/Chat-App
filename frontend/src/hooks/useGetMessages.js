import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res=await fetch(`/api/v1/message/${selectedConversation._id}`)
                const data=await res.json()
                // console.log("Data fetched from useGetMessages is : ", data);
                
                if(data.error){
                    throw new Error(data.error)
                }
                setMessages(data.data)
            } catch (error) {
                toast.error(error.message, { duration: 2000 })
            } finally {
                setLoading(false)
            }
        }
        if(selectedConversation?._id){
             getMessages()
        };    
    }, [selectedConversation?._id, setMessages])
    return {messages, loading};
}

export default useGetMessages
