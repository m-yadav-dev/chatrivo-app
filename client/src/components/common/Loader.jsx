import React from "react";

import { Loader2 } from "lucide-react";

const Loader = ({
  mode = "fullscreen",
  label = "Checking authentication...",
  size = 48,
}) => {
  if (mode === "inline") {
    return (
      <div className="inline-flex items-center gap-2 text-zinc-500">
        <Loader2 className="animate-spin" size={size} />
        <span className="text-xs font-medium">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin" size={size} />
      <span className="ml-4 text-lg">{label}</span>
    </div>
  );
};

export default Loader;
