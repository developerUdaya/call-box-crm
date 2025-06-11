import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CallsPage from './components/calls/CallsPage';
import ContactsPage from './components/contacts/ContactsPage';
import TasksPage from './components/tasks/TasksPage';
import MessagesPage from './components/messages/MessagesPage';
import ProfilePage from './components/profile/ProfilePage';
import DepartmentsPage from './components/departments/DepartmentsPage';
import LeadsPage from './components/leads/LeadsPage';
import CampaignsPage from './components/campaigns/CampaignsPage';
import SalesReportsPage from './components/reports/SalesReportsPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import FloatingCallButton from './components/FloatingCallButton';
import { Phone, PhoneIncoming, X, Mic, MicOff, UserPlus, MessageSquare, Users, PhoneForwarded, PhoneMissed } from 'lucide-react';

interface IncomingCall {
  name: string;
  number: string;
  company: string;
}

function App() {
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [activeCall, setActiveCall] = useState<IncomingCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  const [isConferenceMode, setIsConferenceMode] = useState(false);
  const [showDivertOptions, setShowDivertOptions] = useState(false);

  useEffect(() => {
    const handleIncomingCall = (event: CustomEvent<IncomingCall>) => {
      setIncomingCall(event.detail);
      // Auto-dismiss after 30 seconds
      setTimeout(() => setIncomingCall(null), 30000);
    };

    window.addEventListener('incomingCall', handleIncomingCall as EventListener);

    return () => {
      window.removeEventListener('incomingCall', handleIncomingCall as EventListener);
      if (callTimer) {
        clearInterval(callTimer);
      }
    };
  }, [callTimer]);

  const handleAcceptCall = () => {
    if (incomingCall) {
      if (activeCall) {
        // If there's an active call, enter conference mode
        setIsConferenceMode(true);
      }
      setActiveCall(incomingCall);
      setIncomingCall(null);
      // Start call duration timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallTimer(timer);
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
  };

  const handleEndCall = () => {
    setActiveCall(null);
    setCallDuration(0);
    setIsConferenceMode(false);
    setShowDivertOptions(false);
    if (callTimer) {
      clearInterval(callTimer);
      setCallTimer(null);
    }
  };

  const handleDivertCall = (target: string) => {
    // In a real app, implement call diversion logic here
    console.log(`Diverting call to ${target}`);
    setShowDivertOptions(false);
    handleEndCall();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="ml-64">
          <Header />
          {/* Active Call Bar */}
          {activeCall && (
            <div className="fixed top-16 right-0 left-64 bg-blue-50 border-b border-blue-100 z-40">
              <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{activeCall.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{activeCall.number}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{formatDuration(callDuration)}</span>
                        {isConferenceMode && (
                          <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            Conference Mode
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-lg ${
                        isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      } hover:bg-opacity-80`}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => setIsConferenceMode(!isConferenceMode)}
                      className={`p-2 rounded-lg ${
                        isConferenceMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      } hover:bg-opacity-80`}
                      title="Conference Call"
                    >
                      <Users className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setShowDivertOptions(!showDivertOptions)}
                      className={`p-2 rounded-lg ${
                        showDivertOptions ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      } hover:bg-opacity-80`}
                      title="Divert Call"
                    >
                      <PhoneForwarded className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-2 rounded-lg ${
                        isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      } hover:bg-opacity-80`}
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleEndCall}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      End Call
                    </button>
                  </div>
                </div>
                {/* Call Divert Options */}
                {showDivertOptions && (
                  <div className="mt-3 p-3 bg-white rounded-lg shadow-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Divert Call To:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleDivertCall('voicemail')}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Voicemail
                      </button>
                      <button
                        onClick={() => handleDivertCall('mobile')}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Mobile
                      </button>
                      <button
                        onClick={() => handleDivertCall('secretary')}
                        className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Secretary
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <main className={`pt-16 ${activeCall ? 'mt-14' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calls" element={<CallsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/reports" element={<SalesReportsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
        </div>

        <FloatingCallButton />

        {/* Incoming Call Notification */}
        {incomingCall && (
          <div className="fixed bottom-6 right-6 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 border-blue-500 z-50">
            <div className="p-4">
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
                <button
                  onClick={() => setIncomingCall(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={handleRejectCall}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  <PhoneMissed className="h-5 w-5" />
                </button>
                <button
                  onClick={handleAcceptCall}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                >
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;