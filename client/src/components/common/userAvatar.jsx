import React from "react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";
const UsersAvatar = ({ image, online, size = "lg", className = "", fullName }) => {
  const fallbackText = fullName ? fullName.slice(0, 2).toUpperCase() : "NA";
  
  return (
    <>
      <Avatar size={size} className={`${className}`}>
        <AvatarImage src={image} alt={fullName} />
        <AvatarFallback>{fallbackText}</AvatarFallback>
        {online && (
          <AvatarBadge className="bg-emerald-500 ring-white dark:ring-zinc-900" />
        )}
      </Avatar>
    </>
  );
};

export default UsersAvatar;
