import React from 'react';
import { 
  Target, Users, Heart, AlertTriangle, Lightbulb, 
  FileText, ArrowRight, MessageSquare 
} from 'lucide-react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  type: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

function DraggableItem({ type, icon: Icon, label, color }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        flex items-center gap-2 p-2 rounded-lg cursor-move
        ${color}
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function LeftSidebar() {
  const items = [
    {
      type: 'touchpoint',
      icon: Target,
      label: 'Touchpoint',
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      type: 'action',
      icon: ArrowRight,
      label: 'Customer Action',
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
    },
    {
      type: 'emotion',
      icon: Heart,
      label: 'Emotion',
      color: 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300'
    },
    {
      type: 'painpoint',
      icon: AlertTriangle,
      label: 'Pain Point',
      color: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
    },
    {
      type: 'opportunity',
      icon: Lightbulb,
      label: 'Opportunity',
      color: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
    },
    {
      type: 'document',
      icon: FileText,
      label: 'Document',
      color: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
    },
    {
      type: 'note',
      icon: MessageSquare,
      label: 'Note',
      color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    }
  ];

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Journey Elements
        </h3>
        <div className="space-y-2">
          {items.map((item) => (
            <DraggableItem key={item.type} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;