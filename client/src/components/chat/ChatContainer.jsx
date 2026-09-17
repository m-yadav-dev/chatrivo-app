import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ConversationMessages from "./ConversationMessages";
import MessageInput from "./MessageInput";
import ChatInputMessageDropdown from "./ChatInputMessageDropdown";
import { useChatStore } from "@/store/useChatStore";
import MediaPreview from "./MediaPreview";

const chatDropdownOptions = [
  { id: 1, label: "Attach Image" },
  { id: 2, label: "Attach File" },
  { id: 3, label: "Share Audio" },
];

const ChatContainer = () => {
  const {
    disconnectFromSocketMessages,
    connectToSocketMessages,
    selectedUser,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [, setFilesInput] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const [selectedMediaFile, setSelectedMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [messageType, setMessageType] = useState("text");

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);


  const attachmentInputs = {
    image: imageInputRef,
    file: fileInputRef,
    audio: audioInputRef,
  };

  const handleAttachmentSelect = (attachmentType) => {
    setIsDropdownOpen(false);
    attachmentInputs[attachmentType]?.current?.click();
  };

  const handleFilesSelected = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setSelectedMediaFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      setMessageType("image");
    } else if (selectedFile.type.startsWith("audio/")) {
      setMessageType("audio");
    } else {
      setMessageType("document");
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(previewUrl);
    event.target.value = "";
  };

  const clearAttachmentSelection = () => {
    setSelectedMediaFile(null);
    setPreviewUrl(null);
    setMessageType("text");
    // if (previewUrl) {
    //   URL.revokeObjectURL(previewUrl);
    // }
  };

  useEffect(() => {
    connectToSocketMessages();
    return () => disconnectFromSocketMessages();
  }, [connectToSocketMessages, disconnectFromSocketMessages, selectedUser]);

  useEffect(() => {
    setIsTyping(message.trim().length > 0);
  }, [message]);

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden border-l-0 bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f5_100%)] md:border-l md:border-zinc-200/70">
      <input
        onChange={handleFilesSelected}
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <input
        onChange={handleFilesSelected}
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.rtf,application/pdf"
        className="hidden"
      />
      <input
        ref={audioInputRef}
        onChange={handleFilesSelected}
        type="file"
        accept="audio/*"
        className="hidden"
      />

      <ChatHeader />
      <div className="min-h-0 flex-1 overflow-hidden">
        {selectedMediaFile ? (
          <MediaPreview
            clearAttachmentSelection={clearAttachmentSelection}
            message={message}
            setMessage={setMessage}
            selectedMediaFile={selectedMediaFile}
            previewUrl={previewUrl}
            messageType={messageType}
          />
        ) : (
          <ConversationMessages />
        )}
      </div>

      <div className="sticky bottom-0 z-20 mt-auto flex w-full flex-col items-center justify-center border-t border-zinc-200/70 bg-white/90 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
        {isDropdownOpen && (
          <ul className="absolute bottom-20.5 left-4 z-20 w-48 space-y-1 rounded-xl border border-zinc-200/80 bg-white p-2 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.55)]">
            {chatDropdownOptions.map((option) => (
              <ChatInputMessageDropdown
                key={option.id}
                label={option.label}
                onSelect={() =>
                  handleAttachmentSelect(
                    option.id === 1
                      ? "image"
                      : option.id === 2
                        ? "file"
                        : "audio",
                  )
                }
              />
            ))}
          </ul>
        )}

        {!selectedMediaFile && (
          <div className="mx-auto w-full max-w-275">
            <MessageInput
              message={message}
              setMessage={setMessage}
              isTyping={isTyping}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              mediaRecorderRef={mediaRecorderRef}
              audioChunksRef={audioChunksRef}
              setIsDropdownOpen={setIsDropdownOpen}
              selectedMediaFile={selectedMediaFile}
              messageType={messageType}
              clearAttachmentSelection={clearAttachmentSelection}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatContainer;
