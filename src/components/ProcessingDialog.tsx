'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";

export type ProcessingStep = 'loading' | 'analyzing' | 'cropping' | 'preparing' | 'completed';

interface ProcessingDialogProps {
  isOpen: boolean;
  currentStep: ProcessingStep;
  onClose: () => void;
}

const steps = [
  { key: 'loading', label: 'Loading libraries', icon: '📚' },
  { key: 'analyzing', label: 'Analyzing photo', icon: '🔍' },
  { key: 'cropping', label: 'Cropping', icon: '✂️' },
  { key: 'preparing', label: 'Prepare printable version', icon: '🖨️' },
] as const;

export function ProcessingDialog({ isOpen, currentStep, onClose }: ProcessingDialogProps) {
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const isStepCompleted = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    return currentIndex > stepIndex || currentStep === 'completed';
  };

  const isStepActive = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    return currentIndex === stepIndex && currentStep !== 'completed';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentStep === 'completed' ? 'Processing Complete!' : 'Processing Your Photo'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {isStepCompleted(index) ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                ) : isStepActive(index) ? (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm">{step.icon}</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className={`font-medium ${
                  isStepCompleted(index) 
                    ? 'text-green-600' 
                    : isStepActive(index) 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                }`}>
                  {step.label}
                </div>
              </div>
            </div>
          ))}
          
          {currentStep === 'completed' && (
            <div className="text-center pt-4">
              <div className="text-green-600 font-medium">
                ✅ Your passport photo is ready!
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
