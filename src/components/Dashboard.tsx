import React from 'react';
import { Users, Map, Clock, Star } from 'lucide-react';

const recentActivity = [
  { id: 1, type: 'persona', action: 'created', name: 'Tech-Savvy Millennial', time: '2 hours ago' },
  { id: 2, type: 'journey', action: 'updated', name: 'Mobile App Onboarding', time: '4 hours ago' },
  { id: 3, type: 'persona', action: 'modified', name: 'Senior Professional', time: '1 day ago' },
  { id: 4, type: 'journey', action: 'created', name: 'E-commerce Purchase Flow', time: '2 days ago' },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your personas and journeys</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Active Personas', value: '8' },
          { icon: Map, label: 'Journey Maps', value: '12' },
          { icon: Clock, label: 'Avg. Journey Duration', value: '45m' },
          { icon: Star, label: 'Customer Satisfaction', value: '4.8' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
                <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'persona' 
                    ? 'bg-blue-50 dark:bg-blue-900/50' 
                    : 'bg-green-50 dark:bg-green-900/50'
                }`}>
                  {activity.type === 'persona' ? (
                    <Users className={`w-5 h-5 ${
                      activity.type === 'persona'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-green-600 dark:text-green-400'
                    }`} />
                  ) : (
                    <Map className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.name}
                    <span className="text-gray-600 dark:text-gray-400"> was {activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: 'Create Persona', color: 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' },
              { icon: Map, label: 'Map Journey', color: 'bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400' },
              { icon: Star, label: 'Add Feedback', color: 'bg-yellow-50 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400' },
              { icon: Clock, label: 'View Timeline', color: 'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800"
              >
                <div className={`p-3 rounded-lg ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}