export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastContact: string;
  status: 'active' | 'inactive';
  tags: string[];
}

export interface Call {
  id: string;
  contactId: string;
  timestamp: string;
  duration: number;
  type: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'scheduled';
  notes: string;
}

export interface Task {
  id: string;
  contactId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  stage: 'new' | 'contacted' | 'follow-up' | 'converted' | 'rejected';
  source: 'meta-ads' | 'google-ads' | 'website' | 'referral' | 'manual';
  campaign?: string;
  assignedTo: string;
  createdAt: string;
  lastContact?: string;
  notes: string[];
  value?: number;
  company?: string;
}