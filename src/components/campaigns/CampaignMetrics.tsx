import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

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
}

interface CampaignMetricsProps {
  campaigns: Campaign[];
}

const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ campaigns }) => {
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const avgCTR = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.ctr, 0) / campaigns.length : 0;

  // Mock data for chart visualization
  const chartData = [
    { date: '2024-03-01', spend: 1200, conversions: 15 },
    { date: '2024-03-02', spend: 1350, conversions: 18 },
    { date: '2024-03-03', spend: 1100, conversions: 12 },
    { date: '2024-03-04', spend: 1450, conversions: 22 },
    { date: '2024-03-05', spend: 1600, conversions: 25 },
    { date: '2024-03-06', spend: 1300, conversions: 19 },
    { date: '2024-03-07', spend: 1550, conversions: 28 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">7 Days</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">30 Days</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">90 Days</button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-gray-900">${totalSpend.toLocaleString()}</span>
            <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
          </div>
          <p className="text-sm text-gray-600">Total Spend</p>
          <p className="text-xs text-green-600">+15% vs last period</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</span>
            <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
          </div>
          <p className="text-sm text-gray-600">Total Clicks</p>
          <p className="text-xs text-green-600">+8% vs last period</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-gray-900">{totalConversions}</span>
            <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
          </div>
          <p className="text-sm text-gray-600">Conversions</p>
          <p className="text-xs text-green-600">+22% vs last period</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-gray-900">{avgCTR.toFixed(2)}%</span>
            <TrendingDown className="h-5 w-5 text-red-500 ml-2" />
          </div>
          <p className="text-sm text-gray-600">Avg CTR</p>
          <p className="text-xs text-red-600">-3% vs last period</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Campaign Performance Chart</p>
          <p className="text-sm text-gray-400">Spend vs Conversions over time</p>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Meta Ads Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-blue-700">Spend:</span>
              <span className="text-sm font-medium text-blue-900">
                ${campaigns.filter(c => c.platform === 'meta-ads').reduce((sum, c) => sum + c.spend, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-700">Conversions:</span>
              <span className="text-sm font-medium text-blue-900">
                {campaigns.filter(c => c.platform === 'meta-ads').reduce((sum, c) => sum + c.conversions, 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Google Ads Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-green-700">Spend:</span>
              <span className="text-sm font-medium text-green-900">
                ${campaigns.filter(c => c.platform === 'google-ads').reduce((sum, c) => sum + c.spend, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-700">Conversions:</span>
              <span className="text-sm font-medium text-green-900">
                {campaigns.filter(c => c.platform === 'google-ads').reduce((sum, c) => sum + c.conversions, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetrics;