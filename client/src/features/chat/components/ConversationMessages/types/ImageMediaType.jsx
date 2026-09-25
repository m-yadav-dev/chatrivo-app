import React from "react";

const ImageMediaType = ({ file, text }) => {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={file}
        alt="Sent Image"
        className="max-h-60 max-w-full rounded-md object-cover border border-zinc-200/50"
      />
      {text && <span className="text-sm text-zinc-700 leading-relaxed">{text}</span>}
    </div>
  );
};

export default ImageMediaType;
