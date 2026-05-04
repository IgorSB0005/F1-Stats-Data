from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
scheduler.add_job(scheduled_sync, 'interval', minutes=60)
scheduler.add_job(scheduled_sync)
scheduler.start()

@app.get("/news", response_model=List[schemas.News])
def read_news(
    db: Session = Depends(get_db),
    limit: int = Query(default=20, ge=1, le=50),
):
    return crud.get_news(db, limit=limit)
