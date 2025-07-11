import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected =
    String(selectedConversation?._id) === String(conversation._id);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-700 rounded-lg p-2 py-1 cursor-pointer transition-colors duration-150
        ${isSelected ? "bg-sky-700" : ""}
      `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-10 sm:w-12 rounded-full border-2 border-slate-700">
            <img src={conversation.avatar} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="text-xs flex gap-2 justify-between items-center">
            <p className="font-bold text-gray-200 sm:text-base truncate">
              {conversation.fullName}
            </p>
            {/* <span className="text-lg sm:text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

export default Conversation;
