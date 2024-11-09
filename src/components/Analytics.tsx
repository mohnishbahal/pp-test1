import React from 'react';
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Personas', value: '12', icon: Users, change: '+2.5%', changeType: 'increase' },
  { name: 'Active Journeys', value: '24', icon: Activity, change: '+18.2%', changeType: 'increase' },
  { name: 'Conversion Rate', value: '24.3%', icon: TrendingUp, change: '-4.1%', changeType: 'decrease' },
  { name: 'Satisfaction Score', value: '4.8/5', icon: BarChart3, change: '+12.5%', changeType: 'increase' },
];

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track and analyze your customer journey metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-50 dark:bg-green-900/50' 
                    : 'bg-red-50 dark:bg-red-900/50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    stat.changeType === 'increase' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journey Performance</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Journey performance chart will be displayed here</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Persona Insights</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Persona insights chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}