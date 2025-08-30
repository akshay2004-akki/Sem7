import { NavLink } from "react-router-dom";
import { sidebarLinks } from '../config/sidebarConfig';
import { useMemo, useState } from "react";
import logo from '../assets/logo.png'; // Make sure to add your logo to src/assets

export default function Sidebar() {
    const [isSidebarOpen, setSideBarOpen] = useState(false);
  // useMemo filters the links based on the user's role.
  // This calculation is memoized, so it only re-runs if the userRole changes.
  const accessibleLinks = useMemo(() => 
    sidebarLinks.filter(link => 
      // A link is accessible if its `roles` array is empty (for everyone)
      // or if the user's role is included in the `roles` array.
      link.roles.length === 0 || link.roles.includes(userRole)
    ), 
    [userRole]
  );

  return (
    <aside
      className={`
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
        flex-shrink-0 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-64" : "w-0"}
        overflow-hidden border-r dark:border-gray-700
      `}
    >
      <div className="flex items-center justify-center h-20">
        {/* This ensures the logo and title are only visible when the sidebar is open */}
        <div className={`flex items-center transition-opacity duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
          <img src={logo} alt="Learny Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold ml-2 text-purple-600">Learny</h1>
        </div>
      </div>
      <nav className="mt-4 px-4">
        <ul>
          {accessibleLinks.map((link) => (
            <li key={link.label} className="mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-colors duration-200
                  hover:bg-purple-100 dark:hover:bg-gray-700
                  ${isActive ? "bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-white font-semibold" : ""}
                `}
              >
                <i className={`${link.icon} text-xl w-6 text-center`}></i>
                {/* The text label is only rendered when the sidebar is open */}
                {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}