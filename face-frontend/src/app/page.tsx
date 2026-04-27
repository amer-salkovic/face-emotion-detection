import EmotionScanner from '@/components/EmotionScanner';

/**
 * Landing Page Component
 * Uses high-contrast typography and semantic structure for accessibility (WCAG compliance).
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-cyan-500/30">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-[-1]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(20,30,80,0.15)_0%,_rgba(0,0,0,1)_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col items-center">
        
        {/* Semantic Header */}
        <header className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5">
            <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase">
              Neural Engine Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
            EMOTION <span className="text-cyan-500 italic">AI</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            A sophisticated interface merging <span className="text-slate-100 font-medium">Biometric Detection</span> 
            with real-time sentiment analysis.
          </p>
        </header>

        {/* Central Component Hub */}
        <section className="w-full flex justify-center">
          <EmotionScanner />
        </section>

        {/* Infrastructure Metadata */}
        <footer className="mt-24 pt-10 border-t border-white/5 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Intelligence', value: 'Python Core' },
            { label: 'Vision', value: 'DeepFace ML' },
            { label: 'Framework', value: 'Next.js 15' },
            { label: 'Interface', value: 'Tailwind CSS' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-500 uppercase">{item.label}</span>
              <span className="text-xs font-semibold text-slate-300">{item.value}</span>
            </div>
          ))}
        </footer>
      </div>
    </main>
  );
}