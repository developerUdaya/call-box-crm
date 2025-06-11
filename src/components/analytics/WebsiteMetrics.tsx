import React, { useState } from 'react';
import { TrendingUp, Users, Eye } from 'lucide-react';

const WebsiteMetrics = () => {
  const [metricType, setMetricType] = useState('sessions');

  // Mock data for website metrics
  const metricsData = {
    sessions: [
      { date: '2024-03-01', value: 1240 },
      { date: '2024-03-02', value: 1350 },
      { date: '2024-03-03', value: 1180 },
      { date: '2024-03-04', value: 1420 },
      { date: '2024-03-05', value: 1580 },
      { date: '2024-03-06', value: 1320 },
      { date: '2024-03-07', value: 1650 },
    ],
    pageviews: [
      { date: '2024-03-01', value: 3240 },
      { date: '2024-03-02', value: 3650 },
      { date: '2024-03-03', value: 3180 },
      { date: '2024-03-04', value: 3820 },
      { date: '2024-03-05', value: 4280 },
      { date: '2024-03-06', value: 3520 },
      { date: '2024-03-07', value: 4450 },
    ],
    users: [
      { date: '2024-03-01', value: 980 },
      { date: '2024-03-02', value: 1120 },
      { date: '2024-03-03', value: 950 },
      { date: '2024-03-04', value: 1180 },
      { date: '2024-03-05', value: 1320 },
      { date: '2024-03-06', value: 1080 },
      { date: '2024-03-07', value: 1380 },
    ],
  };

  const currentData = metricsData[metricType as keyof typeof metricsData];
  const maxValue = Math.max(...currentData.map(d => d.value));

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'sessions':
        return Users;
      case 'pageviews':
        return Eye;
      case 'users':
        return TrendingUp;
      default:
        return Users;
    }
  };

  const MetricIcon = getMetricIcon(metricType);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Website Traffic</h2>
        <div className="flex items-center space-x-2">
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value)}
            className="text-sm border rounded-lg px-2 py-1"
          >
            <option value="sessions">Sessions</option>
            <option value="pageviews">Page Views</option>
            <option value="users">Users</option>
          </select>
          <MetricIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end space-x-1 mb-4">
        {currentData.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative group"
                  style={{ height: `${height * 1.5}px` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(item.date).getDate()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {currentData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {Math.round(currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Daily Avg</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">
            +12%
          </div>
          <div className="text-sm text-gray-500">vs Last Week</div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteMetrics;