import { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
 
  


  const sidebarItems = useMemo(
    () => [
      { icon: "bi bi-house-door", label: "Dashboard", link: "/dashboard" },
      { icon: "bi bi-star", label: "Courses", link: "/courses" },
      { icon: "bi bi-globe", label: "Community", link: "/community" },
      { icon: "bi bi-calendar", label: "Schedule", link: "/schedule" },
      { icon: "bi bi-trophy", label: "Certificates", link: "/certificates" },
      { icon: "bi bi-person", label: "Profile", link: "/profile" },
      { icon: "bi bi-gear", label: "Settings", link: "/settings" },
      { icon: "bi bi-life-preserver", label: "Help Center", link: "/help" },
      { icon: "bi bi-box-arrow-right", label: "Log out", link: "/logout" },
    ],
    [] // no dependencies -> defined once
  );

  const location = useLocation();
  const [highlightPos, setHighlightPos] = useState({ top: 0, height: 0 });
  const containerRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const activeItem = sidebarItems.find(
      (item) => item.link === location.pathname
    );
    if (activeItem) {
      const node = linkRefs.current[activeItem.label];
      if (node && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        setHighlightPos({
          top: nodeRect.top - containerRect.top,
          height: nodeRect.height,
        });
      }
    }
  }, [location.pathname, sidebarItems]);

 
// Inside your Navbar component:
const sidebarRef = useRef(null);
const toggleButtonRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      setSidebarToggle(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);


  const toggleTheme = () => {
    setIsDark(!isDark);
    // Example: Apply actual theme switching here if needed
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Navbar Top */}
      <nav className="w-full h-[100px] flex items-center justify-between p-4 bg-white z-10 relative">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
          ref={toggleButtonRef}
            onClick={() => setSidebarToggle((prev) => !prev)}
            className="border-2 border-black rounded-xl p-3 w-[60px] inline-flex items-center justify-center"
          >
            <span
              className={`relative block transition-all duration-100 ${!sidebarToggle ? "w-8":"w-5"} h-1 bg-black transition-all
              after:content-[''] after:absolute ${!sidebarToggle ? "after:w-5":"after:w-8"} after:h-1 after:bg-black after:left-0 after:top-2 after:transition-all after:duration-100`}
            ></span>
          </button>
          <span className="text-lg font-bold">Logo</span>
        </div>

        {/* Center: Search */}
        <div className="w-[400px] max-w-full">
          <div className="flex items-center bg-gray-100 shadow-md rounded-full px-4 py-2 w-full">
            <button>
              <i className="bi bi-search text-gray-500 text-lg"></i>
            </button>
            <input
              type="text"
              placeholder="Search any courses, lecturers, exercises …"
              className="ml-3 bg-transparent focus:outline-none w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-8 bg-white p-2 rounded-full shadow-sm">
          {/* Notifications */}
          <div className="relative">
            <i className="bi bi-chat-dots text-2xl text-black"></i>
            <span className="absolute -top-1 -right-1 text-xs bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Grid */}
          <i className="bi bi-grid-3x3-gap text-2xl text-black"></i>

          {/* Star Points */}
          <div className="flex items-center gap-1 text-green-500 font-semibold">
            <i className="bi bi-star-fill text-xl"></i>
            <span>150</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
              isDark ? "bg-gray-700" : "bg-green-200"
            }`}
          >
            <span
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
            <i
              className={`bi bi-brightness-high absolute left-2 text-yellow-400 text-lg transition-opacity duration-300 ${
                isDark ? "opacity-0" : "opacity-100"
              }`}
            ></i>
            <i
              className={`bi bi-moon absolute right-2 text-black text-lg transition-opacity duration-300 ${
                isDark ? "opacity-100" : "opacity-0"
              }`}
            ></i>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="font-medium">Julia</span>
            <i className="bi bi-caret-down-fill text-sm text-gray-600"></i>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside  ref={sidebarRef}
        className={`absolute top-[100px] z-10 left-0 bg-white shadow-lg h-[calc(100vh-100px)] overflow-hidden transition-all duration-300 ${
          sidebarToggle ? "w-[256px] p-3" : "w-0 p-0"
        }`}
      >
        <div ref={containerRef} className="relative flex flex-col gap-2 h-full">
          {/* Highlight bar */}
          <div
            className="absolute left-0 w-1 bg-violet-700 rounded-full transition-all duration-300"
            style={{
              top: `${highlightPos.top}px`,
              height: `${highlightPos.height}px`,
            }}
          ></div>

          {/* Sidebar links */}
          {sidebarItems.map((item) => (
            <NavLink
              to={item.link}
              key={item.label}
              ref={(node) => {
                linkRefs.current[item.label] = node;
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 pl-4 pr-2 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-violet-700 font-semibold bg-violet-100"
                    : "text-gray-800 hover:bg-violet-700 hover:text-white"
                }`
              }
            >
              <i className={`${item.icon} text-lg`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
