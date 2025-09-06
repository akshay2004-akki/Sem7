/* eslint-disable no-unused-vars */
"use client";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Flat Vector Logo with Vibrant Greens (1).png";
import { ExpandedTabs } from "./ui/expanded-tabs.jsx";
import { Bell, HelpCircle, Home, Lock, Menu, Settings, Shield, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const profileRef = useRef(null);

  const sidebarRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  if (isSidebarOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isSidebarOpen]);


  // --- Handlers for login/logout state ---
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
  };

  // --- Effect to close profile dropdown on outside click ---
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
    <header className="h-14 flex shadow-[0_0.5px_10px_0_#00ffff] items-center backdrop-blur-[10px] bg-transparent justify-between px-3 dark:border-gray-700 fixed p-[40px] sm:p-[30px] w-full z-50">
      {/* --- Left: Logo + Hamburger --- */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-white dark:text-gray-200" />
        </button>
        <img src={logo} alt="Logo" className="h-12 rounded" />
      </div>

      {/* --- Center: Tabs for Large Screens --- */}
      <div className="hidden lg:flex items-center justify-center">
        <ExpandedTabs tabs={tabs} />
      </div>

      {/* --- Right side with Profile / Login --- */}
      <div ref={profileRef} className="relative flex items-center gap-3">
        {/* Profile button */}
        <button
          onClick={() => setProfileOpen(!isProfileOpen)}
          className={`bg-amber-300 rounded-full transition-opacity ${
            isLoggedIn ? "block" : "hidden"
          }`}
        >
          <User className="rounded-full h-[45px] w-[45px] p-2 text-gray-700" />
        </button>

        {/* Dropdown */}
        {isProfileOpen && isLoggedIn && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 animate-in fade-in zoom-in-95">
            <ul className="py-1">
              <li>
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User size={16} /> My Profile
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
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
      </div>

      {/* --- Sidebar for Mobile --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
            ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-[40px] left-[40px] w-auto h-auto bg-black shadow-lg z-50 p-5 flex flex-col"

            >
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-red-500 hover:text-red-300 transition-all duration-100 dark:text-gray-200" />
                </button>
              </div>
              <ExpandedTabs tabs={tabs} className="flex-col gap-4" />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
