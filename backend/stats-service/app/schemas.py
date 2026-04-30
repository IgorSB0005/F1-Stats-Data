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

class RaceBase(BaseModel):
    official_name: str
    location: str
    country: str
    date_start: datetime
    date_end: datetime
    track_image: str
    country_flag: str

class Race(RaceBase):
    id: UUID
    class Config:
        from_attributes = True