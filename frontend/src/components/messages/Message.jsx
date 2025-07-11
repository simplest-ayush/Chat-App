import React from "react";
import { nanoid } from "nanoid";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?.data?.user?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const avatar = fromMe
    ? authUser.data.user.avatar
    : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-cyan-950" : "bg-black";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} alt="Tailwind css chat bubble component" />
        </div>
      </div>
      <div
        className={`chat-bubble text-xs text-white ${bubbleBgColor} max-w-[90vw] sm:max-w-md break-words`}
        key={nanoid()}
      >
        {message.message}
        {message.image && (
          <div className="mt-2">
            <img
              className="rounded-lg object-cover mt-2 w-full max-w-[90vw] sm:max-w-[240px] h-auto"
              style={{
                maxWidth: "240px",
                maxHeight: "240px",
                display: "block",
                border: "2px solid #444",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                margin: "8px 0",
              }}
              src={message.image}
              alt="image"
            />
          </div>
        )}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}

export default Message;

// MESSAGELIST COMPONENT TO ADD DATA SEPARATOR FOR MESSAGES

// import React from "react";
// import Message from "./Message";

// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// function MessageList({ messages }) {
//   let lastDate = null;

//   return (
//     <div>
//       {messages.map((msg, idx) => {
//         const msgDate = formatDate(msg.createdAt);
//         const showDate =
//           !lastDate || lastDate !== msgDate;
//         lastDate = msgDate;
//         return (
//           <React.Fragment key={msg._id || idx}>
//             {showDate && (
//               <div
//                 style={{
//                   textAlign: "center",
//                   margin: "16px 0",
//                   color: "#aaa",
//                   fontWeight: "bold",
//                   fontSize: "0.95rem",
//                 }}
//               >
//                 {msgDate}
//               </div>
//             )}
//             <Message message={msg} />
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// }

// export default MessageList;
