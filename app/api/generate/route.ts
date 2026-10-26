import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { topic } = await req.json();
  try{
    const key = process.env.GROQ_API_KEY;
    if(!key){
      return NextResponse.json({script: `[HOOK 0-5s] ${topic} - Kya aap jante hain?\n[SCENE 1 5-15s] Ye kahani hai ${topic} ki, jo bohat famous hai.\n[SCENE 2 15-25s] Iski history 300 saal purani hai aur laakhon log isko dekhne aate hain.\n[CTA 25-30s] Subscribe karo mazeed videos ke liye!`});
    }
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},
      body: JSON.stringify({
        model:"llama-3.1-8b-instant",
        temperature: 0.7,
        messages:[{
          role:"user", 
          content:`You are Fliki/Pictory script writer. Write ONLY 30 SECOND viral faceless video script for: ${topic}. 
          STRICT RULES:
          - Total 4 lines only: [HOOK 0-5s], [SCENE 1 5-15s], [SCENE 2 15-25s], [CTA 25-30s]
          - No extra story, no long paragraphs
          - Keep it short, punchy, TikTok style
          - Add visual idea in brackets
          Language: Mix Urdu + English if topic is Urdu.`
        }]
      })
    });
    const d = await r.json();
    return NextResponse.json({script: d.choices?.[0]?.message?.content || "Error generating"});
  }catch(e:any){
    return NextResponse.json({script:"Error: "+e.message});
  }
}
