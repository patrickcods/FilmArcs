from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func

# Define o app UMA ÚNICA VEZ
app = FastAPI()



origins = [
    "http://localhost:5173",
    "https://film-arcs-ebqdq1rhz-patrick-carvalho-souza-s-projects.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return Response(status_code=200)

# Cria as tabelas no banco automaticamente
models.Base.metadata.create_all(bind=engine)

@app.post("/api/v1/avaliacoes/", response_model=schemas.AvaliacaoResponse)
def salvar_avaliacao(avaliacao: schemas.AvaliacaoCreate, db: Session = Depends(get_db)):
    nova_avaliacao = models.Avaliacao(**avaliacao.model_dump())
    db.add(nova_avaliacao)
    db.commit()
    db.refresh(nova_avaliacao)
    return nova_avaliacao



@app.get("/api/v1/avaliacoes/{filme_id}/media")
def obter_media(filme_id: int, db: Session = Depends(get_db)):
    # Calcula a média das notas para aquele filme
    media = db.query(
        func.avg(models.Avaliacao.nota_inicio),
        func.avg(models.Avaliacao.nota_meio),
        func.avg(models.Avaliacao.nota_fim)
    ).filter(models.Avaliacao.id_filme_tmdb == filme_id).first()
    
    # Se não houver avaliações, retorna zeros
    if not media[0]:
        return {"inicio": 0, "meio": 0, "fim": 0}
        
    return {"inicio": round(media[0], 1), "meio": round(media[1], 1), "fim": round(media[2], 1)}