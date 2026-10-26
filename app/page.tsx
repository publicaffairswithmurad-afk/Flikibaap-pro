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
    if (!topic.trim()) { alert("Pehle topic likho!"); return; }
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
    } catch {
      setScript("Error - dubara try karo");
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh", background:"#07070A", color:"white", fontFamily:"sans-serif", display:"flex"}}>
      <div style={{width:240, background:"#111114", borderRight:"1px solid #222", padding:14, display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:24, fontWeight:800, fontSize:18}}>
          <div style={{width:30, height:30, borderRadius:8, background:"linear-gradient(135deg,#7C3AED,#F97316)", display:"flex", alignItems:"center", justifyContent:"center"}}>F</div>
          Flikibaap
        </div>
        <div onClick={()=>setActive("copilot")} style={{padding:10, borderRadius:10, cursor:"pointer", background: active==="copilot"?"#1F1F23":"transparent", border:"1px solid #333", marginBottom:6}}>AI Copilot</div>
        <div onClick={()=>setActive("video")} style={{padding:10, borderRadius:10, cursor:"pointer", background: active==="video"?"#1F1F23":"transparent", border:"1px solid #333"}}>Video Studio</div>
        <div style={{marginTop:"auto", background:"#1A1A1E", borderRadius:12, padding:12, border:"1px solid #2A2A30"}}>
          <div style={{fontSize:11, color:"#888"}}>Your Plan - Standard</div>
          <div style={{fontSize:12, fontWeight:700, marginTop:4}}>6000 Credits - 10K PKR</div>
          <div style={{height:6, background:"#222", borderRadius:10, marginTop:8}}><div style={{width:"65%", height:"100%", background:"linear-gradient(90deg,#7C3AED,#F97316)", borderRadius:10}}></div></div>
          <button onClick={()=>setShowPlans(true)} style={{width:"100%", marginTop:10, background:"white", color:"black", border:0, padding:"7px", borderRadius:8, fontWeight:700, fontSize:11}}>View Plans - 10K / 18K</button>
        </div>
      </div>

      <div style={{flex:1, overflowY:"auto", padding:20}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h1 style={{fontSize:18, fontWeight:800}}>All-in-One Video Studio <span style={{fontSize:10, background:"#222", padding:"4px 8px", borderRadius:20, marginLeft:8}}>4 min = 100 credits</span></h1>
          <button onClick={()=>setShowPlans(true)} style={{fontSize:11, background:"#1E1E22", border:"1px solid #333", color:"white", padding:"6px 12px", borderRadius:20}}>6000 Credits</button>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10, marginTop:16}}>
          <div onClick={()=>setVideoMode("ai")} style={{background: videoMode==="ai"?"#1E1E24":"#141417", border: videoMode==="ai"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>AI to Video - 100cr</div>
            <div style={{fontSize:11, color:"#888"}}>25 cr/min - Rs 166/video</div>
          </div>
          <div onClick={()=>setVideoMode("image")} style={{background: videoMode==="image"?"#1E1E24":"#141417", border: videoMode==="image"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>Image to Video - 80cr</div>
            <div style={{fontSize:11, color:"#888"}}>20 cr/min - Rs 133/video</div>
          </div>
          <div onClick={()=>setVideoMode("stock")} style={{background: videoMode==="stock"?"#1E1E24":"#141417", border: videoMode==="stock"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>Stock to Video - 60cr</div>
            <div style={{fontSize:11, color:"#888"}}>15 cr/min - Rs 100/video</div>
          </div>
          <div onClick={()=>setVideoMode("banana")} style={{background: videoMode==="banana"?"#1E1E24":"#141417", border: videoMode==="banana"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>Banana Image - 5cr</div>
            <div style={{fontSize:11, color:"#888"}}>Per image - Rs 12.5</div>
          </div>
          <div onClick={()=>setVideoMode("avatar")} style={{background: videoMode==="avatar"?"#1E1E24":"#141417", border: videoMode==="avatar"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>AI Avatar - 120cr</div>
            <div style={{fontSize:11, color:"#888"}}>30 cr/min - Rs 200/video</div>
          </div>
          <div onClick={()=>setVideoMode("audio")} style={{background: videoMode==="audio"?"#1E1E24":"#141417", border: videoMode==="audio"?"1px solid #7C3AED":"1px solid #222", borderRadius:14, padding:12, cursor:"pointer"}}>
            <div style={{fontWeight:700, fontSize:13}}>Audio to Video - 80cr</div>
            <div style={{fontSize:11, color:"#888"}}>20 cr/min - Rs 133/video</div>
          </div>
        </div>

        <div style={{display:"flex", gap:16, marginTop:16}}>
          <div style={{flex:1, background:"#151519", border:"1px solid #2A2A30", borderRadius:16, padding:14}}>
            <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Script yahan likho..." style={{width:"100%", height:120, background:"#0E0E12", border:"1px solid #2A2A30", borderRadius:10, padding:10, color:"white", fontSize:12}} />
            <button onClick={generate} style={{width:"100%", marginTop:10, background:"linear-gradient(90deg,#7C3AED,#F97316)", border:0, padding:"11px", borderRadius:10, fontWeight:800, color:"white"}}>{loading ? "Writing..." : "Generate Video"}</button>
            <div style={{marginTop:12, background:"#0E0E12", border:"1px solid #333", borderRadius:10, padding:10}}>
              <div style={{fontSize:12, fontWeight:700}}>Long to Short Auto</div>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:8}}>
                <button onClick={()=>setShowShorts(true)} style={{background:"#1E1E22", border:"1px solid #333", color:"white", padding:"8px", borderRadius:8, fontSize:10}}>Highlight All Shorts</button>
                <button onClick={()=>setShowShorts(true)} style={{background:"#1E1E22", border:"1px solid #333", color:"white", padding:"8px", borderRadius:8, fontSize:10}}>Best 40 Sec Short</button>
              </div>
              <div style={{fontSize:9, color:"#666", marginTop:6, textAlign:"center"}}>Extra 20 credits per short</div>
            </div>
            {script && <pre style={{marginTop:12, whiteSpace:"pre-wrap", fontSize:12, background:"#0E0E12", padding:10, borderRadius:8, border:"1px solid #222"}}>{script}</pre>}
          </div>
          <div style={{flex:1, background:"#0E0E12", border:"1px solid #222", borderRadius:16, padding:14}}>
            <div style={{height:200, background:"#111", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#555"}}>Video Preview</div>
            {showShorts && <div style={{marginTop:10, background:"#1A1A1E", border:"1px solid #333", borderRadius:10, padding:10, fontSize:11}}>Shorts Ready: 00:42 | 01:15 | 02:30 - 20cr each</div>}
          </div>
        </div>

        {showPlans && (
          <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50}}>
            <div style={{background:"#151519", border:"1px solid #333", borderRadius:20, padding:20, width:700}}>
              <div style={{display:"flex", justifyContent:"space-between"}}><h2 style={{fontWeight:800}}>Plans - 10K & 18K</h2><button onClick={()=>setShowPlans(false)} style={{background:"#222", border:0, color:"white", padding:"6px 10px", borderRadius:8}}>X</button></div>
              <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:12, marginTop:16}}>
                <div style={{background:"#111114", border:"1px solid #222", borderRadius:16, padding:14}}><div>Free</div><div style={{fontSize:18, fontWeight:800}}>Rs 0</div><div style={{fontSize:11, color:"#F97316"}}>100 Credits - 1 Video</div></div>
                <div style={{background:"#1E1E24", border:"2px solid #7C3AED", borderRadius:16, padding:14}}><div>Standard - Popular</div><div style={{fontSize:18, fontWeight:800}}>Rs 10,000</div><div style={{fontSize:11, color:"#F97316"}}>6000 Credits - 60 Videos x 4min</div><div style={{fontSize:10, color:"#AAA", marginTop:6}}>100cr per video - 1080p - No watermark</div></div>
                <div style={{background:"#111114", border:"1px solid #222", borderRadius:16, padding:14}}><div>Premium</div><div style={{fontSize:18, fontWeight:800}}>Rs 18,000</div><div style={{fontSize:11, color:"#F97316"}}>30000 Credits - Unlimited 1 Month</div><div style={{fontSize:10, color:"#AAA", marginTop:6}}>Long to Short Auto - 4K - All features</div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
