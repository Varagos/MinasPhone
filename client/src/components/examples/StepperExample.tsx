'use client';

import React, { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';

const steps = ['Account', 'Shipping', 'Payment', 'Review'];

export function StepperExample() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Stepper Examples</h2>

      <div className="space-y-12">
        {/* Default horizontal stepper */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Default Horizontal</h3>
          <Stepper steps={steps} activeStep={activeStep} className="mb-8" />
        </div>

        {/* Alternative label stepper */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Alternative Label</h3>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            alternativeLabel={true}
            className="mb-8"
          />
        </div>

        {/* Vertical stepper */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Vertical</h3>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            orientation="vertical"
            className="mb-8 space-y-4"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          variant="outline"
        >
          Back
        </Button>

        <div className="space-x-2">
          <Button onClick={handleReset} variant="ghost">
            Reset
          </Button>

          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
