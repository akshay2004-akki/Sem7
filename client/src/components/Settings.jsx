import React, { useState, useRef } from 'react';
import { User, Shield, Bell, CreditCard, Trash2, Save } from 'lucide-react';

// --- Mock Data ---
// In a real application, you would fetch this user settings data from your API.
const userSettingsData = {
  profile: {
    name: 'Priya Sharma',
    username: 'priyasharma',
    bio: 'Lifelong learner and aspiring full-stack developer. Passionate about creating beautiful and functional web applications.',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  account: {
    email: 'priya.sharma@example.com',
  },
  notifications: {
    newCourses: true,
    assignmentReminders: true,
    communityUpdates: false,
    securityAlerts: true,
  },
  billing: {
    plan: 'Premium Annual',
    nextBillingDate: 'October 25, 2025',
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
    }
  }
};

// Reusable Toggle Switch Component
const ToggleSwitch = ({ label, enabled, onChange }) => (
  <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
    <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
    <div className="relative flex justify-between items-center bg-zinc-800 p-4 rounded-lg h-full">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={onChange}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
          enabled ? 'bg-cyan-500' : 'bg-zinc-700'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>
);


// --- Main Settings Component ---
export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState(userSettingsData);
  const fileInputRef = useRef(null);

  // Generic handler for form input changes
  const handleInputChange = (tab, field, value) => {
    setSettings(prev => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }));
  };
  
  // Handler for toggle switches
  const handleToggleChange = (field) => {
     handleInputChange('notifications', field, !settings.notifications[field]);
  };
  
  const handleSaveChanges = (e) => {
      e.preventDefault();
      // In a real app, you would send the updated 'settings' object to your backend API.
      console.log('Saving settings:', settings);
      alert('Your settings have been saved successfully!');
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creates a temporary URL to preview the selected image
      const newAvatarUrl = URL.createObjectURL(file);
      handleInputChange('profile', 'avatarUrl', newAvatarUrl);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSaveChanges} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Public Profile</h2>
            
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />

            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative flex items-center gap-6 bg-zinc-900 p-4 rounded-lg">
                    <img src={settings.profile.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-zinc-700 object-cover" />
                    <div>
                       <button 
                         type="button" 
                         onClick={handleChangePhotoClick}
                         className="bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-zinc-600 transition-colors"
                       >
                         Change Photo
                       </button>
                       <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>
            </div>
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative bg-zinc-900 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input type="text" value={settings.profile.name} onChange={(e) => handleInputChange('profile', 'name', e.target.value)} className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
            </div>
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative bg-zinc-900 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                  <textarea value={settings.profile.bio} onChange={(e) => handleInputChange('profile', 'bio', e.target.value)} rows="4" className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-zinc-800">
                <button type="submit" className="bg-cyan-500 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400 transition-colors"><Save size={16}/> Save Changes</button>
            </div>
          </form>
        );
      case 'account':
        return (
           <form onSubmit={handleSaveChanges} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Account Settings</h2>
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="relative bg-zinc-900 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input type="email" value={settings.account.email} onChange={(e) => handleInputChange('account', 'email', e.target.value)} className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
            </div>
             <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
                 <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                 <div className="relative pt-6 border-t border-zinc-800 rounded-lg p-4 bg-zinc-900">
                     <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                     </div>
                     <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                        <input type="password" placeholder="New password" className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                     </div>
                 </div>
             </div>
             <div className="flex justify-end pt-4 border-t border-zinc-800">
                <button type="submit" className="bg-cyan-500 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-cyan-400 transition-colors"><Save size={16}/> Save Changes</button>
            </div>
          </form>
        );
      case 'notifications':
        return (
           <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Notification Preferences</h2>
             <div className="space-y-4">
               <ToggleSwitch label="New Courses & Features" enabled={settings.notifications.newCourses} onChange={() => handleToggleChange('newCourses')} />
               <ToggleSwitch label="Assignment Reminders" enabled={settings.notifications.assignmentReminders} onChange={() => handleToggleChange('assignmentReminders')} />
               <ToggleSwitch label="Community Updates & Mentions" enabled={settings.notifications.communityUpdates} onChange={() => handleToggleChange('communityUpdates')} />
               <ToggleSwitch label="Security & Account Alerts" enabled={settings.notifications.securityAlerts} onChange={() => handleToggleChange('securityAlerts')} />
             </div>
          </div>
        );
       case 'danger_zone':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Danger Zone</h2>
            <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
              <div className="absolute -inset-px bg-gradient-to-r from-red-600 via-pink-600 to-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              <div className="relative bg-zinc-800/50 border border-red-500/30 p-6 rounded-lg h-full">
                  <h3 className="text-lg font-semibold text-white">Delete Your Account</h3>
                  <p className="text-gray-400 mt-2 text-sm">Once you delete your account, there is no going back. All of your data, including course progress and certificates, will be permanently removed. Please be certain.</p>
                  <button 
                    onClick={() => window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')}
                    className="mt-6 bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Delete Account
                  </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'danger_zone', label: 'Danger Zone', icon: Trash2 },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-4 sm:p-6 lg:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center mt-12">
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-2">Manage your profile, account, and notification preferences.</p>
        </header>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="lg:w-1/4">
            <nav className="flex flex-col space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative group w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 hover:scale-[1.02] ${
                    activeTab === tab.id ? 'bg-zinc-800 text-white' : 'text-gray-400 hover:bg-transparent hover:text-white'
                  }`}
                >
                   <div className={`absolute -inset-px rounded-lg bg-gray-600 transition-opacity duration-300 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                   <div className="relative flex items-center gap-3">
                     <tab.icon size={20} className={activeTab === tab.id ? 'text-black' : ''}/>
                     <span>{tab.label}</span>
                   </div>
                </button>
              ))}
            </nav>
          </aside>
          
          {/* Right Content Area */}
          <main className="lg:w-3/4 bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-800">
              {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

