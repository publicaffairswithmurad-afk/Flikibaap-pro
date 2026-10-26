'use client';
import { useState } from 'react';

export default function Home() {
  const [copilotInput, setCopilotInput] = useState('');

  const features = [
    { icon: '📝', title: 'Script to Video', desc: 'Paste script, get 4K video', color: '#e50914' },
    { icon: '💡', title: 'Idea to Video', desc: '1 line idea = Full video', color: '#00d4ff' },
    { icon: '🎙️', title: 'Audio to Video', desc: 'Your voice = Viral video', color: '#ff00a0' },
    { icon: '🏷️', title: 'Title to Video', desc: 'Title dalo, video ready', color: '#ffaa00' },
    { icon: '✂️', title: 'Editor + Preview', desc: 'Pro timeline editing', color: '#00ff88' },
    { icon: '🔄', title: 'Re-Generate', desc: '1 click me naya version', color: '#8b5cf6' },
  ];

  const handleCopilot = (text: string) => {
    setCopilotInput(text);
    const el = document.getElementById('copilot-section');
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ background: '#050507', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderBottom: '1px solid #151515', background: 'rgba(5,5,7,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #e50914, #ff3b3b)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px', boxShadow: '0 0 20px rgba(229,9,20,0.4)' }}>F</div>
          <div>
            <div style={{ fontWeight: '900', fontSize: '17px', letterSpacing: '0.5px' }}>FLIKIBAAP</div>
            <div style={{ fontSize: '9px', opacity: 0.5, letterSpacing: '2px', marginTop: '-2px' }}>10X FLIKI • PRO MAX</div>
          </div>
          <div style={{ marginLeft: '20px', background: '#111', border: '1px solid #222', padding: '5px 10px', borderRadius: '20px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', background: '#00ff88', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #00ff88' }}></span>
            3,142 ONLINE • SYSTEM LIVE
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', opacity: 0.6 }} className="hidden-mobile">3 Videos Free • No Card</span>
          <button style={{ background: 'white', color: 'black', border: 'none', padding: '10px 18px', borderRadius: '24px', fontWeight: '800', fontSize: '13px' }}>Dashboard →</button>
        </div>
      </nav>

      {/* HERO - ADVANCED SHOW */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: 'linear-gradient(90deg, #111, #1a1a1a)', border: '1px solid #252525', padding: '8px 14px', borderRadius: '24px', fontSize: '11px', gap: '8px', alignItems: 'center', marginBottom: '22px' }}>
          <span style={{ background: '#e50914', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '9px', fontWeight: '800' }}>NEW</span>
          FLIKI SE 10X ADVANCED • DIMAGH WALA AI • MONETIZATION SAFE
        </div>
        
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '900', lineHeight: '0.95', letterSpacing: '-2px', margin: 0 }}>
          Jo Socho Ge, <br/>
          <span style={{ background: 'linear-gradient(90deg, #e50914, #ff6b6b, #ffa502)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Khud Bana Dega.</span>
        </h1>
        <p style={{ opacity: 0.6, fontSize: '16px', marginTop: '16px', maxWidth: '650px', marginInline: 'auto', lineHeight: '1.5' }}>
          Fliki purana hai. Flikibaap me Copilot hai. Sirf likho "5'7 body" -> AI samjhega ye Health niche hai aur viral editing khud kar dega. No dummy.
        </p>

        {/* COPILOT BAR - MAIN FEATURE */}
        <div id="copilot-section" style={{ maxWidth: '750px', margin: '35px auto 0', background: 'linear-gradient(180deg, #161616, #0e0e0e)', border: '1px solid #2a2a2a', borderRadius: '20px', padding: '18px', boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#080808', border: '1px solid #222', borderRadius: '14px', padding: '14px 16px' }}>
            <span style={{ fontSize: '20px' }}>🤖</span>
            <input value={copilotInput} onChange={e=>setCopilotInput(e.target.value)} placeholder='Yahan kuch bhi likho... "Ali ny bike leay k galti ki 8 mint ki story" ya "Idea do horror niche ke liye"...' style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '15px' }} />
            <button onClick={()=>{if(copilotInput) alert('Phase 1 me Copilot UI ready hai! Phase 2 me Real AI Brain connect hoga. Abhi ke liye: ' + copilotInput)}} style={{ background: 'white', color: 'black', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '800', fontSize: '13px' }}>Generate ✨</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <button onClick={()=>handleCopilot('5\'7 body ke liye workout plan video')} style={{ background: '#1a1a1a', border: '1px solid #222', color: '#aaa', padding: '6px 12px', borderRadius: '20px', fontSize: '11px' }}>💪 5'7 body</button>
            <button onClick={()=>handleCopilot('Villa No 3 horror story 8 mint ki')} style={{ background: '#1a1a1a', border: '1px solid #222', color: '#aaa', padding: '6px 12px', borderRadius: '20px', fontSize: '11px' }}>👻 Villa No 3 - 8 min</button>
            <button onClick={()=>handleCopilot('Islamic - Namaz ki ahmiyat par emotional video')} style={{ background: '#1a1a1a', border: '1px solid #222', color: '#aaa', padding: '6px 12px', borderRadius: '20px', fontSize: '11px' }}>🕌 Islamic Emotional</button>
            <button onClick={()=>handleCopilot('Best unique topics for health niche')} style={{ background: '#1a1a1a', border: '1px solid #222', color: '#aaa', padding: '6px 12px', borderRadius: '20px', fontSize: '11px' }}>🔥 Best Unique Topics</button>
          </div>
        </div>
      </section>

      {/* FEATURES GRID - ADVANCED SHOW */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {features.map((f,i)=>(
            <div key={i} onClick={()=>handleCopilot(f.title + ' banao')} style={{ background: 'linear-gradient(180deg, #131313, #0a0a0a)', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '18px', cursor: 'pointer', transition: '0.2s' }}>
              <div style={{ width: '42px', height: '42px', background: `${f.color}15`, border: `1px solid ${f.color}30`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', marginTop: '12px', fontSize: '14px' }}>{f.title}</div>
              <div style={{ opacity: 0.5, fontSize: '11px', marginTop: '4px' }}>{f.desc}</div>
              <div style={{ marginTop: '10px', fontSize: '11px', color: f.color, fontWeight: '700' }}>Try →</div>
            </div>
          ))}
        </div>

        {/* SUBSCRIPTION TEASER */}
        <div style={{ marginTop: '30px', background: 'linear-gradient(90deg, #111, #151515)', border: '1px solid #222', borderRadius: '16px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div><span style={{ opacity: 0.5, fontSize: '11px' }}>FREE PLAN</span><div style={{ fontWeight: '800', fontSize: '14px' }}>3 Videos/Month + Watermark</div></div>
            <div><span style={{ opacity: 0.5, fontSize: '11px' }}>STANDARD • 10K PKR</span><div style={{ fontWeight: '800', fontSize: '14px' }}>60 Long + 60 Shorts • No Watermark</div></div>
            <div><span style={{ opacity: 0.5, fontSize: '11px' }}>PREMIUM • 18K PKR</span><div style={{ fontWeight: '800', fontSize: '14px', color: '#e50914' }}>Unlimited • Clone Voice</div></div>
          </div>
          <button style={{ background: '#e50914', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '800' }}>Upgrade Now</button>
        </div>
      </section>

      <footer style={{ textAlign: 'center', opacity: 0.2, fontSize: '11px', padding: '30px' }}>© 2026 FLIKIBAAP PRO MAX • Phase 1 Live • Phase 2: Real AI Brain Connecting... • Built in Pakistan</footer>
    </main>
  );
}
