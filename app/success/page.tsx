'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      {/* Subtle Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 bg-yellow-400/10 border border-yellow-400 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(250,204,21,0.15)] animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-yellow-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase italic">
          Access <span className="text-yellow-400">Granted</span>
        </h1>
        
        <p className="text-zinc-500 max-w-sm mb-8 text-xs leading-relaxed uppercase tracking-widest font-bold">
          Institutional Pro Terminal Active. <br />
          Neural Link Verified.
        </p>

        {/* Benefits Checklist - Adds a professional feel */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10 text-left max-w-xs mx-auto border-y border-white/5 py-6">
          {['Unlimited AI', 'Macro Risks', 'Commodities', 'Priority Sync'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-[9px] uppercase tracking-tighter font-black text-zinc-400">
              <span className="text-yellow-400">✓</span> {item}
            </div>
          ))}
        </div>

        {/* This link now sends the "pro" signal to the analyze page */}
        <Link 
          href="/analyze?session=pro" 
          className="inline-block px-12 py-4 bg-yellow-400 text-black font-black rounded-xl hover:bg-yellow-300 transition-all uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-yellow-400/20 active:scale-95 group"
        >
          <span className="group-hover:hidden">Enter Terminal</span>
          <span className="hidden group-hover:inline">Initialize Neural Link →</span>
        </Link>
      </div>
    </div>
  );
}