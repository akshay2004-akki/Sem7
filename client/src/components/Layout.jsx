import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// This is a placeholder hook for your actual authentication logic.
// It simulates fetching the current user's role from your context or API.
const useAuth = () => {
  const [user, setUser] = useState(null); // Start with null user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from your backend
    setTimeout(() => {
      setUser({
        role: 'instructor',
        name: 'Julia',
        avatar: 'https://i.pravatar.cc/40?img=3'
      });
      setLoading(false);
    }, 1000); // 1 second delay to simulate network request
  }, []);

  return { user, loading }; 
};

// A simple loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);


export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading } = useAuth(); // Get user and loading state

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <Sidebar isSidebarOpen={isSidebarOpen} userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
}

