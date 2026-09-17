import React from "react";

const AudioMediaType = ({ file }) => {
  return (
    <>
      <audio controls className="h-10 w-[240px] max-w-full outline-none">
        <source src={file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AudioMediaType;
