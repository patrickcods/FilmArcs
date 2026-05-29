# FilmArcs 🎬

O **FilmArcs** é uma plataforma full-stack desenvolvida para analisar e visualizar a jornada de engajamento em filmes. Com ele, você pode buscar informações detalhadas sobre filmes (via TMDB API) e registrar sua percepção sobre a evolução do arco narrativo (Início, Meio e Fim) através de uma interface intuitiva e gráficos interativos.

## 🚀 Funcionalidades
- **Busca Inteligente:** Pesquisa em tempo real integrada à API do TMDB.
- **Análise de Arco:** Avaliação detalhada da estrutura narrativa do filme.
- **Persistência de Dados:** Integração com backend em FastAPI e banco de dados SQLite para salvar suas avaliações.
- **Curva de Engajamento:** Visualização gráfica da progressão do seu interesse durante o filme.

## 🛠 Tecnologias Utilizadas

### Frontend
- React.js com Vite
- Recharts (para visualização de dados)
- CSS moderno para design responsivo

### Backend
- FastAPI (Python)
- SQLAlchemy (ORM para banco de dados)
- SQLite (Banco de dados local)

## 📦 Como rodar o projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+

### 1. Backend
1. Navegue até a pasta `backend`: `cd backend`
2. Crie e ative um ambiente virtual:
   - Windows: `python -m venv venv` e `venv\Scripts\activate`
3. Instale as dependências: `pip install fastapi uvicorn sqlalchemy`
4. Inicie o servidor: `python -m uvicorn main:app --reload`

### 2. Frontend
1. Na pasta raiz, instale as dependências: `npm install`
2. Crie um arquivo `.env` na raiz e adicione sua chave: 
   `VITE_TMDB_API_KEY=sua_chave_aqui`
3. Inicie o projeto: `npm run dev`

---

Desenvolvido por **Patrick Carvalho Souza**.git status