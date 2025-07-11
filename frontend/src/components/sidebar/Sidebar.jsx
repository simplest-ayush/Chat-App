import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar({ className = "" }) {
  return (
    <div
      className={`flex flex-col bg-slate-900 border-r border-slate-500 p-2 sm:p-4 h-full ${className}`}
    >
      <SearchInput />
      <div className="divider px-3"></div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
