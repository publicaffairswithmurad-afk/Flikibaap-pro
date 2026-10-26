"use client";
import { useState } from "react";

const WORKFLOWS = [
  { id: "ai", name: "AI to Video", cr: "100cr", desc: "Idea to faceless video", hot: true },
  { id: "image", name: "Image to Video", cr: "80cr", desc: "Animate any photo", hot: false },
  { id: "stock", name: "Stock to Video", cr: "60cr", desc: "Stock + script" },
  { id: "banana", name: "Banana Image", cr: "5cr", desc: "Text to image", hot: true },
  { id: "avatar", name: "AI Avatar", cr: "120cr", desc: "Clone + speak" },
  { id: "audio", name: "Audio to Video", cr: "80cr", desc: "Podcast to video" },
  { id: "url", name: "URL to Video", cr: "70cr", desc: "Blog link to video", new: true },
  { id: "ppt", name: "PPT to Video", cr: "70cr", desc: "Presentation to video", new: true },
  { id: "script", name: "Script to Video", cr: "90cr", desc: "Long script" },
  { id: "translate", name: "Translate Video", cr: "50cr", desc: "80+ languages", new: true },
  { id: "series", name: "Video Series", cr: "200cr", desc: "Auto channel", new: true },
  { id: "character", name: "Character Clone", cr: "150cr", desc: "Your face clone", hot: true },
  { id: "longshort", name: "Long to Short", cr: "20cr", desc: "Best 40sec + highlights" },
  { id: "api", name: "API / Auto", cr: "Custom", desc: "Zapier + API" },
];

