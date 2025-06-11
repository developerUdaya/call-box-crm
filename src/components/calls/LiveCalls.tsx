import React from 'react';
import { Phone, PhoneIncoming, Mic, MicOff, UserPlus, MessageSquare } from 'lucide-react';

const LiveCalls = () => {
  const activeCalls = [
    {
      id: '1',
      name: 'Sarah Wilson',
      number: '+1 (555) 123-4567',
      duration: '5:23',
      type: 'incoming',
      status: 'active',
      isMuted: false,
      isRecording: true,
    },
    {
      id: '2',
      name: 'Michael Brown',
      number: '+1 (555) 987-6543',
      duration: '2:45',
      type: 'outgoing',
      status: 'hold',
      isMuted: true,
      isRecording: true,
    },
  ];

  const incomingCall = {
    name: 'Emma Davis',
    number: '+1 (555) 234-5678',
    company: 'Tech Solutions Inc.',
  };

  return (
    <div className="space-y-6">
      {/* Incoming Call Popup */}
      <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <PhoneIncoming className="h-6 w-6 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{incomingCall.name}</h3>
              <p className="text-gray-600">{incomingCall.number}</p>
              <p className="text-sm text-gray-500">{incomingCall.company}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Calls */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Active Calls</h2>
        </div>
        <div className="divide-y">
          {activeCalls.map((call) => (
            <div key={call.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    call.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Phone className={`h-5 w-5 ${
                      call.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{call.name}</h3>
                    <p className="text-sm text-gray-600">{call.number}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        call.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {call.status === 'active' ? 'Active' : 'On Hold'}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{call.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className={`p-2 rounded-lg ${
                    call.isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  } hover:bg-gray-200`}>
                    {call.isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <UserPlus className="h-5 w-5" />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button className={`p-2 rounded-lg ${
                    call.isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  } hover:bg-gray-200`}>
                    <Mic className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Dial */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Dial</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button
              key={i}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">JD</span>
              </div>
              <div className="text-left">
                <p className="font-medium">John Doe {i}</p>
                <p className="text-sm text-gray-500">Sales Rep</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCalls;