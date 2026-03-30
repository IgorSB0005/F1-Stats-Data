from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from apscheduler.schedulers.background import BackgroundScheduler
from .database import SessionLocal, engine, get_db, Base
from .sync_news import sync_f1_news
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="F1 News Service")

def scheduled_sync():
    db = SessionLocal()
    try:
        sync_f1_news(db)
    finally:
        db.close()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scheduler = BackgroundScheduler()
scheduler.add_job(scheduled_sync, 'interval', minutes=60)
scheduler.add_job(scheduled_sync)
scheduler.start()

@app.get("/news", response_model=List[schemas.News])
def read_news(db: Session = Depends(get_db)):
    return crud.get_news(db)
