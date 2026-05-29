from pydantic import BaseModel

class AvaliacaoCreate(BaseModel):
    id_filme_tmdb: int
    nota_inicio: float
    nota_meio: float
    nota_fim: float

class AvaliacaoResponse(AvaliacaoCreate):
    id: int
    class Config:
        from_attributes = True