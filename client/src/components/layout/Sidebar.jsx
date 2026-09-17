import React from "react";
import { SearchIcon } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import UsersList from "./UsersList";

const Sidebar = () => {
  return (
    <aside
      className="flex h-full flex-col overflow-hidden rounded-none border-r border-zinc-200/70 bg-linear-to-b from-zinc-50 via-zinc-50
     to-zinc-100/60 md:shadow-[0_12px_38px_-22px_rgba(15,23,42,0.45)] w-full"
    >
      {/* Sidebar Header*/}
      <SidebarHeader />

      <div className="space-y-3 border-b border-zinc-200/60 px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4 md:space-y-5 md:px-5 md:py-5 lg:px-6">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 md:size-5" />
          <input
            placeholder="Search chats..."
            className="h-9 w-full rounded-2xl border-2 border-zinc-200 bg-white pl-10 text-sm shadow-none placeholder:text-xs placeholder:text-zinc-400 focus-visible:ring-zinc-300 sm:h-11 sm:placeholder:text-sm md:h-12 md:pl-12 md:text-base md:placeholder:text-sm lg:h-13"
          />
        </div>

        <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-1.5">
          <span className="rounded-lg bg-zinc-900 px-2 py-1 font-medium text-zinc-50 text-xs sm:px-3 sm:py-1.5 md:px-4 md:py-2 md:text-sm">
            All
          </span>
          <span className="rounded-lg px-2 py-1 font-medium text-zinc-600 text-xs sm:px-3 sm:py-1.5 md:px-4 md:py-2 md:text-sm">
            Unread
          </span>
          <span className="rounded-lg px-2 py-1 font-medium text-zinc-600 text-xs sm:px-3 sm:py-1.5 md:px-4 md:py-2 md:text-sm">
            Groups
          </span>
        </div>
      </div>

      <UsersList />
    </aside>
  );
};

export default Sidebar;
