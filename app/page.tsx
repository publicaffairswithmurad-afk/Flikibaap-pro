"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState("copilot");
  const [words, setWords] = useState("700");
  const [niche, setNiche] = useState("Islamic");

  const generate = async () => {
    if (!topic) return alert("Topic likho pehle!");
    setLoading(true);
    setScript("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: `${topic} | ${niche} | ${words} words` }),
      });
      const data = await res.json();
      setScript(data.script);
    } catch (e) {
      setScript("Error agaya, dubara try karo");
    }
    setLoading(false);
  };

  const tools = [
    { id: "copilot", name: "AI Copilot", icon: "🤖", desc: "Script Writer", active: true },
    { id: "script2video", name: "Script to Video", icon: "🎬", desc: "Auto Video", coming: true },
    { id: "audio2video", name: "Audio to Video", icon: "🎧", desc: "Audio se Video", coming: true },
    { id: "editor", name: "Video Editor", icon: "✂️", desc: "Pro Editor", coming: true },
    { id: "voice", name: "AI Voiceover", icon: "🎤", desc: "Urdu Voices", coming: true },
    { id: "thumbnail", name: "Thumbnail Maker", icon: "🖼️", desc: "Viral Thumbs", coming: true },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#111113] border-r border-zinc-800 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center font-bold">F</div>
          <span className="font-bold text-xl">Flikibaap</span>
          <span className="text-[10px] bg-gradient-to-r from-purple-600 to-orange-500 px-2 py-0.5 rounded-full">PRO</span>
        </div>
        
        <div className="space-y-2 flex-1">
          {tools.map(t => (
            <button key={t.id} onClick={()=>setActiveTool(t.id)}
              className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${activeTool===t.id ? 'bg-zinc-800 border border-zinc-700' : 'hover:bg-zinc-800/50'}`}>
              <span className="text-xl">{t.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium flex items-center gap-2">{t.name} {t.coming && <span className="text-[9px] bg-zinc-700 px-1.5 py-0.5 rounded">SOON</span>}</div>
                <div className="text-[11px] text-zinc-400">{t.desc}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-auto p-3 bg-gradient-to-br from-purple-600/20 to-orange-500/20 rounded-xl border border-purple-500/20">
          <div className="text-sm font-bold">Upgrade to Pro</div>
          <div className="text-xs text-zinc-400 mb-2">Unlimited videos & voices</div>
          <button className="w-full bg-white text-black text-xs py-2 rounded-lg font-bold">Upgrade Now</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6">
          <div className="text-sm text-zinc-400">AI Copilot / <span className="text-white">New Script</span></div>
          <div className="flex gap-2">
            <button onClick={()=>{navigator.clipboard.writeText(script)}} className="text-xs bg-zinc-800 px-3 py-1.5 rounded-lg">📋 Copy</button>
            <button className="text-xs bg-white text-black px-3 py-1.5 rounded-lg font-bold">Export Video →</button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Input Area */}
          <div className="w-[380px] border-r border-zinc-800 p-6 space-y-5">
            <h2 className="font-bold text-lg">Create Viral Script</h2>
            
            <div>
              <label className="text-xs text-zinc-400">Niche</label>
              <select value={niche} onChange={e=>setNiche(e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm">
                <option>Islamic</option><option>Horror</option><option>History</option><option>Motivational</option><option>Crime</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400">Duration</label>
              <select value={words} onChange={e=>setWords(e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm">
                <option value="400">400 Words - 3 Min (Short)</option>
                <option value="700">700 Words - 6 Min (Recommended)</option>
                <option value="1100">1100 Words - 9 Min (Long)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400">Topic / Idea</label>
              <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Ex: Hazrat Ali ka insaf, Ek khofnak qabrastan ka waqia..." className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm h-32 resize-none" />
            </div>

            <button onClick={generate} disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-orange-500 py-3 rounded-xl font-bold text-sm disabled:opacity-50">
              {loading ? "✨ Writing Magic..." : "✨ Generate Viral Script"}
            </button>

            <div className="text-[11px] text-zinc-500">Tip: Topic jitna detailed hoga, script utna viral hoga.</div>
          </div>

          {/* Output Area */}
          <div className="flex-1 bg-[#0E0E10] p-6 overflow-auto">
            {!script && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <div className="text-6xl mb-4">🎬</div>
                <div className="font-bold text-zinc-300">Your Script Will Appear Here</div>
                <div className="text-xs mt-2">Professional, Roman Urdu, Hook + Story + CTA</div>
              </div>
            )}
            {loading && <div className="animate-pulse space-y-3"><div className="h-4 bg-zinc-800 rounded w-3/4"></div><div className="h-4 bg-zinc-800 rounded"></div><div className="h-4 bg-zinc-800 rounded w-5/6"></div></div>}
            {script && (
              <div className="bg-[#151517] border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-zinc-400">{niche} • {words} words • Roman Urdu</div>
                  <div className="text-xs text-green-400">● Live</div>
                </div>
                <pre className="whitespace-pre-wrap text-sm leading-7 font-sans text-zinc-100">{script}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
