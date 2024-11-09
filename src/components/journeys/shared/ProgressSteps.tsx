import React from 'react';
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
    <div className="relative">
      {/* Progress Bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700">
        <div
          className="absolute left-0 top-0 h-full bg-primary-600 dark:bg-primary-500 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center">
              {/* Step Circle */}
              <button
                onClick={() => onChange(index)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isCompleted
                    ? 'bg-primary-600 border-primary-600 text-white dark:bg-primary-500 dark:border-primary-500'
                    : isCurrent
                      ? 'bg-white border-primary-600 dark:bg-gray-800 dark:border-primary-500 scale-110 border-[3px]'
                      : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className={`text-sm font-semibold ${
                    isCurrent
                      ? 'text-primary-600 dark:text-primary-500'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                )}
              </button>

              {/* Step Label */}
              <div className="absolute top-14 w-32 -translate-x-1/2 left-1/2 text-center">
                <p className={`text-sm font-medium mb-1 ${
                  isCurrent
                    ? 'text-primary-600 dark:text-primary-500'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}