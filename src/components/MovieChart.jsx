import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function MovieChart({ avaliacao, media }) {
  const data = [
    { name: 'Início', sua_nota: avaliacao.inicio, media: media?.inicio || null },
    { name: 'Meio',   sua_nota: avaliacao.meio,   media: media?.meio   || null },
    { name: 'Fim',    sua_nota: avaliacao.fim,     media: media?.fim    || null },
  ];

  return (
    <div style={styles.container}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSua" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#E50914" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#E50914" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#888" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#888" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
          <XAxis dataKey="name" stroke="#888" tick={{ fill: '#aaa', fontSize: 14, fontWeight: 'bold' }} dy={10} />
          <YAxis domain={[0, 5]} stroke="#888" tick={{ fill: '#aaa', fontSize: 14 }} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: '1px solid #444', color: '#fff' }} />
          <Legend wrapperStyle={{ color: '#aaa', paddingTop: '1rem' }} />
          <Area type="monotone" dataKey="sua_nota" name="Sua nota" stroke="#E50914" strokeWidth={4} fillOpacity={1} fill="url(#colorSua)" activeDot={{ r: 8 }} />
          <Area type="monotone" dataKey="media" name="Média geral" stroke="#888" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorMedia)" activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    width: '100%', height: 350, marginTop: '1.5rem', backgroundColor: '#141414',
    padding: '1.5rem 1rem 1rem 0rem', borderRadius: '16px', border: '1px solid #282828',
  }
};

export default MovieChart;