import React from "react";
import { MessageSquareTextIcon } from "lucide-react";

const NoChatSelected = () => {
  return (
   <>
    <h1 className="font-bold">
      Select a chat to start messaging
      <MessageSquareTextIcon className="size-6 text-zinc-400 mt-4" />
    </h1>
   </>
  );
};

export default NoChatSelected;
