import { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, Tags, MessageSquare } from 'lucide-react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import { Contact } from '../../types';
import { getCustomerAPi } from '../../Api-Services/ContactApis';
import { useQuery } from '@tanstack/react-query';
import ContactModal from './ContactModal';

const ContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const vendorId: any = import.meta.env.VITE_VENDOR_ID;

  // const handleAddContact = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Implementation for adding contact
  //   setIsAddModalOpen(false);
  // };

  const handleBulkMessage = () => {
    // Implementation for bulk messaging
  };

  const handleImportContacts = () => {
    // Implementation for importing contacts
  };

  const handleExportContacts = () => {
    // Implementation for exporting contacts
  };

  const getCustomerData: any = useQuery({
    queryKey: ['getCustomerData', vendorId],
    queryFn: () => getCustomerAPi(`?vendorId=${vendorId}`)
  })



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <div className="flex space-x-3 flex-wrap">
          <button
            onClick={handleBulkMessage}
            className="btn-secondary flex items-center mb-2"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Bulk Message
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center mb-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Left Panel - Contact List */}
        <div className="col-span-1 xl:col-span-1 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex flex-wrap items-center space-x-3 mb-4">
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
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap space-x-2">
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
          <ContactList contacts={getCustomerData?.data?.data?.customers} onSelectContact={setSelectedContact} searchQuery={searchQuery} selectedTags={selectedTags} />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="col-span-1 md:col-span-1 xl:col-span-2">
          {selectedContact ? (
            <ContactDetails data={getCustomerData?.data?.data?.customers} selectId={selectedContact} setSelectedContact={setSelectedContact} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {isAddModalOpen && (
        <ContactModal
          handleClose={() => setIsAddModalOpen(!isAddModalOpen)}
        />
      )}
    </div>
  );
};

export default ContactsPage;