'use client';
import { useState } from 'react';
import Link from 'next/link';

interface BacktestResult {
  totalReturn: number;
  winRate: number;
  totalTrades: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: Trade[];
}

interface Trade {
  date: string;
  action: 'BUY' | 'SELL';
  price: number;
  shares: number;
  pnl?: number;
}

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState<'backtest' | 'live'>('backtest');
  const [symbol, setSymbol] = useState('AAPL');
  const [strategy, setStrategy] = useState('ma_crossover');
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2024-01-01');
  const [capital, setCapital] = useState('10000');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>('');
  const [botRunning, setBotRunning] = useState(false);
  const [positions, setPositions] = useState<any[]>([]);

  const runBacktest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, strategy, startDate, endDate, capital: Number(capital) }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert('Backtest failed. Please try again.');
    }
    setLoading(false);
  };

  const startBot = async () => {
    setBotRunning(true);
    setLiveStatus('Starting bot...');
    try {
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, strategy, action: 'start' }),
      });
      const data = await res.json();
      setLiveStatus(data.message);
      fetchPositions();
    } catch (e) {
      setLiveStatus('Error starting bot.');
      setBotRunning(false);
    }
  };

  const stopBot = async () => {
    setBotRunning(false);
    setLiveStatus('Bot stopped.');
  };

  const fetchPositions = async () => {
    try {
      const res = await fetch('/api/positions');
      const data = await res.json();
      setPositions(data.positions || []);
    } catch (e) {}
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <Link href="/" className="text-xl font-bold">Wilson <span className="text-yellow-400">Capital</span></Link>
        <span className="text-sm text-gray-400">Algo Trading</span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-4xl font-extrabold mb-2">Algorithmic Trading</h1>
        <p className="text-gray-400 mb-8">Backtest strategies on historical data, then deploy them live with paper trading.</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('backtest')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'backtest' ? 'bg-yellow-400 text-black' : 'border border-gray-700 text-gray-300 hover:border-yellow-400'}`}
          >
            Backtest
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === 'live' ? 'bg-yellow-400 text-black' : 'border border-gray-700 text-gray-300 hover:border-yellow-400'}`}
          >
            Live Paper Trading
          </button>
        </div>

        {activeTab === 'backtest' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Config */}
            <div className="space-y-4">
              <div className="p-6 rounded-xl border border-gray-800">
                <h2 className="font-bold text-lg mb-4">Strategy Config</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Symbol</label>
                    <input value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Strategy</label>
                    <select value={strategy} onChange={e => setStrategy(e.target.value)}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="ma_crossover">MA Crossover (50/200)</option>
                      <option value="rsi">RSI Mean Reversion</option>
                      <option value="momentum">Momentum</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Start Date</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">End Date</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Starting Capital ($)</label>
                    <input type="number" value={capital} onChange={e => setCapital(e.target.value)}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <button onClick={runBacktest} disabled={loading}
                    className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
                  >
                    {loading ? 'Running...' : 'Run Backtest'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-2">
              {!result && !loading && (
                <div className="h-full flex items-center justify-center border border-dashed border-gray-700 rounded-xl p-12 text-center">
                  <div>
                    <div className="text-4xl mb-4">📈</div>
                    <p className="text-gray-400">Configure your strategy and run a backtest to see results</p>
                  </div>
                </div>
              )}
              {loading && (
                <div className="h-full flex items-center justify-center border border-gray-800 rounded-xl p-12 text-center">
                  <div>
                    <div className="text-4xl mb-4 animate-pulse">⚡</div>
                    <p className="text-gray-400">Running backtest...</p>
                  </div>
                </div>
              )}
              {result && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Total Return', value: `${result.totalReturn > 0 ? '+' : ''}${result.totalReturn.toFixed(2)}%`, color: result.totalReturn > 0 ? 'text-green-400' : 'text-red-400' },
                      { label: 'Win Rate', value: `${result.winRate.toFixed(1)}%`, color: 'text-yellow-400' },
                      { label: 'Total Trades', value: result.totalTrades, color: 'text-white' },
                      { label: 'Max Drawdown', value: `${result.maxDrawdown.toFixed(2)}%`, color: 'text-red-400' },
                      { label: 'Sharpe Ratio', value: result.sharpeRatio.toFixed(2), color: result.sharpeRatio > 1 ? 'text-green-400' : 'text-yellow-400' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-800 text-center">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-xl border border-gray-800">
                    <h3 className="font-bold mb-4">Trade Log</h3>
                    <div className="overflow-auto max-h-64">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-400 text-xs uppercase border-b border-gray-800">
                            <th className="text-left py-2">Date</th>
                            <th className="text-left py-2">Action</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Shares</th>
                            <th className="text-right py-2">P&L</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.trades.map((trade, i) => (
                            <tr key={i} className="border-b border-gray-900">
                              <td className="py-2 text-gray-300">{trade.date}</td>
                              <td className={`py-2 font-semibold ${trade.action === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>{trade.action}</td>
                              <td className="py-2 text-right">${trade.price.toFixed(2)}</td>
                              <td className="py-2 text-right">{trade.shares}</td>
                              <td className={`py-2 text-right ${trade.pnl && trade.pnl > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {trade.pnl ? `${trade.pnl > 0 ? '+' : ''}$${trade.pnl.toFixed(2)}` : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="p-6 rounded-xl border border-gray-800">
                <h2 className="font-bold text-lg mb-4">Bot Config</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Symbol</label>
                    <input value={symbol} onChange={e => setSymbol(e.target.value.toUpperCase())}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Strategy</label>
                    <select value={strategy} onChange={e => setStrategy(e.target.value)}
                      className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="ma_crossover">MA Crossover</option>
                      <option value="rsi">RSI Mean Reversion</option>
                      <option value="momentum">Momentum</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={startBot} disabled={botRunning}
                      className="flex-1 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition disabled:opacity-50"
                    >
                      Start Bot
                    </button>
                    <button onClick={stopBot} disabled={!botRunning}
                      className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition disabled:opacity-50"
                    >
                      Stop Bot
                    </button>
                  </div>
                </div>
              </div>
              {liveStatus && (
                <div className="p-4 rounded-xl border border-gray-800 text-sm text-gray-300">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${botRunning ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                  {liveStatus}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="p-6 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Open Positions</h2>
                  <button onClick={fetchPositions} className="text-xs text-yellow-400 hover:text-yellow-300">Refresh</button>
                </div>
                {positions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No open positions</p>
                    <p className="text-xs mt-2">Start the bot to begin paper trading</p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs uppercase border-b border-gray-800">
                        <th className="text-left py-2">Symbol</th>
                        <th className="text-right py-2">Shares</th>
                        <th className="text-right py-2">Avg Price</th>
                        <th className="text-right py-2">Current</th>
                        <th className="text-right py-2">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((pos, i) => (
                        <tr key={i} className="border-b border-gray-900">
                          <td className="py-2 font-semibold">{pos.symbol}</td>
                          <td className="py-2 text-right">{pos.qty}</td>
                          <td className="py-2 text-right">${Number(pos.avg_entry_price).toFixed(2)}</td>
                          <td className="py-2 text-right">${Number(pos.current_price).toFixed(2)}</td>
                          <td className={`py-2 text-right font-semibold ${Number(pos.unrealized_pl) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Number(pos.unrealized_pl) > 0 ? '+' : ''}${Number(pos.unrealized_pl).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
