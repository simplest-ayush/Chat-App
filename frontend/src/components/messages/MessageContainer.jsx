import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import useWindowWidth from "../../hooks/useWindowWidth";

function MessageContainer({ message, setMessage, image, setImage }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const width = useWindowWidth();

  // useEffect(() => {
  //   // cleanup function -> (unmounts the component)
  //   // if we do not use this then after logout the state will remain the same i.e. the previously selected conversation will still be selected
  //   return () => {
  //     setSelectedConversation(null);
  //   };
  // }, [setSelectedConversation]);

  return (
    <div className="flex flex-col w-full h-full bg-slate-800 rounded-none sm:rounded-r-lg shadow-lg">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between bg-slate-500 px-2 sm:px-4 py-2 mb-2">
            {/* <span className="label-text">To:</span>{" "} */}
            <span className="text-gray-900 font-bold text-base md:text-md sm:text-sm truncate">
              {selectedConversation.fullName}
            </span>
            {width <= 670 && (
              <button
                onClick={() => setSelectedConversation(null)}
                className="flex items-center gap-2 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-600 border border-slate-500 px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="text-xl leading-none">←</span>
                <span>Back</span>
              </button>
            )}
          </div>

          <Messages />
          <MessageInput
            message={message}
            setMessage={setMessage}
            image={image}
            setImage={setImage}
          />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  // console.log(authUser);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-2 text-center text-md sm:text-md md:text-md text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p className="truncate">
          Welcome 👋 {authUser?.data?.user?.fullName} ❄
        </p>
        <p className="text-xs sm:text-base">Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
