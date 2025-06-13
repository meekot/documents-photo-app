import { useCallback } from 'react';
import { detectLandmarks } from './useFaceMesh';

const PASSPORT_DIMENSIONS = {
  cropWidth: 413,
  cropHeight: 531,
  targetFaceHeight: 400,
} as const;

function alignEyesHorizontally(canvas: HTMLCanvasElement, landmarks: any[]): HTMLCanvasElement {
  // MediaPipe FaceMesh eye landmark indices
  // Left eye (from viewer's perspective): landmarks[33] (outer corner), landmarks[133] (inner corner)
  // Right eye (from viewer's perspective): landmarks[362] (inner corner), landmarks[263] (outer corner)
  const leftEyeOuter = landmarks[33];   // Left eye outer corner
  const leftEyeInner = landmarks[133];  // Left eye inner corner
  const rightEyeInner = landmarks[362]; // Right eye inner corner
  const rightEyeOuter = landmarks[263]; // Right eye outer corner

  // Calculate eye centers
  const leftEyeCenter = {
    x: (leftEyeOuter.x + leftEyeInner.x) / 2,
    y: (leftEyeOuter.y + leftEyeInner.y) / 2
  };
  
  const rightEyeCenter = {
    x: (rightEyeInner.x + rightEyeOuter.x) / 2,
    y: (rightEyeInner.y + rightEyeOuter.y) / 2
  };

  // Calculate angle between eyes
  const deltaX = rightEyeCenter.x - leftEyeCenter.x;
  const deltaY = rightEyeCenter.y - leftEyeCenter.y;
  const angle = Math.atan2(deltaY, deltaX);

  // Create rotated canvas
  const rotatedCanvas = document.createElement('canvas');
  const ctx = rotatedCanvas.getContext('2d')!;
  
  // Calculate canvas dimensions to fit rotated image
  const cos = Math.abs(Math.cos(angle));
  const sin = Math.abs(Math.sin(angle));
  const newWidth = canvas.width * cos + canvas.height * sin;
  const newHeight = canvas.width * sin + canvas.height * cos;
  
  rotatedCanvas.width = newWidth;
  rotatedCanvas.height = newHeight;
  
  // Set up rotation transformation
  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(-angle); // Negative angle to counter-rotate
  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  
  // Draw the rotated image
  ctx.drawImage(canvas, 0, 0);
  
  return rotatedCanvas;
}

function cropToPassportFormat(
  canvas: HTMLCanvasElement,
  chinY: number,
  topY: number,
  faceCenterX: number
): HTMLCanvasElement {
  const { targetFaceHeight, cropWidth, cropHeight } = PASSPORT_DIMENSIONS;
  const actualFaceHeight = chinY - topY;
  const scale = targetFaceHeight / actualFaceHeight;

  // Create scaled canvas
  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = canvas.width * scale;
  scaledCanvas.height = canvas.height * scale;
  const scaledCtx = scaledCanvas.getContext('2d')!;
  scaledCtx.scale(scale, scale);
  scaledCtx.drawImage(canvas, 0, 0);

  // Calculate new positions after scaling
  const newChinY = chinY * scale;
  const newTopY = topY * scale;
  const newFaceCenterY = (newChinY + newTopY) / 2;
  const newFaceCenterX = faceCenterX * scale;

  // Calculate crop position
  const sx = newFaceCenterX - cropWidth / 2;
  const sy = newFaceCenterY - cropHeight / 2;

  // Create final cropped canvas
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = cropWidth;
  finalCanvas.height = cropHeight;
  const finalCtx = finalCanvas.getContext('2d')!;
  finalCtx.drawImage(
    scaledCanvas,
    sx, sy,
    cropWidth, cropHeight,
    0, 0,
    cropWidth, cropHeight
  );

  return finalCanvas;
}

export function usePassportPhotoProcessor() {
  const processImage = useCallback(async (canvas: HTMLCanvasElement): Promise<string | null> => {
    try {
      const result = await detectLandmarks(canvas);

      if (!result) {
        return null;
      }

      const landmarks = result.keypoints;
      
      // Step 1: Align eyes horizontally
      const alignedCanvas = alignEyesHorizontally(canvas, landmarks);
      
      // Step 2: Re-detect landmarks on the aligned image for accurate cropping
      const alignedResult = await detectLandmarks(alignedCanvas);
      
      if (!alignedResult) {
        return null;
      }
      
      const alignedLandmarks = alignedResult.keypoints;
      const chin = alignedLandmarks[152];
      const forehead = alignedLandmarks[10];
      
      // Calculate face boundaries on aligned image
      const topY = forehead.y - (chin.y - forehead.y) * 0.25;
      const chinY = chin.y;
      const centerX = (chin.x + forehead.x) / 2;

      // Step 3: Crop to passport format
      const croppedCanvas = cropToPassportFormat(alignedCanvas, chinY, topY, centerX);
      return croppedCanvas.toDataURL();
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  }, []);

  const processImageWithSteps = useCallback(async (
    canvas: HTMLCanvasElement,
    onStepChange: (step: 'loading' | 'analyzing' | 'cropping' | 'preparing' | 'completed') => void
  ): Promise<string | null> => {
    try {
      // Step 1: Loading libraries (already loaded, but show for UX)
      onStepChange('loading');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Analyzing photo
      onStepChange('analyzing');
      const result = await detectLandmarks(canvas);

      if (!result) {
        return null;
      }

      const landmarks = result.keypoints;
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Cropping
      onStepChange('cropping');
      
      // Align eyes horizontally
      const alignedCanvas = alignEyesHorizontally(canvas, landmarks);
      
      // Re-detect landmarks on the aligned image for accurate cropping
      const alignedResult = await detectLandmarks(alignedCanvas);
      
      if (!alignedResult) {
        return null;
      }
      
      const alignedLandmarks = alignedResult.keypoints;
      const chin = alignedLandmarks[152];
      const forehead = alignedLandmarks[10];
      
      // Calculate face boundaries on aligned image
      const topY = forehead.y - (chin.y - forehead.y) * 0.25;
      const chinY = chin.y;
      const centerX = (chin.x + forehead.x) / 2;

      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 4: Prepare printable version
      onStepChange('preparing');
      const croppedCanvas = cropToPassportFormat(alignedCanvas, chinY, topY, centerX);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 5: Completed
      onStepChange('completed');
      return croppedCanvas.toDataURL();
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  }, []);

  return { processImage, processImageWithSteps };
}
