'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = () => {
    if (!topic) return alert('Topic likho pehle!');
    setLoading(true);
    setTimeout(() => {
      setScript(`🎬 TOPIC: ${topic}

[SCENE 1 - HOOK - 0:00]
"Socho agar... ${topic} aapki zindagi badal de?"

[SCENE 2 - STORY - 0:15]
"Duniya me 99% log ye galti karte hain...
Lekin jo 1% kamyab hain, wo ye raaz jante hain..."

[SCENE 3 - VALUE - 0:45]
"1. Pehla usool...
2. Dusra usool...
3. Teesra usool jo sabse important hai..."

[SCENE 4 - CTA - 1:30]
"Agar ye video achi lagi to Flikibaap Pro ko subscribe karo!"

---
✅ Script Ready for Voice + Video
`);
      setLoading(false);
    }, 1500);
  };

  return (
    <main style={{ background: '#050505', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1 style={{ color: '#e50914', margin: 0 }}>FLIKIBAAP PRO MAX</h1>
        <span style={{ background: '#e50914', padding: '5px 12px', borderRadius: '20px', fontSize: '12px' }}>DAY 1 - LIVE</span>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>AI Video Studio 🔥</h2>
        <p style={{ textAlign: 'center', opacity: 0.6 }}>Fliki.ai se better - Her niche ki video</p>

        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1px solid #222' }}>
          <label style={{ fontSize: '14px' }}>Apna Video Topic Likho (Koi bhi Niche):</label>
          <textarea 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Horror story, Islamic history, Crypto tips, Motivation..."
            style={{ width: '100%', height: '90px', background: '#000', color: 'white', border: '1px solid #333', borderRadius: '10px', padding: '12px', marginTop: '10px', fontSize: '16px' }}
          />
          <button onClick={generateScript} disabled={loading} style={{ width: '100%', background: loading ? '#555' : '#e50914', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', marginTop: '15px', fontWeight: 'bold', fontSize: '16px' }}>
            {loading ? 'AI Likh Raha Hai...' : '✨ GENERATE SCRIPT (AI)'}
          </button>
        </div>

        {script && (
          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', marginTop: '20px', border: '1px solid #e50914', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            <h3 style={{ color: '#e50914', marginTop: 0 }}>✅ AI Script Ready:</h3>
            {script}
            <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button style={{ background: '#222', color: 'white', border: 'none', padding: '10px', borderRadius: '8px' }}>🎙️ Voice Next (Kal)</button>
              <button style={{ background: '#222', color: 'white', border: 'none', padding: '10px', borderRadius: '8px' }}>🎬 Video Next (Parso)</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
