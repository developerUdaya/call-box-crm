import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, Users, MessageSquare, Calendar, Eye, Edit, Trash, Target, TrendingUp, DollarSign } from 'lucide-react';
import LeadKanban from './LeadKanban';
import LeadTable from './LeadTable';
import LeadDetails from './LeadDetails';
import BulkImportModal from './BulkImportModal';
import { Lead } from '../../types';

const LeadsPage = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');

  const stats = [
    { label: 'Total Leads', value: '1,247', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Contacted', value: '892', icon: MessageSquare, color: 'bg-green-500', change: '+8%' },
    { label: 'Converted', value: '156', icon: Target, color: 'bg-purple-500', change: '+15%' },
    { label: 'Revenue', value: '$45,230', icon: DollarSign, color: 'bg-orange-500', change: '+22%' },
  ];

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
  };

  const handleExportLeads = () => {
    // Implementation for exporting leads to CSV/Excel
    console.log('Exporting leads...');
  };

  const handleSyncLeads = () => {
    // Implementation for syncing leads from Meta Ads and Google Ads
    console.log('Syncing leads from ad platforms...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600">Manage leads from Meta Ads, Google Ads, and manual entries</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSyncLeads}
            className="btn-secondary flex items-center"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Sync Ads
          </button>
          <button
            onClick={() => setIsBulkImportOpen(true)}
            className="btn-secondary flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </button>
          <button
            onClick={handleExportLeads}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Stages</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="follow-up">Follow-Up</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Sources</option>
              <option value="meta-ads">Meta Ads</option>
              <option value="google-ads">Google Ads</option>
              <option value="manual">Manual</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-2 rounded-lg ${
                viewMode === 'kanban' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-lg ${
                viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        <div className={selectedLead ? 'col-span-8' : 'col-span-12'}>
          {viewMode === 'kanban' ? (
            <LeadKanban
              onSelectLead={setSelectedLead}
              searchQuery={searchQuery}
              filterStage={filterStage}
              filterSource={filterSource}
            />
          ) : (
            <LeadTable
              onSelectLead={setSelectedLead}
              searchQuery={searchQuery}
              filterStage={filterStage}
              filterSource={filterSource}
            />
          )}
        </div>
        {selectedLead && (
          <div className="col-span-4">
            <LeadDetails
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
            />
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Lead</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddLead}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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
                    Source
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Source</option>
                    <option value="meta-ads">Meta Ads</option>
                    <option value="google-ads">Google Ads</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Agent
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Agent</option>
                    <option value="agent1">John Doe</option>
                    <option value="agent2">Jane Smith</option>
                    <option value="agent3">Mike Johnson</option>
                  </select>
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
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {isBulkImportOpen && (
        <BulkImportModal onClose={() => setIsBulkImportOpen(false)} />
      )}
    </div>
  );
};

export default LeadsPage;