import React, { useState } from 'react';
import { Globe, Search, Users, Clock, Smartphone, Monitor, Tablet, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import WebsiteMetrics from './WebsiteMetrics';
import SEOInsights from './SEOInsights';
import TrafficSources from './TrafficSources';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [isConnected, setIsConnected] = useState(true);

  const stats = [
    { label: 'Total Sessions', value: '24,567', icon: Users, color: 'bg-blue-500', change: '+12%', trend: 'up' },
    { label: 'Page Views', value: '89,234', icon: Globe, color: 'bg-green-500', change: '+8%', trend: 'up' },
    { label: 'Avg Session Duration', value: '3m 42s', icon: Clock, color: 'bg-purple-500', change: '+15%', trend: 'up' },
    { label: 'Bounce Rate', value: '34.2%', icon: TrendingDown, color: 'bg-orange-500', change: '-5%', trend: 'down' },
  ];

  const deviceBreakdown = [
    { device: 'Desktop', sessions: 14740, percentage: 60.0, icon: Monitor },
    { device: 'Mobile', sessions: 8603, percentage: 35.0, icon: Smartphone },
    { device: 'Tablet', sessions: 1224, percentage: 5.0, icon: Tablet },
  ];

  const topPages = [
    { page: '/', views: 12450, bounceRate: 28.5, avgTime: '4m 12s' },
    { page: '/products', views: 8920, bounceRate: 32.1, avgTime: '3m 45s' },
    { page: '/about', views: 5670, bounceRate: 45.2, avgTime: '2m 18s' },
    { page: '/contact', views: 3240, bounceRate: 38.7, avgTime: '2m 55s' },
    { page: '/blog', views: 2890, bounceRate: 41.3, avgTime: '5m 22s' },
  ];

  const seoAlerts = [
    { type: 'warning', message: '5 pages have missing meta descriptions', priority: 'medium' },
    { type: 'error', message: '2 broken internal links detected', priority: 'high' },
    { type: 'success', message: 'Core Web Vitals improved by 15%', priority: 'low' },
    { type: 'warning', message: 'Page load speed decreased on mobile', priority: 'medium' },
  ];

  const handleConnectGA = () => {
    console.log('Connecting to Google Analytics...');
    setIsConnected(true);
  };

  const handleConnectGSC = () => {
    console.log('Connecting to Google Search Console...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website & SEO Analytics</h1>
          <p className="text-gray-600">Monitor website traffic, user behavior, and SEO performance</p>
        </div>
        <div className="flex space-x-3">
          {!isConnected && (
            <button
              onClick={handleConnectGA}
              className="btn-secondary flex items-center"
            >
              <Globe className="h-4 w-4 mr-2" />
              Connect GA
            </button>
          )}
          <button
            onClick={handleConnectGSC}
            className="btn-secondary flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Connect GSC
          </button>
        </div>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-900">Analytics Not Connected</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Connect your Google Analytics and Search Console accounts to view real data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Date Range Filter */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Date Range:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
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
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WebsiteMetrics />
        <TrafficSources />
      </div>

      {/* Device Breakdown & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h2>
          <div className="space-y-4">
            {deviceBreakdown.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center">
                  <device.icon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">{device.device}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${device.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <div className="text-sm font-semibold text-gray-900">{device.sessions.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{device.percentage}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h2>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{page.page}</div>
                    <div className="text-xs text-gray-500">{page.views.toLocaleString()} views</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-900">{page.avgTime}</div>
                  <div className="text-xs text-gray-500">{page.bounceRate}% bounce</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SEOInsights />

        {/* SEO Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Alerts</h2>
          <div className="space-y-3">
            {seoAlerts.map((alert, index) => (
              <div key={index} className={`flex items-start p-3 rounded-lg ${
                alert.type === 'error' ? 'bg-red-50' :
                alert.type === 'warning' ? 'bg-yellow-50' :
                'bg-green-50'
              }`}>
                <div className="flex-shrink-0 mr-3">
                  {alert.type === 'error' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${
                    alert.type === 'error' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    'text-green-800'
                  }`}>
                    {alert.message}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;