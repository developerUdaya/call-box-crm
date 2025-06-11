import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingUp, DollarSign, Users, Target, BarChart3, PieChart } from 'lucide-react';
import ConversionFunnel from './ConversionFunnel';
import RevenueChart from './RevenueChart';

const SalesReportsPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterSource, setFilterSource] = useState('all');

  const stats = [
    { label: 'Total Leads', value: '1,247', icon: Users, color: 'bg-blue-500', change: '+12%', trend: 'up' },
    { label: 'Contact Rate', value: '71.5%', icon: Target, color: 'bg-green-500', change: '+5%', trend: 'up' },
    { label: 'Conversion Rate', value: '12.5%', icon: TrendingUp, color: 'bg-purple-500', change: '+8%', trend: 'up' },
    { label: 'Total Revenue', value: '$156,780', icon: DollarSign, color: 'bg-orange-500', change: '+22%', trend: 'up' },
  ];

  const conversionData = [
    { stage: 'Leads', count: 1247, percentage: 100 },
    { stage: 'Contacted', count: 892, percentage: 71.5 },
    { stage: 'Qualified', count: 445, percentage: 35.7 },
    { stage: 'Proposal', count: 223, percentage: 17.9 },
    { stage: 'Converted', count: 156, percentage: 12.5 },
  ];

  const revenueBySource = [
    { source: 'Meta Ads', revenue: 65420, percentage: 41.7, color: 'bg-blue-500' },
    { source: 'Google Ads', revenue: 48230, percentage: 30.8, color: 'bg-green-500' },
    { source: 'Website', revenue: 28340, percentage: 18.1, color: 'bg-purple-500' },
    { source: 'Referral', revenue: 14790, percentage: 9.4, color: 'bg-orange-500' },
  ];

  const topPerformers = [
    { name: 'John Doe', leads: 89, conversions: 23, revenue: 34500, conversionRate: 25.8 },
    { name: 'Jane Smith', leads: 76, conversions: 19, revenue: 28750, conversionRate: 25.0 },
    { name: 'Mike Johnson', leads: 82, conversions: 18, revenue: 27200, conversionRate: 22.0 },
    { name: 'Sarah Wilson', leads: 71, conversions: 16, revenue: 24800, conversionRate: 22.5 },
  ];

  const handleExportReport = () => {
    console.log('Exporting sales report...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600">Analytics and performance metrics for leads and sales</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportReport}
            className="btn-secondary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button className="btn-primary flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Custom Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
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
          <select
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Agents</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="mike">Mike Johnson</option>
          </select>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Sources</option>
            <option value="meta-ads">Meta Ads</option>
            <option value="google-ads">Google Ads</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
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
        {/* Conversion Funnel */}
        <ConversionFunnel data={conversionData} />

        {/* Revenue Chart */}
        <RevenueChart />
      </div>

      {/* Revenue by Source & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue by Source */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue by Source</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {revenueBySource.map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">${item.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Agents</h2>
          <div className="space-y-4">
            {topPerformers.map((agent, index) => (
              <div key={agent.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    <div className="text-xs text-gray-500">
                      {agent.leads} leads • {agent.conversions} conversions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">${agent.revenue.toLocaleString()}</div>
                  <div className="text-xs text-green-600">{agent.conversionRate}% rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Detailed Performance Metrics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Deal Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformers.map((agent) => (
                <tr key={agent.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(agent.leads * 0.72)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{agent.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${agent.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${Math.round(agent.revenue / agent.conversions).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {agent.conversionRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReportsPage;