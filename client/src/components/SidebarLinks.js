// This file defines the navigation links for the sidebar.
// Adding, removing, or reordering items here will automatically update the UI.
// The `roles` array determines who can see the link. An empty array means
// the link is visible to all authenticated users.

export const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "bi bi-house-door",
    roles: [], // Visible to all roles
  },
  {
    label: "Courses",
    path: "/courses",
    icon: "bi bi-star",
    roles: [], // Visible to all roles
  },
  {
    label: "My Learning",
    path: "/my-learning",
    icon: "bi bi-collection-play",
    roles: ["student"], // Only visible to users with the 'student' role
  },
  {
    label: "My Creations",
    path: "/instructor/dashboard",
    icon: "bi bi-camera-reels",
    roles: ["instructor"], // Only visible to users with the 'instructor' role
  },
  {
    label: "Wishlist",
    path: "/wishlist",
    icon: "bi bi-heart",
    roles: [],
  },
  {
    label: "Purchase History",
    path: "/history",
    icon: "bi bi-receipt",
    roles: [],
  },
  {
    label: "Community",
    path: "/community",
    icon: "bi bi-globe",
    roles: [],
  },
  {
    label: "Certificates",
    path: "/certificates",
    icon: "bi bi-trophy",
    roles: [],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: "bi bi-person",
    roles: [],
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "bi bi-gear",
    roles: [],
  },
];