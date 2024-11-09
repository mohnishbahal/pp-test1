import React from 'react';
import { Map, Users, Edit2, Copy, Trash2 } from 'lucide-react';
import { Journey } from '../../../types/journey';
import { useApp } from '../../../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { IconButton } from '../../ui/IconButton';

interface JourneyCardProps {
  journey: Journey;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function JourneyCard({ journey, onEdit, onDelete, onDuplicate }: JourneyCardProps) {
  const { personas } = useApp();
  const associatedPersonas = personas.filter(p => journey.personaIds.includes(p.id));

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
        {journey.coverImage ? (
          <img
            src={journey.coverImage}
            alt={journey.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Map className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton
            icon={Copy}
            onClick={onDuplicate}
            tooltip="Duplicate journey"
            variant="secondary"
          />
          <IconButton
            icon={Edit2}
            onClick={onEdit}
            tooltip="Edit journey"
            variant="secondary"
          />
          <IconButton
            icon={Trash2}
            onClick={onDelete}
            tooltip="Delete journey"
            variant="danger"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <StatusBadge status={journey.status} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(journey.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {journey.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {journey.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {associatedPersonas.map((persona) => (
              <img
                key={persona.id}
                src={persona.avatar}
                alt={persona.name}
                className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                title={persona.name}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {journey.stages.length} stages
          </div>
        </div>
      </div>
    </div>
  );
}