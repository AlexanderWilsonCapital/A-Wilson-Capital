'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AnalyzePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to Wilson Capital. I'm your AI portfolio advisor. Upload a CSV or describe your holdings for analysis." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpgrade = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "https://buy.stripe.com/5kQ3cw6zzea6gi62jM38401";
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'System error.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black p-6 hidden lg:flex flex-col gap-8 relative z-20">
        <Link href="/" className="text-xl font-black text-yellow-400 italic">WILSON CAPITAL</Link>
        
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Quick Actions</p>
            <button onClick={() => setInput('Analyze my portfolio')} className="w-full text-left text-xs text-zinc-400 hover:text-yellow-400 p-2 uppercase italic transition-colors">→ Analyze Portfolio</button>
          </div>

          {/* NEW: CAPITAL MANAGEMENT SIDEBAR BUTTON */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Asset Management</p>
            <Link href="/manage" className="block w-full text-left text-[10px] font-bold text-white/60 hover:text-white p-3 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all uppercase tracking-tighter">
              Institutional Execution 
              <span className="block text-[8px] text-yellow-400 mt-1 italic">Invest through Wilson Capital →</span>
            </Link>
          </div>
        </div>

        {/* PRO BUTTON */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 relative z-50">
          <p className="text-xs font-bold text-yellow-400 uppercase mb-2">Pro Tier</p>
          <button 
            onClick={handleUpgrade}
            className="w-full py-3 bg-white text-black text-[10px] font-black rounded-lg hover:bg-yellow-400 transition-all uppercase cursor-pointer"
          >
            Upgrade Strategy — €29
          </button>
        </div>
      </aside>

      {/* Main Terminal */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl flex justify-between items-center">
          <h2 className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest italic">Institutional Terminal v2.0</h2>
          <Link href="/" className="text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest">Exit</Link>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-900 border border-white/5 text-zinc-200'}`}>
                {m.content}
              </div>
              
              {/* NEW: CONTEXTUAL MANAGEMENT LINK UNDER AI MESSAGES */}
              {m.role === 'assistant' && i !== 0 && (
                <div className="mt-3 ml-2 flex items-center gap-3">
                  <Link href="/manage" className="text-[9px] font-bold text-yellow-400/80 hover:text-yellow-400 uppercase tracking-widest flex items-center gap-1 transition-colors">
                    <span className="h-1 w-1 rounded-full bg-yellow-400 animate-pulse" />
                    Deploy this strategy via Wilson Capital Management
                  </Link>
                </div>
              )}
            </div>
          ))}
        </section>

        <footer className="p-8 bg-black">
          <div className="max-w-4xl mx-auto relative">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Enter query..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-yellow-400/50 outline-none text-white"
            />
            <button onClick={sendMessage} className="absolute right-2 top-2 bottom-2 px-6 bg-yellow-400 text-black font-black rounded-lg text-[10px] uppercase transition-transform active:scale-95">Execute</button>
          </div>
        </footer>
      </main>
    </div>
  );
}