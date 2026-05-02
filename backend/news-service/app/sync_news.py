import os
import re
import requests
import uuid
from sqlalchemy.orm import Session
from .models import NewsModel
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NEWS_API_KEY")
API_NEWS_URL = os.getenv("NEWS_API_URL")

params = {
    "q": '"Formula 1" OR "F1" OR "Grand Prix"',
    "language": "en",
    "sortBy": "publishedAt",
    "pageSize": 30,
    "apiKey": API_KEY,
}

PRIMARY_KEYWORDS = [
    "formula 1",
    "formula one",
    "grand prix",
    "paddock",
    "pit lane",
    "fia",
]

TEAM_KEYWORDS = [
    "ferrari",
    "mercedes",
    "red bull",
    "mclaren",
    "aston martin",
    "alpine",
    "williams",
    "haas",
    "sauber",
    "kick sauber",
    "racing bulls",
    "rb",
    "audi",
    "cadillac",
]

DRIVER_KEYWORDS = [
    "verstappen",
    "hamilton",
    "leclerc",
    "sainz",
    "norris",
    "piastri",
    "russell",
    "antonelli",
    "alonso",
    "stroll",
    "gasly",
    "ocon",
    "hulkenberg",
    "bottas",
    "zhou",
    "ricciardo",
    "tsunoda",
    "lawson",
    "bearman",
    "hadjar",
    "colapinto",
]

EXCLUSION_KEYWORDS = [
    "motogp",
    "moto gp",
    "indycar",
    "nascar",
    "wrc",
    "wec",
    "formula e",
    "formula 2",
    "formula 3",
    "imsa",
    "super gt",
    "dtm",
]

TEAM_TAGS = {
    "Ferrari": ["ferrari"],
    "Mercedes": ["mercedes"],
    "Red Bull": ["red bull"],
    "McLaren": ["mclaren"],
    "Aston Martin": ["aston martin"],
    "Alpine": ["alpine"],
    "Williams": ["williams"],
    "Haas": ["haas"],
    "Sauber": ["sauber", "kick sauber"],
    "Racing Bulls": ["racing bulls", "rb"],
    "Audi": ["audi"],
    "Cadillac": ["cadillac"],
}


def normalize_text(value: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9\s]", " ", value.lower())
    return re.sub(r"\s+", " ", cleaned).strip()


def is_f1_related(text: str) -> bool:
    if not text:
        return False

    has_f1_keyword = any(keyword in text for keyword in PRIMARY_KEYWORDS)
    has_f1_short = re.search(r"\bf1\b", text) is not None
    has_team = any(keyword in text for keyword in TEAM_KEYWORDS)
    has_driver = any(keyword in text for keyword in DRIVER_KEYWORDS)

    if not (has_f1_keyword or has_f1_short or has_team or has_driver):
        return False

    has_exclusion = any(keyword in text for keyword in EXCLUSION_KEYWORDS)

    if has_exclusion and not (has_f1_keyword or has_f1_short or has_team):
        return False

    return True


def extract_tags(text: str) -> list[str]:
    tags = ["F1"]

    if "formula 1" in text or "formula one" in text or re.search(r"\bf1\b", text):
        tags.append("Formula1")

    for tag, keywords in TEAM_TAGS.items():
        if any(keyword in text for keyword in keywords):
            tags.append(tag)

    return sorted(set(tags))


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
        title = art.get("title")
        description = art.get("description")
        content = art.get("content")
        source_name = (art.get("source") or {}).get("name")

        if not title or not description:
            continue

        text_blob = normalize_text(
            " ".join([title, description, content or "", source_name or ""]).strip()
        )

        if not is_f1_related(text_blob):
            continue

        new_news = NewsModel(
            id=uuid.uuid4(),
            title=title,
            content=description,
            source_url=art.get("url"),
            image_url=art.get("urlToImage"),
            tags=extract_tags(text_blob),
            published_at=art.get("publishedAt"),
        )

        new_records.append(new_news)

    if not new_records:
        return

    db.add_all(new_records)
    db.commit()