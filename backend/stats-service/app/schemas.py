from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class StandingsBase(BaseModel):
    position: int
    driver_name: str
    constructor: str
    points: float

class Standings(StandingsBase):
    id: UUID
    updated_at: datetime

    class Config:
        from_attributes = True