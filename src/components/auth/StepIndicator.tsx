'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  variant?: 'dots' | 'bars' | 'numbered';
}

export default function StepIndicator({
  steps,
  currentStep,
  variant = 'numbered',
}: StepIndicatorProps) {
  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index < currentStep
                ? 'bg-yellow-400'
                : index === currentStep
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/20'
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: index === currentStep ? 1.25 : 1 }}
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/10"
            >
              <motion.div
                className={`h-full ${
                  index <= currentStep ? 'bg-yellow-400' : 'bg-transparent'
                }`}
                initial={{ width: 0 }}
                animate={{ width: index <= currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white font-medium">{steps[currentStep].label}</span>
          <span className="text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>
    );
  }

  // Numbered variant (default)
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-yellow-400"
            initial={{ width: 0 }}
            animate={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center relative z-10"
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  isCompleted
                    ? 'bg-yellow-400 text-black'
                    : isCurrent
                    ? 'bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400'
                    : 'bg-white/10 text-gray-400'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted || isCurrent ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  {step.description}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
