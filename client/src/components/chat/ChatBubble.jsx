import { format } from "date-fns";
import React from "react";
import UsersAvatar from "../common/userAvatar";
import ImageMediaType from "./MessageTypes/ImageMediaType";
import DocumentMediaType from "./MessageTypes/DocumentMediaType";
import AudioMediaType from "./MessageTypes/AudioMediaType";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatBubble = ({ isOwnMessage, message }) => {
  const { media, messageType, text, createdAt } = message;
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();

  const senderName = isOwnMessage ? authUser?.fullName : selectedUser?.fullName;
  const senderImage = isOwnMessage
    ? authUser?.profilePic
    : selectedUser?.profilePic;
  const fileUrl = media?.url || "";

  const createdDate = createdAt ? new Date(createdAt) : new Date();
  const timeString = Number.isNaN(createdDate.getTime())
    ? ""
    : format(createdDate, "hh:mm a");

  const renderMessageContent = () => {
    switch (messageType) {
      case "image":
        return <ImageMediaType file={fileUrl} text={text} />;
      case "document":
        return <DocumentMediaType file={fileUrl} text={text} />;
      case "audio":
        return <AudioMediaType file={fileUrl} text={text} />;
      default:
        return (
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed sm:text-[15px]">
            {text}
          </p>
        );
    }
  };

  return (
    <div
      className={`mt-2.5 flex w-full gap-2 sm:mt-3.5 sm:gap-2.5 md:mt-4 md:gap-3 lg:mt-4.5 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && (
        <div className="mt-auto shrink-0">
          <UsersAvatar image={senderImage} fullName={senderName} size="md" />
        </div>
      )}

      <div
        className={`flex max-w-[85%] flex-col sm:max-w-[82%] md:max-w-[75%] lg:max-w-[70%] ${
          isOwnMessage ? "items-end" : "items-start"
        }`}
      >
        {!isOwnMessage && (
          <span className="mb-0.5 ml-1 text-[10px] font-medium tracking-wide text-zinc-500 sm:mb-1 sm:text-[11px] md:text-xs md:mb-1.5">
            {senderName}
          </span>
        )}

        <div
          className={`relative w-full rounded-2xl border px-3 py-2.5 shadow-[0_7px_22px_-18px_rgba(15,23,42,0.55)] sm:px-4 sm:py-3 md:px-5 md:py-3.5 lg:px-6 lg:py-4
            ${
              isOwnMessage
                ? "rounded-br-sm border-zinc-800 bg-zinc-900 text-zinc-50"
                : "rounded-bl-sm border-zinc-200/80 bg-white text-zinc-900"
            }
            `}
        >
          {renderMessageContent()}

          <div
            className={`flex justify-end mt-1 md:mt-1.5 ${
              isOwnMessage ? "text-zinc-300/80" : "text-zinc-500"
            }`}
          >
            <span className="text-[10px] select-none">{timeString}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
