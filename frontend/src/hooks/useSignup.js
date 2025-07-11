import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
    const [loading, setloading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, email, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, email, password, confirmPassword, gender })
        if (!success) {
            return;
        }
        setloading(true)
        try {
            const res = await fetch("/api/v1/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error);
            }
            setAuthUser(data.data);
            localStorage.setItem("chat-user", JSON.stringify(data.data));
            toast.success("Signup successful", { duration: 2000 });
            console.log(data);

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);

        } finally {
            setloading(false)
        }
    }
    return { loading, signup }
}

export default useSignup


function handleInputErrors({ fullName, username, email, password, confirmPassword, gender }) {
    if (!(fullName && username && email && password && confirmPassword && gender)) {
        toast.error("All fields are required!!", { duration: 2000 })
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match", { duration: 2000 })
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be of atleast 6 characters long")
        return false
    }

    return true
}