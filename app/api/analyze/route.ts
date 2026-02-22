import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, portfolioData, history } = await req.json();

    const systemPrompt = `You are an elite AI portfolio advisor for Wilson Capital. You analyze portfolios with the depth of a senior investment analyst covering stocks, crypto, forex, bonds, ETFs, REITs, commodities, and options. Give specific, actionable, professional advice.${portfolioData ? `\n\nUser portfolio data:\n${portfolioData}` : ''}`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1000,
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ reply: `Error: ${error}` }, { status: 500 });
  }
}