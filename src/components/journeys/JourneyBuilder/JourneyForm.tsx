import React from 'react';
import { Plus, Minus, Smile, Meh, Frown } from 'lucide-react';
import { JourneyPhase, JourneyStep } from './index';

interface JourneyFormProps {
  phases: JourneyPhase[];
  setPhases: React.Dispatch<React.SetStateAction<JourneyPhase[]>>;
}

export default function JourneyForm({ phases, setPhases }: JourneyFormProps) {
  const addStep = (phaseId: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          steps: [
            ...phase.steps,
            {
              id: crypto.randomUUID(),
              name: '',
              description: '',
              emotion: 'neutral',
              metrics: {
                satisfaction: 0,
                effort: 0
              }
            }
          ]
        };
      }
      return phase;
    }));
  };

  const removeStep = (phaseId: string, stepId: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          steps: phase.steps.filter(step => step.id !== stepId)
        };
      }
      return phase;
    }));
  };

  const updateStep = (phaseId: string, stepId: string, updates: Partial<JourneyStep>) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          steps: phase.steps.map(step => 
            step.id === stepId ? { ...step, ...updates } : step
          )
        };
      }
      return phase;
    }));
  };

  return (
    <div className="space-y-8">
      {phases.map((phase) => (
        <div key={phase.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {phase.name} Phase
          </h3>

          <div className="space-y-4">
            {phase.steps.map((step) => (
              <div key={step.id} className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Step Name
                    </label>
                    <input
                      type="text"
                      value={step.name}
                      onChange={(e) => updateStep(phase.id, step.id, { name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter step name"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStep(phase.id, step.id)}
                    className="self-end p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) => updateStep(phase.id, step.id, { description: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    rows={2}
                    placeholder="Describe this step"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Customer Emotion
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'positive', icon: Smile, label: 'Positive' },
                      { value: 'neutral', icon: Meh, label: 'Neutral' },
                      { value: 'negative', icon: Frown, label: 'Negative' }
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => updateStep(phase.id, step.id, { emotion: value as any })}
                        className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
                          step.emotion === value
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Satisfaction Score
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={step.metrics.satisfaction}
                      onChange={(e) => updateStep(phase.id, step.id, {
                        metrics: { ...step.metrics, satisfaction: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 text-center">
                      {step.metrics.satisfaction}%
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Effort Score
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={step.metrics.effort}
                      onChange={(e) => updateStep(phase.id, step.id, {
                        metrics: { ...step.metrics, effort: parseInt(e.target.value) }
                      })}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600 text-center">
                      {step.metrics.effort}%
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addStep(phase.id)}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}