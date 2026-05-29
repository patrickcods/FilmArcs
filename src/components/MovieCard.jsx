import React from 'react';

function MovieCard({ filme, onSelecionar }) {
const poster = (filme.poster_path && filme.poster_path !== "" && filme.poster_path !== "null")
  ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
  : 'https://placehold.co/200x300/161616/777?text=Sem+Foto';
  const ano = filme.release_date ? filme.release_date.slice(0, 4) : 'N/A';

  return (
    <div 
      style={styles.card} 
      onClick={() => onSelecionar(filme)}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
 <img 
  src={poster} 
  alt={filme.title} 
  style={styles.image} 
  onError={(e) => { 
    e.target.onerror = null; // Evita loop infinito
    e.target.src = 'https://dummyimage.com/200x300/161616/777&text=Sem+Foto'; 
  }} 
/>
      
      <div style={styles.infoContainer}>
        <h3 style={styles.title}>{filme.title}</h3>
        <p style={styles.year}>{ano}</p>
        
        {/* Nova área de descrição */}
        <p style={styles.description}>
          {filme.overview || 'Nenhuma sinopse disponível para este filme.'}
        </p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '220px', // Aumentei um pouco para caber melhor o texto
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    backgroundColor: '#161616',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
  },
  image: {
    width: '100%',
    height: '330px',
    objectFit: 'cover',
  },
  infoContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinhado à esquerda para facilitar a leitura
    textAlign: 'left',
  },
  title: {
    fontSize: '1.1rem',
    margin: '0 0 0.25rem 0',
    fontWeight: '700',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    color: '#fff',
  },
  year: {
    margin: '0 0 0.5rem 0',
    color: '#f5c518', // Destaque na cor do tema FilmArcs
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  description: {
    margin: 0,
    color: '#999',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    // Truque CSS para limitar a 3 linhas
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }
};

export default MovieCard;