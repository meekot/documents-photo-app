'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useFaceMeshModel } from '@/lib/useFaceMeshModel';
import { usePassportPhotoProcessor } from '@/lib/usePassportPhotoProcessor';
import { resizeImage } from '@/lib/resizeImage';
import { COUNTRIES, isValidCountryLanguagePair } from '@/config/countries';
import { getTranslation } from '@/config/translations';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Camera, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ProcessingDialog, ProcessingStep } from '@/components/ProcessingDialog';

type ProcessingState = 'idle' | 'processing' | 'completed' | 'error';

export default function AppPage() {
  const params = useParams();
  const country = params.country as string;
  const lang = params.lang as string;

  // Validate country and language combination
  if (!isValidCountryLanguagePair(country, lang)) {
    notFound();
  }

  const countryData = COUNTRIES[country];
  const translation = getTranslation(lang);

  const [imageURL, setImageURL] = useState<string | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('loading');
  const [showDialog, setShowDialog] = useState(false);
  
  const { modelLoaded } = useFaceMeshModel();
  const { processImageWithSteps } = usePassportPhotoProcessor();

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProcessingState('processing');
      setShowDialog(true);
      setCurrentStep('loading');
      
      // Resize the image first
      const canvas = await resizeImage(file, 1024);
      
      // Process the image for passport format with step callbacks
      const processedImageURL = await processImageWithSteps(canvas, (step) => {
        setCurrentStep(step);
      });
      
      if (processedImageURL) {
        setImageURL(processedImageURL);
        setProcessingState('completed');
        // Keep dialog open to show completion, will close after a delay
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      } else {
        setProcessingState('error');
        setShowDialog(false);
        console.log('Face not found in image');
      }
    } catch (error) {
      setProcessingState('error');
      setShowDialog(false);
      console.error('Error processing image:', error);
    }
  }, [processImageWithSteps]);

  const handleCloseDialog = () => {
    if (currentStep === 'completed') {
      setShowDialog(false);
    }
  };

  const isProcessing = processingState === 'processing';
  const hasError = processingState === 'error';

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="border-b border-[#e5e8eb] bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/${country}/${lang}`}
                className="flex items-center space-x-2 text-[#61758a] hover:text-[#121417]"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#44b871] rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#121417]">DocPhoto.io</span>
              </div>
            </div>

            <div className="text-sm text-[#61758a]">
              {countryData.name} • {countryData.photoSize}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#121417] mb-4">
            {countryData.name} {translation.title}
          </h1>
          <p className="text-[#61758a] text-lg">
            {translation.preparationTips.goodLightingDesc}
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-6 w-full max-w-md">
            <div className="border-2 border-dashed border-[#e5e8eb] rounded-lg p-8 text-center">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                disabled={!modelLoaded || isProcessing}
                className="hidden"
                id="photo-upload"
              />
              <label 
                htmlFor="photo-upload"
                className={`cursor-pointer flex flex-col items-center space-y-4 ${
                  !modelLoaded || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="w-16 h-16 bg-[#f5fbfe] rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[#44b871]" />
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
            
            <ModelStatus modelLoaded={modelLoaded} />
            
            {hasError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-red-600 font-medium mb-2">
                  Error processing image
                </div>
                <div className="text-red-500 text-sm">
                  Please try again with a clear face photo following our preparation tips.
                </div>
              </div>
            )}
          </div>

          {imageURL && processingState === 'completed' && (
            <ProcessedImageResult 
              imageURL={imageURL} 
              countryData={countryData}
              translation={translation}
            />
          )}
        </div>

        {/* Preparation Tips */}
        <div className="mt-16 bg-[#f5fbfe] rounded-lg p-8">
          <h2 className="text-xl font-bold text-[#121417] mb-6 text-center">
            {translation.preparationTips.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#44b871] rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="font-medium text-[#121417] mb-2">
                {translation.preparationTips.goodLighting}
              </h3>
              <p className="text-sm text-[#61758a]">
                {translation.preparationTips.goodLightingDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#44b871] rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="font-medium text-[#121417] mb-2">
                {translation.preparationTips.neutralBackground}
              </h3>
              <p className="text-sm text-[#61758a]">
                {translation.preparationTips.neutralBackgroundDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#44b871] rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">👁️</span>
              </div>
              <h3 className="font-medium text-[#121417] mb-2">
                {translation.preparationTips.faceCamera}
              </h3>
              <p className="text-sm text-[#61758a]">
                {translation.preparationTips.faceCameraDesc}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Processing Dialog */}
      <ProcessingDialog
        isOpen={showDialog}
        currentStep={currentStep}
        onClose={handleCloseDialog}
      />
    </div>
  );
}

function ModelStatus({ modelLoaded }: { modelLoaded: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-sm ${modelLoaded ? 'text-green-600' : 'text-[#61758a]'}`}>
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${modelLoaded ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span>AI Model: {modelLoaded ? 'Ready' : 'Loading...'}</span>
        </div>
      </div>
    </div>
  );
}

function ProcessedImageResult({ 
  imageURL, 
  countryData, 
  translation 
}: { 
  imageURL: string;
  countryData: any;
  translation: any;
}) {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = `${countryData.name.toLowerCase()}-passport-photo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#ffffff] border border-[#e5e8eb] rounded-lg p-8 text-center shadow-lg">
      <h3 className="text-xl font-bold text-[#121417] mb-6">
        Your {countryData.name} Passport Photo
      </h3>
      
      <div className="mb-6">
        <img
          src={imageURL}
          alt="Processed passport photo"
          className="w-[207px] h-[266px] border-2 border-[#e5e8eb] shadow-lg rounded mx-auto"
        />
        <div className="text-sm text-[#61758a] mt-2">
          Size: {countryData.photoSize} • Print ready
        </div>
      </div>

      <button
        onClick={downloadImage}
        className="bg-[#44b871] hover:bg-[#318451] text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Download Photo
      </button>
      
      <div className="mt-4 text-xs text-[#61758a]">
        Your photo meets {countryData.name} official requirements
      </div>
    </div>
  );
}
