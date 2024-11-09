import React from 'react';
import { Plus, Link2, StickyNote, Smile } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link2 className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <StickyNote className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Smile className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;