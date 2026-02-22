'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-400/30">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter uppercase">
            Wilson <span className="text-yellow-400">Capital</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</Link>
          <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</Link>
          <Link href="/analyze" className="px-5 py-2 text-sm bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            Analyze Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 py-32 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-400/10 blur-[120px] rounded-full -z-10" />
        
        <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.2em] text-yellow-400 border border-yellow-400/30 rounded-full uppercase bg-yellow-400/5">
          Institutional-Grade AI Analysis
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] max-w-5xl mb-8 tracking-tighter">
          KNOW EXACTLY WHERE YOUR <span className="text-yellow-400">MONEY STANDS.</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The ultimate AI-powered intelligence for stocks, crypto, forex, and macro strategies. Professional risk assessment and diversification feedback — delivered in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/analyze" className="px-10 py-5 bg-yellow-400 text-black font-black rounded-2xl text-xl hover:bg-yellow-300 transition-all hover:scale-105 active:scale-95 shadow-xl">
            Analyze Portfolio Free
          </Link>
          <Link href="#features" className="px-10 py-5 border border-white/10 text-white font-bold rounded-2xl text-xl hover:bg-white/5 transition-all">
            See How It Works
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-32 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Intelligent Edge.</h2>
          <p className="text-gray-500 text-lg">Every financial product analyzed at a micro and macro level.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Risk Assessment', desc: 'Identify overconcentration and volatility risks across asset classes before the market moves.', icon: '⚡' },
            { title: 'Diversification Analysis', desc: 'Balanced suggestions across sectors and geographies tailored to your goals.', icon: '🎯' },
            { title: 'AI Chat Advisor', desc: 'Conversational analysis. Ask anything about your strategy in plain English.', icon: '🤖' },
            { title: 'Multi-Asset Coverage', desc: 'Stocks, Crypto, Forex, Bonds, ETFs, REITs, and Commodities in one unified view.', icon: '📊' },
            { title: 'Strategic Rebalancing', desc: 'Personalized hedging and optimization strategies to protect your capital.', icon: '🧠' },
            { title: 'Macro Insights', desc: 'Understand how global trends affect your holdings in real-time.', icon: '🌍' },
          ].map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-yellow-400/50 transition-all">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-32 bg-[#050505] border-y border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Strategy.</h2>
          <p className="text-gray-500">Minimize cost, maximize intelligence.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="flex-1 p-10 rounded-3xl border border-white/5 bg-black">
            <h3 className="text-xl font-bold mb-2">Free Analysis</h3>
            <p className="text-5xl font-black mb-8">€0<span className="text-lg text-gray-600 font-medium">/mo</span></p>
            <ul className="space-y-4 text-gray-400 mb-10 text-sm">
              {['Basic portfolio analysis', 'Risk score', 'Diversification feedback', 'AI chat (5 messages/day)', 'Stocks & ETFs coverage'].map((f, i) => (
                <li key={i} className="flex items-center gap-3"><span className="text-yellow-400/50 italic font-bold text-xs">GO</span> {f}</li>
              ))}
            </ul>
            <Link href="/analyze" className="block text-center py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition">Get Started</Link>
          </div>

          {/* Pro Tier - STRIPE LINK ADDED HERE */}
          <div className="flex-1 p-10 rounded-3xl border-2 border-yellow-400 bg-yellow-400/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-6 py-2 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Institutional</div>
            <h3 className="text-xl font-bold mb-2 text-yellow-400">Pro Advisor</h3>
            <p className="text-5xl font-black mb-8">€29<span className="text-lg text-yellow-400/60 font-medium">/mo</span></p>
            <ul className="space-y-4 text-gray-200 mb-10 text-sm">
              {['Deep strategic recommendations', 'Unlimited AI chat', 'All asset classes (Crypto/FX/REITs)', 'Macro analysis', 'Portfolio rebalancing', 'Priority strategy support'].map((f, i) => (
                <li key={i} className="flex items-center gap-3"><span className="text-yellow-400 italic font-bold text-xs">ADV</span> {f}</li>
              ))}
            </ul>
            <a 
              href="https://buy.stripe.com/5kQ3cw6zzea6gi62jM38401" 
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-4 bg-yellow-400 text-black rounded-2xl font-black hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 text-center">
        <div className="text-sm font-bold tracking-widest text-gray-600 mb-4 uppercase">Wilson Capital</div>
        <p className="text-xs text-gray-700 tracking-tighter">
          © 2026 WILSON CAPITAL. NOT FINANCIAL ADVICE. ALL ANALYSIS IS AI-GENERATED.
        </p>
      </footer>
    </main>
  );
}