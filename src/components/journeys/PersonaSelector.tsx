import React from 'react';
import { Users, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PersonaSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function PersonaSelector({ selectedIds, onChange }: PersonaSelectorProps) {
  const { personas } = useApp();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Associated Personas
      </label>
      <div className="flex flex-wrap gap-2">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => {
              const newIds = selectedIds.includes(persona.id)
                ? selectedIds.filter(id => id !== persona.id)
                : [...selectedIds, persona.id];
              onChange(newIds);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedIds.includes(persona.id)
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-5 h-5 rounded-full object-cover"
            />
            {persona.name}
          </button>
        ))}
        {personas.length === 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            No personas created yet
          </div>
        )}
      </div>
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">Selected:</div>
          {selectedIds.map((id) => {
            const persona = personas.find(p => p.id === id);
            if (!persona) return null;
            return (
              <div
                key={id}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-sm"
              >
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                {persona.name}
                <button
                  onClick={() => onChange(selectedIds.filter(pid => pid !== id))}
                  className="ml-1 text-indigo-400 hover:text-indigo-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PersonaSelector;