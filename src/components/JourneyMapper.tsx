import React from 'react';
import { Map, Plus, ArrowRight } from 'lucide-react';

const journeyStages = [
  { name: 'Awareness', color: 'bg-blue-500 dark:bg-blue-400' },
  { name: 'Consideration', color: 'bg-purple-500 dark:bg-purple-400' },
  { name: 'Decision', color: 'bg-pink-500 dark:bg-pink-400' },
  { name: 'Retention', color: 'bg-green-500 dark:bg-green-400' },
  { name: 'Advocacy', color: 'bg-yellow-500 dark:bg-yellow-400' }
];

export default function JourneyMapper() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Journey Mapper</h1>
          <p className="text-gray-600 dark:text-gray-300">Map and visualize your customer journeys</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Journey
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-8">
          {journeyStages.map((stage, index) => (
            <React.Fragment key={stage.name}>
              <div className="flex-1">
                <div className={`${stage.color} h-2 rounded-full mb-2`} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{stage.name}</p>
              </div>
              {index < journeyStages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center py-12">
          <Map className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start mapping your customer journey</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Create touchpoints and connect them to build your customer journey</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" />
            Add Touchpoint
          </button>
        </div>
      </div>
    </div>
  );
}