import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;

let isReady = false;

export async function loadFaceMesh() {
  if (isReady) return;
  await tf.setBackend('webgl');
  await tf.ready();
  model = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    { runtime: 'tfjs', refineLandmarks: true }
  );
  isReady = true;

  console.log('Models Loaded')
}

export async function detectLandmarks(input: HTMLImageElement | HTMLCanvasElement) {
  if (!model) throw new Error('FaceMesh model not loaded');
  const faces = await model.estimateFaces(input);
  return faces[0] || null;
}
