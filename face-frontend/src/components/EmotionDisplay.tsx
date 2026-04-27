'use client';
/**
 * EmotionDisplay Component
 * Renders biometrical data with responsive typography and accessibility attributes.
 */

interface Props {
  result: {
    emotion?: string;
    confidence: number;
  };
}

export default function EmotionDisplay({ result }: Props) {
  const emotion = result.emotion || 'Analyzing...';

  const theme = (val: string) => {
    const map: Record<string, string> = {
      happy: 'text-yellow-400',
      sad: 'text-blue-400',
      angry: 'text-red-500',
      neutral: 'text-slate-400'
    };
    return map[val.toLowerCase()] || 'text-cyan-400';
  };

  return (
    <div className="w-full p-6 md:p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 animate-in fade-in zoom-in duration-500">
      <header className="mb-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Classification</p>
        <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${theme(emotion)}`}>
          {emotion}
        </h2>
      </header>

      <footer className="space-y-2">
        <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
          <span>Confidence</span>
          <span>{result.confidence}%</span>
        </div>
        {/* Accessible Progress Bar */}
        <div 
          className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"
          role="progressbar" 
          aria-valuenow={result.confidence} 
          aria-valuemin={0} 
          aria-valuemax={100}
        >
          <div 
            className="bg-current h-full transition-all duration-1000 ease-out" 
            style={{ width: `${result.confidence}%`, color: 'inherit' }}
          />
        </div>
      </footer>
    </div>
  );
}