import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { Touchpoint as TouchpointType } from '../../../types/journey';

interface TouchpointProps {
  touchpoint: TouchpointType;
}

export function Touchpoint({ touchpoint }: TouchpointProps) {
  const getEmotionIcon = () => {
    switch (touchpoint.emotion) {
      case 'positive':
        return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{touchpoint.name}</h4>
        {getEmotionIcon()}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-300">{touchpoint.description}</p>
    </div>
  );
}