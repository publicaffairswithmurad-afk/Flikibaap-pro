export default function Home() {
  const movies = [
    { id: 1, title: "Pathaan", year: "2023" },
    { id: 2, title: "Jawan", year: "2023" },
    { id: 3, title: "Animal", year: "2023" },
    { id: 4, title: "Dunki", year: "2023" },
    { id: 5, title: "Tiger 3", year: "2023" },
    { id: 6, title: "Gadar 2", year: "2023" },
  ];

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ background: 'black', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e50914' }}>
        <h1 style={{ color: '#e50914', margin: 0, fontSize: '26px' }}>FLIKIBAAP PRO</h1>
        <input placeholder="Search movies..." style={{ padding: '8px 15px', borderRadius: '20px', border: 'none', background: '#222', color: 'white', width: '140px' }} />
      </header>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(to right, #e50914, #000)', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', margin: '0 0 10px 0' }}>Welcome to Flikibaap Pro 🎬</h2>
        <p style={{ opacity: 0.9 }}>Watch Latest Bollywood, Hollywood Movies Free</p>
        <button style={{ marginTop: '15px', background: 'white', color: '#e50914', border: 'none', padding: '10px 25px', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px' }}>▶ Watch Now</button>
      </div>

      {/* Movies Grid */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '15px' }}>🔥 Trending Now</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {movies.map((m) => (
            <div key={m.id} style={{ background: '#1a1a1a', borderRadius: '10px', overflow: 'hidden', textAlign: 'center', paddingBottom: '10px' }}>
              <div style={{ background: '#222', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🎬</div>
              <p style={{ margin: '8px 0 2px 0', fontSize: '14px', fontWeight: 'bold' }}>{m.title}</p>
              <small style={{ opacity: 0.6, fontSize: '12px' }}>{m.year}</small>
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: 'center', opacity: 0.5, padding: '20px', fontSize: '12px' }}>© 2026 Flikibaap Pro - Made with ❤️</p>
    </main>
  );
}
