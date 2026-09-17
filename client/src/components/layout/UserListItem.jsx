import React from "react";
import { PinIcon } from "lucide-react";
import UsersAvatar from "../common/userAvatar";
import { motion } from "motion/react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

const MotionListItem = motion.li;

const itemMotion = {
  rest: {
    scale: 1,
    backgroundColor: "rgba(255,255,255,0)",
  },
  hover: {
    scale: 1.05,
    backgroundColor: "#ececec",
  },
};

const UserListItem = ({ chat }) => {
  const { fullName,  profilePic } = chat;
  const { setSelectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore();
  const isUserOnline = onlineUsers.includes(chat._id);
  const {message} = useChatStore();
  const {text} = message || {};
  return (
    <MotionListItem
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={itemMotion}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 28,
        mass: 0.65,
        backgroundColor: { duration: 0.18, ease: "easeOut" },
      }}
      className="group cursor-pointer rounded-2xl border border-transparent transform-gpu px-2 py-2 sm:px-2.5 sm:py-2.5 md:px-3.5 md:py-3 lg:px-4"
      onClick={() => setSelectedUser(chat)}
    >
      <div className="flex items-start gap-2 sm:gap-3 md:gap-3.5">
        <UsersAvatar 
        image={profilePic} name={fullName} 
        online={isUserOnline} size="lg"  />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-semibold text-zinc-900 sm:text-sm md:text-base">
              {fullName}
            </p>
            {/* <span className="shrink-0 text-[11px] text-zinc-400">{time}</span> */}
          </div>

          {/* <div className="mt-0.5 flex items-center gap-1.5">
            {/* {pinned && <PinIcon className="size-3 text-zinc-400" />} */}
            {/* <p className="truncate text-xs text-zinc-500">{message}</p> */}
          </div> 
        </div>

        {/* {unread > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[11px] font-semibold text-zinc-100">
            {unread}
          </span>
        )} */}
      {/* </div> */}
    </MotionListItem>
  );
};

export default UserListItem;
