import React, { useState } from 'react';
import { Bell, BookOpen, MessageSquare, Award, Clock, CheckCircle } from 'lucide-react';

// --- Mock Data for Notifications ---
// In a real application, this data would come from your backend API.
const allNotifications = [
  {
    id: 1,
    type: 'new_course',
    read: false,
    title: 'New Course Available!',
    message: '"Advanced React Patterns" has just been launched. Enroll now to get an early bird discount.',
    time: '15 minutes ago',
    icon: <BookOpen />,
    iconBgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    id: 2,
    type: 'assignment_due',
    read: false,
    title: 'Assignment Due Soon',
    message: 'Your final project for "Introduction to Python" is due in 3 days. Don\'t forget to submit it!',
    time: '2 hours ago',
    icon: <Clock />,
    iconBgColor: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    id: 3,
    type: 'community_mention',
    read: true,
    title: 'You were mentioned',
    message: '@PriyaSharma mentioned you in the "Data Structures" discussion forum. Click to see the comment.',
    time: '1 day ago',
    icon: <MessageSquare />,
    iconBgColor: 'bg-pink-500/20',
    iconColor: 'text-pink-400'
  },
  {
    id: 4,
    type: 'certificate',
    read: true,
    title: 'Certificate Unlocked!',
    message: 'Congratulations! You have successfully completed the "JavaScript Essentials" course and earned your certificate.',
    time: '3 days ago',
    icon: <Award />,
    iconBgColor: 'bg-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    id: 5,
    type: 'update',
    read: true,
    title: 'Course Content Updated',
    message: 'A new module on "State Management with Zustand" has been added to the "Advanced React Patterns" course.',
    time: '5 days ago',
    icon: <CheckCircle />,
    iconBgColor: 'bg-gray-500/20',
    iconColor: 'text-gray-400'
  },
];

// --- Main Notifications Component ---
export default function NotificationsSection() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    return false; 
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
       
        <div className="flex justify-between items-center mb-8 mt-8">
          <div className="flex items-center gap-3">
            <Bell className="text-cyan-400" size={32} />
            <h1 className="text-3xl font-bold text-cyan-400">Notifications</h1>
          </div>
          {unreadCount > 0 && (
             <button 
                onClick={markAllAsRead}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                Mark all as read
              </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`relative py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'all' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            All
            {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`relative py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'unread' ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 bg-cyan-500 text-gray-900 text-xs font-bold rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
            {activeTab === 'unread' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div key={notif.id} className="relative group transition-transform duration-300 hover:scale-[1.02]">
                {/* Gradient border that appears on hover */}
                <div 
                  className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  aria-hidden="true" 
                />
                
                {/* The main card content */}
                <div
                  className={`relative flex items-start gap-4 p-5 rounded-lg h-full bg-black`}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.iconBgColor}`}>
                    {React.cloneElement(notif.icon, { className: notif.iconColor, size: 20 })}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-semibold ${notif.read ? 'text-gray-400' : 'text-white'}`}>{notif.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                  </div>

                  {/* Unread Indicator & Action */}
                  {!notif.read && (
                    <div className="flex flex-col items-center gap-2">
                       <span className="w-3 h-3 bg-cyan-400 rounded-full" title="Unread"></span>
                       <button onClick={() => markAsRead(notif.id)} className="text-xs text-gray-500 hover:text-cyan-400">
                          Mark read
                       </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <CheckCircle className="mx-auto text-gray-600" size={48} />
              <h3 className="mt-4 text-lg font-semibold text-gray-500">All Caught Up!</h3>
              <p className="mt-1 text-sm text-gray-600">You don't have any {activeTab} notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

