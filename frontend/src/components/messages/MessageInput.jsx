import React, { useState, useEffect } from "react";
import { BsImage, BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput({ message, setMessage, image, setImage }) {
  // const [message, setMessage] = useState("");
  // const [image, setImage] = useState(null);
  const { loading, sendMessage } = useSendMessage();
  const [showPlaceholder, setShowPlaceholder] = useState(
    window.innerWidth > 570
  );

  useEffect(() => {
    const handleResize = () => {
      setShowPlaceholder(window.innerWidth > 570);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage({ message, image });
    setMessage("");
    setImage(null);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative flex gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex items-center"
        >
          <BsImage size={22} />
        </label>
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder={showPlaceholder ? "Send a message" : ""}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
      {image && (
        <div className="flex items-center justify-between mt-3 p-2 rounded-lg bg-gray-800 border border-gray-600">
          <div className="text-sm text-gray-200 truncate max-w-[75%]">
            📎 <span className="font-medium">{image.name}</span>
          </div>
          <button
            onClick={handleRemoveImage}
            className="ml-2 px-2 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
          >
            Remove
          </button>
        </div>
      )}
    </form>
  );
}

export default MessageInput;
