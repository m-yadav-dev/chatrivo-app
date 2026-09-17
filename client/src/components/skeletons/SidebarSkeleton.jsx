import React from "react";

export const SidebarSkeleton = ({ count = 5 }) => {
  const skeletonCount = Math.max(1, count);

  return (
    <>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <li
          key={index}
          className="flex items-center gap-3 rounded-xl px-2 py-3"
          aria-hidden="true"
        >
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-zinc-200" />
          <div className="w-full animate-pulse space-y-2">
            <div className="h-3.5 w-28 rounded-full bg-zinc-200" />
            <div className="h-3 w-4/5 rounded-full bg-zinc-100" />
          </div>
          <div className="h-3 w-8 shrink-0 animate-pulse rounded-full bg-zinc-100" />
        </li>
      ))}
    </>
  );
};
