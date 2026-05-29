import React, { useState, useEffect } from 'react';

function SearchBar({ onResults, temaCor = '#f5c518' }) {
  const [query, setQuery] = useState('');

  // Busca em tempo real enquanto digita
  useEffect(() => {
    if (query.trim() === '') {
      onResults([]); // Limpa a tela se o input estiver vazio
      return;
    }

    const delayBusca = setTimeout(async () => {
      try {
        const API_KEY = import.meta.env.VITE_TMDB_KEY; 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        
        // Envia os resultados diretamente para o componente pai renderizar os cards
        if (dados.results) {
          onResults(dados.results);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }, 500);

    return () => clearTimeout(delayBusca);
  }, [query, onResults]);

  // Função do botão (como já busca digitando, o botão pode apenas focar/confirmar)
  const handlePesquisarClick = () => {
    console.log("Pesquisa confirmada para:", query);
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Buscar filmes (ex: O Show de Truman, A Origem)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ ...styles.input, borderColor: '#333' }}
          onFocus={(e) => e.target.style.borderColor = temaCor}
          onBlur={(e) => e.target.style.borderColor = '#333'}
          onKeyDown={(e) => e.key === 'Enter' && handlePesquisarClick()}
        />
        
        <button 
          onClick={handlePesquisarClick}
          style={{ ...styles.button, backgroundColor: temaCor }}
          onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    width: '100%', 
    maxWidth: '700px', 
    margin: '0 auto 2rem auto' 
  },
  inputWrapper: { 
    display: 'flex', 
    gap: '8px', 
    alignItems: 'center' 
  },
  input: {
    flex: 1, 
    padding: '1.2rem 1.5rem', 
    fontSize: '1.2rem',
    borderRadius: '30px', 
    border: '2px solid', 
    backgroundColor: '#161616',
    color: '#fff', 
    outline: 'none', 
    transition: 'all 0.3s',
  },
  button: {
    padding: '0 1.5rem', 
    height: '100%', 
    minHeight: '60px',
    fontSize: '1.1rem', 
    fontWeight: 'bold', 
    color: '#000',
    border: 'none', 
    borderRadius: '30px', 
    cursor: 'pointer', 
    transition: 'filter 0.2s',
  }
};

export default SearchBar;