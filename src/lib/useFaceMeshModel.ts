import { useEffect, useState } from 'react';
import { loadFaceMesh } from './useFaceMesh';

export function useFaceMeshModel() {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    loadFaceMesh().then(() => {
      console.log('FaceMesh loaded');
      setModelLoaded(true);
    });
  }, []);

  return { modelLoaded };
}
