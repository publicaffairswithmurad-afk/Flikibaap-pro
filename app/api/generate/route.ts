import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ script: 'DEBUG: Vercel me GROQ_API_KEY bilkul nahi mili!' });
    }

    let words = 600;
    const lower = topic.toLowerCase();
    if (lower.includes('400')) words = 400;
    if (lower.includes('8 mint') || lower.includes('8 min')) words = 1200;
    if (lower.includes('1000')) words = 1000;

    const prompt = `You are Flikibaap - Best YouTube Script Writer in Roman Urdu. Topic: ${topic}. Write ${words} words viral script with HOOK, STORY, CLIMAX, CTA. Language: Roman Urdu, emotional, human. No dummy repeat. Make real story.`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.85,
        max_tokens: 3500
      })
    });

    const data = await groqRes.json();
    
    if (!groqRes.ok) {
      return NextResponse.json({ script: `Groq Error: ${JSON.stringify(data)}` });
    }

    const script = data.choices?.[0]?.message?.content || 'Script nahi bana';
    return NextResponse.json({ script, niche: 'Auto-Detected' });

  } catch (err: any) {
    return NextResponse.json({ script: `Error: ${err.message}` });
  }
}
