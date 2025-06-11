import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Send, Paperclip, Smile, Phone, Video, Image, FileText, Camera, Check, CheckCheck } from 'lucide-react';
import { Contact } from '../../types';

interface ChatWindowProps {
  contact: Contact;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'contact';
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact }) => {
  const [message, setMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
const [messages, setMessages] = useState<Array<Message>>([
    {
      id: '1',
      content: 'Hi, I received the proposal. It looks good!',
      timestamp: '10:30 AM',
      sender: 'contact',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      content: 'Great! Would you like to schedule a call to discuss the details?',
      timestamp: '10:31 AM',
      sender: 'user',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      content: 'Here\'s the updated timeline',
      timestamp: '10:32 AM',
      sender: 'user',
      status: 'delivered',
      type: 'file',
      fileUrl: 'project-timeline.pdf'
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user',
        status: 'sent',
        type: 'text'
      }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-gray-600 font-medium">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-500">online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'
            } rounded-lg p-3 shadow-sm`}>
              {msg.type === 'text' ? (
                <p>{msg.content}</p>
              ) : msg.type === 'file' ? (
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>{msg.content}</span>
                </div>
              ) : null}
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              } text-xs`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && (
                  msg.status === 'read' ? (
                    <CheckCheck className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex items-end space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Paperclip className="h-5 w-5" />
            </button>
            {showAttachMenu && (
              <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg p-2 space-y-2">
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full">
                  <Image className="h-5 w-5 text-blue-500" />
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full">
                  <FileText className="h-5 w-5 text-green-500" />
                  <span>Document</span>
                </button>
                <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full">
                  <Camera className="h-5 w-5 text-purple-500" />
                  <span>Camera</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
            />
          </div>
          <button
            onClick={() => setShowAttachMenu(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;