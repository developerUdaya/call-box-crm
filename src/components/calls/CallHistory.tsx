import React, { useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Download, Filter, Search, Clock, Play, Pause, SkipBack, SkipForward, Mic, FileText, Calendar, Tag } from 'lucide-react';

interface RecordingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recording: {
    id: string;
    date: string;
    duration: string;
    url: string;
  };
}

const RecordingDialog: React.FC<RecordingDialogProps> = ({ isOpen, onClose, recording }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Call Recording</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Recording ID: {recording.id}</span>
            <span>{recording.date}</span>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <SkipBack className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="relative">
                <div className="h-1 bg-gray-300 rounded">
                  <div 
                    className="absolute h-1 bg-blue-500 rounded"
                    style={{ width: `${(currentTime / parseInt(recording.duration)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0:00</span>
                <span>{recording.duration}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="ml-2 text-sm text-gray-500">{volume}%</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Transcript
            </button>
            <button 
              className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CallHistory = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'missed'>('all');
  const [selectedRecording, setSelectedRecording] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const calls = [
    {
      id: '1',
      name: 'Sarah Wilson',
      number: '+1 (555) 123-4567',
      type: 'incoming',
      status: 'completed',
      duration: '5:23',
      date: '2024-03-15',
      time: '10:30 AM',
      sentiment: 'positive',
      hasRecording: true,
      hasTranscript: true,
      notes: 'Discussed new product features and pricing',
      tags: ['sales', 'follow-up'],
      agent: 'John Doe'
    },
    {
      id: '2',
      name: 'Michael Brown',
      number: '+1 (555) 987-6543',
      type: 'outgoing',
      status: 'completed',
      duration: '3:45',
      date: '2024-03-15',
      time: '11:15 AM',
      sentiment: 'neutral',
      hasRecording: true,
      hasTranscript: false,
      notes: 'Technical support call regarding API integration',
      tags: ['support', 'technical'],
      agent: 'Jane Smith'
    },
    {
      id: '3',
      name: 'Emma Davis',
      number: '+1 (555) 234-5678',
      type: 'incoming',
      status: 'missed',
      duration: '',
      date: '2024-03-14',
      time: '2:30 PM',
      sentiment: 'neutral',
      hasRecording: false,
      hasTranscript: false,
      notes: 'Missed call - no voicemail',
      tags: ['follow-up'],
      agent: '-'
    }
  ];

  const filteredCalls = calls.filter(call => {
    if (filterStatus !== 'all' && call.status !== filterStatus) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        call.name.toLowerCase().includes(searchLower) ||
        call.number.includes(searchQuery) ||
        call.notes.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search calls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Filter className="h-5 w-5" />
          </button>
        </div>
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="border rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="all">All Calls</option>
            <option value="completed">Completed</option>
            <option value="missed">Missed</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Call List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCalls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {call.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{call.name}</div>
                      <div className="text-sm text-gray-500">{call.number}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {call.type === 'incoming' ? (
                      <PhoneIncoming className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <PhoneOutgoing className="h-4 w-4 text-blue-500 mr-1" />
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      call.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {call.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{call.date}</span>
                    <Clock className="h-4 w-4 mx-1 text-gray-400" />
                    <span>{call.time}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.duration || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.agent}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div>
                    <p className="line-clamp-2">{call.notes}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {call.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {call.hasRecording && (
                      <button
                        onClick={() => setSelectedRecording({
                          id: call.id,
                          date: call.date,
                          duration: call.duration,
                          url: '#' // Replace with actual recording URL
                        })}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Mic className="h-4 w-4 mr-1" />
                        Recording
                      </button>
                    )}
                    {call.hasTranscript && (
                      <button className="flex items-center text-blue-600 hover:text-blue-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Transcript
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recording Dialog */}
      {selectedRecording && (
        <RecordingDialog
          isOpen={!!selectedRecording}
          onClose={() => setSelectedRecording(null)}
          recording={selectedRecording}
        />
      )}
    </div>
  );
};

export default CallHistory;