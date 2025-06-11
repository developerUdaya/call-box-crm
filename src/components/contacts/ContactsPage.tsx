import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, Tags, Mail, MessageSquare, Trash, Edit, X } from 'lucide-react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import { Contact } from '../../types';

const ContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for adding contact
    setIsAddModalOpen(false);
  };

  const handleBulkMessage = () => {
    // Implementation for bulk messaging
  };

  const handleImportContacts = () => {
    // Implementation for importing contacts
  };

  const handleExportContacts = () => {
    // Implementation for exporting contacts
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleBulkMessage}
            className="btn-secondary flex items-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Bulk Message
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - Contact List */}
        <div className="col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search contacts..."
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
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={handleImportContacts}
                  className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </button>
                <button
                  onClick={handleExportContacts}
                  className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
              <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Tags className="h-4 w-4 mr-1" />
                Tags
              </button>
            </div>
          </div>
          <ContactList onSelectContact={setSelectedContact} searchQuery={searchQuery} selectedTags={selectedTags} />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="col-span-2">
          {selectedContact ? (
            <ContactDetails contact={selectedContact} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Contact</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddContact}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Add tags separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;