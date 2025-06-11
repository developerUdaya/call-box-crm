import React, { useState } from 'react';
import { Users, Plus, Search, Building, Phone, Calendar, CheckCircle, AlertCircle, UserPlus, Edit, Trash } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  head: {
    name: string;
    email: string;
    avatar: string;
  };
  agentCount: number;
  activeCallCount: number;
  completedTasksCount: number;
  pendingTasksCount: number;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'in-call';
  callStats: {
    total: number;
    completed: number;
    missed: number;
  };
  taskStats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const DepartmentsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isNewDepartmentModalOpen, setIsNewDepartmentModalOpen] = useState(false);
  const [isNewAgentModalOpen, setIsNewAgentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const departments: Department[] = [
    {
      id: '1',
      name: 'Sales',
      head: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      },
      agentCount: 12,
      activeCallCount: 5,
      completedTasksCount: 45,
      pendingTasksCount: 8,
    },
    // Add more departments
  ];

  const agents: Agent[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'Senior Sales Representative',
      status: 'in-call',
      callStats: {
        total: 156,
        completed: 142,
        missed: 14,
      },
      taskStats: {
        total: 45,
        completed: 38,
        pending: 7,
      },
    },
    // Add more agents
  ];

  const handleNewDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for adding new department
    setIsNewDepartmentModalOpen(false);
  };

  const handleNewAgent = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for adding new agent
    setIsNewAgentModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <button
          onClick={() => setIsNewDepartmentModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Department
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Departments List */}
        <div className="col-span-4 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search departments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedDepartment?.id === dept.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-500">{dept.agentCount} Agents</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{dept.activeCallCount} Active Calls</p>
                    <p className="text-sm text-gray-500">{dept.completedTasksCount} Tasks Completed</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Department Details */}
        <div className="col-span-8">
          {selectedDepartment ? (
            <div className="space-y-6">
              {/* Department Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h2>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="flex items-center text-gray-500">
                        <Users className="h-5 w-5 mr-1" />
                        {selectedDepartment.agentCount} Agents
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Phone className="h-5 w-5 mr-1" />
                        {selectedDepartment.activeCallCount} Active Calls
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsNewAgentModalOpen(true)}
                    className="btn-primary flex items-center"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Agent
                  </button>
                </div>

                {/* Department Head */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Department Head</h3>
                  <div className="flex items-center">
                    <img
                      src={selectedDepartment.head.avatar}
                      alt={selectedDepartment.head.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{selectedDepartment.head.name}</p>
                      <p className="text-sm text-gray-500">{selectedDepartment.head.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Agents List */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Agents</h3>
                </div>
                <div className="divide-y">
                  {agents.map((agent) => (
                    <div key={agent.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{agent.name}</h4>
                            <p className="text-sm text-gray-500">{agent.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{agent.callStats.total} Calls</p>
                            <p className="text-sm text-gray-500">{agent.taskStats.completed} Tasks Completed</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            agent.status === 'online'
                              ? 'bg-green-100 text-green-800'
                              : agent.status === 'in-call'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {agent.status === 'online' ? 'Online' : agent.status === 'in-call' ? 'In Call' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a department to view details
            </div>
          )}
        </div>
      </div>

      {/* New Department Modal */}
      {isNewDepartmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Department</h2>
              <button
                onClick={() => setIsNewDepartmentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleNewDepartment}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Head
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department Head</option>
                    {agents.map(agent => (
                      <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewDepartmentModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Agent Modal */}
      {isNewAgentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Agent</h2>
              <button
                onClick={() => setIsNewAgentModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleNewAgent}>
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
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewAgentModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentsPage;