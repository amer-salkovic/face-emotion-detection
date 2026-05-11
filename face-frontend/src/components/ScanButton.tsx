'use client';

import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

interface ScanButtonProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onResult: (data: any) => void;
}

export default function ScanButton({ videoRef, onResult }: ScanButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Učitaj modele samo jednom pri mountanju
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        console.log('✅ Face-API modeli učitani!');
      } catch (error) {
        console.error('❌ Greška pri učitavanju modela:', error);
      }
    };

    loadModels();
  }, []);

  const handleScan = async () => {
    if (!modelsLoaded) {
      onResult({
        status: 'error',
        emotion: 'ERROR',
        confidence: 0,
        message: 'Modeli se još uvek učitavaju...',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Detektuj lice i emocije
      if (videoRef.current) {
        const detections = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        if (detections) {
          // Nađi dominantnu emociju
          const expressions = detections.expressions;
          const emotionEntries = Object.entries(expressions);
          const dominantEntry = emotionEntries.reduce((max, current) =>
            current[1] > max[1] ? current : max
          );
          const dominant = dominantEntry[0] as keyof typeof expressions;
          const confidenceValue = (expressions[dominant] as number) || 0;

          const confidence = Math.round(confidenceValue * 100);

          // Prosledi rezultat parent komponenti
          onResult({
            status: 'success',
            emotion: dominant.charAt(0).toUpperCase() + dominant.slice(1),
            confidence,
          });
        } else {
          onResult({
            status: 'error',
            emotion: 'NO_FACE',
            confidence: 0,
            message: '❌ Lice nije detektovano. Približi se kameri!',
          });
        }
      }
    } catch (error) {
      console.error('Greška pri analizi:', error);
      onResult({
        status: 'error',
        emotion: 'ERROR',
        confidence: 0,
        message: 'Greška pri analizi: ' + (error instanceof Error ? error.message : 'Unknown error'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleScan}
      disabled={isLoading}
      className={`
        relative px-12 py-4 rounded-full font-bold text-sm tracking-[0.2em] uppercase
        transition-all duration-300 transform active:scale-95
        ${isLoading 
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
          : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
        }
      `}
    >
      {isLoading ? (
        <span className="flex items-center gap-3">
          <svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        'Initialize Scan'
      )}
    </button>
  );
}