import { EllipsisVerticalIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import UsersAvatar from "../common/userAvatar";
import { useAuthStore } from "@/store/useAuthStore";

const SidebarHeader = () => {
  const { authUser } = useAuthStore();
  const { fullName, profilePic } = authUser || {};
  const { onlineUsers } = useAuthStore();

  const isUserOnline = onlineUsers.includes(authUser._id);

  return (
    <header className="border-b border-zinc-200/70 px-3 py-2.5 sm:px-4 sm:py-3.5 md:px-5 md:py-4 lg:px-6">
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-3.5">
          <UsersAvatar
            image={profilePic}
            fullName={fullName}
            online={isUserOnline}
            size="lg"
          />
          <div className="min-w-0">
            <h2 className="truncate text-xs font-semibold text-zinc-900 sm:text-sm md:text-base">
              {fullName}
            </h2>
            <p
              className={`truncate text-xs md:text-sm ${isUserOnline ? "text-green-500" : "text-zinc-500"}`}
            >
              {isUserOnline ? "Active now" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-zinc-600 hover:bg-zinc-200/70 cursor-pointer md:size-10"
          >
            <EllipsisVerticalIcon className="size-4 md:size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SidebarHeader;