export default function FlikibaapV2() {
  const [activeMode, setActiveMode] = useState("ai");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [credits] = useState(6000);

  const current = WORKFLOWS.find(w=>w.id===activeMode);

  const handleGenerate = async () => {
    if(!topic.trim()) return alert("Pehle topic/prompt likho!");
    setLoading(true); setResult(""); setImg("");
    try {
      if(activeMode==="banana"){
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}?width=1024&height=1024&seed=${Math.floor(Math.random()*1000)}&nologo=true`;
        setImg(url);
        setResult(`✅ Banana Image Generated!\nPrompt: ${topic}\n\nCredits Used: 5cr\nRemaining: ${credits-5}cr`);
      } else if (activeMode==="url" || activeMode==="ppt"){
        setResult(`🔗 ${current?.name} - Processing...\n\nFetching: ${topic}\n\nGenerating script from content...\n\n(This will be live in Step 3 - Abhi mock script de raha hu)\n\n[HOOK] ${topic} is the future...\n[SCENE 1] Introduction...\n[SCENE 2] Main content...\n\nCredits: ${current?.cr}`);
      } else {
        const res = await fetch("/api/generate",{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({topic})});
        const data = await res.json();
        setResult(data.script || "Generated successfully!");
      }
    } catch(e){ setResult("Error - API check karo"); }
    setLoading(false);
  };

  const handleLongToShort = () => {
    if(!result) return alert("Pehle video generate karo!");
    setResult(r => r + `\n\n--- ✨ LONG TO SHORT AUTO (20cr) ---\n✅ Best 40 Sec: 00:00 - 00:40 (Viral Hook)\n✅ Highlight 1: 01:10 - 01:45\n✅ Highlight 2: 02:30 - 03:00\n✅ Highlight ALL: Auto captions added`);
  };

  return (
    <div className="min-h-screen bg-[#FCFCF9] text-zinc-900 font-sans">
      {/* TOP BAR - VidRush style */}
      <div className="h-14 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="font-black text-xl tracking-tight">F<span className="text-[#FF2D6B]">likibaap</span></div>
          <div className="hidden md:flex gap-2 text-sm">
            <div className="px-3 py-1.5 bg-zinc-900 text-white rounded-full">Video Studio</div>
            <div className="px-3 py-1.5 bg-zinc-100 rounded-full">Brand Kit</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs md:text-sm bg-zinc-100 border px-3 py-1.5 rounded-full">💎 {credits} Credits - Standard</div>
          <button onClick={()=>setShowPlans(true)} className="bg-zinc-900 text-white text-xs md:text-sm px-4 py-2 rounded-full font-bold">Plans: 10K / 18K</button>
        </div>
      </div>

      <div className="flex">
        {/* SIDEBAR - Fliki style */}
        <div className="hidden md:block w-[220px] border-r bg-white min-h-[calc(100vh-56px)] p-3">
          <div className="text-[11px] font-bold text-zinc-400 tracking-widest mb-3">WORKFLOWS</div>
          {WORKFLOWS.map(w=>(
            <div key={w.id} onClick={()=>setActiveMode(w.id)} className={`p-2.5 rounded-xl cursor-pointer mb-1 flex justify-between items-center text-sm ${activeMode===w.id ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100'}`}>
              <span>{w.name}</span><span className="text-[10px] opacity-70">{w.cr}</span>
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="flex-1 p-3 md:p-6 max-w-6xl mx-auto w-full">
          {/* WORKFLOW GRID - Pictory + Fliki mix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {WORKFLOWS.map(w=>(
              <div key={w.id} onClick={()=>setActiveMode(w.id)} className={`relative bg-white border rounded-2xl p-4 cursor-pointer transition-all ${activeMode===w.id ? 'border-zinc-900 shadow-lg scale-[1.02]' : 'border-zinc-200 hover:border-zinc-400'}`}>
                {w.hot && <span className="absolute -top-2 -right-2 bg-[#FF2D6B] text-white text-[9px] px-2 py-0.5 rounded-full font-bold">HOT</span>}
                {w.new && <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
                <div className="font-bold text-sm">{w.name}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{w.desc}</div>
                <div className="mt-2 text-[11px] font-mono bg-zinc-100 inline-block px-2 py-0.5 rounded-full">{w.cr} / 4min</div>
              </div>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="bg-white border border-zinc-200 rounded-[20px] p-4 md:p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold">All-in-One Video Studio <span className="text-zinc-400 font-normal">- {current?.name}</span></h2>
              <span className="text-xs bg-zinc-900 text-white px-2 py-1 rounded-full">{current?.cr}</span>
            </div>
            <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder={activeMode==="banana" ? "e.g. Islamic mosque at night, cinematic, 4k" : activeMode==="url" ? "Paste Blog URL here... https://..." : "Enter your idea, script, or topic here..."} className="w-full h-28 bg-[#FCFCF9] border border-zinc-200 rounded-xl p-3 text-sm outline-none focus:border-zinc-900" />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <button onClick={handleGenerate} disabled={loading} className="bg-gradient-to-r from-zinc-900 to-zinc-700 text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50">
                {loading ? "Generating..." : `Generate Video - ${current?.cr}`}
              </button>
              <button onClick={handleLongToShort} className="bg-white border border-zinc-300 py-3 rounded-xl font-bold text-sm hover:bg-zinc-50">
                Long to Short Auto<br/><span className="text-[10px] font-normal">Best 40 Sec + Highlight All</span>
              </button>
            </div>
          </div>

          {/* RESULT AREA */}
          <div className="mt-4 bg-white border border-zinc-200 rounded-[20px] p-4 min-h-[300px]">
            <div className="text-xs font-bold text-zinc-400 tracking-widest mb-3">VIDEO PREVIEW</div>
            {loading && <div className="py-20 text-center text-zinc-400 animate-pulse">AI is working... VidRush + Pictory + Fliki se best bana raha hai...</div>}
            {img && <img src={img} className="w-full max-w-[512px] mx-auto rounded-xl border mb-4" alt="generated"/>}
            {result && <pre className="whitespace-pre-wrap text-sm leading-6 font-sans bg-[#FCFCF9] p-4 rounded-xl border">{result}</pre>}
            {!result && !loading && !img && <div className="py-20 text-center text-zinc-400 text-sm">Result yahan ayega - Select workflow and generate</div>}
          </div>

          {/* TRUST BAR - Like Fliki */}
          <div className="mt-6 text-center text-[11px] text-zinc-400">Trusted logic from 100M+ videos analyzed • No watermark • 1080p • 80+ voices • Islamic + Urdu support</div>
        </div>
      </div>

      {/* PLANS MODAL - FINAL */}
      {showPlans && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-[100] p-3" onClick={()=>setShowPlans(false)}>
          <div className="bg-white rounded-[24px] p-6 w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4" onClick={e=>e.stopPropagation()}>
            <div className="border rounded-2xl p-4">
              <div className="font-bold">Free</div><div className="text-2xl font-black">Rs 0</div><div className="text-xs text-zinc-500 mt-2">100 Credits = 1 Video<br/>720p, Watermark</div>
            </div>
            <div className="border-2 border-zinc-900 rounded-2xl p-4 relative bg-zinc-50">
              <span className="absolute -top-3 left-4 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded-full">POPULAR - 10K</span>
              <div className="font-bold">Standard</div><div className="text-2xl font-black">Rs 10,000</div><div className="text-xs text-zinc-600 mt-2 font-bold">6000 Credits = 60 Videos x 4min (100cr each)<br/>1080p, No Watermark, All 14 Workflows, 80+ Voices<br/>No watermark</div>
            </div>
            <div className="border rounded-2xl p-4">
              <div className="font-bold">Premium</div><div className="text-2xl font-black">Rs 18,000</div><div className="text-xs text-zinc-500 mt-2"><b>30,000 Credits Unlimited 1 Month</b><br/>4K, API, Series Auto, Long to Short Highlight ALL</div>
            </div>
            <button onClick={()=>setShowPlans(false)} className="md:col-span-3 bg-zinc-900 text-white py-3 rounded-xl font-bold">Close - Continue Creating</button>
          </div>
        </div>
      )}
    </div>
  );
}
