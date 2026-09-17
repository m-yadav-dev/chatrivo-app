import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDownIcon, LogOutIcon, User2Icon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const HeaderDropdown = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const onClickLogout = () => {
    logout();
  };

  const onClickProfile = () => {
    navigate("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 gap-2 rounded-xl border-zinc-300 bg-white px-3 font-semibold text-zinc-700 shadow-sm hover:bg-zinc-100"
          size="sm"
        >
          Profile
          <ChevronDownIcon size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="w-44 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl">
        <DropdownMenuItem onSelect={onClickProfile} className="rounded-lg px-2 py-2 text-sm font-medium text-zinc-700">
          <User2Icon size={16} className="mr-2 text-zinc-500" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onClickLogout} className="rounded-lg px-2 py-2 text-sm font-medium text-zinc-700">
          <LogOutIcon size={16} className="mr-2 text-zinc-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
