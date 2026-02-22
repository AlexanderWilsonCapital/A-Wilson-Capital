'use client';
import { useState, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AnalyzePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Welcome to Wilson Capital. I'm your AI portfolio advisor. You can upload a CSV file of your holdings, or simply describe your portfolio to me and I'll provide a comprehensive analysis including risk assessment, diversification feedback, and strategic recommendations." }
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
        { role: 'assistant', content: `Portfolio file "${file.name}" loaded successfully. I can see your holdings. Ask me anything about your portfolio, or say "analyze my portfolio" for a full breakdown.` }
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <a href="/" className="text-xl font-bold">Wilson <span className="text-yellow-400">Capital</span></a>
        <span className="text-sm text-gray-400">AI Portfolio Advisor</span>
      </nav>

      <div className="flex flex-1 max-w-5xl mx-auto w-full px-4 py-8 gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          <div className="p-4 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-3 text-sm text-gray-300 uppercase tracking-wider">Upload Portfolio</h3>
            <p className="text-xs text-gray-500 mb-3">Upload a CSV with your holdings (ticker, shares, value)</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-sm text-gray-400 hover:border-yellow-400 hover:text-yellow-400 transition"
            >
              {portfolioData ? '✓ Portfolio Loaded' : '+ Upload CSV'}
            </button>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </div>

          <div className="p-4 rounded-xl border border-gray-800">
            <h3 className="font-semibold mb-3 text-sm text-gray-300 uppercase tracking-wider">Quick Analysis</h3>
            <div className="space-y-2">
              {['Analyze my portfolio', 'What are my biggest risks?', 'How diversified am I?', 'What should I rebalance?'].map((q, i) => (
                <button key={i} onClick={() => setInput(q)} className="w-full text-left text-xs text-gray-400 hover:text-yellow-400 py-1 transition">
                  → {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col rounded-xl border border-gray-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0" style={{maxHeight: 'calc(100vh - 220px)'}}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-yellow-400 text-black font-medium' 
                    : 'bg-gray-900 text-gray-100 border border-gray-800'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded-2xl text-sm text-gray-400">
                  Analyzing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800 flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about your portfolio..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl text-sm hover:bg-yellow-300 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}