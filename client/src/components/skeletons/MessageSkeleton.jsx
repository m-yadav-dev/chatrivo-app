import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="w-full space-y-6" aria-hidden="true">
      <div className="flex w-full justify-end">
        <div className="w-[68%] max-w-90 animate-pulse rounded-2xl rounded-br-sm border border-zinc-800/80 bg-zinc-900/95 p-4">
          <div className="h-3.5 w-3/4 rounded-full bg-zinc-700" />
          <div className="mt-2 h-3 w-1/2 rounded-full bg-zinc-800" />
        </div>
      </div>

      <div className="flex w-full items-end gap-3">
        <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-zinc-200" />
        <div className="w-[72%] max-w-105 animate-pulse rounded-2xl rounded-bl-sm border border-zinc-200 bg-white p-3.5">
          <div className="h-3.5 w-4/5 rounded-full bg-zinc-200" />
          <div className="mt-2 h-3 w-2/3 rounded-full bg-zinc-100" />
        </div>
      </div>

      <div className="flex w-full justify-end">
        <div className="w-[62%] max-w-82.5 animate-pulse rounded-2xl rounded-br-sm border border-zinc-200/80 bg-white p-3">
          <div className="h-32 w-full rounded-xl bg-zinc-100" />
          <div className="mt-3 h-3 w-11/12 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
