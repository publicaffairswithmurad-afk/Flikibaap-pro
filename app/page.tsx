"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("video");
  const [videoMode, setVideoMode] = useState("ai");
  const [showPlans, setShowPlans] = useState(false);
  const [showShorts, setShowShorts] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return alert("Pehle topic likho!");
    setLoading(true); setScript("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json(); setScript(data.script);
    } catch { setScript("Error"); }
    setLoading(false);
  };

  const plans = [
    { name:"Free", price:"0", credits:100, videos:"1 video", perVideo:"4 min max", features:["20 credits/video","Watermark","720p"] },
    { name:"Standard", price:"10,000", credits:6000, videos:"60 Videos", perVideo:"4 min each", popular:true, features:["100 credits / 4min video","240 mins total","No watermark","1080p","Stock + AI + Banana"] },
    { name:"Premium", price:"18,000", credits:30000, videos:"Unlimited", perVideo:"1 Month", features:["Unlimited videos","Long to Short Auto","4K + No watermark","All features","Priority support"] },
  ];

  const videoFeatures = [
    { id:"ai", name:"AI to Video", icon:"🤖", creditsPerMin:25, total4Min:100 },
    { id:"image", name:"Image to Video", icon:"🖼️", creditsPerMin:20, total4Min:80 },
    { id:"stock", name:"Stock to Video", icon:"🎞️", creditsPerMin:15, total4Min:60 },
    { id:"banana", name:"Banana Image", icon:"🍌", creditsPerMin:5, total4Min:5, isImage:true },
    { id:"avatar", name:"AI Avatar", icon:"👤", creditsPerMin:30, total4Min:120 },
    { id:"audio", name:"Audio to Video", icon:"🎧", creditsPerMin:20, total4Min:80 },
  ];

  return (
    <div style={{minHeight:"100vh", background:"#07070A", color:"white", fontFamily:"sans-serif", display:"flex"}}>
      <div style={{width:240, background:"#111114", borderRight:"1px solid #222", padding:14, display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:24, fontWeight:800, fontSize:18}}>
          <div style={{width:30, height:30, borderRadius:8, background:"linear-gradient(135deg,#7C3AED,#F97316)", display:"flex", alignItems:"center", justifyContent:"center"}}>F</div>
          Flikibaap <span style={{fontSize:9, background:"linear-gradient(90deg,#7C3AED,#F97316)", padding:"2px 6px", borderRadius:20}}>PRO</span>
        </div>
        <div onClick={()=>setActive("copilot")} style={{padding:10, borderRadius:10, cursor:"pointer", background: active==="copilot"?"#1F1F23":"", border:"1px solid", borderColor: active==="copilot"?"#333":"transparent", marginBottom:6}}>🤖 AI Copilot</div>
        <div onClick={()=>setActive("video")} style={{padding:10, borderRadius:10, cursor:"pointer", background: active==="video"?"#1F1F23":"", border:"1px solid", borderColor: active==="video"?"#333":"transparent"}}>🎬 Video Studio</div>
        
        <div style={{marginTop:"auto", background:"#1A1A1E", borderRadius:12, padding:12, border:"1px solid #2A2A30"}}>
          <div style={{fontSize:11, color:"#888"}}>Your Plan</div>
          <div style={{fontSize:13, fontWeight:700, marginTop:2}}>Standard • 6000 cr</div>
          <div style={{height:6, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:"65%", height:"100%", background:"linear-gradient(90deg,#7C3AED,#F97316)", borderRadius:10}}></div></div>
          <div style={{fontSize:10, color:"#888", marginTop:6}}>3900 / 6000 credits used</div>
          <button onClick={()=>setShowPlans(true)} style={{width:"100%", marginTop:10, background:"white", color:"black", border:0, padding:"7px", borderRadius:8, fontWeight:700, fontSize:11}}>View Plans</button>
        </div>
      </div>

      <div style={{flex:1, overflowY:"auto", padding:20}}>
        {active==="video" && (
          <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <h1 style={{fontSize:20, fontWeight:800}}>All-in-One Video Studio <span style={{fontSize:11, background:"#222", padding:"4px 8px", borderRadius:20, marginLeft:8}}>4 min = 100 credits</span></h1>
              <button onClick={()=>setShowPlans(true)} style={{fontSize:11, background:"#1E1E22", border:"1px solid #333", color:"white", padding:"6px 12px", borderRadius:20}}>💳 6000 Credits</button>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10, marginTop:16}}>
              {videoFeatures.map(f=>(
                <div key={f.id} onClick={()=>setVideoMode(f.id)} style={{background: videoMode===f.id ? "#1E1E24" : "#141417", border: videoMode===f.id ? "1px solid #7C3AED" : "1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
                  <div style={{display:"flex", justifyContent:"space-between"}}><span>{f.icon} {f.name}</span>{f.total4Min===120 && <span style={{fontSize:8, background:"#EC4899", padding:"2px 6px", borderRadius:10}}>HOT</span>}</div>
                  <div style={{fontSize:11, color:"#888", marginTop:4}}>{f.isImage ? "Per image" : `${f.creditsPerMin} cr/min • 4min = ${f.total4Min} cr`}</div>
                  <div style={{fontSize:10, color:"#F97316", marginTop:6}}>{f.isImage ? "Rs 12.5 / image" : `Rs ${(f.total4Min*1.66).toFixed(0)} / video`}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex", gap:16, marginTop:16}}>
              <div style={{flex:1, background:"#151519", border:"1px solid #2A2A30", borderRadius:16, padding:14}}>
                <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Script yahan..." style={{width:"100%", height:120, background:"#0E0E12", border:"1px solid #2A2A30", borderRadius:10, padding:10, color:"white", fontSize:12}} />
                <button onClick={generate} style={{width:"100%", marginTop:10, background:"linear-gradient(90deg,#7C3AED,#F97316)", border:0, padding:"11px", borderRadius:10, fontWeight:800, color:"white"}}>
                  Generate • {videoFeatures.find(f=>f.id===videoMode)?.total4Min} credits
                </button>
                
                {/* LONG TO SHORT BUTTON */}
                <div style={{marginTop:12, background:"#0E0E12", border:"1px solid #333", borderRadius:10, padding:10}}>
                  <div style={{fontSize:12, fontWeight:700}}>✂️ Long to Short Auto</div>
                  <div style={{fontSize:10, color:"#888", marginTop:2}}>Long video se auto shorts banao</div>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:8}}>
                    <button onClick={()=>setShowShorts(true)} style={{background:"#1E1E22", border:"1px solid #333", color:"white", padding:"8px", borderRadius:8, fontSize:10}}>🎯 Highlight All Shorts<br/><span style={{color:"#888"}}>Full video ke shorts</span></button>
                    <button onClick={()=>setShowShorts(true)} style={{background:"#1E1E22", border:"1px solid #333", color:"white", padding:"8px", borderRadius:8, fontSize:10}}>⭐ Best 40 Sec<br/><span style={{color:"#888"}}>Viral part only</span></button>
                  </div>
                  <div style={{fontSize:9, color:"#666", marginTop:6, textAlign:"center"}}>Extra: 20 credits per short • Auto captions</div>
                </div>
              </div>

              <div style={{flex:1, background:"#0E0E12", border:"1px solid #222", borderRadius:16, padding:14}}>
                <div style={{height:200, background:"#111", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#555"}}>▶️ Preview</div>
                {showShorts && (
                  <div style={{marginTop:10, background:"#1A1A1E", border:"1px solid #333", borderRadius:10, padding:10}}>
                    <div style={{fontSize:11, fontWeight:700}}>Shorts Generated:</div>
                    <div style={{display:"flex", gap:6, marginTop:8, overflowX:"auto"}}>
                      <div style={{minWidth:60, height:90, background:"#222", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10}}>00:42</div>
                      <div style={{minWidth:60, height:90, background:"#222", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10}}>01:15</div>
                      <div style={{minWidth:60, height:90, background:"#222", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10}}>02:30</div>
                    </div>
                  </div>
                )}
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:10}}>
                  <button style={{background:"#1E1E22", border:"1px solid #333", color:"white", padding:"8px", borderRadius:8, fontSize:11}}>⬇️ Download</button>
                  <button style={{background:"white", color:"black", padding:"8px", borderRadius:8, fontSize:11, fontWeight:700}}>Edit →</button>
                </div>
              </div>
            </div>

            {showPlans && (
              <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50}}>
                <div style={{background:"#151519", border:"1px solid #333", borderRadius:20, padding:20, width:720, maxWidth:"90%"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16}}><h2 style={{fontSize:18, fontWeight:800}}>Choose Plan</h2><button onClick={()=>setShowPlans(false)} style={{background:"#222", border:0, color:"white", padding:"6px 10px", borderRadius:8}}>✕</button></div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12}}>
                    {plans.map(p=>(
                      <div key={p.name} style={{background: p.popular ? "#1E1E24" : "#111114", border: p.popular ? "2px solid #7C3AED" : "1px solid #222", borderRadius:16, padding:14, position:"relative"}}>
                        {p.popular && <span style={{position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(90deg,#7C3AED,#F97316)", fontSize:9, padding:"2px 10px", borderRadius:20}}>POPULAR</span>}
                        <div style={{fontWeight:700}}>{p.name}</div>
                        <div style={{fontSize:22, fontWeight:800, marginTop:6}}>{p.price==="0" ? "Free" : `Rs ${p.price}`} <span style={{fontSize:11, color:"#888"}}>/ month</span></div>
                        <div
