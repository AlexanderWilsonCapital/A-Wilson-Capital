import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { symbol, action } = await req.json();
    const apiKey = process.env.ALPACA_API_KEY;
    const secretKey = process.env.ALPACA_SECRET_KEY;
    const baseUrl = process.env.ALPACA_BASE_URL || 'https://paper-api.alpaca.markets';

    if (action === 'start') {
      const orderRes = await fetch(`${baseUrl}/v2/orders`, {
        method: 'POST',
        headers: {
          'APCA-API-KEY-ID': apiKey!,
          'APCA-API-SECRET-KEY': secretKey!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          qty: 1,
          side: 'buy',
          type: 'market',
          time_in_force: 'day',
        }),
      });
      const order = await orderRes.json();
      return NextResponse.json({ message: `Order placed for ${symbol}. Order ID: ${order.id}`, order });
    }

    return NextResponse.json({ message: 'Bot stopped' });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
