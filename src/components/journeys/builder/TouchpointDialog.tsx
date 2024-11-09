import React, { useRef } from 'react';
import { Camera, X, Smile, Meh, Frown, Briefcase, Lightbulb, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TouchpointDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (touchpoint: any) => void;
  initialData?: any;
}

export function TouchpointDialog({ isOpen, onClose, onSave, initialData }: TouchpointDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = React.useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    customerAction: initialData?.customerAction || '',
    customerJob: initialData?.customerJob || '',
    emotion: initialData?.emotion || 'neutral',
    image: initialData?.image || null,
    insights: initialData?.insights || {
      needs: [''],
      painPoints: [''],
      opportunities: ['']
    },
    metrics: initialData?.metrics || {
      satisfaction: 0,
      effort: 0,
      completion: 0
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayField = (category: string, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      insights: {
        ...prev.insights,
        [category]: prev.insights[category].map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    }));
  };

  const addArrayField = (category: string) => {
    setData(prev => ({
      ...prev,
      insights: {
        ...prev.insights,
        [category]: [...prev.insights[category], '']
      }
    }));
  };

  const removeArrayField = (category: string, index: number) => {
    setData(prev => ({
      ...prev,
      insights: {
        ...prev.insights,
        [category]: prev.insights[category].filter((_: string, i: number) => i !== index)
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialData ? 'Edit Touchpoint' : 'Add Touchpoint'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer"
          >
            <div className={cn(
              "aspect-video rounded-lg overflow-hidden border-2 border-dashed",
              "transition-colors duration-200",
              data.image ? 'border-transparent' : 'border-muted hover:border-muted-foreground'
            )}>
              {data.image ? (
                <>
                  <img 
                    src={data.image} 
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
                    Add an image
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

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Touchpoint Name
              </label>
              <Input
                value={data.name}
                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter touchpoint name"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <Textarea
                value={data.description}
                onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what happens at this touchpoint"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Customer Action
              </label>
              <Textarea
                value={data.customerAction}
                onChange={(e) => setData(prev => ({ ...prev, customerAction: e.target.value }))}
                placeholder="What action does the customer take?"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Customer Job
              </label>
              <Textarea
                value={data.customerJob}
                onChange={(e) => setData(prev => ({ ...prev, customerJob: e.target.value }))}
                placeholder="What is the customer trying to accomplish?"
                rows={2}
              />
            </div>
          </div>

          {/* Customer Emotion */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Customer Emotion
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'positive', icon: Smile, label: 'Positive' },
                { value: 'neutral', icon: Meh, label: 'Neutral' },
                { value: 'negative', icon: Frown, label: 'Negative' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setData(prev => ({ ...prev, emotion: value }))}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                    data.emotion === value
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground"
                  )}
                >
                  <Icon className={cn(
                    "w-6 h-6",
                    value === 'positive' && "text-green-500",
                    value === 'neutral' && "text-yellow-500",
                    value === 'negative' && "text-red-500"
                  )} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-6">
            {[
              { key: 'needs', label: 'Customer Needs', icon: Briefcase },
              { key: 'painPoints', label: 'Pain Points', icon: MessageSquare },
              { key: 'opportunities', label: 'Opportunities', icon: Lightbulb }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4" />
                  <label className="text-sm font-medium">{label}</label>
                </div>
                <div className="space-y-2">
                  {data.insights[key].map((item: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleArrayField(key, index, e.target.value)}
                        placeholder={`Add ${label.toLowerCase()}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayField(key, index)}
                        disabled={data.insights[key].length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addArrayField(key)}
                    className="text-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {label}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <label className="text-sm font-medium block">Metrics</label>
            <div className="grid grid-cols-3 gap-6">
              {[
                { key: 'satisfaction', label: 'Satisfaction' },
                { key: 'effort', label: 'Effort' },
                { key: 'completion', label: 'Completion' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    {label}
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={data.metrics[key]}
                    onChange={(e) => setData(prev => ({
                      ...prev,
                      metrics: {
                        ...prev.metrics,
                        [key]: parseInt(e.target.value)
                      }
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-border px-6 py-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(data)}>
            Save Touchpoint
          </Button>
        </div>
      </div>
    </div>
  );
}