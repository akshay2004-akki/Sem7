import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell, BookOpen, MessageSquare, Award, Clock, CheckCircle } from 'lucide-react';

// Icon mapping for dynamic rendering
const iconMap = {
  new_course: { icon: <BookOpen />, bg: 'bg-blue-500/20', color: 'text-blue-400' },
  assignment_due: { icon: <Clock />, bg: 'bg-yellow-500/20', color: 'text-yellow-400' },
  community_mention: { icon: <MessageSquare />, bg: 'bg-pink-500/20', color: 'text-pink-400' },
  certificate: { icon: <Award />, bg: 'bg-green-500/20', color: 'text-green-400' },
  update: { icon: <CheckCircle />, bg: 'bg-gray-500/20', color: 'text-gray-400' },
};

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  // --- Fetch notifications from backend ---
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/notifications/', {
          withCredentials: true,
        });
        // Expected backend format: { notifications: [{ _id, message, link, seen, createdAt }] }
        const formatted = res.data.notifications.map((n) => ({
          id: n._id,
          type: n.type || 'update',
          read: n.seen,
          title: n.message?.split(' ')[0] === 'New' ? 'New Course Available!' : 'Notification',
          message: n.message,
          time: new Date(n.createdAt).toLocaleString(),
          icon: iconMap[n.type]?.icon || <Bell />,
          iconBgColor: iconMap[n.type]?.bg || 'bg-gray-500/20',
          iconColor: iconMap[n.type]?.color || 'text-gray-400',
        }));
        setNotifications(formatted);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // --- Mark single notification as read locally ---
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // --- Mark all as read ---
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.read;
    return false;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // --- Loading state ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-cyan-400">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 mt-10">
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
                <div
                  className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />
                <div className="relative flex items-start gap-4 p-5 rounded-lg h-full bg-black">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notif.iconBgColor}`}
                  >
                    {React.cloneElement(notif.icon, { className: notif.iconColor, size: 20 })}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-3 h-3 bg-cyan-400 rounded-full" title="Unread"></span>
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-xs text-gray-500 hover:text-cyan-400"
                      >
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
              <p className="mt-1 text-sm text-gray-600">
                You don't have any {activeTab} notifications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
