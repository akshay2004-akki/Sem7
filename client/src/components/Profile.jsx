import React, { useState } from 'react';
import { User, Mail, Calendar, Edit, BookOpen, Award, Settings, Save, Lock } from 'lucide-react';

// --- Mock Data ---
// In a real application, you would fetch this from your user's session and API.
const userData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  joinDate: 'Joined on September 12, 2024',
  avatarUrl: 'https://i.pravatar.cc/150?img=5', // Placeholder image
  stats: {
    coursesCompleted: 8,
    certificatesEarned: 5,
    hoursLearned: 120,
  },
  enrolledCourses: [
    { id: 1, title: 'Advanced React Patterns', progress: 85, category: 'Web Development' },
    { id: 2, title: 'Introduction to Python', progress: 100, category: 'Data Science' },
    { id: 3, title: 'JavaScript Essentials', progress: 100, category: 'Web Development' },
    { id: 4, title: 'UX Design Fundamentals', progress: 45, category: 'Design' },
  ],
  certificates: [
    { id: 1, course: 'Introduction to Python', date: 'July 20, 2025' },
    { id: 2, course: 'JavaScript Essentials', date: 'June 15, 2025' },
    { id: 3, course: 'HTML & CSS Basics', date: 'May 01, 2025' },
  ],
};

// --- Main Profile Component ---
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('courses');
  const [user, setUser] = useState(userData);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Profile updated:", { name: user.name, email: user.email });
    alert("Profile saved successfully!");
  };

  return (
    <div className="bg-black min-h-screen text-gray-300 font-sans p-4 sm:p-6 lg:p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Profile Header */}
        <div className="mb-8 text-center mt-15">
          <h1 className="text-3xl font-bold text-cyan-400">My Profile</h1>
          <p className="text-gray-400 mt-2">Manage your courses, certificates, and account settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Info Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              <div className="relative bg-black p-6 rounded-2xl border border-zinc-800 text-center h-auto">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-500 shadow-lg"
                />
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-sm text-gray-400 flex items-center justify-center gap-2 mt-2">
                  <Mail size={14} /> {user.email}
                </p>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-2 mt-2">
                  <Calendar size={14} /> {user.joinDate}
                </p>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="mt-6 w-full bg-cyan-500 text-black font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              </div>
            </div>
            
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              <div className="relative bg-black p-6 rounded-2xl border border-zinc-800 h-auto">
                 <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p>Courses Completed</p>
                      <span className="font-bold text-cyan-400">{user.stats.coursesCompleted}</span>
                    </div>
                     <div className="flex justify-between items-center">
                      <p>Certificates Earned</p>
                      <span className="font-bold text-cyan-400">{user.stats.certificatesEarned}</span>
                    </div>
                     <div className="flex justify-between items-center">
                      <p>Hours Learned</p>
                      <span className="font-bold text-cyan-400">{user.stats.hoursLearned}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabs and Content */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl border border-zinc-800 h-full">
              {/* Tab Navigation */}
              <div className="border-b border-zinc-700">
                <nav className="flex space-x-2 p-2">
                  <button onClick={() => setActiveTab('courses')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'courses' ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:bg-zinc-800/50'}`}>
                    <BookOpen size={16} /> My Courses
                  </button>
                  <button onClick={() => setActiveTab('certificates')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'certificates' ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:bg-zinc-800/50'}`}>
                    <Award size={16} /> Certificates
                  </button>
                  <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'settings' ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:bg-zinc-800/50'}`}>
                    <Settings size={16} /> Account Settings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 min-h-[400px]">
                {activeTab === 'courses' && (
                  <div className="space-y-4">
                    {user.enrolledCourses.map(course => (
                      <div key={course.id} className="relative group transition-transform duration-300 hover:scale-[1.02]">
                        <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                        <div className="relative bg-zinc-800 p-4 rounded-lg h-full">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-white">{course.title}</h4>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.progress === 100 ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                              {course.progress === 100 ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{course.category}</p>
                          <div className="w-full bg-zinc-700 rounded-full h-2.5">
                            <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'certificates' && (
                  <div className="space-y-3">
                    {user.certificates.map(cert => (
                       <div key={cert.id} className="relative group transition-transform duration-300 hover:scale-[1.02]">
                         <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                         <div className="relative flex justify-between items-center bg-zinc-800 p-4 rounded-lg h-full">
                           <div>
                             <p className="font-semibold text-white">{cert.course}</p>
                             <p className="text-sm text-gray-500">Issued: {cert.date}</p>
                           </div>
                           <a href="#" className="text-sm text-cyan-400 hover:underline">Download</a>
                         </div>
                       </div>
                    ))}
                  </div>
                )}

                {activeTab === 'settings' && (
                   <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleInputChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                      </div>
                       <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                      </div>
                       <div className="border-t border-zinc-700 pt-6">
                         <h4 className="text-lg font-semibold text-white mb-2">Change Password</h4>
                         <div className="space-y-4">
                            <div>
                              <label htmlFor="current-password" className="block text-sm font-medium text-gray-200 mb-2">Current Password</label>
                              <input type="password" id="current-password"  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                            </div>
                             <div>
                              <label htmlFor="new-password" className="block text-sm font-medium text-gray-200 mb-2">New Password</label>
                              <input type="password" id="new-password" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                            </div>
                         </div>
                      </div>
                      <div className="flex justify-end">
                         <button type="submit" className="bg-cyan-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400 transition-colors">
                           <Save size={16} /> Save Changes
                         </button>
                      </div>
                   </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

