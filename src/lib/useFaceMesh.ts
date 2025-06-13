import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

let model: faceLandmarksDetection.FaceLandmarksDetector | null = null;

let isReady = false;

export async function loadFaceMesh() {
  if (isReady) return;
  
  try {
    await tf.setBackend('webgl');
    await tf.ready();
  } catch (error) {
    console.warn('WebGL backend failed, falling back to CPU:', error);
    await tf.setBackend('cpu');
    await tf.ready();
  }
  
  model = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    { runtime: 'tfjs', refineLandmarks: true }
  );
  isReady = true;

  console.log('FaceMesh Models Loaded with backend:', tf.getBackend())
}

export async function detectLandmarks(input: HTMLImageElement | HTMLCanvasElement) {
  if (!model) throw new Error('FaceMesh model not loaded');
  const faces = await model.estimateFaces(input);
  return faces[0] || null;
}
