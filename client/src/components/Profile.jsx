import React, { useState, useEffect } from "react";
import {
  Mail,
  Calendar,
  Edit,
  BookOpen,
  Award,
  Settings,
  Save,
} from "lucide-react";
import axios from "axios";

// --- Main Profile Component ---
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("courses");
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [avatarPreview, setAvatarPreview] = useState("");

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/profile",
          { withCredentials: true }
        );
        console.log(res.data.user);

        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="text-center text-gray-400 mt-32">Loading profile...</div>
    );
  }

  // Displays a notification message for 3 seconds
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("avatar", file); // backend expects req.file

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/upload-avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = res.data.updatedUser;
      setUser((prev) => ({ ...prev, avatar: updatedUser.avatar }));
      setAvatarPreview(updatedUser.avatar);
      showNotification("Avatar updated successfully!", "success");
    } catch (err) {
      console.error("Avatar upload error:", err.response?.data || err.message);
      showNotification(err.response?.data?.message || "Upload failed", "error");
      setAvatarPreview(user.avatar);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;

    if (!currentPassword || !newPassword) {
      return showNotification("Please fill in both password fields.", "error");
    }

    if (newPassword.length < 6) {
      return showNotification(
        "New password must be at least 6 characters.",
        "error"
      );
    }

    setIsPasswordUpdating(true);
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/change-password",
        { oldPassword: currentPassword, newPassword: newPassword },
        { withCredentials: true }
      );

      showNotification(
        res.data.message || "Password updated successfully!",
        "success"
      );
      e.target.reset();
    } catch (err) {
      console.error(
        "Password update error:",
        err.response?.data || err.message
      );
      showNotification(
        err.response?.data?.message || "Failed to update password.",
        "error"
      );
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  // Handle input changes for settings
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/users/update",
        { fullName: user.fullName, email: user.email },
        { withCredentials: true }
      );
      alert("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans p-4 sm:p-6 lg:p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 text-center mt-15">
          <h1 className="text-3xl font-bold text-cyan-400">My Profile</h1>
          <p className="text-gray-400 mt-2">
            Manage your courses, wishlist, and account settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="relative group">
              <div className="relative bg-black p-6 rounded-2xl border border-zinc-800 text-center">
                <img
                  src={user?.avatar}
                  alt={user.fullName}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-cyan-500 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-white">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-400 flex items-center justify-center gap-2 mt-2">
                  <Mail size={14} /> {user.email}
                </p>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-2 mt-2">
                  <Calendar size={14} /> Joined{" "}
                  {new Date(user.createdAt).toDateString()}
                </p>
                <p className="text-xs text-cyan-400 mt-2">Role: {user.role}</p>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="mt-6 w-full bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl border border-zinc-800 h-full">
              {/* Tab Navigation */}
              <div className="border-b border-zinc-700">
                <nav className="flex space-x-2 p-2">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "courses"
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400 hover:bg-zinc-800/50"
                    }`}
                  >
                    <BookOpen size={16} /> My Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "wishlist"
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400 hover:bg-zinc-800/50"
                    }`}
                  >
                    <Award size={16} /> Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === "settings"
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400 hover:bg-zinc-800/50"
                    }`}
                  >
                    <Settings size={16} /> Account Settings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 min-h-[400px]">
                {activeTab === "courses" && (
                  <div className="space-y-4">
                    {user.enrolledCourses.length === 0 && (
                      <p className="text-gray-400">
                        You are not enrolled in any courses yet.
                      </p>
                    )}
                    {user.enrolledCourses.map((course) => (
                      <div
                        key={course._id}
                        className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start hover:bg-zinc-700 transition"
                      >
                        {/* Thumbnail */}
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-16 object-cover rounded-md shadow-md"
                        />

                        {/* Course Info */}
                        <div>
                          <h4 className="font-semibold text-white">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="space-y-4">
                    {user.wishlist.length === 0 && (
                      <p className="text-gray-400">Your wishlist is empty.</p>
                    )}
                    {user.wishlist.map((course) => (
                      <div
                        key={course._id}
                        className="bg-zinc-800 p-4 rounded-lg flex gap-4 items-start hover:bg-zinc-700 transition"
                      >
                        {/* Thumbnail */}
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-16 object-cover rounded-md shadow-md"
                        />

                        {/* Course Info */}
                        <div>
                          <h4 className="font-semibold text-white">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "settings" && (
                  <div className="space-y-10">
                    {/* --- Account Info Form (Existing) --- */}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={user.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user.email}
                          readOnly
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
                        />
                      </div>

                      {/* Save Button for Profile Details */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                    </form>

                    {/* --- Avatar Section (Existing) --- */}
                    <div className="border-t border-zinc-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Change Avatar
                      </h3>
                      <div className="flex items-center gap-6">
                        <img
                          src={user.avatar || "https://i.pravatar.cc/150"}
                          alt="avatar preview"
                          className="w-20 h-20 rounded-full border-2 border-cyan-500 object-cover"
                        />
                        <label className="cursor-pointer bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400">
                          Upload New Avatar
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarUpload}
                          />
                        </label>
                      </div>
                    </div>

                    {/* --- Change Password Section --- */}
                    <div className="border-t border-zinc-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Change Password
                      </h3>
                      <form
                        onSubmit={handleChangePassword}
                        className="space-y-6"
                      >
                        {/* Current Password */}
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-200 mb-2"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                            placeholder="••••••••"
                          />
                        </div>

                        {/* New Password */}
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-200 mb-2"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                            placeholder="••••••••"
                          />
                        </div>

                        {/* Save Button for Password */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400"
                          >
                            <Save size={16} /> Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
