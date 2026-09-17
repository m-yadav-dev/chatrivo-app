import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const ConversationMessages = () => {
  const { authUser } = useAuthStore();
  const currentUserId = authUser?._id; // This should ideally come from your auth context or state
  const messageEndRef = useRef(null);

  const { messages, getMessages, selectedUser, isMessagesLoading } =
    useChatStore();

  useEffect(() => {
    if (!selectedUser?._id) {
      return;
    }

    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);


  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Scroll when chat messages update

  return (
    <div className="chat-scrollbar h-full min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 scroll-smooth sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-275 flex-col gap-1 sm:gap-1.5 md:gap-2">
        <div className="sticky top-3 z-1 my-4 flex justify-center">
          <span className="rounded-full border border-zinc-200/80 bg-zinc-100/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500 backdrop-blur-sm sm:px-3 sm:py-1 sm:text-[11px] md:px-4 md:py-1.5 md:text-xs">
            Today
          </span>
        </div>

        {isMessagesLoading && (
          <div className="py-3 sm:py-4 md:py-6 lg:py-8">
            <MessageSkeleton />
          </div>
        )}

        {!isMessagesLoading && messages.map((msg) => {
          const isOwn = msg.senderId === currentUserId;
          return (
            <ChatBubble key={msg._id} message={msg} isOwnMessage={isOwn} />
          );
        })}

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default ConversationMessages;
