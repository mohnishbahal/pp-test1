import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { Journey } from '../../../types/journey';

interface JourneyCanvasProps {
  zoom: number;
  tool: string;
  showGrid: boolean;
  journey: Journey;
  onUpdate: (journey: Journey) => void;
}

export function JourneyCanvas({ 
  zoom, 
  tool, 
  showGrid, 
  journey, 
  onUpdate 
}: JourneyCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [
      'touchpoint', 'action', 'emotion', 'painpoint', 
      'opportunity', 'document', 'note'
    ],
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const bounds = canvasRef.current.getBoundingClientRect();
        const x = (offset.x - bounds.left - pan.x) / (zoom / 100);
        const y = (offset.y - bounds.top - pan.y) / (zoom / 100);
        handleDrop(item.type, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleDrop = (type: string, x: number, y: number) => {
    // Handle element placement logic here
  };

  return (
    <div 
      ref={drop}
      className="relative w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {showGrid && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * (zoom / 100)}px ${20 * (zoom / 100)}px`,
            transform: `translate(${pan.x}px, ${pan.y}px)`,
          }}
        />
      )}

      <motion.div
        ref={canvasRef}
        className="relative w-full h-full"
        style={{
          transform: `scale(${zoom / 100}) translate(${pan.x}px, ${pan.y}px)`,
          transformOrigin: '0 0',
        }}
      >
        {/* Journey stages and elements will be rendered here */}
        <div className="absolute inset-0">
          {journey.stages.map((stage) => (
            <div
              key={stage.id}
              className="absolute p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              style={{
                left: stage.position?.left || 0,
                top: stage.position?.top || 0,
                minWidth: 240,
              }}
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {stage.name}
              </h3>
              {/* Stage touchpoints and elements */}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default JourneyCanvas;