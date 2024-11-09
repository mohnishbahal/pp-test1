import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, GripVertical, Pencil } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Touchpoint } from './Touchpoint';

interface StageProps {
  stage: {
    id: string;
    name: string;
    touchpoints: any[];
  };
  isActive: boolean;
  onClick: () => void;
  onUpdate: (updates: any) => void;
}

export function Stage({ stage, isActive, onClick, onUpdate }: StageProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        "relative transition-all duration-200",
        isActive && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="w-fit">Stage {stage.id}</Badge>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 hover:bg-accent rounded-md text-muted-foreground"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-accent rounded-md text-muted-foreground">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        {isEditing ? (
          <Input
            value={stage.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="mt-2"
            autoFocus
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          />
        ) : (
          <CardTitle className="text-lg">{stage.name}</CardTitle>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <motion.div layout className="space-y-2">
          {stage.touchpoints.map((touchpoint) => (
            <Touchpoint
              key={touchpoint.id}
              touchpoint={touchpoint}
              onUpdate={(updates) => {
                const newTouchpoints = stage.touchpoints.map((t) =>
                  t.id === touchpoint.id ? { ...t, ...updates } : t
                );
                onUpdate({ touchpoints: newTouchpoints });
              }}
            />
          ))}
        </motion.div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => {
            const newTouchpoint = {
              id: crypto.randomUUID(),
              name: 'New Touchpoint',
              description: '',
              emotion: 'neutral',
            };
            onUpdate({
              touchpoints: [...stage.touchpoints, newTouchpoint],
            });
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Touchpoint
        </Button>
      </CardContent>
    </Card>
  );
}