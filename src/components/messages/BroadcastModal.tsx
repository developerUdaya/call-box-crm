import React, { useState } from 'react';
import { Contact } from '../../types';
import { X, Search, Plus, BookTemplate as Template, Send, Check } from 'lucide-react';

interface BroadcastModalProps {
  onClose: () => void;
}

const BroadcastModal: React.FC<BroadcastModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 123-4567',
      lastContact: '2024-03-15',
      status: 'active',
      tags: ['client', 'vip'],
    },
    // Add more contacts
  ];

  const templates = [
    {
      id: '1',
      name: 'Meeting Follow-up',
      content: 'Thank you for your time today. As discussed, I\'m sharing the {{document}}. Please let me know if you have any questions.',
    },
    {
      id: '2',
      name: 'Payment Reminder',
      content: 'This is a friendly reminder that payment for invoice {{invoice_number}} is due on {{due_date}}.',
    },
    {
      id: '3',
      name: 'Product Update',
      content: 'We\'re excited to announce new features in {{product_name}}! Check them out at {{link}}.',
    },
  ];

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleBroadcast = () => {
    // Implementation for sending broadcast message
    console.log('Broadcasting to:', selectedContacts);
    console.log('Template:', selectedTemplate);
    console.log('Custom message:', customMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">New Broadcast Message</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Contact Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select Recipients</h3>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="border rounded-lg max-h-48 overflow-y-auto">
                {contacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => handleContactSelect(contact.id)}
                    className={`w-full p-3 flex items-center justify-between hover:bg-gray-50 ${
                      selectedContacts.includes(contact.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-600">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                      </div>
                    </div>
                    {selectedContacts.includes(contact.id) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Message Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setCustomMessage(template.content);
                    }}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Template className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium text-sm">{template.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <p className="mt-1 text-sm text-gray-500">
  Use <code>{'{{variable}}'}</code> for dynamic content
</p>

            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
           <button
                onClick={handleBroadcast}
                disabled={selectedContacts.length === 0 || !customMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 disabled:bg-gray-300"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
              </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastModal;