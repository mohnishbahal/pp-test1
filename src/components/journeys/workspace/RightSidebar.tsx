import React from 'react';
import { Clock, Users, Tag, BarChart2, MessageSquare } from 'lucide-react';

export function RightSidebar() {
  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="p-4">
        <div className="space-y-6">
          {/* Properties Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Properties
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Duration
                </label>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  2-3 weeks
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Team Members
                </label>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  5 members
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Tags
                </label>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <Tag className="w-4 h-4 mr-2 text-gray-400" />
                  Mobile, Onboarding
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Satisfaction Score
                </label>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <BarChart2 className="w-4 h-4 mr-2 text-gray-400" />
                  4.2/5
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Pain Points
                </label>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                  3 identified
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Comments
            </h3>
            <div className="space-y-4">
              {/* Add comments component here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;