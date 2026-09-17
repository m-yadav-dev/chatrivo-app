import { useAuthStore } from "@/store/useAuthStore";
import { LogOutIcon } from "lucide-react";
import React from "react";
import Loader from "../loader/Loader";
import { useLocation } from "react-router-dom";
import HeaderDropdown from "./HeaderDropdown";
import { motion as Motion } from "motion/react";



const Header = () => {
  const { logout, isUserLoggedOut } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const location = useLocation();

  const isHomePage = ["/", "/login", "/signup"].includes(location.pathname);
  const isProfilePage = location.pathname === "/profile";

  {
    isUserLoggedOut && <Loader />;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#f7f7f7]/95 px-3 py-2.5 shadow-md backdrop-blur-sm sm:px-4 sm:py-3">
      <div className="mx-auto flex w-full max-w-450 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center">
          <img
            className="h-8 w-28 object-contain object-left mix-blend-multiply sm:h-9 sm:w-32 md:h-20 md:w-46 lg:h-11 lg:w-40"
            src="https://res.cloudinary.com/dyjo8b263/image/upload/v1776427856/chatrivo_ni3eeq.png"
            alt="chatrivo-logo"
            loading="eager"
            decoding="async"
          />
        </div>
        {isHomePage && <HeaderDropdown />}
        {isProfilePage && (
          <Motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={handleLogout}
            className="flex items-center cursor-pointer font-[650] gap-2 rounded-[8px] bg-gray-800 p-2.5 text-white"
          >
            <LogOutIcon />
            Logout
          </Motion.button>
        )}
      </div>
    </header>
  );
};

export default Header;
