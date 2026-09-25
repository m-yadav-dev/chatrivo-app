const WaveformChatInput = ({ label = "Recording audio...", tone = "recording" }) => {
  const isTranscribing = tone === "transcribing";
  const bubbleTone = isTranscribing
    ? "border-amber-200 bg-amber-50/80 text-amber-700"
    : "border-red-200 bg-red-50/80 text-red-600";
  const pulseTone = isTranscribing ? "bg-amber-500" : "bg-red-500";
  const barTone = isTranscribing ? "bg-amber-500/80" : "bg-red-500";

  return (
    <div className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-sm ${bubbleTone}`}>
      <div className="flex items-center gap-2 min-w-0">
        <div className={`h-3 w-3 animate-pulse rounded-full ${pulseTone}`} />
        <p className="truncate text-xs font-medium sm:text-sm">{label}</p>
      </div>

      <div className="flex items-center gap-1.5 justify-center shrink-0">
        <div className={`h-3 w-1.5 rounded-full ${barTone} animate-[audioWave_0.8s_ease-in-out_infinite]`} style={{ animationDelay: "0s" }} />
        <div className={`h-4 w-1.5 rounded-full ${barTone} animate-[audioWave_0.8s_ease-in-out_infinite]`} style={{ animationDelay: "0.12s" }} />
        <div className={`h-5 w-1.5 rounded-full ${barTone} animate-[audioWave_0.8s_ease-in-out_infinite]`} style={{ animationDelay: "0.24s" }} />
        <div className={`h-4 w-1.5 rounded-full ${barTone} animate-[audioWave_0.8s_ease-in-out_infinite]`} style={{ animationDelay: "0.36s" }} />
        <div className={`h-3 w-1.5 rounded-full ${barTone} animate-[audioWave_0.8s_ease-in-out_infinite]`} style={{ animationDelay: "0.48s" }} />
      </div>
    </div>
  );
};

export default WaveformChatInput;
