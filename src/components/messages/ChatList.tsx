import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Contact } from '../../types';

interface ChatListProps {
  onSelectChat: (contact: Contact) => void;
  searchQuery: string;
  selectedChatId: string | undefined;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, searchQuery, selectedChatId }) => {
  const chats: (Contact & { lastMessage: string; timestamp: string; unread: number })[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 123-4567',
      lastContact: '2024-03-15',
      status: 'active',
      tags: ['client', 'vip'],
      lastMessage: 'I\'ll review the proposal and get back to you.',
      timestamp: '10:30 AM',
      unread: 2,
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 (555) 987-6543',
      lastContact: '2024-03-14',
      status: 'active',
      tags: ['prospect'],
      lastMessage: 'The demo was great! Looking forward to next steps.',
      timestamp: '9:45 AM',
      unread: 0,
    },
    // Add more chats as needed
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y overflow-y-auto" style={{ height: 'calc(100% - 6rem)' }}>
      {filteredChats.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`w-full p-4 hover:bg-gray-50 flex items-start text-left ${
            selectedChatId === chat.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-gray-600 font-medium">
              {chat.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {chat.timestamp}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate max-w-[200px]">
                {chat.lastMessage}
              </p>
              {chat.unread > 0 ? (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </span>
              ) : (
                <CheckCheck className="h-4 w-4 text-blue-500" />
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;