import React, { useState } from 'react';

function StarRating({ label, value, onChange }) {
  const [hover, setHover] = useState(0);
  const notaAtual = hover || value;

  return (
    <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{label}: {notaAtual}</p>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(index => {
          const valorEstrelaEsquerda = index - 0.5;
          const valorEstrelaDireita = index;

          return (
            <div key={index} style={{ display: 'flex', position: 'relative', fontSize: '2rem', cursor: 'pointer' }} onMouseLeave={() => setHover(0)}>
              <span
                style={{
                  position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden',
                  color: notaAtual >= valorEstrelaEsquerda ? '#E50914' : '#ccc'
                }}
                onClick={() => onChange(valorEstrelaEsquerda)} onMouseEnter={() => setHover(valorEstrelaEsquerda)}
              >★</span>
              <span
                style={{ color: notaAtual >= valorEstrelaDireita ? '#E50914' : '#ccc' }}
                onClick={() => onChange(valorEstrelaDireita)} onMouseEnter={() => setHover(valorEstrelaDireita)}
              >★</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RatingStars({ onAvaliar }) {
  const [inicio, setInicio] = useState(0);
  const [meio, setMeio] = useState(0);
  const [fim, setFim] = useState(0);

  const pronto = inicio > 0 && meio > 0 && fim > 0;

  return (
    <div style={{ 
      marginTop: '1rem', 
      backgroundColor: '#141414', 
      padding: '2rem', 
      borderRadius: '12px',
      border: '1px solid #222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <StarRating label="Início" value={inicio} onChange={setInicio} />
      <StarRating label="Meio" value={meio} onChange={setMeio} />
      <StarRating label="Fim" value={fim} onChange={setFim} />
      
      <button
        onClick={() => onAvaliar({ inicio, meio, fim })}
        disabled={!pronto}
        style={{
          marginTop: '1rem', padding: '0.8rem 2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', transition: 'all 0.2s',
          backgroundColor: pronto ? '#E50914' : '#444', 
          color: pronto ? '#fff' : '#888', 
          cursor: pronto ? 'pointer' : 'not-allowed',
        }}
      >
        Ver gráfico FilmArcs
      </button>
    </div>
  );
}

export default RatingStars;