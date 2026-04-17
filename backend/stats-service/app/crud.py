from sqlalchemy.orm import Session
from .models import StandingsModel

def get_standings(db: Session):
    return db.query(StandingsModel).order_by(StandingsModel.position.asc()).all()