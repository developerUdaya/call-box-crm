import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Phone, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/calls':
        return 'Calls';
      case '/contacts':
        return 'Contacts';
      case '/tasks':
        return 'Tasks';
      case '/messages':
        return 'Messages';
      case '/profile':
        return 'Profile';
      default:
        return 'Dashboard';
    }
  };

  const simulateIncomingCall = () => {
    const event = new CustomEvent('incomingCall', {
      detail: {
        name: 'Emma Davis',
        number: '+1 (555) 234-5678',
        company: 'Tech Solutions Inc.',
      }
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-800">{getPageTitle(location.pathname)}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={simulateIncomingCall}
          className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
        >
          <Phone className="h-4 w-4 mr-2" />
          Simulate Call
        </button>
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="p-1.5 bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsProfileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;