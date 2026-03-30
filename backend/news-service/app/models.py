from .database import Base
from sqlalchemy import Column, String, Text, DateTime, ARRAY
from sqlalchemy.dialects.postgresql import UUID
import uuid
import datetime

class NewsModel(Base):
    __tablename__ = "news"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    source_url = Column(String)
    image_url = Column(String)
    tags = Column(ARRAY(String))
    published_at = Column(DateTime, default=datetime.datetime.utcnow)