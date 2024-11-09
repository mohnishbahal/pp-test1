import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Plus, Gauge, Lightbulb, Target } from 'lucide-react';
import { useJourneyBuilder } from '../../../hooks/useJourneyBuilder';

export default function JourneySidebar() {
  const { journey, addStage } = useJourneyBuilder();

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'NEW_STAGE',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Add Elements</h3>
            <div className="space-y-2">
              <button
                ref={drag}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Stage
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Target className="w-4 h-4" />
                Add Touchpoint
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Metrics</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Gauge className="w-4 h-4" />
                Experience Score
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Lightbulb className="w-4 h-4" />
                Opportunities
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Journey Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Stages
                </label>
                <div className="text-sm text-gray-900 dark:text-white">
                  {journey?.stages.length || 0} stages
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Touchpoints
                </label>
                <div className="text-sm text-gray-900 dark:text-white">
                  {journey?.stages.reduce((acc, stage) => acc + stage.touchpoints.length, 0) || 0} touchpoints
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}