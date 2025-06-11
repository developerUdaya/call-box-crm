import React, { useState } from 'react';
import { Plus, Search, Filter, Play, Pause, BarChart3, TrendingUp, DollarSign, Eye, Target, AlertTriangle } from 'lucide-react';
import CampaignMetrics from './CampaignMetrics';
import CampaignDetails from './CampaignDetails';

interface Campaign {
  id: string;
  name: string;
  platform: 'meta-ads' | 'google-ads';
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  startDate: string;
  endDate: string;
  audience: string;
  objective: string;
}

const CampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'meta-ads',
      status: 'active',
      budget: 5000,
      spend: 3200,
      impressions: 125000,
      clicks: 2500,
      conversions: 45,
      ctr: 2.0,
      cpc: 1.28,
      cpm: 25.6,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      audience: 'Age 25-45, Interested in Technology',
      objective: 'Conversions',
    },
    {
      id: '2',
      name: 'Product Launch Campaign',
      platform: 'google-ads',
      status: 'active',
      budget: 8000,
      spend: 4500,
      impressions: 89000,
      clicks: 1800,
      conversions: 32,
      ctr: 2.02,
      cpc: 2.50,
      cpm: 50.56,
      startDate: '2024-03-10',
      endDate: '2024-04-10',
      audience: 'Keywords: software, productivity, business',
      objective: 'Lead Generation',
    },
  ];

  const stats = [
    { label: 'Total Campaigns', value: '12', icon: Target, color: 'bg-blue-500', change: '+2' },
    { label: 'Active Campaigns', value: '8', icon: Play, color: 'bg-green-500', change: '+1' },
    { label: 'Total Spend', value: '$24,500', icon: DollarSign, color: 'bg-purple-500', change: '+15%' },
    { label: 'Total Conversions', value: '156', icon: TrendingUp, color: 'bg-orange-500', change: '+22%' },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || campaign.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'meta-ads':
        return 'bg-blue-100 text-blue-800';
      case 'google-ads':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePauseCampaign = (campaignId: string) => {
    console.log('Pausing campaign:', campaignId);
  };

  const handleResumeCampaign = (campaignId: string) => {
    console.log('Resuming campaign:', campaignId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ad Campaigns</h1>
          <p className="text-gray-600">Manage and monitor your Meta Ads and Google Ads campaigns</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="btn-secondary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Connect Account
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
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

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Platforms</option>
            <option value="meta-ads">Meta Ads</option>
            <option value="google-ads">Google Ads</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Campaign Metrics Chart */}
      <CampaignMetrics campaigns={filteredCampaigns} />

      {/* Campaigns Table */}
      <div className="grid grid-cols-12 gap-6">
        <div className={selectedCampaign ? 'col-span-8' : 'col-span-12'}>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget / Spend
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.objective}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(campaign.platform)}`}>
                        {campaign.platform.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                        {campaign.spend / campaign.budget > 0.9 && (
                          <AlertTriangle className="h-4 w-4 text-orange-500 ml-2" title="Budget nearly exhausted" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(campaign.spend / campaign.budget) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {campaign.clicks.toLocaleString()} clicks • {campaign.conversions} conversions
                      </div>
                      <div className="text-sm text-gray-500">
                        CTR: {campaign.ctr}% • CPC: ${campaign.cpc}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedCampaign(campaign)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {campaign.status === 'active' ? (
                          <button
                            onClick={() => handlePauseCampaign(campaign.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <Pause className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleResumeCampaign(campaign.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Play className="h-4 w-4" />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCampaign && (
          <div className="col-span-4">
            <CampaignDetails
              campaign={selectedCampaign}
              onClose={() => setSelectedCampaign(null)}
            />
          </div>
        )}
      </div>

      {/* Connect Account Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Connect Ad Account</h2>
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-medium">Connect Meta Ads</span>
              </button>
              <button className="w-full flex items-center justify-center p-4 border-2 border-green-200 rounded-lg hover:border-green-300">
                <div className="w-8 h-8 bg-green-600 rounded mr-3"></div>
                <span className="font-medium">Connect Google Ads</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;