from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from apscheduler.schedulers.background import BackgroundScheduler

from .database import SessionLocal, engine, get_db, Base
from .sync_stats import sync_f1_standings, sync_f1_calendar
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="F1 Stats Service")

def full_sync():
    db = SessionLocal()
    try:
        sync_f1_standings(db)
        sync_f1_calendar(db)
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
scheduler.add_job(full_sync, 'interval', minutes=60)
scheduler.add_job(full_sync)
scheduler.start()

@app.get("/standings", response_model=List[schemas.Standings])
def read_standings(db: Session = Depends(get_db)):
    return crud.get_standings(db)

@app.get("/schedule", response_model=List[schemas.Race])
def read_calendar(db: Session = Depends(get_db)):
    return db.query(models.RaceCalendarModel).order_by(models.RaceCalendarModel.date_start.asc()).all()