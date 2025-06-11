import React, { useState } from 'react';
import { Calendar, Phone, Mail, User, MapPin, Tag, Clock } from 'lucide-react';
import { Lead } from '../../types';

interface LeadKanbanProps {
  onSelectLead: (lead: Lead) => void;
  searchQuery: string;
  filterStage: string;
  filterSource: string;
}

const LeadKanban: React.FC<LeadKanbanProps> = ({
  onSelectLead,
  searchQuery,
  filterStage,
  filterSource,
}) => {
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const stages = [
    { id: 'new', name: 'New', color: 'bg-blue-100 border-blue-300', count: 45 },
    { id: 'contacted', name: 'Contacted', color: 'bg-yellow-100 border-yellow-300', count: 32 },
    { id: 'follow-up', name: 'Follow-Up', color: 'bg-orange-100 border-orange-300', count: 28 },
    { id: 'converted', name: 'Converted', color: 'bg-green-100 border-green-300', count: 15 },
    { id: 'rejected', name: 'Rejected', color: 'bg-red-100 border-red-300', count: 8 },
  ];

  const leads: Lead[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 (555) 123-4567',
      stage: 'new',
      source: 'meta-ads',
      campaign: 'Summer Sale 2024',
      assignedTo: 'John Doe',
      createdAt: '2024-03-15T10:30:00',
      lastContact: null,
      notes: [],
      value: 5000,
      company: 'Tech Solutions Inc.',
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      phone: '+1 (555) 987-6543',
      stage: 'contacted',
      source: 'google-ads',
      campaign: 'Product Launch Campaign',
      assignedTo: 'Jane Smith',
      createdAt: '2024-03-14T14:20:00',
      lastContact: '2024-03-15T09:00:00',
      notes: [],
      value: 3500,
      company: 'Digital Marketing Co.',
    },
    // Add more leads...
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = filterStage === 'all' || lead.stage === filterStage;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;

    return matchesSearch && matchesStage && matchesSource;
  });

  const getLeadsByStage = (stageId: string) => {
    return filteredLeads.filter(lead => lead.stage === stageId);
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedLead && draggedLead.stage !== stageId) {
      // Update lead stage - in real app, this would call an API
      console.log(`Moving lead ${draggedLead.id} to stage ${stageId}`);
    }
    setDraggedLead(null);
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'meta-ads':
        return 'bg-blue-100 text-blue-800';
      case 'google-ads':
        return 'bg-green-100 text-green-800';
      case 'website':
        return 'bg-purple-100 text-purple-800';
      case 'manual':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className={`flex-shrink-0 w-80 ${stage.color} rounded-lg border-2 border-dashed`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.id)}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{stage.name}</h3>
              <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                {getLeadsByStage(stage.id).length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {getLeadsByStage(stage.id).map((lead) => (
              <div
                key={lead.id}
                draggable
                onDragStart={(e) => handleDragStart(e, lead)}
                onClick={() => onSelectLead(lead)}
                className="bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {lead.firstName} {lead.lastName}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(lead.source)}`}>
                    {lead.source.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{lead.phone}</span>
                  </div>
                  {lead.company && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{lead.company}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{lead.assignedTo}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">
                    ${lead.value?.toLocaleString()}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {lead.campaign && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {lead.campaign}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadKanban;