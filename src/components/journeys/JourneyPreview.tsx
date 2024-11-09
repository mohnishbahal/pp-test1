import React from 'react';
import { Smile, Meh, Frown, ChevronRight, Users } from 'lucide-react';
import { Journey } from '../../types/journey';
import { useApp } from '../../context/AppContext';

interface JourneyPreviewProps {
  journey: Journey;
}

export default function JourneyPreview({ journey }: JourneyPreviewProps) {
  const { personas } = useApp();
  
  const getEmotionIcon = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getEmotionColor = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const associatedPersonas = personas.filter(p => journey.personaIds.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{journey.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">{journey.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {associatedPersonas.map((persona) => (
              <img
                key={persona.id}
                src={persona.avatar}
                alt={persona.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                title={persona.name}
              />
            ))}
          </div>
          {associatedPersonas.length === 0 && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">No personas assigned</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {journey.stages.map((stage, stageIndex) => (
            <div key={stage.id} className="relative flex-1 px-4">
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">{stage.name}</div>
                <div className="space-y-4">
                  {stage.touchpoints.map((touchpoint, touchpointIndex) => (
                    <div
                      key={touchpoint.id}
                      className={`relative p-4 rounded-lg border ${getEmotionColor(touchpoint.emotion)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {touchpoint.name}
                        </h4>
                        {getEmotionIcon(touchpoint.emotion)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {touchpoint.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Satisfaction
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getMetricColor(touchpoint.metrics.satisfaction)}`}
                              style={{ width: `${touchpoint.metrics.satisfaction}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Effort
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getMetricColor(touchpoint.metrics.effort)}`}
                              style={{ width: `${touchpoint.metrics.effort}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Completion
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getMetricColor(touchpoint.metrics.completion)}`}
                              style={{ width: `${touchpoint.metrics.completion}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {touchpoint.feedback.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Customer Feedback
                          </div>
                          <div className="space-y-2">
                            {touchpoint.feedback.map((feedback, index) => (
                              <div
                                key={index}
                                className="text-sm text-gray-600 dark:text-gray-400 italic"
                              >
                                "{feedback.content}"
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {stageIndex < journey.stages.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}