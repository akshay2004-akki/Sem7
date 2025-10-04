/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Mail,
  Calendar,
  Edit,
  BookOpen,
  Award,
  Settings,
  Save,
  Menu,
  X,
  FileText,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Main Profile Component ---
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("courses");
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile nav
  const [thumbnail, setThumbnail] = useState(null);
  const [instructorCourses, setInstructorCorses] = useState([]);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/profile",
          { withCredentials: true }
        );
        setUser(res.data.user);

        const res2 = await axios.get(
          `http://localhost:8000/api/v1/courses/getInstructorCourses/${res.data.user._id}`,
          { withCredentials: true }
        );
        setInstructorCorses(res2.data.courses);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // --- Start of newly added/modified logic for responsive tabs ---

  // Define tabs as a data structure to avoid repetition
  const navTabs = [
    {
      id: "courses",
      label: "Enrolled Courses",
      icon: BookOpen,
      roles: ["student", "instructor", "admin"],
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Award,
      roles: ["student", "instructor", "admin"],
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: Settings,
      roles: ["student", "instructor", "admin"],
    },
    {
      id: "create-course",
      label: "Create Course",
      icon: BookOpen,
      roles: ["instructor", "admin"],
    },
    {
      id: "manage-courses",
      label: "Manage Courses",
      icon: FileText,
      roles: ["instructor", "admin"],
    },
  ];

  // Filter tabs based on the current user's role
  const availableTabs = user
    ? navTabs.filter((tab) => tab.roles.includes(user.role))
    : [];
  const currentTabInfo = availableTabs.find((tab) => tab.id === activeTab);

  // --- End of new logic ---

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
    formData.append("avatar", file);

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

  // Handle course creation
  const handleCourseCreation = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    formData.append("language", e.target.language.value);
    formData.append("thumbnail", e.target.thumbnail.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/courses/createCourse",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Course created successfully!");
      e.target.reset();
    } catch (err) {
      console.error("Course creation error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create course.");
    }
  };

  const handleBioSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/instructor/create",
        { bio },
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleNavigate = (courseId) => {
    navigate(`/course/manage/${courseId}`);
  };

  const handleNavigateToCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
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
              <div className="border-b border-zinc-700 relative">
                {/* --- Mobile Navigation --- */}
                <div className="lg:hidden p-2">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md bg-zinc-800 text-white"
                  >
                    <span className="flex items-center gap-2">
                      {currentTabInfo?.icon && (
                        <currentTabInfo.icon size={16} />
                      )}
                      {currentTabInfo?.label}
                    </span>
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                  {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-zinc-900 border border-zinc-700 rounded-b-lg shadow-lg z-10 p-2 mt-1">
                      {availableTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                            activeTab === tab.id
                              ? "bg-zinc-700 text-white"
                              : "text-gray-400 hover:bg-zinc-800/50"
                          }`}
                        >
                          <tab.icon size={16} /> {tab.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* --- Desktop Navigation --- */}
                <nav className="hidden lg:flex space-x-2 p-2">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${
                        activeTab === tab.id
                          ? "bg-zinc-800 text-white"
                          : "text-gray-400 hover:bg-zinc-800/50"
                      }`}
                    >
                      <tab.icon size={16} /> {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 min-h-[400px]">
                {/* --- My Courses --- */}
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
                        className="bg-zinc-800 p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-zinc-700 transition"
                      >
                        {/* Course Info */}
                        <div className="flex gap-4 flex-1">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-24 h-16 object-cover rounded-md shadow-md flex-shrink-0"
                          />
                          <div className="flex flex-col justify-between">
                            <h4 className="font-semibold text-white">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end mt-2 sm:mt-0">
                          <button
                            onClick={() => handleNavigateToCourse(course._id)}
                            className="bg-cyan-500 text-black px-4 py-2 rounded-xl hover:bg-cyan-400 transition"
                          >
                            Go to course
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- Wishlist --- */}
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
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-16 object-cover rounded-md shadow-md"
                        />
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

                {/* --- Settings --- */}
                {activeTab === "settings" && (
                  <div className="space-y-10">
                    {/* Account Info */}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
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
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                    </form>

                    {/* Avatar Upload */}
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

                    {/* Change Password */}
                    <div className="border-t border-zinc-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Change Password
                      </h3>
                      <form
                        onSubmit={handleChangePassword}
                        className="space-y-6"
                      >
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
                    {user.role === "instructor" && (
                      <div>
                        <form onSubmit={handleBioSubmit} className="space-y-6">
                          <div>
                            <label
                              htmlFor="bio"
                              className="block text-sm font-medium text-gray-200 mb-2"
                            >
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              name="bio"
                              rows={4}
                              value={user?.bio}
                              onChange={(e) => setBio(e.target.value)}
                              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-gray-200 resize-none"
                              placeholder="Write a short bio about yourself..."
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400"
                            >
                              <Save size={16} /> Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {/* --- Create Course --- */}
                {activeTab === "create-course" && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-semibold text-white">
                      Create a New Course
                    </h3>
                    <form onSubmit={handleCourseCreation} className="space-y-6">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Course Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          required
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                          placeholder="Enter course title"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          required
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 h-24"
                          placeholder="Enter course description"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="thumbnail"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Course Thumbnail
                        </label>
                        <input
                          type="file"
                          id="thumbnail"
                          name="thumbnail"
                          accept="image/*"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          min="0"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                          placeholder="Enter price"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                        >
                          <option value="Development">Development</option>
                          <option value="Business">Business</option>
                          <option value="Finance">Finance</option>
                          <option value="IT-software">IT & Software</option>
                          <option value="Analystics">Analytics</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Health">Health & Fitness</option>
                          <option value="music">Music</option>
                          <option value="personal-development">
                            Personal Development
                          </option>
                          <option value="design">Design</option>
                          <option value="photography">Photography</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Language
                        </label>
                        <input
                          type="text"
                          id="language"
                          name="language"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2"
                          placeholder="e.g. English"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-200 mb-2"
                        >
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Currency
                          </option>
                          <option value="USD">USD – US Dollar</option>
                          <option value="EUR">EUR – Euro</option>
                          <option value="INR">INR – Indian Rupee</option>
                          <option value="GBP">GBP – British Pound</option>
                          <option value="JPY">JPY – Japanese Yen</option>
                          <option value="AUD">AUD – Australian Dollar</option>
                          <option value="CAD">CAD – Canadian Dollar</option>
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg hover:bg-cyan-400"
                        >
                          Create Course
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {activeTab === "manage-courses" && (
                  <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                    <h3 className="text-xl font-semibold text-white">
                      Manage My Courses
                    </h3>

                    {instructorCourses.length === 0 ? (
                      <p className="text-gray-400">
                        You have not created any courses yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {instructorCourses.map((course) => (
                          <div
                            key={course._id}
                            className="bg-zinc-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 md:items-center hover:bg-zinc-700 transition-all duration-200"
                          >
                            {/* Course Thumbnail */}
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-40 md:w-28 md:h-20 object-cover rounded-md shadow-md flex-shrink-0"
                            />

                            {/* Course Info */}
                            <div className="flex-1 flex flex-col justify-between">
                              <h4 className="font-semibold text-white text-lg md:text-base">
                                {course.title}
                              </h4>
                              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                {course.description.slice(0, 80)}...
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Price: {course.price} {course.currency || "$"}
                              </p>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center md:justify-end mt-3 md:mt-0">
                              <button
                                onClick={() => handleNavigate(course._id)}
                                className="bg-cyan-500 px-4 py-2 rounded-2xl text-black hover:bg-cyan-400 transition"
                              >
                                Manage Course
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
