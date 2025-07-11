import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useWindowWidth from "../../hooks/useWindowWidth";
import useConversation from "../../zustand/useConversation";

function Home() {
  const { selectedConversation } = useConversation();
  const width = useWindowWidth();
  const isMobile = width <= 670;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // console.log("Mobile:", isMobile, "Selected:", selectedConversation);

  return (
    <div className="flex h-[100dvh] w-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {isMobile ? (
        selectedConversation ? (
          <MessageContainer
            key="chat"
            message={message}
            setMessage={setMessage}
            image={image}
            setImage={setImage}
          />
        ) : (
          <Sidebar key="sidebar" className="w-full h-full" />
        )
      ) : (
        <>
          <Sidebar className="w-[300px] max-w-xs h-full" />
          <MessageContainer
            message={message}
            setMessage={setMessage}
            image={image}
            setImage={setImage}
          />
        </>
      )}
      {/* <Sidebar
        className={`${
          isMobile && selectedConversation ? "hidden" : "block"
        } ...`}
      />
      <MessageContainer
        className={`${
          isMobile && !selectedConversation ? "hidden" : "block"
        } ...`}
      /> */}
    </div>
  );
}

export default Home;
