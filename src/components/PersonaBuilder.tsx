import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Trash2, Edit2, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { PageHeader } from './ui/PageHeader';

export default function PersonaBuilder() {
  const navigate = useNavigate();
  const { personas, removePersona, duplicatePersona } = useApp();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Persona Builder"
        description="Create and manage your customer personas"
        action={
          <Button
            icon={UserPlus}
            onClick={() => navigate('/personas/create')}
            variant="primary"
          >
            New Persona
          </Button>
        }
      />

      {personas.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <UserPlus className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No personas yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Start by creating your first customer persona</p>
          <Button
            icon={UserPlus}
            onClick={() => navigate('/personas/create')}
            variant="primary"
          >
            Create Persona
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div key={persona.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
              <div className="aspect-square relative">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <IconButton
                    icon={Copy}
                    onClick={() => duplicatePersona(persona.id)}
                    tooltip="Duplicate persona"
                    variant="secondary"
                  />
                  <IconButton
                    icon={Edit2}
                    onClick={() => navigate(`/personas/edit/${persona.id}`)}
                    tooltip="Edit persona"
                    variant="secondary"
                  />
                  <IconButton
                    icon={Trash2}
                    onClick={() => removePersona(persona.id)}
                    tooltip="Delete persona"
                    variant="danger"
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{persona.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{persona.occupation}, {persona.age}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Goals</h4>
                    <ul className="space-y-1">
                      {persona.goals.map((goal, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400">• {goal}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Pain Points</h4>
                    <ul className="space-y-1">
                      {persona.painPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400">• {point}</li>
                      ))}
                    </ul>
                  </div>

                  {persona.customSections?.map((section, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{section.title}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}