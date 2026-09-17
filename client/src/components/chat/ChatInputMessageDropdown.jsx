import React from "react";
import { FileAudio2, FileIcon, ImageIcon } from "lucide-react";

const ChatInputMessageDropdown = ({ label, onSelect }) => {
  const getIcon = () => {
    if (label === "Attach Image") {
      return <ImageIcon className="size-4" />;
    }

    if (label === "Attach File") {
      return <FileIcon className="size-4" />;
    }

    return <FileAudio2 className="size-4" />;
  };

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center cursor-pointer border gap-2.5 rounded-lg px-3 py-2 
        text-left text-sm text-zinc-700 hover:bg-zinc-100 transition-colors duration-150 "
      >
        <span className="text-zinc-500">{getIcon()}</span>
        {label}
      </button>
    </li>
  );
};

export default ChatInputMessageDropdown;
