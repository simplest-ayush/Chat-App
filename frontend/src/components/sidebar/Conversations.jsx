import React, { useMemo } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { useAuthContext } from "../../context/AuthContext";
// import { getRandomEmoji } from "../../utils/emojis.js";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  const { authUser } = useAuthContext();
  // console.log("in conversations : ", conversations.data);
  // console.log("in conversations : ", authUser);

  const filteredConversations = useMemo(() => {
    if (!conversations.data || !authUser) return [];
    const currentUserId = authUser?.data?.user?._id;

    return conversations.data.filter((conversation) => {
      const conversationUserId = conversation._id;
      return conversationUserId !== currentUserId;
    });
  }, [conversations.data, authUser]);

  // console.log("Filtered Conversations are : ", filteredConversations);

  return (
    <div className="py-1 sm:py-2 flex flex-col gap-1 sm:gap-2 max-h-[100vh] sm:max-h-[100vh]">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          // emoji={getRandomEmoji()}
          lastIdx={idx === filteredConversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
