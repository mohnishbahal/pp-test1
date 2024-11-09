import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
  currentStep: number;
  onChange: (step: number) => void;
}

export function ProgressSteps({ steps, currentStep, onChange }: ProgressStepsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary-600 dark:bg-primary-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => onChange(index)}
                  className="relative flex flex-col items-center group"
                >
                  {/* Step Circle */}
                  <motion.div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors mb-6
                      ${isCompleted 
                        ? 'bg-primary-600 border-primary-600 dark:bg-primary-500 dark:border-primary-500' 
                        : isCurrent
                          ? 'bg-white border-primary-600 dark:bg-gray-900 dark:border-primary-500'
                          : 'bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700'
                      }
                    `}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        isCurrent 
                          ? 'text-primary-600 dark:text-primary-500'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                  </motion.div>

                  {/* Step Labels */}
                  <div className="text-center w-32">
                    <p className={`text-sm font-medium mb-2 ${
                      isCurrent 
                        ? 'text-primary-600 dark:text-primary-500'
                        : isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2rem]">
                      {step.description}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="sm:hidden text-center mt-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </p>
        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
          {steps[currentStep].description}
        </p>
      </div>
    </div>
  );
}