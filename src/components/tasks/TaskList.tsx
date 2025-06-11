import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../../types';

interface TaskListProps {
  onSelectTask: (task: Task) => void;
  searchQuery: string;
  filterPriority: 'all' | 'high' | 'medium' | 'low';
  filterStatus: 'all' | 'pending' | 'completed';
}

const TaskList: React.FC<TaskListProps> = ({
  onSelectTask,
  searchQuery,
  filterPriority,
  filterStatus,
}) => {
  const tasks: Task[] = [
    {
      id: '1',
      contactId: '1',
      title: 'Follow up with Sarah Wilson',
      description: 'Discuss the new product requirements and timeline',
      dueDate: '2024-03-20T14:00:00',
      status: 'pending',
      priority: 'high',
    },
    {
      id: '2',
      contactId: '2',
      title: 'Schedule demo with Michael Brown',
      description: 'Product demonstration for the sales team',
      dueDate: '2024-03-21T10:00:00',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: '3',
      contactId: '3',
      title: 'Review proposal for Emma Davis',
      description: 'Review and update the proposal based on feedback',
      dueDate: '2024-03-19T16:00:00',
      status: 'completed',
      priority: 'low',
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="divide-y">
      {filteredTasks.map(task => (
        <button
          key={task.id}
          onClick={() => onSelectTask(task)}
          className="w-full p-4 hover:bg-gray-50 text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {task.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-500" />
                )}
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {task.title}
                </h3>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {task.description}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            {task.status === 'pending' && new Date(task.dueDate) < new Date() && (
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TaskList;