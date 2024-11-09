import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Camera, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import PersonaSelector from './PersonaSelector';
import JourneyPreview from './JourneyPreview';

interface TouchpointForm {
  name: string;
  description: string;
  customerAction: string;
  emotion: 'positive' | 'neutral' | 'negative';
  image?: string;
}

interface StageForm {
  name: string;
  touchpoints: TouchpointForm[];
}

interface JourneyForm {
  name: string;
  description: string;
  coverImage: string | null;
  personaIds: string[];
  stages: StageForm[];
}

export default function CreateJourney() {
  const navigate = useNavigate();
  const { addJourney } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState<JourneyForm>({
    name: '',
    description: '',
    coverImage: null,
    personaIds: [],
    stages: [
      { name: 'Before', touchpoints: [] },
      { name: 'During', touchpoints: [] },
      { name: 'After', touchpoints: [] }
    ]
  });

  const steps = [
    { title: 'Journey Details', description: 'Set up your journey basics' },
    { title: 'Before Stage', description: 'Map pre-interaction touchpoints' },
    { title: 'During Stage', description: 'Define core experience touchpoints' },
    { title: 'After Stage', description: 'Plan post-interaction touchpoints' },
    { title: 'Review', description: 'Preview and finalize your journey' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

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
          name: touchpoint.name,
          description: touchpoint.description,
          customerAction: touchpoint.customerAction,
          emotion: touchpoint.emotion,
          image: touchpoint.image,
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

  const updateStage = (index: number, touchpoints: TouchpointForm[]) => {
    setForm(prev => ({
      ...prev,
      stages: prev.stages.map((stage, i) =>
        i === index ? { ...stage, touchpoints } : stage
      )
    }));
  };

  const renderStageForm = (stageIndex: number) => {
    const stage = form.stages[stageIndex];
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {stage.name} Stage
        </h3>
        <div className="space-y-4">
          {stage.touchpoints.map((touchpoint, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Touchpoint Name
                  </label>
                  <input
                    type="text"
                    value={touchpoint.name}
                    onChange={(e) => {
                      const newTouchpoints = [...stage.touchpoints];
                      newTouchpoints[index] = { ...touchpoint, name: e.target.value };
                      updateStage(stageIndex, newTouchpoints);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Name this touchpoint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={touchpoint.description}
                    onChange={(e) => {
                      const newTouchpoints = [...stage.touchpoints];
                      newTouchpoints[index] = { ...touchpoint, description: e.target.value };
                      updateStage(stageIndex, newTouchpoints);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Describe what happens at this touchpoint"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Customer Action
                  </label>
                  <textarea
                    value={touchpoint.customerAction}
                    onChange={(e) => {
                      const newTouchpoints = [...stage.touchpoints];
                      newTouchpoints[index] = { ...touchpoint, customerAction: e.target.value };
                      updateStage(stageIndex, newTouchpoints);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    placeholder="What action does the customer take?"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newTouchpoints = [...stage.touchpoints];
              newTouchpoints.push({
                name: '',
                description: '',
                customerAction: '',
                emotion: 'neutral'
              });
              updateStage(stageIndex, newTouchpoints);
            }}
            className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            + Add Touchpoint
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                className={`flex flex-col items-center ${
                  index === currentStep ? 'text-indigo-600' : 'text-gray-400'
                }`}
                onClick={() => setCurrentStep(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index === currentStep 
                    ? 'bg-indigo-600 text-white' 
                    : index < currentStep
                    ? 'bg-indigo-200 text-indigo-700'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
                <span className="text-xs text-gray-500">{step.description}</span>
              </motion.button>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
          >
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className={`w-full h-64 rounded-xl overflow-hidden ${!form.coverImage ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600' : ''}`}>
                    {form.coverImage ? (
                      <img src={form.coverImage} alt="Journey cover" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Camera className="w-12 h-12 text-indigo-400 mb-4" />
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium">Click to add cover image</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-200 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200" />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Journey Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter a memorable name for your journey"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                      placeholder="Describe the purpose and scope of this journey"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <PersonaSelector
                      selectedIds={form.personaIds}
                      onChange={(ids) => setForm(prev => ({ ...prev, personaIds: ids }))}
                    />
                  </motion.div>
                </div>
              </div>
            )}

            {currentStep > 0 && currentStep < 4 && renderStageForm(currentStep - 1)}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                </div>

                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <JourneyPreview
                      journey={{
                        id: 'preview',
                        name: form.name,
                        description: form.description,
                        coverImage: form.coverImage,
                        personaIds: form.personaIds,
                        status: 'draft',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        stages: form.stages.map((stage, index) => ({
                          id: `stage-${index}`,
                          name: stage.name,
                          order: index,
                          touchpoints: stage.touchpoints.map((t, i) => ({
                            id: `touchpoint-${i}`,
                            ...t,
                            metrics: { satisfaction: 0, effort: 0, completion: 0 },
                            feedback: [],
                            opportunities: [],
                            solutions: []
                          }))
                        }))
                      }}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                className={`px-6 py-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors ${
                  currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (currentStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Create Journey' : 'Next'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}