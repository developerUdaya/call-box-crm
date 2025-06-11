import React from 'react';
import { Globe, Search, Share2, Mail, ExternalLink } from 'lucide-react';

const TrafficSources = () => {
  const trafficSources = [
    { 
      source: 'Organic Search', 
      sessions: 12450, 
      percentage: 50.7, 
      icon: Search, 
      color: 'bg-green-500',
      change: '+8%'
    },
    { 
      source: 'Direct', 
      sessions: 6890, 
      percentage: 28.0, 
      icon: Globe, 
      color: 'bg-blue-500',
      change: '+5%'
    },
    { 
      source: 'Social Media', 
      sessions: 3240, 
      percentage: 13.2, 
      icon: Share2, 
      color: 'bg-purple-500',
      change: '+15%'
    },
    { 
      source: 'Email', 
      sessions: 1450, 
      percentage: 5.9, 
      icon: Mail, 
      color: 'bg-orange-500',
      change: '+3%'
    },
    { 
      source: 'Referral', 
      sessions: 540, 
      percentage: 2.2, 
      icon: ExternalLink, 
      color: 'bg-gray-500',
      change: '-2%'
    },
  ];

  const totalSessions = trafficSources.reduce((sum, source) => sum + source.sessions, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
        <Globe className="h-5 w-5 text-gray-400" />
      </div>

      {/* Donut Chart Representation */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            {/* Segments for each traffic source */}
            {trafficSources.map((source, index) => {
              const offset = trafficSources.slice(0, index).reduce((sum, s) => sum + s.percentage, 0);
              const circumference = 2 * Math.PI * 15.9155;
              const strokeDasharray = `${(source.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((offset / 100) * circumference);
              
              return (
                <path
                  key={source.source}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={source.color.replace('bg-', '').replace('-500', '') === 'green' ? '#10b981' :
                         source.color.replace('bg-', '').replace('-500', '') === 'blue' ? '#3b82f6' :
                         source.color.replace('bg-', '').replace('-500', '') === 'purple' ? '#8b5cf6' :
                         source.color.replace('bg-', '').replace('-500', '') === 'orange' ? '#f59e0b' :
                         '#6b7280'}
                  strokeWidth="3"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{totalSessions.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Source List */}
      <div className="space-y-3">
        {trafficSources.map((source) => (
          <div key={source.source} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${source.color} mr-3`}></div>
              <source.icon className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-900">{source.source}</span>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-2">
                  {source.sessions.toLocaleString()}
                </span>
                <span className={`text-xs ${source.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {source.change}
                </span>
              </div>
              <div className="text-xs text-gray-500">{source.percentage}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Top Source:</span>
            <span className="font-semibold text-gray-900 ml-2">Organic Search</span>
          </div>
          <div>
            <span className="text-gray-600">Growth Leader:</span>
            <span className="font-semibold text-green-600 ml-2">Social Media</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSources;