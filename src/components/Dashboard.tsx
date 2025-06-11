import React from 'react';
import { Phone, PhoneIncoming, PhoneMissed, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Calls', value: '156', icon: Phone, color: 'bg-blue-500' },
    { label: 'Answered', value: '124', icon: PhoneIncoming, color: 'bg-green-500' },
    { label: 'Missed', value: '32', icon: PhoneMissed, color: 'bg-red-500' },
    { label: 'Avg Duration', value: '5m 23s', icon: Clock, color: 'bg-purple-500' },
  ];

  const recentCalls = [
    { name: 'Sarah Wilson', time: '10:30 AM', type: 'incoming', status: 'completed' },
    { name: 'Mike Johnson', time: '9:45 AM', type: 'outgoing', status: 'completed' },
    { name: 'Emma Davis', time: '9:15 AM', type: 'incoming', status: 'missed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Calls</h3>
          <div className="space-y-4">
            {recentCalls.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    call.status === 'completed' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {call.type === 'incoming' ? 
                      <PhoneIncoming className={`h-4 w-4 ${
                        call.status === 'completed' ? 'text-green-600' : 'text-red-600'
                      }`} /> : 
                      <Phone className={`h-4 w-4 ${
                        call.status === 'completed' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{call.name}</p>
                    <p className="text-sm text-gray-500">{call.time}</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Follow up with client</p>
                <p className="text-sm text-gray-500">Today at 2:00 PM</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                High Priority
              </span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Team meeting</p>
                <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                Medium Priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard