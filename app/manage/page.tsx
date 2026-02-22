'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ManagePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <nav className="max-w-3xl mx-auto mb-20 flex justify-between items-center">
        <Link href="/analyze" className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">← Back to Terminal</Link>
        <span className="text-xl font-black text-yellow-400 italic">WILSON CAPITAL</span>
      </nav>

      <div className="max-w-xl mx-auto">
        {!submitted ? (
          <>
            <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Asset <span className="text-yellow-400">Management</span></h1>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-12 leading-relaxed">
              Institutional execution for portfolios exceeding €100,000. 
              Regulated advisory and discretionary mandates.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setMessages(true); }} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Estimated AUM (Assets Under Management)</label>
                <select className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-400 text-white">
                  <option>€100k - €500k</option>
                  <option>€500k - €2M</option>
                  <option>€2M+</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-2">Primary Objective</label>
                <input type="text" placeholder="e.g. Wealth Preservation / Aggressive Growth" className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-400 text-white" />
              </div>

              <div className="p-6 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl mb-8">
                <p className="text-[10px] text-yellow-400 font-bold uppercase mb-2">Danish Regulatory Notice</p>
                <p className="text-[9px] text-zinc-500 leading-relaxed uppercase">
                  By submitting this request, you confirm you are a sophisticated investor. Wilson Capital will conduct Mifid II suitability assessments prior to any mandate.
                </p>
              </div>

              <button className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl uppercase text-xs hover:bg-yellow-300 transition-all">
                Request Strategy Consultation
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="h-2 w-2 bg-yellow-400 rounded-full mx-auto mb-4 animate-ping" />
            <h2 className="text-2xl font-black uppercase italic mb-4">Request Logged</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed">
              An advisor will review your terminal data and reach out via your registered neural link within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}