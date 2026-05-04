from .database import Base
from sqlalchemy import Column, String, Float, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
import datetime

class StandingsModel(Base):
    __tablename__ = "driver_standings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    position = Column(Integer, nullable=False)
    driver_name = Column(String, nullable=False)
    constructor = Column(String, nullable=False)
    points = Column(Float, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

class RaceCalendarModel(Base):
    __tablename__ = "race_calendar"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    official_name = Column(String, nullable=False)
    location = Column(String)
    country = Column(String)
    date_start = Column(DateTime)
    date_end = Column(DateTime)
    track_image = Column(String)
    country_flag = Column(String)