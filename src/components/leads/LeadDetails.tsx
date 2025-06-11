import React, { useState } from 'react';
import { X, Phone, Mail, Calendar, User, Tag, MessageSquare, Clock, Edit, Trash, Bell } from 'lucide-react';
import { Lead } from '../../types';

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'activity'>('overview');
  const [newNote, setNewNote] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  const handleSetReminder = () => {
    if (reminderDate) {
      // Set reminder logic here
      console.log('Setting reminder for:', reminderDate);
      setReminderDate('');
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'follow-up':
        return 'bg-orange-100 text-orange-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activities = [
    {
      id: '1',
      type: 'note',
      content: 'Initial contact made via email',
      timestamp: '2024-03-15T10:30:00',
      user: 'John Doe',
    },
    {
      id: '2',
      type: 'call',
      content: 'Phone call - discussed requirements',
      timestamp: '2024-03-15T14:20:00',
      user: 'John Doe',
    },
    {
      id: '3',
      type: 'stage_change',
      content: 'Stage changed from New to Contacted',
      timestamp: '2024-03-15T14:25:00',
      user: 'System',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {lead.firstName} {lead.lastName}
            </h2>
            <p className="text-gray-600">{lead.company}</p>
            <div className="mt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                {lead.stage.replace('-', ' ')}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex">
          {['overview', 'notes', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Assigned to {lead.assignedTo}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <span>Created {new Date(lead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Lead Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Source:</span>
                  <span className="ml-2">{lead.source.replace('-', ' ')}</span>
                </div>
                {lead.campaign && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Campaign:</span>
                    <span className="ml-2">{lead.campaign}</span>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-500">Estimated Value:</span>
                  <span className="ml-2 font-medium text-green-600">${lead.value?.toLocaleString()}</span>
                </div>
                {lead.lastContact && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Contact:</span>
                    <span className="ml-2">{new Date(lead.lastContact).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <Phone className="h-5 w-5 mr-2" />
                  Call
                </button>
                <button className="flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                  <Mail className="h-5 w-5 mr-2" />
                  Email
                </button>
                <button className="flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message
                </button>
                <button className="flex items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule
                </button>
              </div>
            </div>

            {/* Set Reminder */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Set Follow-up Reminder</h3>
              <div className="flex space-x-3">
                <input
                  type="datetime-local"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSetReminder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Set
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Add Note */}
            <div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Note
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {lead.notes?.map((note, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">John Doe</span>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {activity.type === 'note' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'stage_change' && <Tag className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetails;