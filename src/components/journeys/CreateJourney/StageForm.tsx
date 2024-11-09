import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TouchpointForm from './TouchpointForm';

interface StageFormProps {
  stage: {
    name: string;
    touchpoints: Array<{
      name: string;
      description: string;
      customerAction: string;
      emotion: 'positive' | 'neutral' | 'negative';
      image?: string;
    }>;
  };
  onUpdate: (touchpoints: StageFormProps['stage']['touchpoints']) => void;
}

export default function StageForm({ stage, onUpdate }: StageFormProps) {
  const addTouchpoint = () => {
    onUpdate([
      ...stage.touchpoints,
      {
        name: '',
        description: '',
        customerAction: '',
        emotion: 'neutral',
      }
    ]);
  };

  const removeTouchpoint = (index: number) => {
    onUpdate(stage.touchpoints.filter((_, i) => i !== index));
  };

  const updateTouchpoint = (index: number, updates: Partial<StageFormProps['stage']['touchpoints'][0]>) => {
    onUpdate(
      stage.touchpoints.map((touchpoint, i) =>
        i === index ? { ...touchpoint, ...updates } : touchpoint
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {stage.name} Stage
        </h3>
        <button
          type="button"
          onClick={addTouchpoint}
          className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <Plus className="w-4 h-4" />
          Add Touchpoint
        </button>
      </div>

      <AnimatePresence initial={false}>
        {stage.touchpoints.map((touchpoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <button
              type="button"
              onClick={() => removeTouchpoint(index)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500"
            >
              <Minus className="w-5 h-5" />
            </button>

            <TouchpointForm
              touchpoint={touchpoint}
              onChange={(updates) => updateTouchpoint(index, updates)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {stage.touchpoints.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-500 dark:text-gray-400 mb-4">No touchpoints added yet</p>
          <button
            type="button"
            onClick={addTouchpoint}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <Plus className="w-4 h-4" />
            Add First Touchpoint
          </button>
        </motion.div>
      )}
    </div>
  );
}