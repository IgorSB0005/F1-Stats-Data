from sqlalchemy.orm import Session
from .models import NewsModel
from .schemas import NewsBase

def get_news(db: Session, limit: int | None = None):
    query = db.query(NewsModel).order_by(NewsModel.published_at.desc())

    if limit:
        query = query.limit(limit)

    return query.all()

def create_news(db: Session, news: NewsBase):
    db_news = NewsModel(**news.dict())
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news