"use client";
import { useState } from "react";

const W = [
  {id:"ai", n:"AI to Video", c:"100cr", d:"Idea to video"},
  {id:"image", n:"Image to Video", c:"80cr", d:"Animate photo"},
  {id:"stock", n:"Stock to Video", c:"60cr", d:"Stock + script"},
  {id:"banana", n:"Banana Image", c:"5cr", d:"Text to image", hot:true},
  {id:"avatar", n:"AI Avatar", c:"120cr", d:"Clone + speak"},
  {id:"audio", n:"Audio to Video", c:"80cr", d:"Podcast to video"},
  {id:"url", n:"URL to Video", c:"70cr", d:"Blog link", new:true},
  {id:"ppt", n:"PPT to Video", c:"70cr", d:"PPT to video", new:true},
  {id:"script", n:"Script to Video", c:"90cr", d:"Long script"},
  {id:"translate", n:"Translate Video", c:"50cr", d:"80+ langs", new:true},
  {id:"series", n:"Video Series", c:"200cr", d:"Auto channel"},
  {id:"character", n:"Character Clone", c:"150cr", d:"Face clone"},
  {id:"longshort", n:"Long to Short", c:"20cr", d:"Best 40sec"},
  {id:"api", n:"API / Auto", c:"Custom", d:"Zapier"},
];

