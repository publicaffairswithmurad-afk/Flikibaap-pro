'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const gen = () => {
    if(!topic){ alert('Topic likho'); return; }
    setLoading(true);
    setTimeout(()=>{
      let t = topic;
      let s = 'TOPIC: ' + t + '\n\n';
      s += 'HOOK: ' + t + ' ki aisi kahani jo aapko hila degi.\n\n';
      s += 'STORY: ' + t + ' ke bare me log samajhte hain ye aam hai, lekin haqeeqat kuch aur hai. Aaj hum tafseel se baat karenge.\n\n';
      s += 'POINTS: 1) ' + t + ' ka raaz 2) Ghalti 3) Kamyabi ka tarika\n\n';
      s += 'ENDING: Kaisi lagi kahani ' + t + ' ki? Comment karo.';
      setScript(s);
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{background:'#000',minHeight:'100vh',color:'#fff',padding:'20px'}}>
      <div style={{maxWidth:'700px',margin:'0 auto'}}>
        <h1 style={{color:'#e50914',textAlign:'center'}}>FLIKIBAAP PRO</h1>
        <p style={{textAlign:'center',opacity:0.5,fontSize:'12px'}}>TRUSTED BY 15000+ CREATORS - RATED 4.9/5</p>
        <div style={{background:'#111',padding:'16px',borderRadius:'12px',marginTop:'20px',border:'1px solid #222'}}>
          <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Kuch bhi likho: Platform No 3 Lahore story" style={{width:'100%',height:'90px',background:'#000',color:'#fff',border:'1px solid #333',borderRadius:'8px',padding:'10px'}}/>
          <button onClick={gen} style={{width:'100%',background:'#e50914',color:'#fff',border:'none',padding:'12px',borderRadius:'8px',marginTop:'10px',fontWeight:'bold'}}>{loading?'Loading...':'GENERATE SCRIPT'}</button>
        </div>
        {script && <div style={{background:'#111',padding:'14px',borderRadius:'12px',marginTop:'14px',border:'1px solid #333',whiteSpace:'pre-wrap',fontSize:'14px',lineHeight:'1.6'}}>{script}</div>}
      </div>
    </div>
  );
}
