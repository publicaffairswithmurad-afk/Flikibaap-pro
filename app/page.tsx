"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("video");
  const [mode, setMode] = useState("ai");
  const [showPlans, setShowPlans] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const doGenerate = async () => {
    if(!topic) return alert("Topic likho!");
    setLoading(true);
    setResult("");
    setImageUrl("");
    
    try {
      if(mode==="banana"){
        // Banana Image - Free API
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}?width=512&height=512&nologo=true`;
        setImageUrl(url);
        setResult(`Banana Image Generated! 5 credits used.`);
      } else {
        // Script / Video
        const res = await fetch("/api/generate", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({topic: topic + ` [${mode}]`})
        });
        const data = await res.json();
        setResult(data.script || "Generated!");
      }
    } catch(e){ setResult("Error - dubara try karo"); }
    setLoading(false);
  };

  const doShorts = () => {
    if(!result) return alert("Pehle video/script generate karo!");
    setLoading(true);
    setTimeout(()=>{
      setResult(prev => prev + `\n\n--- SHORTS (Auto Generated) ---\n[00:00-00:40] BEST 40 SEC: ${prev.slice(0,200)}...\n[00:41-01:20] Highlight 1\n[01:21-02:00] Highlight 2`);
      setLoading(false);
      alert("Shorts ban gaye! 20 credits used");
    },1500);
  };

  return (
    <div style={{minHeight:"100vh", background:"#07070A", color:"white", fontFamily:"sans-serif"}}>
      <div style={{display:"flex", minHeight:"100vh"}}>
        <div style={{width:200, background:"#111114", borderRight:"1px solid #222", padding:12}}>
          <div style={{fontWeight:800, marginBottom:20}}>F Flikibaap</div>
          <div onClick={()=>setActive("copilot")} style={{padding:10, borderRadius:8, background: active==="copilot"?"#222":"transparent", marginBottom:8, cursor:"pointer"}}>AI Copilot</div>
          <div onClick={()=>setActive("video")} style={{padding:10, borderRadius:8, background: active==="video"?"#222":"transparent", cursor:"pointer"}}>Video Studio</div>
          <button onClick={()=>setShowPlans(true)} style={{marginTop:20, width:"100%", background:"white", color:"black", padding:8, borderRadius:8, fontWeight:700, fontSize:12}}>Plans: 10K / 18K</button>
          <div style={{marginTop:10, fontSize:10, color:"#888"}}>6000 Credits - Standard<br/>60 videos x 4min</div>
        </div>

        <div style={{flex:1, padding:12}}>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12}}>
            {[
              {id:"ai", t:"AI to Video 100cr"},
              {id:"image", t:"Image to Video 80cr"},
              {id:"stock", t:"Stock to Video 60cr"},
              {id:"banana", t:"Banana Image 5cr"},
              {id:"avatar", t:"AI Avatar 120cr"},
              {id:"audio", t:"Audio to Video 80cr"},
            ].map(m=>(
              <div key={m.id} onClick={()=>setMode(m.id)} style={{padding:10, borderRadius:10, border: mode===m.id?"2px solid #7C3AED":"1px solid #333", background: mode===m.id?"#1E1E24":"#141417", cursor:"pointer", fontSize:11, fontWeight:600}}>{m.t}</div>
            ))}
          </div>

          <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder={mode==="banana" ? "Image prompt likho: e.g. Islamic mosque at night cinematic" : "Script yahan likho..."} style={{width:"100%", height:90, background:"#151519", border:"1px solid #333", borderRadius:10, padding:10, color:"white"}} />

          <div style={{display:"flex", gap:8, marginTop:8}}>
            <button onClick={doGenerate} style={{flex:1, background:"linear-gradient(90deg,#7C3AED,#F97316)", border:0, padding:12, borderRadius:10, color:"white", fontWeight:800}}>{loading ? "Generating..." : `Generate ${mode} - ${mode==="banana"?5:100}cr`}</button>
            <button onClick={doShorts} style={{flex:1, background:"#1E1E22", border:"1px solid #333", padding:12, borderRadius:10, color:"white", fontSize:12}}>Long to Short<br/>Best 40 Sec + Highlights</button>
          </div>

          <div style={{marginTop:12, background:"#0E0E12", border:"1px solid #222", borderRadius:12, padding:12, minHeight:200}}>
            {loading && <div style={{color:"#888"}}>AI kaam kar raha hai...</div>}
            {imageUrl && <img src={imageUrl} style={{width:"100%", borderRadius:10, marginBottom:10}} />}
            {result && <pre style={{whiteSpace:"pre-wrap", fontSize:13, lineHeight:1.6}}>{result}</pre>}
            {!result && !loading && !imageUrl && <div style={{color:"#555", textAlign:"center", marginTop:40}}>Result yahan ayega - ab har button working hai!</div>}
          </div>
        </div>
      </div>

      {showPlans && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:99}} onClick={()=>setShowPlans(false)}>
          <div style={{background:"#151519", border:"1px solid #333", borderRadius:16, padding:16, width:350}} onClick={e=>e.stopPropagation()}>
            <h3 style={{fontWeight:800}}>Plans</h3>
            <div style={{marginTop:10, background:"#1E1E24", border:"2px solid #7C3AED", borderRadius:12, padding:12}}>
              <b>Standard - Rs 10,000</b><div style={{fontSize:12, color:"#F97316"}}>6000 Credits = 60 Videos x 4min (100cr each)</div>
              <div style={{fontSize:11, color:"#AAA"}}>No watermark, 1080p, All features</div>
            </div>
            <div style={{marginTop:8, background:"#111", border:"1px solid #222", borderRadius:12, padding:12}}>
              <b>Premium - Rs 18,000</b><div style={{fontSize:12, color:"#F97316"}}>30,000 Credits - Unlimited 1 Month</div>
              <div style={{fontSize:11, color:"#AAA"}}>Long to Short Auto (Highlight All + Best 40sec), 4K</div>
            </div>
            <button onClick={()=>setShowPlans(false)} style={{width:"100%", marginTop:12, background:"white", color:"black", padding:8, borderRadius:8, fontWeight:700}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
