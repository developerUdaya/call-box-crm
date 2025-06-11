import React from 'react';
import { Search, TrendingUp, TrendingDown, Eye, MousePointer } from 'lucide-react';

const SEOInsights = () => {
  const seoMetrics = [
    { label: 'Search Impressions', value: '45,230', change: '+8%', trend: 'up', icon: Eye },
    { label: 'Search Clicks', value: '3,420', change: '+12%', trend: 'up', icon: MousePointer },
    { label: 'Average CTR', value: '7.56%', change: '+0.3%', trend: 'up', icon: TrendingUp },
    { label: 'Average Position', value: '12.4', change: '-1.2', trend: 'up', icon: Search },
  ];

  const topKeywords = [
    { keyword: 'business software', position: 3, clicks: 450, impressions: 8900, ctr: 5.1 },
    { keyword: 'crm solution', position: 7, clicks: 320, impressions: 6200, ctr: 5.2 },
    { keyword: 'sales automation', position: 12, clicks: 180, impressions: 4100, ctr: 4.4 },
    { keyword: 'lead management', position: 15, clicks: 120, impressions: 2800, ctr: 4.3 },
    { keyword: 'customer tracking', position: 18, clicks: 95, impressions: 2200, ctr: 4.3 },
  ];

  const coreWebVitals = [
    { metric: 'Largest Contentful Paint', value: '2.1s', status: 'good', target: '< 2.5s' },
    { metric: 'First Input Delay', value: '85ms', status: 'good', target: '< 100ms' },
    { metric: 'Cumulative Layout Shift', value: '0.08', status: 'needs-improvement', target: '< 0.1' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">SEO Insights</h2>
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* SEO Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {seoMetrics.map((metric) => (
          <div key={metric.label} className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <metric.icon className="h-4 w-4 text-gray-400" />
              <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-semibold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Keywords */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Top Keywords</h3>
        <div className="space-y-2">
          {topKeywords.slice(0, 3).map((keyword, index) => (
            <div key={keyword.keyword} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-blue-600">{keyword.position}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{keyword.keyword}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-900">{keyword.clicks}</div>
                <div className="text-xs text-gray-500">{keyword.ctr}% CTR</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Web Vitals */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Core Web Vitals</h3>
        <div className="space-y-2">
          {coreWebVitals.map((vital) => (
            <div key={vital.metric} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div>
                <div className="text-sm font-medium text-gray-900">{vital.metric}</div>
                <div className="text-xs text-gray-500">{vital.target}</div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 mr-2">{vital.value}</span>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  vital.status === 'good' ? 'bg-green-100 text-green-800' :
                  vital.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vital.status === 'good' ? 'Good' : 
                   vital.status === 'needs-improvement' ? 'Needs Work' : 'Poor'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEOInsights;