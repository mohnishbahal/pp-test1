import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Meh, Frown, ChevronRight, GripVertical, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TouchpointForm } from './TouchpointForm';
import { cn } from '@/lib/utils';

interface TouchpointProps {
  touchpoint: {
    id: string;
    name: string;
    description: string;
    emotion: 'positive' | 'neutral' | 'negative';
    image?: string;
  };
  onUpdate: (updates: any) => void;
}

export function Touchpoint({ touchpoint, onUpdate }: TouchpointProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getEmotionIcon = () => {
    switch (touchpoint.emotion) {
      case 'positive':
        return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getEmotionColor = () => {
    switch (touchpoint.emotion) {
      case 'positive':
        return 'bg-green-500/10 hover:bg-green-500/20';
      case 'negative':
        return 'bg-red-500/10 hover:bg-red-500/20';
      default:
        return 'bg-yellow-500/10 hover:bg-yellow-500/20';
    }
  };

  return (
    <>
      <motion.div layout>
        <Card
          onClick={() => setIsEditing(true)}
          className={cn(
            "group relative flex items-center gap-3 p-3 cursor-pointer transition-all",
            getEmotionColor()
          )}
        >
          <button className="opacity-0 group-hover:opacity-100 absolute left-2 text-muted-foreground">
            <GripVertical className="w-4 h-4" />
          </button>
          
          {touchpoint.image && (
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={touchpoint.image} 
                alt={touchpoint.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 ml-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">{touchpoint.name}</h4>
              {!touchpoint.image && (
                <ImageIcon className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
            {touchpoint.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {touchpoint.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {getEmotionIcon()}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isEditing && (
          <TouchpointForm
            touchpoint={touchpoint}
            onUpdate={onUpdate}
            onClose={() => setIsEditing(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}