export default function Page(){
  const [mode,setMode]=useState("ai");
  const [topic,setTopic]=useState("");
  const [res,setRes]=useState("");
  const [img,setImg]=useState("");
  const [load,setLoad]=useState(false);
  const [showPlans,setShowPlans]=useState(false);
  const cur = W.find(x=>x.id===mode);

  const gen = async()=>{
    if(!topic.trim()){alert("Topic likho!"); return;}
    setLoad(true); setRes(""); setImg("");
    try{
      if(mode==="banana"){
        const url=`https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}?width=1024&height=1024&nologo=true&seed=${Math.floor(Math.random()*10000)}`;
        setImg(url);
        setRes(`✅ Image Generated - 5cr used`);
      }else{
        const r=await fetch("/api/generate",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({topic})});
        const d=await r.json();
        setRes(d.script || "Done");
      }
    }catch(e){setRes("Error - API key check karo");}
    setLoad(false);
  };

  return (
    <div style={{minHeight:"100vh", background:"#FCFCF9", color:"#111", fontFamily:"system-ui", overflowX:"hidden"}}>
      <div style={{height:56, background:"#fff", borderBottom:"1px solid #e5e5e5", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px", position:"sticky", top:0, zIndex:10}}>
        <div style={{fontWeight:900, fontSize:20}}>F<span style={{color:"#FF2D6B"}}>likibaap</span> <span style={{fontSize:10, background:"#111", color:"#fff", padding:"2px 6px", borderRadius:20, marginLeft:6}}>V2 WHITE</span></div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <div style={{fontSize:11, background:"#f4f4f5", border:"1px solid #e4e4e7", padding:"6px 10px", borderRadius:20}}>💎 6000 Credits</div>
          <button onClick={()=>setShowPlans(true)} style={{background:"#111", color:"#fff", fontSize:12, padding:"8px 14px", borderRadius:20, fontWeight:800, border:0}}>Plans 10K/18K</button>
        </div>
      </div>

      <div style={{padding:12, maxWidth:1100, margin:"0 auto"}}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16}}>
          {W.map(w=>(
            <div key={w.id} onClick={()=>setMode(w.id)} style={{background: mode===w.id?"#111":"#fff", color: mode===w.id?"#fff":"#111", border: mode===w.id?"2px solid #111":"1px solid #e5e5e5", borderRadius:16, padding:12, cursor:"pointer", position:"relative"}}>
              {w.hot && <span style={{position:"absolute", top:-6, right:-6, background:"#FF2D6B", color:"#fff", fontSize:8, padding:"2px 6px", borderRadius:20, fontWeight:800}}>HOT</span>}
              {w.new && <span style={{position:"absolute", top:-6, right:-6, background:"#111", color:"#fff", fontSize:8, padding:"2px 6px", borderRadius:20, fontWeight:800}}>NEW</span>}
              <div style={{fontWeight:800, fontSize:13}}>{w.n}</div>
              <div style={{fontSize:11, opacity:0.7}}>{w.d}</div>
              <div style={{marginTop:6, fontSize:10, background: mode===w.id?"#222":"#f4f4f5", display:"inline-block", padding:"2px 8px", borderRadius:20}}>{w.c}</div>
            </div>
          ))}
        </div>

        <div style={{background:"#fff", border:"1px solid #e5e5e5", borderRadius:20, padding:14}}>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:10}}>
            <div style={{fontWeight:800, fontSize:14}}>All-in-One Studio - {cur?.n}</div>
            <div style={{fontSize:11, background:"#111", color:"#fff", padding:"4px 8px", borderRadius:20}}>{cur?.c}</div>
          </div>
          <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder={mode==="banana" ? "Image prompt: e.g. Beautiful Islamic mosque at night, cinematic 4k" : mode==="url" ? "Paste URL: https://..." : "Enter your idea, script, topic..."} style={{width:"100%", height:100, background:"#FCFCF9", border:"1px solid #e5e5e5", borderRadius:12, padding:10, fontSize:13, outline:"none", color:"#111"}} />
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:10}}>
            <button onClick={gen} disabled={load} style={{background:"linear-gradient(90deg,#111,#444)", color:"#fff", padding:12, borderRadius:12, fontWeight:800, fontSize:13, border:0}}>{load?"Generating...":`Generate - ${cur?.c}`}</button>
            <button onClick={()=>{if(!res){alert("Pehle generate karo"); return;} setRes(r=>r+"\n\n--- LONG TO SHORT (20cr) ---\nBest 40 Sec: 00:00-00:40\nHighlight 1: 01:10-01:45\nHighlight ALL + Captions")}} style={{background:"#fff", border:"1px solid #e5e5e5", padding:12, borderRadius:12, fontWeight:800, fontSize:11}}>Long to Short<br/><span style={{fontWeight:400, fontSize:9}}>Best 40 Sec + Highlight All</span></button>
          </div>
        </div>

        <div style={{marginTop:14, background:"#fff", border:"1px solid #e5e5e5", borderRadius:20, padding:14, minHeight:280}}>
          <div style={{fontSize:10, fontWeight:800, letterSpacing:1, color:"#999", marginBottom:10}}>PREVIEW</div>
          {load && <div style={{textAlign:"center", padding:60, color:"#999"}}>AI kaam kar raha hai...</div>}
          {img && <img src={img} style={{width:"100%", maxWidth:512, borderRadius:12, display:"block", margin:"0 auto 12px", border:"1px solid #eee"}} alt=""/>}
          {res && <pre style={{whiteSpace:"pre-wrap", fontSize:13, lineHeight:1.6, background:"#FCFCF9", padding:12, borderRadius:12, border:"1px solid #eee"}}>{res}</pre>}
          {!res && !load && !img && <div style={{textAlign:"center", padding:60, color:"#aaa", fontSize:13}}>Result yahan ayega</div>}
        </div>
      </div>

      {showPlans && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:100, padding:12}} onClick={()=>setShowPlans(false)}>
          <div style={{background:"#fff", borderRadius:20, padding:16, width:"100%", maxWidth:600, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}} onClick={e=>e.stopPropagation()}>
            <div style={{gridColumn:"1 / span 2", fontWeight:900, fontSize:16, marginBottom:4}}>Plans - Flikibaap vs Fliki</div>
            <div style={{border:"1px solid #e5e5e5", borderRadius:14, padding:12}}><div style={{fontWeight:800}}>Free</div><div style={{fontWeight:900, fontSize:20}}>Rs 0</div><div style={{fontSize:11, color:"#666", marginTop:4}}>100 Credits = 1 Video<br/>720p, Watermark</div></div>
            <div style={{border:"2px solid #111", borderRadius:14, padding:12, background:"#FCFCF9"}}><div style={{fontWeight:800}}>Standard <span style={{background:"#FF2D6B", color:"#fff", fontSize:8, padding:"2px 6px", borderRadius:10}}>POPULAR</span></div><div style={{fontWeight:900, fontSize:20}}>Rs 10,000</div><div style={{fontSize:11, color:"#111", marginTop:4, fontWeight:600}}>6000 Credits = 60 Videos x 4min<br/>Fliki me sirf 180 credits! Tum 33x zyada</div></div>
            <div style={{gridColumn:"1 / span 2", border:"1px solid #e5e5e5", borderRadius:14, padding:12}}><div style={{fontWeight:800}}>Premium - Rs 18,000</div><div style={{fontSize:11, color:"#666", marginTop:2}}>30,000 Credits Unlimited 1 Month, 4K, API, Series Auto, Long to Short Highlight ALL</div></div>
            <button onClick={()=>setShowPlans(false)} style={{gridColumn:"1 / span 2", background:"#111", color:"#fff", padding:12, borderRadius:12, fontWeight:800, border:0}}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
