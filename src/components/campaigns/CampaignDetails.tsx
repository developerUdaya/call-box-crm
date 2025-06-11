import React, { useState } from 'react';
import { X, Play, Pause, Edit, BarChart3, Target, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

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

interface CampaignDetailsProps {
  campaign: Campaign;
  onClose: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'audience'>('overview');

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

  const conversionRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2);
  const budgetUsed = ((campaign.spend / campaign.budget) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{campaign.name}</h2>
            <div className="mt-2 flex items-center space-x-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(campaign.platform)}`}>
                {campaign.platform.replace('-', ' ')}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="-mb-px flex">
          {['overview', 'performance', 'audience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Campaign Info */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Objective:</span>
                    <span className="ml-2">{campaign.objective}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Duration:</span>
                    <span className="ml-2">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-500">Budget:</span>
                    <span className="ml-2">${campaign.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Usage */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Usage</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Spent: ${campaign.spend.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{budgetUsed}% used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${budgetUsed}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Remaining: ${(campaign.budget - campaign.spend).toLocaleString()}</span>
                  <span className="text-sm text-gray-500">Total: ${campaign.budget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {campaign.status === 'active' ? (
                  <button className="flex items-center justify-center p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100">
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </button>
                ) : (
                  <button className="flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                    <Play className="h-5 w-5 mr-2" />
                    Resume
                  </button>
                )}
                <button className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                  <Edit className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button className="flex items-center justify-center p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics
                </button>
                <button className="flex items-center justify-center p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Optimize
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-900">{campaign.impressions.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Impressions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-900">{campaign.clicks.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Clicks</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-900">{campaign.conversions}</div>
                  <div className="text-sm text-purple-700">Conversions</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-orange-900">{conversionRate}%</div>
                  <div className="text-sm text-orange-700">Conversion Rate</div>
                </div>
              </div>
            </div>

            {/* Cost Metrics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Cost Per Click (CPC)</span>
                  <span className="text-sm font-bold text-gray-900">${campaign.cpc}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Cost Per Mille (CPM)</span>
                  <span className="text-sm font-bold text-gray-900">${campaign.cpm}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Click-Through Rate (CTR)</span>
                  <span className="text-sm font-bold text-gray-900">{campaign.ctr}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Cost Per Conversion</span>
                  <span className="text-sm font-bold text-gray-900">${(campaign.spend / campaign.conversions).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audience' && (
          <div className="space-y-6">
            {/* Audience Targeting */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Targeting</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Target Audience</p>
                    <p className="text-sm text-gray-600 mt-1">{campaign.audience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Insights */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Insights</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Demographics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Age 25-34:</span>
                      <span className="text-sm font-medium text-blue-900">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Age 35-44:</span>
                      <span className="text-sm font-medium text-blue-900">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Age 45+:</span>
                      <span className="text-sm font-medium text-blue-900">20%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Gender</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Male:</span>
                      <span className="text-sm font-medium text-green-900">52%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Female:</span>
                      <span className="text-sm font-medium text-green-900">48%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Top Locations</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">New York:</span>
                      <span className="text-sm font-medium text-purple-900">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">California:</span>
                      <span className="text-sm font-medium text-purple-900">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Texas:</span>
                      <span className="text-sm font-medium text-purple-900">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;