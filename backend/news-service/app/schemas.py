from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from uuid import UUID

class NewsBase(BaseModel):
    title: str
    content: str
    source_url: Optional[str] = None
    image_url: Optional[str] = None
    tags: List[str] = []

class News(NewsBase):
    id: UUID
    published_at: datetime

    class Config:
        from_attributes = True