import { NextRequest, NextResponse } from 'next/server';

function calculateSMA(prices: number[], period: number): number[] {
  const sma: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) { sma.push(0); continue; }
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
}

function calculateRSI(prices: number[], period = 14): number[] {
  const rsi: number[] = new Array(period).fill(0);
  for (let i = period; i < prices.length; i++) {
    const changes = prices.slice(i - period, i).map((p, j) => prices[i - period + j + 1] - p);
    const gains = changes.filter(c => c > 0).reduce((a, b) => a + b, 0) / period;
    const losses = Math.abs(changes.filter(c => c < 0).reduce((a, b) => a + b, 0)) / period;
    const rs = losses === 0 ? 100 : gains / losses;
    rsi.push(100 - 100 / (1 + rs));
  }
  return rsi;
}

function generateMockPrices(startDate: string, endDate: string, basePrice: number): { date: string; close: number }[] {
  const prices = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let price = basePrice;
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    price = price * (1 + (Math.random() - 0.48) * 0.02);
    prices.push({ date: d.toISOString().split('T')[0], close: Math.round(price * 100) / 100 });
  }
  return prices;
}

export async function POST(req: NextRequest) {
  try {
    const { symbol, strategy, startDate, endDate, capital } = await req.json();

    const basePrices: { [key: string]: number } = { AAPL: 180, TSLA: 200, NVDA: 500, MSFT: 380, SPY: 450, GOOGL: 140 };
    const basePrice = basePrices[symbol] || 100;
    const priceData = generateMockPrices(startDate, endDate, basePrice);
    const closes = priceData.map(p => p.close);

    let trades: any[] = [];
    let cash = capital;
    let shares = 0;
    let buyPrice = 0;

    if (strategy === 'ma_crossover') {
      const sma50 = calculateSMA(closes, 50);
      const sma200 = calculateSMA(closes, 200);
      for (let i = 201; i < priceData.length; i++) {
        const crossedAbove = sma50[i] > sma200[i] && sma50[i - 1] <= sma200[i - 1];
        const crossedBelow = sma50[i] < sma200[i] && sma50[i - 1] >= sma200[i - 1];
        if (crossedAbove && shares === 0 && cash > closes[i]) {
          shares = Math.floor(cash / closes[i]);
          buyPrice = closes[i];
          cash -= shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'BUY', price: closes[i], shares });
        } else if (crossedBelow && shares > 0) {
          const pnl = shares * (closes[i] - buyPrice);
          cash += shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'SELL', price: closes[i], shares, pnl });
          shares = 0;
        }
      }
    } else if (strategy === 'rsi') {
      const rsi = calculateRSI(closes);
      for (let i = 15; i < priceData.length; i++) {
        if (rsi[i] < 30 && shares === 0 && cash > closes[i]) {
          shares = Math.floor(cash / closes[i]);
          buyPrice = closes[i];
          cash -= shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'BUY', price: closes[i], shares });
        } else if (rsi[i] > 70 && shares > 0) {
          const pnl = shares * (closes[i] - buyPrice);
          cash += shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'SELL', price: closes[i], shares, pnl });
          shares = 0;
        }
      }
    } else if (strategy === 'momentum') {
      for (let i = 20; i < priceData.length; i++) {
        const momentum = (closes[i] - closes[i - 20]) / closes[i - 20];
        if (momentum > 0.05 && shares === 0 && cash > closes[i]) {
          shares = Math.floor(cash / closes[i]);
          buyPrice = closes[i];
          cash -= shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'BUY', price: closes[i], shares });
        } else if (momentum < -0.03 && shares > 0) {
          const pnl = shares * (closes[i] - buyPrice);
          cash += shares * closes[i];
          trades.push({ date: priceData[i].date, action: 'SELL', price: closes[i], shares, pnl });
          shares = 0;
        }
      }
    }

    if (shares > 0) {
      const lastPrice = closes[closes.length - 1];
      const pnl = shares * (lastPrice - buyPrice);
      cash += shares * lastPrice;
      trades.push({ date: priceData[priceData.length - 1].date, action: 'SELL', price: lastPrice, shares, pnl });
    }

    const finalValue = cash;
    const totalReturn = ((finalValue - capital) / capital) * 100;
    const sellTrades = trades.filter(t => t.action === 'SELL' && t.pnl !== undefined);
    const winRate = sellTrades.length > 0 ? (sellTrades.filter(t => t.pnl > 0).length / sellTrades.length) * 100 : 0;

    let peak = capital;
    let runningValue = capital;
    let maxDrawdown = 0;
    for (const trade of trades) {
      if (trade.action === 'SELL') {
        runningValue += trade.pnl || 0;
        if (runningValue > peak) peak = runningValue;
        const drawdown = ((peak - runningValue) / peak) * 100;
        if (drawdown > maxDrawdown) maxDrawdown = drawdown;
      }
    }

    const returns = sellTrades.map(t => t.pnl / capital);
    const avgReturn = returns.reduce((a, b) => a + b, 0) / (returns.length || 1);
    const stdDev = Math.sqrt(returns.map(r => Math.pow(r - avgReturn, 2)).reduce((a, b) => a + b, 0) / (returns.length || 1));
    const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0;

    return NextResponse.json({ totalReturn, winRate, totalTrades: trades.length, maxDrawdown, sharpeRatio, trades: trades.slice(0, 50) });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
