import React, { useEffect, useState } from 'react';
import { loadFaceMesh, detectLandmarks } from '@/lib/useFaceMesh';
import { resizeImage } from '@/lib/resizeImage';

export default function HomePage() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [resizedCanvas, setResizedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    loadFaceMesh().then(() => setModelLoaded(true));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const canvas = await resizeImage(file, 1024);
      setResizedCanvas(canvas);
      setImageURL(canvas.toDataURL());
    }
  };

  const cropToPassportFormat = (
    canvas: HTMLCanvasElement,
    chinY: number,
    topY: number,
    faceCenterX: number
  ): HTMLCanvasElement => {
    const targetFaceHeight = 400;
    const actualFaceHeight = chinY - topY;
    const scale = targetFaceHeight / actualFaceHeight;

    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;
    const scaledCtx = scaledCanvas.getContext('2d')!;
    scaledCtx.scale(scale, scale);
    scaledCtx.drawImage(canvas, 0, 0);

    const newChinY = chinY * scale;
    const newTopY = topY * scale;
    const newFaceCenterY = (newChinY + newTopY) / 2;
    const newFaceCenterX = faceCenterX * scale;

    const cropWidth = 413;
    const cropHeight = 531;
    const sx = newFaceCenterX - cropWidth / 2;
    const sy = newFaceCenterY - cropHeight / 2;

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
  };

  useEffect(() => {
    const detectFace = async () => {

      if (!resizedCanvas || !modelLoaded) return;

      const result = await detectLandmarks(resizedCanvas);

      if (result) {
        const landmarks = result.keypoints;
        const chin = landmarks[152];
        const forehead = landmarks[10];
        const topY = forehead.y - (chin.y - forehead.y) * 0.25;
        const chinY = chin.y;
        const centerX = (chin.x + forehead.x) / 2;

        const cropped = cropToPassportFormat(resizedCanvas, chinY, topY, centerX);
        setImageURL(cropped.toDataURL());
      } else {
        console.log('Face not found')
      }
    };

    if (resizedCanvas && modelLoaded) detectFace();
  }, [resizedCanvas, modelLoaded]);

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageURL && (
        <img
          src={imageURL}
          alt="Cropped result"
          className="w-[207px] h-[266px] border"
        />
      )}
    </main>
  );
}
