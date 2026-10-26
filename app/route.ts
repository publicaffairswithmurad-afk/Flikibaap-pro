import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    
    let words = 600;
    const lower = topic.toLowerCase();
    if (lower.includes('400')) words = 400;
    if (lower.includes('8 mint') || lower.includes('8 min')) words = 1200;
    if (lower.includes('1000')) words = 1000;

    const prompt = `You are Flikibaap - Best YouTube Script Writer in Roman Urdu. 
Topic: ${topic}
Write ${words} words viral script with HOOK, STORY, CLIMAX, CTA. 
Language: Roman Urdu, emotional, human. No dummy repeat. Make real story.`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.85,
        max_tokens: 3500
      })
    });

    const data = await groqRes.json();
    const script = data.choices?.[0]?.message?.content || 'Groq Key missing - Vercel me add karo';

    return NextResponse.json({ script, niche: 'Auto-Detected' });
  } catch (err) {
    return NextResponse.json({ script: 'Error: GROQ_API_KEY add karo Vercel Settings me' }, { status: 500 });
  }
}
