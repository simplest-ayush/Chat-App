import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState("");

  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  // console.log("Conversations:", conversations);
  // console.log("Type of conversations:", typeof conversations);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be atleast 3 characters long", {
        duration: 1000,
      });
    }

    const conversation = conversations?.data?.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!!");
    }
  };

  return (
    <form className="flex items-center gap-2 w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search...."
        className="w-full px-3 py-2 text-sm rounded-full bg-slate-800 text-white placeholder-gray-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="flex items-center justify-center btn btn-circle bg-sky-700 text-white hover:bg-sky-800 transition w-10 h-10 min-h-0 p-0">
        <IoSearchSharp className="w-6 h-5 outline-none" />
      </button>
    </form>
  );
}

export default SearchInput;
