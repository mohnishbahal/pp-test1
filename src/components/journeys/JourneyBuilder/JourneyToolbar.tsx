import React from 'react';
import { ZoomIn, ZoomOut, MousePointer, Hand, Plus, Minus } from 'lucide-react';

export default function JourneyToolbar() {
  return (
    <div className="h-12 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
          <MousePointer className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
          <Hand className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-2" />
        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">100%</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          Auto-layout
        </button>
        <button className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          Reset View
        </button>
      </div>
    </div>
  );
}