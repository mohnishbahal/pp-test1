import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { JourneyPhase } from './index';

interface JourneyVisualizationProps {
  phases: JourneyPhase[];
}

export default function JourneyVisualization({ phases }: JourneyVisualizationProps) {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'positive':
        return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  return (
    <div className="space-y-8">
      {phases.map((phase) => (
        <div key={phase.id}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            {phase.name}
          </h3>
          
          <div className="space-y-4">
            {phase.steps.map((step, index) => (
              <div key={step.id} className="relative">
                {index > 0 && (
                  <div className="absolute left-4 -top-4 w-0.5 h-4 bg-gray-200 dark:bg-gray-700" />
                )}
                <div className={`p-4 rounded-lg border ${getEmotionColor(step.emotion)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {step.name || 'Unnamed Step'}
                    </h4>
                    {getEmotionIcon(step.emotion)}
                  </div>
                  
                  {step.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {step.description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Satisfaction
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${step.metrics.satisfaction}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Effort
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${step.metrics.effort}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {phase.steps.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                No steps added yet
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}