import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState({});
    const hasShownError = useRef(false);
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/v1/users', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!res.ok) {
                    if ((res.status === 401 || res.status === 403) && !hasShownError.current) {
                        hasShownError.current = true;
                        toast.error("Session expired. Login again", { duration: 2000 });
                        localStorage.removeItem("chat-user");
                        navigate('/login', { replace: true })
                        return;
                    }

                    if (!hasShownError.current) {
                        hasShownError.current = true;
                        toast.error("Server error", { duration: 2000 });
                    }
                    return;
                }
                const data = await res.json()
                if (data.error) {
                    throw new Error(data.error)
                }
                // console.log("Inside useGetConversation hook : ", data);
                // const otherUsers = data.data.filter(user => user._id !== authUser?._id);
                const currentUserId = authUser?._id;
                const filteredUsers = {
                    ...data,
                    data: data.data.filter(user => {
                        const userId = user._id;
                        return userId !== currentUserId;
                    }) || []
                }
                // console.log(filteredUsers);

                setConversations(filteredUsers)
                // setConversations(otherUsers)
            } catch (error) {
                if (!hasShownError.current) {
                    hasShownError.current = true;
                    toast.error("Unable to get the users", { duration: 2000 })
                }
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [navigate])

    return { loading, conversations }
}

export default useGetConversations


