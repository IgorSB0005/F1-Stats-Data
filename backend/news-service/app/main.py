from fastapi import FastAPI, Depends, Query
from typing import List
import schemas, crud

app = FastAPI(title="F1 News Service")

@app.get("/news", response_model=List[schemas.News], tags=["News"])
def get_all_news(
    skip: int = 0, 
    limit: int = 10,
    tag: str = Query(None, description="filter tag")
):
    return crud.get_news(skip=skip, limit=limit, tag=tag)