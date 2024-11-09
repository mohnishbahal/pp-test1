import React, { useRef } from 'react';
import { Camera } from 'lucide-react';
import { PersonaSelector } from '../shared/PersonaSelector';

interface JourneyFormProps {
  form: {
    name: string;
    description: string;
    coverImage: string | null;
    personaIds: string[];
  };
  onChange: (updates: Partial<JourneyFormProps['form']>) => void;
}

export function JourneyForm({ form, onChange }: JourneyFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cover Image
        </label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
        >
          {form.coverImage ? (
            <img 
              src={form.coverImage} 
              alt="Journey cover" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="space-y-2">
              <Camera className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to upload cover image
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                SVG, PNG, JPG (max. 800×400px)
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Journey Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Journey Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          placeholder="Enter a name for your journey"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          placeholder="Describe the purpose and scope of this journey"
        />
      </div>

      {/* Associated Personas */}
      <PersonaSelector
        selectedIds={form.personaIds}
        onChange={(ids) => onChange({ personaIds: ids })}
      />
    </div>
  );
}