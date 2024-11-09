import React, { useRef } from 'react';
import { Camera, Plus, Minus, Smile, Meh, Frown } from 'lucide-react';

interface TouchpointFormProps {
  touchpoint: {
    name: string;
    description: string;
    customerAction: string;
    emotion: 'positive' | 'neutral' | 'negative';
    image?: string;
  };
  onChange: (updates: Partial<TouchpointFormProps['touchpoint']>) => void;
}

export default function TouchpointForm({ touchpoint, onChange }: TouchpointFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors hover:border-primary-500 dark:hover:border-primary-400"
      >
        <div className="aspect-video bg-gray-50 dark:bg-gray-800">
          {touchpoint.image ? (
            <img 
              src={touchpoint.image} 
              alt="Touchpoint visualization" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Add an image for this touchpoint
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Recommended size: 1280x720px
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          Touchpoint Name
        </label>
        <input
          type="text"
          value={touchpoint.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="Name this touchpoint"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          Description
        </label>
        <textarea
          value={touchpoint.description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          rows={3}
          placeholder="Describe what happens at this touchpoint"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
          Customer Action
        </label>
        <textarea
          value={touchpoint.customerAction}
          onChange={(e) => onChange({ customerAction: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          rows={2}
          placeholder="What action does the customer take?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
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
              onClick={() => onChange({ emotion: value as 'positive' | 'neutral' | 'negative' })}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors
                ${touchpoint.emotion === value
                  ? 'border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}