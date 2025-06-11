import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

const RevenueChart = () => {
  const [chartPeriod, setChartPeriod] = useState('daily');

  // Mock data for revenue chart
  const revenueData = {
    daily: [
      { date: '2024-03-01', revenue: 4200, orders: 8 },
      { date: '2024-03-02', revenue: 5100, orders: 12 },
      { date: '2024-03-03', revenue: 3800, orders: 7 },
      { date: '2024-03-04', revenue: 6200, orders: 15 },
      { date: '2024-03-05', revenue: 7100, orders: 18 },
      { date: '2024-03-06', revenue: 5900, orders: 14 },
      { date: '2024-03-07', revenue: 8300, orders: 22 },
    ],
    weekly: [
      { date: 'Week 1', revenue: 28400, orders: 68 },
      { date: 'Week 2', revenue: 32100, orders: 78 },
      { date: 'Week 3', revenue: 29800, orders: 72 },
      { date: 'Week 4', revenue: 35600, orders: 85 },
    ],
    monthly: [
      { date: 'Jan', revenue: 125400, orders: 298 },
      { date: 'Feb', revenue: 138200, orders: 325 },
      { date: 'Mar', revenue: 156780, orders: 378 },
    ],
  };

  const currentData = revenueData[chartPeriod as keyof typeof revenueData];
  const maxRevenue = Math.max(...currentData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
        <div className="flex items-center space-x-2">
          <select
            value={chartPeriod}
            onChange={(e) => setChartPeriod(e.target.value)}
            className="text-sm border rounded-lg px-2 py-1"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end space-x-2 mb-4">
        {currentData.map((item, index) => {
          const height = (item.revenue / maxRevenue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative group"
                  style={{ height: `${height * 2}px` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      ${item.revenue.toLocaleString()}
                      <br />
                      {item.orders} orders
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  {chartPeriod === 'daily' ? new Date(item.date).getDate() : item.date}
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
            ${currentData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {currentData.reduce((sum, item) => sum + item.orders, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            ${Math.round(currentData.reduce((sum, item) => sum + item.revenue, 0) / currentData.reduce((sum, item) => sum + item.orders, 0)).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Avg Order Value</div>
        </div>
      </div>

      {/* Growth indicator */}
      <div className="mt-4 flex items-center justify-center">
        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-sm text-green-600">+22% vs previous period</span>
      </div>
    </div>
  );
};

export default RevenueChart;