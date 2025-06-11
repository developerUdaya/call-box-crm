import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Send, Paperclip, Smile, Phone, Video, Check, CheckCheck, Users } from 'lucide-react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import BroadcastModal from './BroadcastModal';
import { Contact } from '../../types';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button
          onClick={() => setShowBroadcastModal(true)}
          className="btn-primary flex items-center"
        >
          <Users className="h-4 w-4 mr-2" />
          New Broadcast
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Chat List */}
        <div className="col-span-4 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex justify-between">
              <button className="text-blue-600 text-sm hover:text-blue-700">
                Archived
              </button>
              <button className="text-blue-600 text-sm hover:text-blue-700">
                Unread
              </button>
            </div>
          </div>
          <ChatList
            onSelectChat={setSelectedChat}
            searchQuery={searchQuery}
            selectedChatId={selectedChat?.id}
          />
        </div>

        {/* Chat Window */}
        <div className="col-span-8 bg-white rounded-lg shadow overflow-hidden">
          {selectedChat ? (
            <ChatWindow contact={selectedChat} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <BroadcastModal onClose={() => setShowBroadcastModal(false)} />
      )}
    </div>
  );
};

export default MessagesPage;