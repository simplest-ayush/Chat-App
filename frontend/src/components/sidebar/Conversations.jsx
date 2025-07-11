import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
// import { getRandomEmoji } from "../../utils/emojis.js";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-1 sm:py-2 flex flex-col gap-1 sm:gap-2 max-h-[100vh] sm:max-h-[100vh]">
      {conversations.data?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          // emoji={getRandomEmoji()}
          lastIdx={idx === conversations.data.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
