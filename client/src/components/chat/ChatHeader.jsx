import React from "react";
import UsersAvatar from "../common/userAvatar";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, EllipsisVerticalIcon, Phone, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { fullName, profilePic } = selectedUser || {};

  const { onlineUsers } = useAuthStore();
  const isUserOnline = onlineUsers.includes(selectedUser?._id);


  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-2 border-b border-zinc-200/70 bg-zinc-50/95 px-3 py-2.5 backdrop-blur-sm sm:gap-2.5 sm:px-3.5 sm:py-3 md:gap-3 md:px-5 md:py-4 lg:px-6"
    >
      <button
        type="button"
        onClick={() => setSelectedUser(null)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 md:hidden md:size-10"
        aria-label="Back to chats"
      >
        <ArrowLeft className="size-4 sm:size-4.5" />
      </button>

      <div className="min-w-0 flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
        <UsersAvatar 
        size="sm" fullName={fullName} 
        image={profilePic} online={isUserOnline} className="mt-0.5" />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium text-zinc-900 sm:text-base md:text-lg">{fullName}</h2>
          <p className={`text-xs md:text-sm ${isUserOnline ? "text-emerald-500" : "text-zinc-500"}`}>
            {isUserOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-2.5">
        <button className="rounded-full p-1.5 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 sm:p-2 md:p-2.5">
          <Phone className="size-4 sm:size-4.5 md:size-5 lg:size-5.5 text-zinc-600 hover:text-zinc-900" />
        </button>
        <button className="rounded-full p-1.5 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 sm:p-2 md:p-2.5">
          <Search className="size-4 sm:size-4.5 md:size-5 lg:size-5.5 text-zinc-600 hover:text-zinc-900" />
        </button>
        <button className="rounded-full p-1.5 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 sm:p-2 md:p-2.5">
          <EllipsisVerticalIcon className="size-4 sm:size-4.5 md:size-5 lg:size-5.5 text-zinc-600 hover:text-zinc-900" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
