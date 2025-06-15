'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Camera, Upload, Download, X } from "lucide-react";
// import { useFaceMeshModel } from '@/lib/useFaceMeshModel';
import { usePassportPhotoProcessor } from '@/lib/usePassportPhotoProcessor';
import { resizeImage } from '@/lib/resizeImage';
import { Country } from "@/config/countries";
import { Translation } from "@/config/translations";
import { loadFaceMesh } from '@/lib/useFaceMesh';

export type ProcessingStep = 'loading' | 'analyzing' | 'cropping' | 'preparing' | 'completed';
type DialogState = 'upload' | 'processing' | 'result' | 'error';

interface PhotoUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  country: Country;
  translation: Translation;
}

const steps = [
  { key: 'loading', label: 'Loading libraries', icon: '📚' },
  { key: 'analyzing', label: 'Analyzing photo', icon: '🔍' },
  { key: 'cropping', label: 'Cropping', icon: '✂️' },
  { key: 'preparing', label: 'Prepare printable version', icon: '🖨️' },
] as const;





export function PhotoUploadDialog({ isOpen, onClose, country, translation }: PhotoUploadDialogProps) {
  const [dialogState, setDialogState] = useState<DialogState>('upload');
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('loading');
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const modelLoaded = useRef(false);

  const { processImageWithSteps } = usePassportPhotoProcessor();

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDialogState('processing');
    setCurrentStep('loading');
    if (!modelLoaded.current) {
      await loadFaceMesh();
      modelLoaded.current = true;
      console.log('FaceMesh loaded');
    }

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Resize the image first
      const canvas = await resizeImage(file, 1024);
      
      // Process the image for passport format with step callbacks
      const processedImageURL = await processImageWithSteps(canvas, (step) => {
        setCurrentStep(step);
      });
      
      if (processedImageURL) {
        setImageURL(processedImageURL);
        setDialogState('result');
      } else {
        setErrorMessage('Face not found in image. Please try again with a clear face photo following our preparation tips.');
        setDialogState('error');
      }
    } catch (error) {
      setErrorMessage('Error processing image. Please try again.');
      setDialogState('error');
      console.error('Error processing image:', error);
    }
  }, [processImageWithSteps]);

  const handleClose = () => {
    setDialogState('upload');
    setImageURL(null);
    setErrorMessage('');
    setCurrentStep('loading');
    onClose();
  };

  const handleTryAgain = () => {
    setDialogState('upload');
    setErrorMessage('');
    setImageURL(null);
  };

  const downloadImage = () => {
    if (!imageURL) return;
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `${country.name.toLowerCase()}-passport-photo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const renderUploadContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#121417] mb-2">
          Upload Your Photo
        </h3>
        <p className="text-[#61758a] text-sm mb-6">
          Select a photo to create your {country.name} passport photo
        </p>
      </div>

      <div className="border-2 border-dashed border-[#e5e8eb] rounded-lg p-8 text-center">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="hidden"
          id="photo-upload-dialog"
        />
        <label 
          htmlFor="photo-upload-dialog"
          className={`cursor-pointer flex flex-col items-center space-y-4`}
        >
          <div className="w-16 h-16 bg-[#f5fbfe] rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-[#44b871]" />
          </div>
          <div>
            <div className="text-lg font-medium text-[#121417] mb-2">
              {translation.uploadPhoto}
            </div>
            <div className="text-sm text-[#61758a]">
              Click to select or drag and drop your photo
            </div>
          </div>
        </label>
      </div>

      {/* Preparation Tips */}
      <div className="bg-[#f5fbfe] rounded-lg p-4">
        <h4 className="font-medium text-[#121417] mb-3 text-center">{translation.preparationTips.title}</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-1">💡</div>
            <div className="text-xs text-text-secondary">{translation.preparationTips.goodLighting}</div>
          </div>
          <div>
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs text-text-secondary">{translation.preparationTips.neutralBackground}</div>
          </div>
          <div>
            <div className="text-2xl mb-1">👁️</div>
            <div className="text-xs text-text-secondary">{translation.preparationTips.faceCamera}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessingContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#121417] mb-2">
          Processing Your Photo
        </h3>
        <p className="text-[#61758a] text-sm">
          Please wait while we process your photo...
        </p>
      </div>
      
      <div className="space-y-4">
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
      </div>
    </div>
  );

  const renderResultContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[#121417] mb-2">
          Your {country.name} Passport Photo is Ready!
        </h3>
        <p className="text-[#61758a] text-sm">
          Your photo meets {country.name} official requirements
        </p>
      </div>

      {imageURL && (
        <div className="text-center">
          <img
            src={imageURL}
            alt="Processed passport photo"
            className="w-[207px] h-[266px] border-2 border-[#e5e8eb] shadow-lg rounded mx-auto mb-4"
          />
          <div className="text-sm text-[#61758a] mb-6">
            Size: {country.photoSize} • Print ready
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <Button
          onClick={downloadImage}
          className="bg-[#44b871] hover:bg-[#318451] text-white w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Photo
        </Button>
        <Button
          onClick={handleTryAgain}
          variant="outline"
          className="w-full"
        >
          Create Another Photo
        </Button>
      </div>
    </div>
  );

  const renderErrorContent = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-[#121417] mb-2">
          Processing Error
        </h3>
        <p className="text-[#61758a] text-sm">
          {errorMessage}
        </p>
      </div>

      <Button
        onClick={handleTryAgain}
        className="bg-[#44b871] hover:bg-[#318451] text-white w-full"
      >
        Try Again
      </Button>
    </div>
  );

  const getDialogTitle = () => {
    switch (dialogState) {
      case 'upload': return `${country.name} Passport Photo`;
      case 'processing': return 'Processing Photo';
      case 'result': return 'Photo Ready!';
      case 'error': return 'Error';
      default: return 'Passport Photo';
    }
  };

  const renderContent = () => {
    switch (dialogState) {
      case 'upload': return renderUploadContent();
      case 'processing': return renderProcessingContent();
      case 'result': return renderResultContent();
      case 'error': return renderErrorContent();
      default: return renderUploadContent();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
