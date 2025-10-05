"use client";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Flat Vector Logo with Vibrant Greens (1).png";
import { ExpandedTabs } from "./ui/expanded-tabs.jsx";
import {
  Bell,
  HelpCircle,
  Home,
  Lock,
  Menu,
  Settings,
  User,
  X,
  BookOpen,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // 🔍 Search-related states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();

  // Sidebar close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (isSidebarOpen)
      document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Login check
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus);
  }, []);

  // --- Logout handler ---
  const handleLogout = async () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  // --- Debounced Search Handler ---
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    clearTimeout(searchTimeout.current);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Debounce API call by 500ms
    searchTimeout.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const res = await axios.get(
          `http://localhost:8000/api/v1/courses/browseCourses?search=${query}`,
          { withCredentials: true }
        );
        console.log(res.data);

        setSearchResults(res.data || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const handleResultClick = (courseId) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/courses/${courseId}`);
  };

  const tabs = [
    { title: "Home", icon: Home, link: "" },
    { title: "Dashboard", icon: LayoutDashboard, link: "dashboard" },
    { title: "Courses", icon: BookOpen, link: "courses" },
    { title: "Notifications", icon: Bell, link: "notifications" },
    { title: "Support", icon: HelpCircle, link: "support" },
  ];

  return (
    <header className="h-14 flex items-center backdrop-blur-[10px] bg-transparent justify-between px-3 fixed p-[40px] sm:p-[30px] w-full z-50">
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

      {/* --- Center: Tabs + Search (Desktop) --- */}
      <div className="hidden lg:flex items-center justify-center gap-6 relative">
        <ExpandedTabs tabs={tabs} />

        {/* 🔍 Search Bar */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-lg bg-white/90 text-gray-700 focus:outline-none w-full shadow-md"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500 h-5 w-5" />

          {/* 🔽 Search Results Dropdown */}
          {searchQuery && (
            <div className="absolute mt-3 bg-black/95 backdrop-blur-lg rounded-2xl shadow-2xl w-[28rem] max-h-[22rem] overflow-y-auto z-50 border border-cyan-500/40">
              {isSearching ? (
                <p className="p-4 text-cyan-400 text-base text-center">
                  Searching...
                </p>
              ) : searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => handleResultClick(course._id)}
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-cyan-900/30 transition-all duration-200"
                  >
                    {/* Thumbnail */}
                    <img
                      src={
                        course.thumbnail ||
                        "https://via.placeholder.com/100x60?text=No+Image"
                      }
                      alt={course.title}
                      className="h-[70px] w-[100px] object-cover rounded-lg border border-cyan-500/40 shadow-md"
                    />

                    {/* Course Details */}
                    <div className="flex flex-col">
                      <h3 className="text-cyan-400 font-semibold text-base leading-tight">
                        {course.title}
                      </h3>
                      {course.instructor && (
                        <p className="text-gray-400 text-sm mt-1">
                          By {course.instructor.name || "Unknown Instructor"}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-cyan-300 text-center text-base">
                  No courses found
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Right: Profile/Login --- */}
      <div ref={profileRef} className="relative flex items-center gap-3">
        {/* Mobile search toggle */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Search className="h-6 w-6 text-white dark:text-gray-200" />
        </button>

        {isLoggedIn ? (
          <>
            <button
              onClick={() => setProfileOpen(!isProfileOpen)}
              className="bg-amber-300 rounded-full"
            >
              <User className="rounded-full h-[45px] w-[45px] p-2 text-gray-700" />
            </button>
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
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
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-300 p-2 px-4 rounded-xl text-gray-700 font-medium hover:bg-amber-400 transition-all"
          >
            Log in
          </button>
        )}
      </div>

      {/* --- Mobile Search (Below Navbar) --- */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 p-3 z-40 shadow-md lg:hidden"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 text-gray-500 h-5 w-5" />
            </div>

            {/* Mobile search results */}
            {searchQuery && (
              <div className="bg-white dark:bg-gray-900 mt-2 rounded-lg shadow-md">
                {isSearching ? (
                  <p className="p-3 text-gray-500 text-sm">Searching...</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((course) => (
                    <div
                      key={course._id}
                      onClick={() => handleResultClick(course._id)}
                      className="p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      {course.title}
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-gray-500 text-sm">No courses found</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
