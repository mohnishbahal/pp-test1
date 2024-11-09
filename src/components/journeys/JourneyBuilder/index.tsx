import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, X, Plus, Minus, Smile, Meh, Frown } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import JourneyForm from './JourneyForm';
import JourneyVisualization from './JourneyVisualization';

interface JourneyStep {
  id: string;
  name: string;
  description: string;
  emotion: 'positive' | 'neutral' | 'negative';
  metrics: {
    satisfaction: number;
    effort: number;
  };
}

interface JourneyPhase {
  id: string;
  name: string;
  steps: JourneyStep[];
}

export default function JourneyBuilder() {
  const navigate = useNavigate();
  const { addJourney } = useApp();
  const [journeyName, setJourneyName] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [phases, setPhases] = useState<JourneyPhase[]>([
    { id: '1', name: 'Before', steps: [] },
    { id: '2', name: 'During', steps: [] },
    { id: '3', name: 'After', steps: [] }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const journey = {
      id: crypto.randomUUID(),
      name: journeyName,
      description: journeyDescription,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stages: phases.map(phase => ({
        id: phase.id,
        name: phase.name,
        order: parseInt(phase.id),
        touchpoints: phase.steps.map(step => ({
          id: step.id,
          name: step.name,
          description: step.description,
          emotion: step.emotion,
          metrics: {
            satisfaction: step.metrics.satisfaction,
            effort: step.metrics.effort,
            completion: 0
          },
          feedback: [],
          opportunities: [],
          solutions: []
        }))
      }))
    };

    addJourney(journey);
    navigate('/journeys');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Journey Map</h1>
          <p className="text-gray-600 dark:text-gray-300">Define your customer's journey stages and touchpoints</p>
        </div>
        <button
          onClick={() => navigate('/journeys')}
          className="p-2 text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Journey Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={journeyName}
                    onChange={(e) => setJourneyName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={journeyDescription}
                    onChange={(e) => setJourneyDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <JourneyForm phases={phases} setPhases={setPhases} />

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/journeys')}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Map className="w-5 h-5" />
                Create Journey
              </button>
            </div>
          </form>
        </div>

        <div className="lg:sticky lg:top-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Journey Preview</h2>
            <JourneyVisualization phases={phases} />
          </div>
        </div>
      </div>
    </div>
  );
}