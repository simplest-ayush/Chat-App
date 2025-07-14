import React, { useEffect, useState, createContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useAuthContext();

  // console.log("User id in Socket Context is : ", authUser.data.user._id);

  useEffect(() => {
    console.log("authUser in SocketContext: ", authUser);

    if (authUser) {
      const socket = io("https://chat-app-uw18.onrender.com", {
        query: {
          userId: authUser?.data?.user?._id,
        },
      });

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("connect", () => {
        // console.log("Socket connected", socket.id);
      });

      // ✅ Set the socket in state
      setSocket(socket);

      return () => {
        socket.close();
        setSocket(null);
      };

      // socket.on("connect", () => console.log("Socket connected", socket.id));

      // cleanup function
      // return () => {
      //   socket.close();
      // };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
