import React from 'react';
import { 
  Phone, Users, Calendar, BarChart2, Settings, 
  MessageSquare, Bell, Search, Building, Target, 
  TrendingUp, FileText, Globe
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/' },
    { icon: Phone, label: 'Calls', path: '/calls' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: Target, label: 'Leads', path: '/leads' },
    { icon: TrendingUp, label: 'Campaigns', path: '/campaigns' },
    { icon: Calendar, label: 'Tasks', path: '/tasks' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Globe, label: 'Analytics', path: '/analytics' },
    { icon: Building, label: 'Departments', path: '/departments' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-[#1a1f36] text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">CallBox CRM</h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#2a2f46] rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#2a2f46] hover:text-white transition-colors ${
              location.pathname === item.path ? 'bg-[#2a2f46] text-white' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;