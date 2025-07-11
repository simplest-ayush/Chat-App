import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageList from "./MessageList";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";
import { TiMessages } from "react-icons/ti";

function Messages() {
  const { messages: fetchedMessages, loading } = useGetMessages();
  const { messages, setMessages, selectedConversation } = useConversation();
  const safeMessages = Array.isArray(messages) ? messages : [];

  useListenMessages();

  useEffect(() => {
    if (fetchedMessages?.data) {
      // console.log("Fetched from backend:", fetchedMessages.data);
      setMessages(fetchedMessages.data);
    }
  }, [selectedConversation?._id, setMessages, fetchedMessages]);

  // this reference is used to scroll to the bottom of the chat
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // console.log("Messages array is : ", safeMessages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {
        !loading && safeMessages.length > 0 && (
          <>
            <MessageList
              messages={safeMessages}
              lastMessageRef={lastMessageRef}
            />
            <div ref={lastMessageRef} />
          </>
        )
        // safeMessages.map((message, idx) => (
        //   <div
        //     key={message._id}
        //     ref={idx == safeMessages.length - 1 ? lastMessageRef : null}
        //   >
        //     <Message message={message} />
        //   </div>
        // )
        // )
      }
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && safeMessages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-white gap-2 py-8">
          <TiMessages className="text-5xl opacity-70" />
          <p className="text-center text-lg font-medium">No messages yet</p>
          <p className="text-center text-sm text-white max-w-sm">
            Start the conversation by typing your first message below.
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
