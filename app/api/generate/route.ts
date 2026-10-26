import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ script: 'DEBUG: Vercel me GROQ_API_KEY nahi mili!' });
    }

    let words = 700;
    let duration = "6-7 minutes";
    const lower = topic.toLowerCase();
    if (lower.includes('400')) { words = 400; duration = "3-4 minutes"; }
    if (lower.includes('8 mint') || lower.includes('8 min') || lower.includes('1000')) { words = 1100; duration = "8-10 minutes"; }
    if (lower.includes('5 mint') || lower.includes('5 min')) { words = 700; duration = "5-6 minutes"; }

    const prompt = `
You are FLIKI BAAP - Pakistan's No.1 Viral YouTube Scriptwriter. You are NOT a boring AI. You are a storyteller who makes people CRY, SCARED, EMOTIONAL.

RULES - NO COMPROMISE:
1. Language: 100% Roman Urdu. Easy, desi, dil se nikla hua. English words sirf jab zaroorat ho.
2. TONE: Start me hi audience ko pakdo. No "Assalam o Alaikum dosto aaj hum baat karenge". BORING!
3. STRUCTURE for ${duration} (${words} words):
   **HOOK (0-30 sec - MOST IMPORTANT):** Aisa sawal ya scene jisse viewer hil jaye. Example: "Sochiye, raat ke 2 baj rahe hain, aap akelay qabrastan me kharay hain aur peeche se koi aapka naam le..." - 2-3 lines ka dhamaka.
   
   **STORY / MAIN CONTENT:** Story suna, lecture mat de. Emotions, dialogues, "Wo kya dekhta hai?", "Phir achanak kya hua?" Jaise words use karo. Har 2-3 lines me curiosity paida karo. Islamic topic hai to adab se, reference ke saath, lekin bore mat karo. Horror hai to scene dikhao.
   
   **CLIMAX / IBRAAT:** Sabak ya dar ka peak point.
   
   **CTA (End):** "Agar dil hila ho to comment me ALLAH HU AKBAR likho, aur aise hi sachay waqiyat ke liye Flikibaap ko subscribe karna mat bhoolna."

4. STRICT: No formal Urdu, no AI jaisa "In conclusion", no repetitive lines. Human jaisa, behtareen YouTuber jaisa likho.
5. Topic: ${topic}
6. Word Count: Strictly ${words} words ke aas paas.

Now write the VIRAL SCRIPT. Start directly with HOOK.
`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1.0,
        max_tokens: 4000
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
