// import React, { useEffect } from 'react'
// import { useSocketContext } from "../context/SocketContext.jsx"
// import useConversation from "../zustand/useConversation.js"

// const useListenMessages = () => {
//     const { socket } = useSocketContext();
//     const { messages, setMessages } = useConversation();

//     useEffect(() => {
//         socket?.on("newMessage", (newMessage) => {
//             console.log(newMessage);

//             setMessages([...messages, newMessage])
//         })
//         return () => socket?.off("newMessage");
//     }, [socket, setMessages, messages])
// }

// export default useListenMessages
import { useEffect } from 'react'
import { useSocketContext } from "../context/SocketContext.jsx"
import useConversation from "../zustand/useConversation.js"
import { useAuthContext } from "../context/AuthContext.jsx"

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, setMessages } = useConversation();
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (!socket) {
            console.log("Socket not available");
            return;
        };
        // console.log("useListenMessages effect running. Socket : ", socket);

        const handler = (newMessage) => {
            // console.log("Received newMessage:", newMessage);
            const myId = String(authUser?.data?.user?._id);
            const otherId = String(selectedConversation?._id);
            const senderId = String(newMessage.senderId);
            const receiverId = String(newMessage.receiverId);

            // console.log({ myId, otherId, senderId, receiverId });

            if (
                (senderId === myId && receiverId === otherId) ||
                (senderId === otherId && receiverId === myId)
            ) {
                // setMessages(prev => [...prev, newMessage]);
                setMessages(prev => {
                    const currentMessages = Array.isArray(prev) ? prev : prev?.data || [];
                    return [...currentMessages, newMessage];
                });
            }
        };
        socket.on("newMessage", handler);
        // socket.on("newMessage", (msg) => console.log("Received newMessage:", msg));
        return () => socket.off("newMessage", handler);
    }, [socket, setMessages, selectedConversation?._id, authUser?.data?.user?._id]);
}

export default useListenMessages