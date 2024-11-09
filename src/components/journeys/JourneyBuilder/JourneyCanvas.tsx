import React from 'react';
import { useDrop } from 'react-dnd';
import { Stage } from './Stage';
import { useJourneyBuilder } from '../../../hooks/useJourneyBuilder';

export default function JourneyCanvas() {
  const { journey, updateJourney } = useJourneyBuilder();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'STAGE',
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()!;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveStage(item.id, left, top);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const moveStage = (id: string, left: number, top: number) => {
    updateJourney({
      ...journey!,
      stages: journey!.stages.map((stage) =>
        stage.id === id ? { ...stage, position: { left, top } } : stage
      ),
    });
  };

  return (
    <div
      ref={drop}
      className={`flex-1 relative overflow-auto bg-gray-50 dark:bg-gray-900 ${
        isOver ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
      }`}
    >
      <div className="absolute inset-0 p-8">
        {journey?.stages.map((stage) => (
          <Stage key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
}