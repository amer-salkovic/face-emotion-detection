'use client';
/**
 * EmotionScanner Orchestrator
 * Manages the state machine between camera feed, analysis trigger, and result rendering.
 */
import { useState } from 'react';
import CameraPreview from './CameraPreview';
import ScanButton from './ScanButton';
import EmotionDisplay from './EmotionDisplay';

interface AnalysisResult {
  status: 'success' | 'error';
  emotion: string;
  confidence: number;
  message?: string;
}

export default function EmotionScanner() {
  const [data, setData] = useState<AnalysisResult | null>(null);

  return (
    <section className="flex flex-col items-center w-full max-w-2xl gap-8">
      {/* Vision Input */}
      <div className="w-full">
        <CameraPreview />
      </div>

      {/* Interaction & Result Output */}
      <div className="flex flex-col items-center gap-6 w-full px-4">
        <ScanButton onResult={(res) => setData(res)} />

        <div className="w-full min-h-[140px] flex justify-center">
          {data?.status === 'success' && <EmotionDisplay result={data} />}
          
          {data?.status === 'error' && (
            <div role="alert" className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm font-mono uppercase tracking-tighter">
              System Alert: {data.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}