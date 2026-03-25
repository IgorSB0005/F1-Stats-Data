from pydantic import BaseModel
from typing import List
from datetime import datetime

class News(BaseModel):
    id: str
    title: str
    content: str
    tags: List[str]
    published_at: datetime

    class Config:
        from_attributes = True