import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Users, Calendar, Tag } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface JourneyReviewProps {
  journey: {
    name: string;
    description: string;
    coverImage: string | null;
    personaIds: string[];
    stages: Array<{
      name: string;
      touchpoints: Array<{
        name: string;
        description: string;
        customerAction: string;
        emotion: 'positive' | 'neutral' | 'negative';
        image?: string;
      }>;
    }>;
  };
}

export function JourneyReview({ journey }: JourneyReviewProps) {
  const { personas } = useApp();
  const associatedPersonas = personas.filter(p => journey.personaIds.includes(p.id));

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

  return (
    <div className="space-y-8">
      {/* Journey Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-6">
          {journey.coverImage && (
            <img 
              src={journey.coverImage} 
              alt={journey.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {journey.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {journey.description}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Created {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Draft
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <div className="flex -space-x-2">
                  {associatedPersonas.map(persona => (
                    <img
                      key={persona.id}
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                      title={persona.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Stages */}
      <div className="space-y-6">
        {journey.stages.map((stage, stageIndex) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stageIndex * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {stage.name} Stage
            </h3>
            
            <div className="space-y-4">
              {stage.touchpoints.map((touchpoint, touchpointIndex) => (
                <div
                  key={touchpointIndex}
                  className={`p-4 rounded-lg border ${getEmotionColor(touchpoint.emotion)}`}
                >
                  <div className="flex items-start gap-4">
                    {touchpoint.image && (
                      <img
                        src={touchpoint.image}
                        alt={touchpoint.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">
                          {touchpoint.name}
                        </h4>
                        {getEmotionIcon(touchpoint.emotion)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {touchpoint.description}
                      </p>
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Customer Action: </span>
                        <span className="text-gray-900 dark:text-white">{touchpoint.customerAction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {stage.touchpoints.length === 0 && (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">
                    No touchpoints added to this stage
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Stages</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {journey.stages.length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Touchpoints</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {journey.stages.reduce((acc, stage) => acc + stage.touchpoints.length, 0)}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Associated Personas</div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {journey.personaIds.length}
          </div>
        </div>
      </div>
    </div>
  );
}