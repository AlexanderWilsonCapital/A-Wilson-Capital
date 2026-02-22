'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AnalyzePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to Wilson Capital. I'm your AI portfolio advisor. You can upload a CSV of your holdings, or simply describe your strategy to me for a full micro and macro analysis." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setPortfolioData(text);
      setMessages(prev => [...prev, 
        { role: 'user', content: `I've uploaded my portfolio file: ${file.name}` },
        { role: 'assistant', content: `Portfolio "${file.name}" loaded. I'm ready. Ask me to "analyze my portfolio" or ask about specific risk exposures.` }
      ]);
    };
    reader.readAsText(file);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, portfolioData, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'System error. Please verify your connection and try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-yellow-400/30">
      {/* Sidebar - Command Center */}
      <aside className="w-72 border-r border-white/5 bg-black p-6 hidden lg:flex flex-col gap-8">
        <Link href="/" className="text-xl font-black tracking-tighter text-yellow-400">
          WILSON <span className="text-white">CAPITAL</span>
        </Link>

        {/* Upload Section */}
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Data Ingestion</p>
          <button
            onClick={() => fileRef.current?.click()}
            className={`w-full py-4 px-4 border border-dashed rounded-2xl text-xs transition-all flex flex-col items-center gap-2 ${
              portfolioData 
              ? 'border-yellow-400/50 bg-yellow-400/5 text-yellow-400' 
              : 'border-white/10 text-zinc-500 hover:border-yellow-400/40 hover:text-zinc-300'
            }`}
          >
            <span className="text-lg">{portfolioData ? '✓' : '+'}</span>
            {portfolioData ? 'Portfolio Synced' : 'Upload CSV / Excel'}
          </button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
        </div>

        {/* Quick Actions */}
        <div className="flex-1 space-y-4">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Analysis</p>
          <div className="space-y-2">
            {['Analyze my portfolio', 'Assess biggest risks', 'Diversification score', 'Rebalancing strategy'].map((q, i) => (
              <button 
                key={i} 
                onClick={() => setInput(q)} 
                className="w-full text-left text-xs text-zinc-400 hover:text-yellow-400 p-3 rounded-xl hover:bg-white/5 transition border border-transparent hover:border-white/5"
              >
                → {q}
              </button>
            ))}
          </div>
        </div>

        {/* Pro Upsell */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-bold text-yellow-400">Pro Tier</p>
            <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-400 uppercase">Locked</span>
          </div>
          <p className="text-[10px] text-zinc-500 mb-4 leading-relaxed">Access Macro Insights, Commodities, and REITs strategies.</p>
          <button className="w-full py-2.5 bg-white text-black text-[10px] font-black rounded-lg hover:bg-zinc-200 transition uppercase tracking-tighter">Upgrade Strategy</button>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col bg-[#050505] relative">
        {/* Top Header */}
        <header className="px-8 py-5 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">AI Institutional Advisor v2.0</h2>
          </div>
          <Link href="/" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition">Exit Terminal</Link>
        </header>

        {/* Chat Messages */}
        <section className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-6 py-4 rounded-3xl text-sm leading-relaxed ${
                m.role === 'user' 
                ? 'bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-400/5' 
                : 'bg-zinc-900/50 border border-white/5 text-zinc-200 backdrop-blur-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900/50 border border-white/5 px-6 py-4 rounded-3xl text-xs text-zinc-500 italic animate-pulse">
                Consulting macro engine...
              </div>
            </div>
          )}
        </section>

        {/* Sticky Input Bar */}
        <footer className="p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Query portfolio or ask about macro trends..."
              className="w-full bg-zinc-900/80 border border-white/10 rounded-2xl px-6 py-5 pr-24 text-sm text-white focus:outline-none focus:border-yellow-400/50 transition-all shadow-2xl backdrop-blur-md"
            />
            <button 
              onClick={sendMessage}
              disabled={loading}
              className="absolute right-3 top-2.5 bottom-2.5 px-5 bg-yellow-400 text-black font-black rounded-xl text-[10px] uppercase tracking-tighter hover:bg-yellow-300 transition-all disabled:opacity-50 active:scale-95"
            >
              Execute
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-6">
             <span className="text-[8px] text-zinc-700 uppercase tracking-widest font-bold text-center">Data latency: 14ms</span>
             <span className="text-[8px] text-zinc-700 uppercase tracking-widest font-bold text-center">Neural Analysis: Active</span>
          </div>
        </footer>
      </main>
    </div>
  );
}