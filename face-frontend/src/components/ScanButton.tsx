'use client';

import { useState } from 'react';

interface ScanButtonProps {
  onResult: (data: any) => void;
}

export default function ScanButton({ onResult }: ScanButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    setIsLoading(true);
    try {
      // 1. Pronađi video element
      const video = document.querySelector('video');
      if (!video) throw new Error("Kamera nije pronađena");

      // 2. Napravi snimak frejma
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const imageBase64 = canvas.toDataURL('image/jpeg');

      // 3. Pozovi Render Backend
      const response = await fetch(`https://face-emotion-detection-6p1s.onrender.com/analyze?t=${Date.now()}`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ image: imageBase64 }),
});
      
      if (!response.ok) throw new Error('Neural Engine returned an error');

      const data = await response.json();
      onResult(data);
    } catch (error) {
      console.error("Scanning failed:", error);
      onResult({ status: 'error', message: 'Neural Engine connection failed' });
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