import React from 'react';
import { useDrag } from 'react-dnd';
import { Stage as StageType } from '../../../types/journey';
import { Touchpoint } from './Touchpoint';

interface StageProps {
  stage: StageType;
}

export function Stage({ stage }: StageProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'STAGE',
    item: { id: stage.id, left: stage.position?.left, top: stage.position?.top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: stage.position?.left || 0,
        top: stage.position?.top || 0,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{stage.name}</h3>
        <div className="space-y-2">
          {stage.touchpoints.map((touchpoint) => (
            <Touchpoint key={touchpoint.id} touchpoint={touchpoint} />
          ))}
        </div>
      </div>
    </div>
  );
}