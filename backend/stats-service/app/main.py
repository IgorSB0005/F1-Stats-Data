from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
from apscheduler.schedulers.background import BackgroundScheduler

from .schemas import BattleRequest, BattleResponse
from .battle import fetch_entity_stats

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc: HTTPException):
    if isinstance(exc.detail, dict) and "detail" in exc.detail and "code" in exc.detail:
        payload = exc.detail
    else:
        payload = {"detail": str(exc.detail), "code": "http_error"}

    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_, __):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Invalid request data", "code": "validation_error"},
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


@app.post("/stats/battle", response_model=schemas.BattleResponse)
def compare_entities(request: schemas.BattleRequest):
    left_data = fetch_entity_stats(request.mode, request.leftId, request.metric)
    right_data = fetch_entity_stats(request.mode, request.rightId, request.metric)

    left_val = left_data.get(request.metric, 0)
    right_val = right_data.get(request.metric, 0)

    if left_val > right_val:
        winner = request.leftId
    elif right_val > left_val:
        winner = request.rightId
    else:
        winner = "draw"

    return {
        "leftValue": left_val,
        "rightValue": right_val,
        "winner": winner
    }