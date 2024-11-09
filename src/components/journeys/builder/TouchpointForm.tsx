import React, { useRef } from 'react';
import { Camera, X, Smile, Meh, Frown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TouchpointFormProps {
  touchpoint: {
    id: string;
    name: string;
    description: string;
    emotion: 'positive' | 'neutral' | 'negative';
    image?: string;
  };
  onUpdate: (updates: Partial<TouchpointFormProps['touchpoint']>) => void;
  onClose: () => void;
}

export function TouchpointForm({ touchpoint, onUpdate, onClose }: TouchpointFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const emotions = [
    { value: 'positive', icon: Smile, label: 'Positive', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 'negative', icon: Frown, label: 'Negative', color: 'text-red-500' }
  ];

  return (
    <Card className="fixed inset-4 sm:inset-auto sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Edit Touchpoint</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Image Upload */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <div className={cn(
            "aspect-video rounded-lg overflow-hidden border-2 border-dashed",
            "transition-colors duration-200",
            touchpoint.image ? 'border-transparent' : 'border-muted hover:border-muted-foreground'
          )}>
            {touchpoint.image ? (
              <>
                <img 
                  src={touchpoint.image} 
                  alt="Touchpoint visualization" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground">
                  Click to add image
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Name Input */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Name
          </label>
          <input
            type="text"
            value={touchpoint.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-3 py-2 rounded-md border bg-background"
            placeholder="Enter touchpoint name"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Description
          </label>
          <textarea
            value={touchpoint.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-md border bg-background resize-none"
            placeholder="Describe this touchpoint"
          />
        </div>

        {/* Emotion Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">
            Customer Emotion
          </label>
          <div className="grid grid-cols-3 gap-3">
            {emotions.map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                onClick={() => onUpdate({ emotion: value as 'positive' | 'neutral' | 'negative' })}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                  touchpoint.emotion === value
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-muted-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5", color)} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Changes</Button>
        </div>
      </div>
    </Card>
  );
}