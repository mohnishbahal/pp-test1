import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { TouchpointForm } from './TouchpointForm';

interface Touchpoint {
  id: string;
  name: string;
  description: string;
  customerAction: string;
  emotion: 'positive' | 'neutral' | 'negative';
  image?: string;
}

interface StageFormProps {
  stageName: string;
  touchpoints: Touchpoint[];
  onUpdate: (touchpoints: Touchpoint[]) => void;
}

export function StageForm({ stageName, touchpoints, onUpdate }: StageFormProps) {
  const addTouchpoint = () => {
    onUpdate([
      ...touchpoints,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        customerAction: '',
        emotion: 'neutral'
      }
    ]);
  };

  const updateTouchpoint = (index: number, updates: Partial<Touchpoint>) => {
    onUpdate(
      touchpoints.map((t, i) => i === index ? { ...t, ...updates } : t)
    );
  };

  const removeTouchpoint = (index: number) => {
    onUpdate(touchpoints.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {stageName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add touchpoints to map the customer journey during this stage
          </p>
        </div>
        <Button
          variant="primary"
          onClick={addTouchpoint}
          icon={Plus}
        >
          Add Touchpoint
        </Button>
      </div>

      <div className="space-y-4">
        {touchpoints.map((touchpoint, index) => (
          <TouchpointForm
            key={touchpoint.id}
            touchpoint={touchpoint}
            onChange={(updates) => updateTouchpoint(index, updates)}
            onRemove={() => removeTouchpoint(index)}
          />
        ))}

        {touchpoints.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No touchpoints added yet
            </p>
            <Button
              variant="secondary"
              onClick={addTouchpoint}
              icon={Plus}
            >
              Add First Touchpoint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}