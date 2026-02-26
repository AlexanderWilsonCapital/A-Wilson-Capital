import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.ALPACA_API_KEY;
    const secretKey = process.env.ALPACA_SECRET_KEY;
    const baseUrl = process.env.ALPACA_BASE_URL || 'https://paper-api.alpaca.markets';

    const res = await fetch(`${baseUrl}/v2/positions`, {
      headers: {
        'APCA-API-KEY-ID': apiKey!,
        'APCA-API-SECRET-KEY': secretKey!,
      },
    });
    const positions = await res.json();
    return NextResponse.json({ positions });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

---

Create all four files, save them, then restart your server:
```
taskkill /F /IM node.exe
npm run dev
