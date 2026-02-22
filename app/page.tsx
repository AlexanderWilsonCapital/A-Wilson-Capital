'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">Wilson <span className="text-yellow-400">Capital</span></span>
        </div>
        <div className="flex gap-4">
          <Link href="/analyze" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">Analyze Portfolio</Link>
          <Link href="/pricing" className="px-4 py-2 text-sm bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-32">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest text-yellow-400 border border-yellow-400 rounded-full uppercase">AI-Powered Portfolio Intelligence</div>
        <h1 className="text-6xl font-extrabold leading-tight max-w-4xl mb-6">
          Know exactly where your <span className="text-yellow-400">money stands</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-10">
          Upload your portfolio and get instant AI-powered analysis across stocks, crypto, forex, bonds, ETFs, and real estate. Risk assessment, diversification feedback, and strategic recommendations — in seconds.
        </p>
        <div className="flex gap-4">
          <Link href="/analyze" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl text-lg hover:bg-yellow-300 transition">Analyze My Portfolio Free</Link>
          <Link href="#features" className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl text-lg hover:border-gray-400 transition">See How It Works</Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Everything your portfolio needs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Risk Assessment', desc: 'Understand your exposure across asset classes. We flag overconcentration, volatility risks, and correlation issues instantly.', icon: '⚡' },
            { title: 'Diversification Analysis', desc: 'See exactly how balanced your portfolio is across sectors, geographies, and asset types with actionable suggestions.', icon: '🎯' },
            { title: 'AI Chat Advisor', desc: 'Ask questions about your portfolio in plain English. Get instant, intelligent answers about your holdings and strategy.', icon: '🤖' },
            { title: 'Multi-Asset Coverage', desc: 'Stocks, crypto, forex, bonds, ETFs, REITs, commodities — we analyze everything in one place.', icon: '📊' },
            { title: 'Strategic Recommendations', desc: 'Get personalized suggestions for rebalancing, hedging, and optimizing your portfolio for your goals.', icon: '🧠' },
            { title: 'Macro Insights', desc: 'Understand how macroeconomic trends affect your holdings and where opportunities may lie.', icon: '🌍' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-800 hover:border-yellow-400 transition">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-8 py-24 bg-gray-950">
        <h2 className="text-4xl font-bold text-center mb-16">Simple pricing</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          <div className="flex-1 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-4xl font-extrabold mb-6">£0 <span className="text-sm text-gray-400 font-normal">/ forever</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              {['Basic portfolio analysis', 'Risk score', 'Diversification feedback', 'AI chat (5 messages/day)', 'Stocks & ETFs coverage'].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-yellow-400">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/analyze" className="block text-center py-3 border border-gray-600 rounded-xl font-semibold hover:border-yellow-400 transition">Get Started Free</Link>
          </div>
          <div className="flex-1 p-8 rounded-2xl border-2 border-yellow-400 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">MOST POPULAR</div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-extrabold mb-6">£29 <span className="text-sm text-gray-400 font-normal">/ month</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              {['Everything in Free', 'Deep strategic recommendations', 'Unlimited AI chat', 'All asset classes', 'Macro analysis', 'Portfolio rebalancing suggestions', 'Priority support'].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-yellow-400">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/analyze" className="block text-center py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition">Start Pro Trial</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2026 Wilson Capital. All rights reserved.
      </footer>
    </main>
  );
}