import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronRight } from 'lucide-react';
import { Stage } from './Stage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface JourneyCanvasProps {
  stages: any[];
  onStageAdd: () => void;
  onStageUpdate: (stageId: string, updates: any) => void;
}

export function JourneyCanvas({ stages, onStageAdd, onStageUpdate }: JourneyCanvasProps) {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  return (
    <div className="relative min-h-[600px] bg-background/50 rounded-lg border border-border p-8">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border -translate-y-1/2" />
      
      <div className="relative flex justify-between items-start gap-6">
        <AnimatePresence mode="popLayout">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
              <Stage
                stage={stage}
                isActive={activeStage === stage.id}
                onClick={() => setActiveStage(stage.id)}
                onUpdate={(updates) => onStageUpdate(stage.id, updates)}
              />
              
              {index < stages.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <div className="p-1 rounded-full bg-background border border-border">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {stages.length < 5 && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1"
            >
              <Card
                className={cn(
                  "h-[300px] flex flex-col items-center justify-center gap-4 border-dashed cursor-pointer group transition-colors",
                  "hover:border-primary hover:bg-accent"
                )}
                onClick={onStageAdd}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Add Stage</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button variant="outline" size="sm" onClick={onStageAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Stage
        </Button>
      </div>
    </div>
  );
}