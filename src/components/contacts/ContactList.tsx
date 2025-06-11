import React from 'react';
import { Phone, Mail, Tag } from 'lucide-react';
import { Contact } from '../../types';

interface ContactListProps {
  onSelectContact: (contact: Contact) => void;
  searchQuery: string;
  selectedTags: string[];
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact, searchQuery, selectedTags }) => {
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
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 (555) 987-6543',
      lastContact: '2024-03-14',
      status: 'active',
      tags: ['prospect'],
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      phone: '+1 (555) 234-5678',
      lastContact: '2024-03-13',
      status: 'inactive',
      tags: ['supplier'],
    },
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => contact.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="divide-y">
      {filteredContacts.map(contact => (
        <button
          key={contact.id}
          onClick={() => onSelectContact(contact)}
          className="w-full p-4 hover:bg-gray-50 flex items-start text-left"
        >
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-gray-600 font-medium">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">
                {contact.name}
              </p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {contact.status}
              </span>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-1" />
              <span className="truncate">{contact.phone}</span>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-1" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {contact.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ContactList;