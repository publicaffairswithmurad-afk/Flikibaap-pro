"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("copilot");

  const generate = async () => {
    if (!topic.trim()) return alert("Pehle topic likho!");
    setLoading(true);
    setScript("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setScript(data.script);
    } catch { setScript("Error - dubara try karo"); }
    setLoading(false);
  };

  const tools = [
    { id: "copilot", n: "AI Copilot", d: "Script Writer", i: "🤖" },
    { id: "s2v", n: "Script to Video", d: "Auto Video", i: "🎬", soon: true },
    { id: "a2v", n: "Audio to Video", d: "Audio se Video", i: "🎧", soon: true },
    { id: "edit", n: "Video Editor", d: "Pro Editor", i: "✂️", soon: true },
    { id: "voice", n: "AI Voiceover", d: "Urdu Voices", i: "🎤", soon: true },
    { id: "thumb", n: "Thumbnail Maker", d: "Viral Thumbs", i: "🖼️", soon: true },
  ];

  return (
    <div style={{minHeight:"100vh", background:"#07070A", color:"white", fontFamily:"sans-serif", display:"flex"}}>
      {/* Sidebar */}
      <div style={{width:250, background:"#111114", borderRight:"1px solid #222", padding:16, display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:28, fontWeight:800, fontSize:20}}>
          <div style={{width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#7C3AED,#F97316)", display:"flex", alignItems:"center", justifyContent:"center"}}>F</div>
          Flikibaap <span style={{fontSize:9, background:"linear-gradient(90deg,#7C3AED,#F97316)", padding:"2px 6px", borderRadius:20}}>PRO</span>
        </div>
        <div style={{display:"grid", gap:8}}>
          {tools.map(t=>(
            <div key={t.id} onClick={()=>setActive(t.id)} style={{padding:12, borderRadius:12, cursor:"pointer", background: active===t.id ? "#1F1F23" : "transparent", border: active===t.id ? "1px solid #333" : "1px solid transparent"}}>
              <div style={{fontSize:13, fontWeight:600}}>{t.i} {t.n} {t.soon && <span style={{fontSize:8, background:"#333", padding:"2px 5px", borderRadius:4}}>SOON</span>}</div>
              <div style={{fontSize:11, color:"#888", marginTop:2}}>{t.d}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"auto", padding:12, background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(249,115,22,0.15))", borderRadius:12, border:"1px solid rgba(124,58,237,0.2)"}}>
          <div style={{fontSize:13, fontWeight:700}}>Upgrade to Pro</div>
          <div style={{fontSize:11, color:"#999"}}>Unlimited videos</div>
          <button style={{width:"100%", marginTop:8, background:"white", color:"black", border:0, padding:"8px", borderRadius:8, fontWeight:700, fontSize:12}}>Upgrade Now</button>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1, display:"flex", flexDirection:"column"}}>
        <div style={{height:50, borderBottom:"1px solid #222", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px"}}>
          <div style={{fontSize:12, color:"#888"}}>AI Copilot / <span style={{color:"white"}}>New Script</span></div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={()=>navigator.clipboard.writeText(script)} style={{fontSize:12, background:"#1E1E22", border:"1px solid #333", color:"white", padding:"6px 12px", borderRadius:8}}>📋 Copy</button>
            <button style={{fontSize:12, background:"white", color:"black", padding:"6px 12px", borderRadius:8, fontWeight:700}}>Export Video →</button>
          </div>
        </div>

        <div style={{display:"flex", flex:1}}>
          <div style={{width:340, borderRight:"1px solid #222", padding:20}}>
            <h2 style={{fontSize:18, fontWeight:700, marginBottom:20}}>Create Viral Script</h2>
            
            <label style={{fontSize:11, color:"#888"}}>Topic / Idea</label>
            <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Ex: Hazrat Ali ka insaf, Ek khofnak qabrastan ka waqia..." style={{width:"100%", marginTop:6, background:"#151519", border:"1px solid #2A2A30", borderRadius:12, padding:12, color:"white", height:110, fontSize:13}} />

            <button onClick={generate} disabled={loading} style={{width:"100%", marginTop:16, background:"linear-gradient(90deg,#7C3AED,#F97316)", border:0, padding:"12px", borderRadius:12, fontWeight:800, color:"white", cursor:"pointer"}}>
              {loading ? "✨ Writing Magic..." : "✨ Generate Viral Script"}
            </button>
            <div style={{fontSize:10, color:"#666", marginTop:10}}>Tip: Topic detail me likho to zyada viral banega</div>
          </div>

          <div style={{flex:1, background:"#0E0E12", padding:20, overflowY:"auto"}}>
            {!script && !loading && <div style={{height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"#555"}}><div style={{fontSize:48}}>🎬</div><div style={{fontWeight:700, color:"#AAA", marginTop:10}}>Your Script Will Appear Here</div><div style={{fontSize:11, marginTop:4}}>Professional Roman Urdu • Hook + Story + CTA</div></div>}
            {loading && <div style={{color:"#888", fontSize:13}}>⏳ AI soch raha hai, behtareen script bana raha hai...</div>}
            {script && <div style={{background:"#151519", border:"1px solid #2A2A30", borderRadius:16, padding:18}}><pre style={{whiteSpace:"pre-wrap", fontFamily:"sans-serif", fontSize:14, lineHeight:1.8, color:"#EAEAEA"}}>{script}</pre></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
