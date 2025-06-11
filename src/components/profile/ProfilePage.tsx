import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, Calendar, Shield, Edit, Camera } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const agent = {
    name: 'John Doe',
    role: 'Senior Sales Representative',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    department: 'Sales',
    joinDate: 'March 2022',
    permissions: ['Call Management', 'Contact Management', 'Task Creation', 'Reporting'],
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    stats: {
      totalCalls: 1256,
      avgCallDuration: '5m 23s',
      successRate: '87%',
      taskCompletion: '92%'
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow">
          <div className="relative h-32 bg-blue-600 rounded-t-lg">
            <div className="absolute -bottom-16 left-6 flex items-end">
              <div className="relative">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
                <p className="text-blue-100">{agent.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 p-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
          <div className="pt-20 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{agent.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{agent.location}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{agent.department}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Joined {agent.joinDate}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{agent.permissions.length} Permissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Calls</h3>
            <p className="text-2xl font-semibold mt-1">{agent.stats.totalCalls}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Avg Duration</h3>
            <p className="text-2xl font-semibold mt-1">{agent.stats.avgCallDuration}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Success Rate</h3>
            <p className="text-2xl font-semibold mt-1">{agent.stats.successRate}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Task Completion</h3>
            <p className="text-2xl font-semibold mt-1">{agent.stats.taskCompletion}</p>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Permissions</h2>
          <div className="grid grid-cols-2 gap-4">
            {agent.permissions.map((permission, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span>{permission}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;