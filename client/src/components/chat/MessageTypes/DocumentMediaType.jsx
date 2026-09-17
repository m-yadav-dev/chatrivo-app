import { DownloadIcon, FileTextIcon } from "lucide-react";
import React from "react";

const DocumentMediaType = ({ file, text }) => {
  return (
    <div className="flex items-center gap-3 bg-white/10 p-2 rounded-md border border-zinc-200/30">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-200/50 text-zinc-600">
        <FileTextIcon className="h-5 w-5" />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <span className="truncate text-sm font-medium">
          {text || "Document"}
        </span>
        <span className="text-xs opacity-70">PDF . 2.4 MB</span>
      </div>
      <a href={file}
        download={true}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200/50 hover:bg-zinc-300/50 transition-colors"
      >
        <DownloadIcon className="h-4 w-4 text-zinc-600" />
      </a>
    </div>
  );
};

export default DocumentMediaType;
