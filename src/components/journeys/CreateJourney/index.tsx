import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/Button';
import { ProgressSteps } from './ProgressSteps';
import { JourneyForm } from './JourneyForm';
import { StageForm } from './StageForm';
import { JourneyReview } from './JourneyReview';
import { useApp } from '../../../context/AppContext';

const steps = [
  { title: 'Journey Details', description: 'Set up your journey basics' },
  { title: 'Before Stage', description: 'Map pre-interaction touchpoints' },
  { title: 'During Stage', description: 'Define core experience touchpoints' },
  { title: 'After Stage', description: 'Plan post-interaction touchpoints' },
  { title: 'Review', description: 'Preview and finalize your journey' }
];

export default function CreateJourney() {
  const navigate = useNavigate();
  const { addJourney } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    description: '',
    coverImage: null as string | null,
    personaIds: [] as string[],
    stages: [
      { name: 'Before', touchpoints: [] },
      { name: 'During', touchpoints: [] },
      { name: 'After', touchpoints: [] }
    ]
  });

  const handleSubmit = () => {
    const journey = {
      id: crypto.randomUUID(),
      name: form.name,
      description: form.description,
      coverImage: form.coverImage,
      personaIds: form.personaIds,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stages: form.stages.map((stage, index) => ({
        id: crypto.randomUUID(),
        name: stage.name,
        order: index,
        touchpoints: stage.touchpoints.map(touchpoint => ({
          id: crypto.randomUUID(),
          ...touchpoint,
          metrics: {
            satisfaction: 0,
            effort: 0,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/journeys')}
              icon={ChevronLeft}
              className="hidden sm:flex"
            >
              Back to Journeys
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Journey</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {steps[currentStep].description}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          onChange={setCurrentStep}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            {currentStep === 0 && (
              <JourneyForm
                form={form}
                onChange={(updates) => setForm(prev => ({ ...prev, ...updates }))}
              />
            )}

            {currentStep > 0 && currentStep < 4 && (
              <StageForm
                stage={form.stages[currentStep - 1]}
                onUpdate={(touchpoints) => {
                  const newStages = [...form.stages];
                  newStages[currentStep - 1].touchpoints = touchpoints;
                  setForm(prev => ({ ...prev, stages: newStages }));
                }}
              />
            )}

            {currentStep === 4 && (
              <JourneyReview journey={form} />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="secondary"
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                {currentStep === steps.length - 1 ? 'Create Journey' : 'Next'}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}