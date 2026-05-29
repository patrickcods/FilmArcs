from sqlalchemy import Column, Integer, Float
from database import Base

class Avaliacao(Base):
    __tablename__ = "avaliacoes"

    id = Column(Integer, primary_key=True, index=True)
    id_filme_tmdb = Column(Integer, index=True)
    nota_inicio = Column(Float)
    nota_meio = Column(Float)
    nota_fim = Column(Float)