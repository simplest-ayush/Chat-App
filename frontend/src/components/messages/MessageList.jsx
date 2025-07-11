import React from "react";
import Message from "./Message";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const MessageList = ({ messages, lastMessageRef }) => {
  let lastDate = null;

  return (
    <div>
      {messages &&
        messages.map((msg, idx) => {
          const msgDate = formatDate(msg.createdAt);
          const showDate = !lastDate || lastDate !== msgDate;
          //   this condition says "if there is not last date or if the msgDate is different from the last date then show the date separator"
          lastDate = msgDate;
          const isLast = idx === messages.length - 1;
          return (
            <React.Fragment key={msg._id}>
              {showDate && (
                <div className="relative my-6 text-center">
                  <span className="inline-block bg-slate-950 px-4 py-1 text-xs text-white font-medium rounded-full border border-slate-600 shadow-sm">
                    {msgDate}
                  </span>
                </div>
              )}
              <div ref={isLast ? lastMessageRef : null} />
              <Message message={msg} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default MessageList;
