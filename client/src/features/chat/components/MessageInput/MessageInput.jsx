import { useChatStore } from "@/store/useChatStore";
import { Mic, Paperclip, Send, StopCircle } from "lucide-react";
import { toast } from "sonner";
import WaveformChatInput from "./WaveformChatInput";

const MessageInput = ({
  message,
  setMessage,
  isTyping,
  setIsDropdownOpen,
  selectedMediaFile,
  messageType,
  clearAttachmentSelection,
  isRecording,
  setIsRecording,
  mediaRecorderRef,
  audioChunksRef,
}) => {
  const {
    sendMessage,
    isMessageSending,
    isAudioTranscribing,
    transcribeAudioMessage,
    selectedUser,
  } = useChatStore();

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!message.trim() && !selectedMediaFile) {
      return;
    }

    await sendMessage({
      text: message,
      media: selectedMediaFile,
      messageType: messageType,
    });

    setMessage("");
    clearAttachmentSelection();
  };

  const handleStartRecording = async () => {
    try {
      console.log("Requesting microphone access...");

      // step1: - Mic permission request and stream capture
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // step2: Initialize MediaRecorder with the audio stream
      const mediaRecorder = new MediaRecorder(stream); // Create MediaRecorder instance
      mediaRecorderRef.current = mediaRecorder; // Store MediaRecorder instance in ref
      audioChunksRef.current = []; // Reset audio chunks

      // step3: When data is available, push it to the audio chunks array
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // step4: Start recording

      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (error) {
      toast.error(
        "Microphone access denied. Please allow access to record audio.",
      );
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      // step 1: Stop the recording
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // step 2: When recording stops, the onstop event will be triggered, and we can process the audio data there
      mediaRecorderRef.current.onstop = () => {
        // step 3: Combine the audio chunks into a single Blob
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        console.log("Recording stopped, audio blob created:", audioBlob);

        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop()); // Stop all tracks to release the microphone

        // TODO: You can now send this audioBlob to your server or create a URL for playback using zustand state management. For example:

        if (selectedUser?._id) {
          transcribeAudioMessage(audioBlob, selectedUser._id);
        } else {
          toast.error(
            "No user selected. Please select a user to send the audio message.",
          );
          console.error(
            "No selected user found. Cannot transcribe audio message.",
          );
        }
      };
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {isAudioTranscribing && (
        <WaveformChatInput
          label="✨ Transcribing audio..."
          tone="transcribing"
        />
      )}

      {/* Recording Indicator */}
      {isRecording && <WaveformChatInput label="Recording audio..." tone="recording" />}

      {/* Message Input Container */}
      <div
        className={`w-full rounded-full border shadow-sm transition-all duration-200 flex items-center px-3 py-2 gap-2 sm:px-4 sm:py-2.5 sm:gap-3 md:px-5 md:py-3 md:gap-4 lg:px-6 ${
          isRecording
            ? "border-red-300 bg-red-50/30 focus-within:border-red-400 focus-within:ring-1 focus-within:ring-red-400/40"
            : "border-zinc-200/70 bg-white focus-within:border-zinc-300 focus-within:ring-1 focus-within:ring-zinc-400/40"
        }`}
      >
        {/* Attach Icon - Left */}
        <form
          action=""
          className="flex items-center w-full"
          onSubmit={handleSendMessage}
        >
          <button
            type="button"
            className={`shrink-0 cursor-pointer flex items-center justify-center rounded-full p-1.5 transition-all duration-200 active:scale-90 sm:p-2 md:p-2.5 lg:p-3 ${
              isRecording
                ? "text-zinc-400 cursor-not-allowed"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
            }`}
            title="Attach file"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            disabled={isRecording}
          >
            <Paperclip
              size={18}
              strokeWidth={2}
              className="sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6"
            />
          </button>

          {/* Textarea */}
          <textarea
            placeholder={
              isRecording
                ? "Recording... Click stop to finish"
                : "Type a message..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isRecording}
            className={`flex-1 resize-none text-xs leading-relaxed placeholder:text-zinc-400 outline-none max-h-24 sm:text-sm md:text-base md:leading-relaxed transition-all duration-200 ${
              isRecording
                ? "bg-red-50/30 text-zinc-500 cursor-not-allowed"
                : "bg-transparent text-zinc-900"
            }`}
          />

          {/* Mic or Send Icon - Right */}
          <button
            type={isRecording ? "button" : "submit"}
            className={`shrink-0 cursor-pointer flex items-center justify-center rounded-full p-1.5 transition-all duration-200 active:scale-90 sm:p-2 md:p-2.5 lg:p-3 ${
              isTyping
                ? "text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                : isRecording
                  ? "text-red-500 hover:bg-red-100 hover:text-red-600 bg-red-50"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
            }`}
            title={
              isTyping
                ? "Send message"
                : isRecording
                  ? "Stop recording"
                  : "Record audio"
            }
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isMessageSending}
          >
            {isTyping ? (
              <Send
                size={18}
                strokeWidth={2}
                className="sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6"
              />
            ) : isRecording ? (
              <StopCircle
                size={18}
                strokeWidth={2}
                className="sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6"
              />
            ) : (
              <Mic
                size={18}
                strokeWidth={2}
                className="sm:w-5 sm:h-5 md:w-5.5 md:h-5.5 lg:w-6 lg:h-6"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
