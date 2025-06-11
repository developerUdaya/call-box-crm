import React from 'react';
import { TrendingDown } from 'lucide-react';

interface FunnelData {
  stage: string;
  count: number;
  percentage: number;
}

interface ConversionFunnelProps {
  data: FunnelData[];
}

const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Lead Conversion Funnel</h2>
        <TrendingDown className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((stage, index) => {
          const width = stage.percentage;
          const dropOff = index > 0 ? data[index - 1].percentage - stage.percentage : 0;
          
          return (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{stage.count.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 ml-2">({stage.percentage}%)</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-8 flex items-center">
                  <div
                    className={`h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${width}%`, minWidth: '60px' }}
                  >
                    {stage.percentage}%
                  </div>
                </div>
                
                {index > 0 && dropOff > 0 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                    <div className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      -{dropOff.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Overall Conversion Rate:</span>
            <span className="font-semibold text-gray-900 ml-2">
              {data[data.length - 1]?.percentage}%
            </span>
          </div>
          <div>
            <span className="text-gray-600">Total Drop-off:</span>
            <span className="font-semibold text-red-600 ml-2">
              {(100 - data[data.length - 1]?.percentage).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;