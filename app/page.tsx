'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async (custom?: string) => {
    const topic = custom || input;
    if (!topic) { alert('Topic likho yaar!'); return; }
    setLoading(true);
    setScript('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      setScript(data.script);
      setTimeout(() => {
        document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch {
      setScript('Error: Vercel me GROQ_API_KEY check karo!');
    }
    setLoading(false);
  };

  return (
    <main style={{ background: '#050507', minHeight: '100vh', color: 'white', paddingBottom: '40px' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #151515', position: 'sticky', top: 0, background: '#050507', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: '#e50914', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>F</div>
          <div style={{ fontWeight: '900' }}>FLIKIBAAP</div>
          <div style={{ background: '#111', border: '1px solid #222', padding: '4px 10px', borderRadius: '20px', fontSize: '10px' }}>● LIVE AI</div>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', lineHeight: '1', margin: 0 }}>Jo Socho Ge,<br/><span style={{ color: '#e50914' }}>AI Khud Bana Dega.</span></h1>
        <p style={{ opacity: 0.6, fontSize: '14px', marginTop: '12px' }}>Fliki purana hai. Yahan dimagh wala AI hai.</p>

        <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: '18px', padding: '16px', marginTop: '28px' }}>
          <div style={{ display: 'flex', gap: '10px', background: '#080808', border: '1px solid #222', borderRadius: '12px', padding: '12px' }}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder='Kuch bhi likho... Villa No 3 horror 8 min' style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '14px' }} />
            <button onClick={()=>generate()} disabled={loading} style={{ background: loading ? '#333' : 'white', color: loading ? '#888' : 'black', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '800' }}>{loading ? '...' : 'Generate'}</button>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['5ft 7 body workout', 'Villa No 3 horror 8 min', 'Islamic namaz ahmiyat', 'Best unique topics health'].map(t=>(
              <button key={t} onClick={()=>generate(t)} style={{ background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#aaa', padding: '6px 10px', borderRadius: '20px', fontSize: '10px' }}>{t}</button>
            ))}
          </div>
        </div>

        {loading && <div style={{ marginTop: '30px', padding: '20px', background: '#111', borderRadius: '14px', border: '1px solid #222' }}>🤖 Dimagh Wala AI soch raha hai... 10 sec</div>}

        {script && (
          <div id="result" style={{ marginTop: '20px', background: '#0f0f0f', border: '1px solid #333', borderRadius: '14px', padding: '16px', textAlign: 'left', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ background: '#e50914', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800' }}>REAL AI SCRIPT</span>
              <button onClick={()=>{navigator.clipboard.writeText(script); alert('Copied!')}} style={{ background: '#222', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>Copy</button>
            </div>
            {script}
            <button onClick={()=>generate()} style={{ width: '100%', marginTop: '14px', background: '#e50914', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800' }}>🔄 Re-Generate</button>
          </div>
        )}
      </div>
    </main>
  );
}
