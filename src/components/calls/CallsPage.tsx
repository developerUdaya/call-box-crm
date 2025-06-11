import React, { useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Mic, MicOff, UserPlus, MessageSquare, Clock, Download, Filter, Search, X, Users } from 'lucide-react';
import LiveCalls from './LiveCalls';
import CallHistory from './CallHistory';

const CallsPage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [isNewCallModalOpen, setIsNewCallModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isContactListOpen, setIsContactListOpen] = useState(false);

  // Mock contacts data - in a real app, this would come from your contacts state/API
  const contacts = [
    { id: '1', name: 'Sarah Wilson', phone: '+1 (555) 123-4567' },
    { id: '2', name: 'Michael Brown', phone: '+1 (555) 987-6543' },
    { id: '3', name: 'Emma Davis', phone: '+1 (555) 234-5678' },
  ];

  const handleNewCall = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual call functionality
    console.log('Initiating call to:', phoneNumber);
    setIsNewCallModalOpen(false);
    setPhoneNumber('');
    setIsContactListOpen(false);
  };

  const handleContactSelect = (contact: { phone: string }) => {
    setPhoneNumber(contact.phone);
    setIsContactListOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
        <button 
          onClick={() => setIsNewCallModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Phone className="h-4 w-4 mr-2" />
          New Call
        </button>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('live')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'live'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Live Calls
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Call History
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'live' ? <LiveCalls /> : <CallHistory />}

      {/* New Call Modal */}
      {isNewCallModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Call</h2>
              <button 
                onClick={() => {
                  setIsNewCallModalOpen(false);
                  setIsContactListOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleNewCall}>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsContactListOpen(!isContactListOpen)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Users className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Contact Selection Dropdown */}
              {isContactListOpen && (
                <div className="mb-4 border rounded-lg max-h-48 overflow-y-auto">
                  {contacts.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => handleContactSelect(contact)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCallModalOpen(false);
                    setIsContactListOpen(false);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Start Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallsPage;