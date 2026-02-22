import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, portfolioData, history } = await req.json();

    const systemPrompt = `You are an elite AI portfolio advisor for Wilson Capital. Analyze this portfolio with hedge-fund level depth. ${portfolioData ? `\n\nUser portfolio data:\n${portfolioData}` : ''}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((m: any) => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ],
    });

    return NextResponse.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ reply: "Error connecting to AI engine." }, { status: 500 });
  }
}
