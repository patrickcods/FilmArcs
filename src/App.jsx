import React, { useState, useEffect } from "react"; // Adicionado useEffect aqui
import SearchBar from "./components/SearchBar.jsx";
import MovieCard from "./components/MovieCard.jsx";
import RatingStars from "./components/RatingStars.jsx";
import MovieChart from "./components/MovieChart.jsx";

function App() {
  // 1. TODOS OS HOOKS FICAM AQUI NO TOPO
  const [filmesPesquisados, setFilmesPesquisados] = useState([]);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [avaliacao, setAvaliacao] = useState(null);
  const [mediaAvaliacao, setMediaAvaliacao] = useState(null);
  const [notificacao, setNotificacao] = useState('')
  const API_BASE = 'https://filmarcs-production.up.railway.app'

  // Este useEffect roda sempre que um filme é selecionado
  useEffect(() => {
    if (filmeSelecionado) {
      setMediaAvaliacao(null); // Limpa a média anterior ao trocar de filme
      fetch('${API_BASE}/api/v1/avaliacoes/${filmeSelecionado.id}/media')
        .then(res => res.json())
        .then(data => setMediaAvaliacao(data))
        .catch(err => console.error("Erro ao buscar média:", err));
    }
  }, [filmeSelecionado]);

  const lidarComSelecao = (filme) => {
    setFilmeSelecionado(filme);
    setAvaliacao(null);
  };

  const voltarParaBusca = () => {
    setFilmeSelecionado(null);
  };

  const salvarAvaliacao = async (dados) => {
    try {
      const response = await fetch("${API_BASE}/api/v1/avaliacoes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_filme_tmdb: dados.id,
          nota_inicio: dados.inicio,
          nota_meio: dados.meio,
          nota_fim: dados.fim
        }),
      });

      if (response.ok) {
        setNotificacao('Avaliação salva com sucesso!')
        setTimeout(() => setNotificacao(''), 3000)
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
    }
  };

  // 2. LOGICA DE RENDERIZAÇÃO
  if (filmeSelecionado) {
    const poster = filmeSelecionado.poster_path
      ? `https://image.tmdb.org/t/p/w400${filmeSelecionado.poster_path}`
      : 'https://via.placeholder.com/400x600/161616/ffffff?text=Sem+Foto';

    const ano = filmeSelecionado.release_date ? filmeSelecionado.release_date.slice(0, 4) : 'N/A';

    return (
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
         <button onClick={voltarParaBusca} style={{
            marginBottom: '2rem',
            padding: '0.6rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#fff',
            border: '1px solid #E50914',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            ← Voltar para Busca
          </button>
      {notificacao && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          backgroundColor: '#1db954', color: '#fff',
          padding: '1rem 1.5rem', borderRadius: '12px',
          fontWeight: 'bold', fontSize: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          ✓ {notificacao}
        </div>
      )}

          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
              <img src={poster} alt={filmeSelecionado.title} style={{ width: '100%', borderRadius: '16px' }} />
            </div>
            
            <div style={{ flex: '2', minWidth: '300px' }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', margin: '0 0 0.5rem 0', lineHeight: '1.2', wordBreak: 'break-word' }}>{filmeSelecionado.title}</h1>
              <p style={{ color: '#E50914', fontWeight: 'bold' }}>{ano}</p>

              {mediaAvaliacao && mediaAvaliacao.inicio > 0 && (
                <div style={{ display: 'flex', gap: '20px', marginBottom: '1.5rem',marginTop:"1.5rem", justifyContent: 'center' }}>
                  {[['Início', mediaAvaliacao.inicio], ['Meio', mediaAvaliacao.meio], ['Fim', mediaAvaliacao.fim]].map(([label, valor]) => (
                    <div key={label} style={{ textAlign: 'center', backgroundColor: '#141414', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid #222' }}>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: '0 0 0.25rem 0' }}>{label}</p>
                      <p style={{ color: '#E50914', fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>{valor}★</p>
                    </div>
                  ))}
                </div>
              )}

              <p style={{ color: '#aaa' }}>{filmeSelecionado.overview}</p>
  
              <RatingStars onAvaliar={(notas) => {
                setAvaliacao(notas);
                salvarAvaliacao({ ...notas, id: filmeSelecionado.id });
              }} />

              {avaliacao && (
                <div style={{ marginTop: '2rem', height: '300px', width: '100%' }}>
                  <h3 style={{ color: '#E50914' }}>Curva de Engajamento:</h3>
                  <MovieChart avaliacao={avaliacao} media={mediaAvaliacao} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontSize: '4.5rem', fontWeight: '900', margin: 0, letterSpacing: '-1px', marginTop:'35px' }}>
          Film<span style={{ color: '#E50914' }}>Arcs</span>
        </h1>
        <p style={{ color: '#888', margin: '0.5rem 0 0 0', fontSize: '1.1rem', marginTop:'50px' }}>
          Explore e avalie a jornada dos seus filmes favoritos
        </p>
      </header>

      <SearchBar onResults={setFilmesPesquisados} temaCor="#E50914" />

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {filmesPesquisados.length > 0 ? (
          filmesPesquisados.map(filme => (
            <MovieCard key={filme.id} filme={filme} onSelecionar={lidarComSelecao} />
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
             <p style={{ color: '#444', fontSize: '1.2rem' }}>
               Nenhum filme na tela ainda. Busque um clássico para começar!
             </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;