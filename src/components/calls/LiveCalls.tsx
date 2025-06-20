import { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone, PhoneIncoming, Mic, MicOff, UserPlus, MessageSquare } from 'lucide-react';

type ActiveCall = {
  id: string;
  name: string;
  number: string;
  duration: string;
  createdAt: string;
  status: 'active' | 'on_hold';
  isMuted: boolean;
  isRecording: boolean;
};

const generateRandomDuration = () => {
  const totalSeconds = Math.floor(Math.random() * 600);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}`;
};

const LiveCalls = () => {
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>([]);

  const [quickDials, setQuickDials] = useState<
    { id: string; name: string; role: string; profileUrl: string | null }[]
  >([]);

  const [incomingCall, setIncomingCall] = useState<{
    name: string;
    number: string;
    company: string;
  } | null>(null);

  const agentId = 'AGENT046';
  const incomingCallId = 'CALL002';
  const vendorId = 'CRM004';

  const toggleMute = (callId: string) => {
    setActiveCalls((prevCalls) =>
      prevCalls.map((call) => {
        if (call.id === callId && call.status === 'active') {
          return { ...call, isMuted: !call.isMuted };
        }
        return call;
      })
    );
  };

  useEffect(() => {
    const fetchActiveCall = async () => {
      try {
        const response = await axios.get(`https://caller-crm-api.justvy.in/current-call/?agentId=${agentId}`);

        const calls = response.data?.current_calls || [];

        const filteredCalls = calls.filter((call: any) =>
          ['ACTIVE', 'ON_HOLD'].includes(call.status?.toUpperCase())
        );

        if (filteredCalls.length > 0) {
          const formattedCalls = await Promise.all(
            filteredCalls.map(async(call: any) => {
              const status = call.status?.toLowerCase();
              const isOnHold = status === 'on_hold';
              
              try {
                const detailRes = await axios.get(`https://caller-crm-api.justvy.in/call/${call.callId}/`);
                const details = detailRes.data.call;

                return {
                  id: call.id,
                  name: details.name || 'Unknown',
                  number: details.mobileNumber || 'Unknown',
                  createdAt: call.created_at,
                  duration: generateRandomDuration(),
                  status,
                  isMuted: isOnHold,
                  isRecording: false,
                };
              } catch (err) {
                console.error(`Error fetching details for callId ${call.callId}:`, err);
                return null;
              }
            })
          );
          setActiveCalls(formattedCalls.filter(Boolean) as ActiveCall[]);
        } else {
          setActiveCalls([]);
        }
      } catch (error) {
        console.error('Error fetching active call:', error);
        setActiveCalls([]);
      }
    };
    fetchActiveCall();

  }, []);

  useEffect(() => {
    const fetchIncomingCall = async () => {
      try {
        const response = await axios.get(
          `https://caller-crm-api.justvy.in/call/${incomingCallId}/`
        );
        const call = response.data?.call;

        if (call && call.callType === 'INCOMING') {
          setIncomingCall({
            name: call.name || `Agent ${call.agentId}`,
            number: call.mobileNumber || 'Unknown Number',
            company: call.vendorId || 'Unknown Company',
          });
        } else {
          setIncomingCall(null);
        }
      } catch (error) {
        console.error('Error fetching incoming call:', error);
        setIncomingCall(null);
      }
    };

    fetchIncomingCall();

    const interval = setInterval(fetchIncomingCall, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchQuickDials = async () => {
      try {
        const response = await axios.get(`https://caller-crm-api.justvy.in/agent/?vendorId=${vendorId}`);

        const agents = Array.isArray(response.data.agents) ? response.data.agents : [];
        console.log('Agents:', agents);

        const formatted = agents.map((agent: any) => ({
          id: agent.id,
          name: agent.name || 'No Name',
          role: agent.role || 'Unknown Role',
          profileUrl: agent.profileUrl || null,
        }));

        setQuickDials(formatted);
      } catch (error) {
        console.error('Error fetching quick dials:', error);
      }
    };

    fetchQuickDials();
  }, []);

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
              <h3 className="text-lg font-semibold">{incomingCall?.name}</h3>
              <p className="text-gray-600">{incomingCall?.number}</p>
              <p className="text-sm text-gray-500">{incomingCall?.company}</p>
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
        {activeCalls.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">No active calls</div>
        ) : (
          <div className="divide-y">
            {activeCalls.map((call) => (
              <div key={call.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-full ${
                        call.status === 'active'
                          ? 'bg-green-100'
                          : 'bg-yellow-100'
                      }`}
                    >
                      <Phone
                        className={`h-5 w-5 ${
                          call.status === 'active'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{call.name}</h3>
                      <p className="text-sm text-gray-600">{call.number}</p>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            call.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {call.status === 'active' ? 'Active' : 'On Hold'}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {call.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleMute(call.id)}
                      disabled={call.status === 'on_hold'} 
                      className={`p-2 rounded-lg ${
                        call.isMuted
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      } hover:bg-gray-200`}
                    >
                      {call.isMuted ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <UserPlus className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${
                        call.isRecording
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      } hover:bg-gray-200`}
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Dial */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Dial</h2>
        <div className="grid grid-cols-3 gap-4">
          {quickDials.map((agent) => (
            <button
              key={agent.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {agent.name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium">{agent.name}</p>
                <p className="text-sm text-gray-500 capitalize">{agent.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCalls;