import os
import requests
import uuid
from sqlalchemy.orm import Session
from .models import NewsModel
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NEWS_API_KEY")
API_NEWS_URL = os.getenv("NEWS_API_URL")

params = {
    'q': '"Formula 1" OR "F1" OR "Grand Prix"',
    'language': 'en',
    'sortBy': 'publishedAt',
    'pageSize': 30,
    'apiKey': API_KEY
}

def sync_f1_news(db: Session):
    db.query(NewsModel).delete()
    db.commit()
    try:
        response = requests.get(API_NEWS_URL, params=params)
        response.raise_for_status()
        articles = response.json().get("articles", [])
    except Exception as e:
        print(f"Error fetching news: {e}")
        return

    new_records = []
    for art in articles:
        if art["description"] is None:
            continue

        new_news = NewsModel(
            id=uuid.uuid4(),
            title=art.get("title"),
            content=art.get("description"),
            source_url=art.get("url"),
            image_url=art.get("urlToImage"),
            tags=["F1", "GeneralNews"],
            published_at=art.get("publishedAt")
        )
        new_records.append(new_news)

    db.add_all(new_records)
    db.commit()