'use client';
/**
 * ScanButton Component
 * * @description
 * Handles the HTTP request to the Next.js API route. 
 * Features a loading state to prevent 'double-tapping' and provides 
 * visual feedback during the AI processing phase.
 */
import { useState } from 'react';

interface ScanButtonProps {
  onResult: (data: any) => void;
}

export default function ScanButton({ onResult }: ScanButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Triggers the biometric scan by calling the internal API proxy.
   * Updates the parent state with the returned AI data.
   */
  const handleScan = async () => {
    setIsLoading(true);
    try {
      // Calling our internal Next.js API Route (Proxy)
      const response = await fetch('/api/emotion');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onResult(data);
    } catch (error) {
      console.error("Scanning process failed:", error);
      onResult({ status: 'error', message: 'Failed to connect to Neural Engine' });
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
          {/* Simple CSS Spinner */}
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