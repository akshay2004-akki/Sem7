"use client";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Flat Vector Logo with Vibrant Greens (1).png";
import { ExpandedTabs } from "./ui/expanded-tabs.jsx";
import { Bell, HelpCircle, Home, Lock, Settings, Shield, User } from "lucide-react";
import ThemeToggleButton from "./ui/theme-toggle-button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // --- Handlers for login/logout state ---
  const handleLogin = () => {
    setIsLoggedIn(true)
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false); // Also close the dropdown
  };

  // --- Effect to close dropdown on outside click ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tabs = [
    { title: "Dashboard", icon: Home, link: "dashboard" },
    { title: "Notifications", icon: Bell, link: "notifications" },
    { title: "Settings", icon: Settings, link: "settings" },
    { title: "Support", icon: HelpCircle, link: "support" },
    { title: "Security", icon: Shield, link: "security" },
  ];

  return (
    <header className="h-14 flex items-center backdrop-blur-[3px] justify-between px-3 dark:border-gray-700 fixed w-full z-50">
      <div className="w-auto">
        <img src={logo} alt="Logo" className="h-12 rounded" />
      </div>

      <div className="flex items-center justify-center">
        <ExpandedTabs tabs={tabs} />
      </div>

      {/* --- Right side with Profile Dropdown --- */}
      <div ref={profileRef} className="relative flex items-center gap-3">
        {/* Profile button when logged in */}
        <button
          onClick={() => setProfileOpen(!isProfileOpen)}
          className={`bg-amber-300 rounded-full transition-opacity ${
            isLoggedIn ? "block" : "hidden"
          }`}
        >
          <User className="rounded-full h-[45px] w-[45px] p-2 text-gray-700" />
        </button>

        {/* The Dropdown Menu */}
        {isProfileOpen && isLoggedIn && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 animate-in fade-in zoom-in-95">
            <ul className="py-1">
              <li>
                <a href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User size={16} /> My Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={16} /> Settings
                </a>
              </li>
              <li className="border-t border-gray-200 dark:border-gray-600 my-1"></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Lock size={16} /> Log Out
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Log in Button */}
        <button
          onClick={handleLogin}
          className={`bg-amber-300 p-2 px-4 rounded-xl transition-opacity ${
            !isLoggedIn ? "block" : "hidden"
          }`}
        >
          Log in
        </button>

        {/* <ThemeToggleButton variant="circle-blur" start="top-right" /> */}
      </div>
    </header>
  );
}