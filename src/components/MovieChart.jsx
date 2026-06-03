import React, { useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import html2canvas from 'html2canvas';

function MovieChart({ avaliacao, media, nomeFilme = "Filme Avaliado" }) {
  const chartRef = useRef(null);

  const data = [
    { name: 'Início', sua_nota: avaliacao?.inicio || 0, media: media?.inicio || 0 },
    { name: 'Meio',   sua_nota: avaliacao?.meio || 0,   media: media?.meio || 0 },
    { name: 'Fim',    sua_nota: avaliacao?.fim || 0,    media: media?.fim || 0 },
  ];

  const tirarPrint = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current, { 
      backgroundColor: '#141414', 
      scale: 2,
      logging: false, 
      useCORS: true  
    });
    
    const link = document.createElement('a');
    const fileName = `filmarcs-${nomeFilme.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={styles.wrapper}>
      <div ref={chartRef} style={styles.container}>
        <h2 style={styles.title}>{nomeFilme}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSua" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E50914" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
            <XAxis dataKey="name" stroke="#888" tick={{ fill: '#aaa', fontSize: 14, fontWeight: 'bold' }} dy={10} />
            <YAxis domain={[0, 5]} stroke="#888" tick={{ fill: '#aaa', fontSize: 14 }} ticks={[0, 1, 2, 3, 4, 5]} />
            <Tooltip contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: '1px solid #444', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#aaa', paddingTop: '1rem' }} />
            <Area type="monotone" dataKey="sua_nota" name="Sua nota" stroke="#E50914" strokeWidth={4} fillOpacity={1} fill="url(#colorSua)" />
            <Area type="monotone" dataKey="media" name="Média geral" stroke="#888" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button onClick={tirarPrint} style={styles.button}>
        Baixar Gráfico
      </button>
    </div>
  );
}

const styles = {
  wrapper: { width: '100%' },
  container: {
    width: '100%', height: 420, marginTop: '1.5rem', backgroundColor: '#141414',
    padding: '2rem 1rem 1rem 1rem', borderRadius: '16px', border: '1px solid #282828',
    display: 'flex', flexDirection: 'column', alignItems: 'center'
  },
  title: {
    color: '#ffffff', textAlign: 'center', marginBottom: '1rem', 
    fontFamily: 'Arial, sans-serif', fontSize: '20px'
  },
  button: {
    marginTop: '1rem', backgroundColor: '#E50914', color: '#fff', 
    border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer',
    fontWeight: 'bold', width: '100%'
  }
};

export default MovieChart;