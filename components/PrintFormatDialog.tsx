'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileImage, Grid3X3, Printer } from "lucide-react";
import { PRINT_FORMATS, PrintFormat, generatePrintSheet, getRecommendedFormat } from '@/lib/printFormats';
import { Country } from "@/config/countries";
import { Translation } from "@/config/translations";

interface PrintFormatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageURL: string;
  country: Country;
  translation: Translation;
}

export function PrintFormatDialog({ 
  isOpen, 
  onClose, 
  imageURL, 
  country, 
  translation 
}: PrintFormatDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<PrintFormat>(
    getRecommendedFormat(country.photoSize)
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFormatSelect = async (format: PrintFormat) => {
    setSelectedFormat(format);
    setPreviewURL(null);
    
    // Generate preview for multi-photo formats
    if (format.photosPerSheet > 1) {
      try {
        const preview = await generatePrintSheet(imageURL, format);
        setPreviewURL(preview);
      } catch (error) {
        console.error('Error generating preview:', error);
      }
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      let downloadURL: string;
      let filename: string;

      if (selectedFormat.photosPerSheet === 1) {
        // Single photo - use original
        downloadURL = imageURL;
        filename = `${country.name.toLowerCase()}-passport-photo-single.png`;
      } else {
        // Multiple photos - generate sheet
        downloadURL = await generatePrintSheet(imageURL, selectedFormat);
        filename = `${country.name.toLowerCase()}-passport-photo-${selectedFormat.id}.png`;
      }

      // Download the file
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onClose();
    } catch (error) {
      console.error('Error downloading:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getFormatIcon = (format: PrintFormat) => {
    if (format.photosPerSheet === 1) return <FileImage className="w-5 h-5" />;
    if (format.photosPerSheet <= 4) return <Grid3X3 className="w-5 h-5" />;
    return <Printer className="w-5 h-5" />;
  };

  const getPreviewImage = () => {
    if (selectedFormat.photosPerSheet === 1) {
      return imageURL;
    }
    return previewURL;
  };

  useEffect(() => {
    handleFormatSelect(PRINT_FORMATS[1])
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            Choose Print Format
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          {/* Format Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Print Options</h3>
            <div className="space-y-3">
              {PRINT_FORMATS.map((format) => (
                <div
                  key={format.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedFormat.id === format.id
                      ? 'border-[#44b871] bg-[#f5fbfe]'
                      : 'border-[#e5e8eb] hover:border-[#44b871]/50'
                  }`}
                  onClick={() => handleFormatSelect(format)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedFormat.id === format.id
                        ? 'bg-[#44b871] text-white'
                        : 'bg-[#f5f7fa] text-[#61758a]'
                    }`}>
                      {getFormatIcon(format)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#121417]">
                        {format.name}
                      </div>
                      <div className="text-sm text-[#61758a] mt-1">
                        {format.description}
                      </div>
                      <div className="text-xs text-[#61758a] mt-2">
                        {format.photosPerSheet} photo{format.photosPerSheet > 1 ? 's' : ''} • 
                        {format.dimensions.width}×{format.dimensions.height}px
                      </div>
                    </div>
                    {selectedFormat.id === format.id && (
                      <div className="w-5 h-5 bg-[#44b871] rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Preview</h3>
            <div className="border-2 border-dashed border-[#e5e8eb] rounded-lg p-4 min-h-[400px] flex items-center justify-center bg-[#f5f7fa]">
              {getPreviewImage() ? (
                <div className="text-center">
                  <img
                    src={getPreviewImage()!}
                    alt="Print preview"
                    className="max-w-full max-h-[350px] border border-[#e5e8eb] shadow-lg rounded"
                  />
                  <div className="text-sm text-[#61758a] mt-3">
                    {selectedFormat.name} - {selectedFormat.photosPerSheet} photo{selectedFormat.photosPerSheet > 1 ? 's' : ''}
                  </div>
                </div>
              ) : selectedFormat.photosPerSheet > 1 ? (
                <div className="text-center text-[#61758a]">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <div>Generating preview...</div>
                </div>
              ) : (
                <div className="text-center text-[#61758a]">
                  <FileImage className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <div>Preview will appear here</div>
                </div>
              )}
            </div>

            {/* Format Details */}
            <div className="bg-[#f5fbfe] rounded-lg p-4">
              <h4 className="font-medium text-[#121417] mb-2">Format Details</h4>
              <div className="space-y-1 text-sm text-[#61758a]">
                <div>• {selectedFormat.photosPerSheet} photo{selectedFormat.photosPerSheet > 1 ? 's' : ''} per sheet</div>
                <div>• Each photo: {country.photoSize}</div>
                <div>• Print size: {Math.round(selectedFormat.dimensions.width/300*2.54)}×{Math.round(selectedFormat.dimensions.height/300*2.54)}cm</div>
                <div>• Resolution: 300 DPI (print quality)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            className="bg-[#44b871] hover:bg-[#318451] text-white flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download {selectedFormat.name}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
