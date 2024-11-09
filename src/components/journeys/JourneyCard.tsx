import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Calendar } from 'lucide-react';
import { Journey } from '../../types/journey';

interface JourneyCardProps {
  journey: Journey;
}

export default function JourneyCard({ journey }: JourneyCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
      case 'active':
        return 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div
      onClick={() => navigate(`/journeys/${journey.id}`)}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors cursor-pointer p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(journey.status)}`}>
          {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
        </span>
        <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {journey.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {journey.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(journey.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{journey.stages.length} stages</span>
        </div>
      </div>
    </div>
  );
}