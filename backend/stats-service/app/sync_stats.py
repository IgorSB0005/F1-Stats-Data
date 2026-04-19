import os
import requests
import uuid
from sqlalchemy.orm import Session
from .models import StandingsModel

API_STATS_URL = os.getenv("STATS_API_URL")

def sync_f1_standings(db: Session):
    url = f"{API_STATS_URL}/current/driverStandings.json"

    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()

        standings_lists = data.get('MRData', {}).get('StandingsTable', {}).get('StandingsLists', [])

        if not standings_lists:
            print("Empty standings list.")
            return

        current_list = standings_lists[0].get('DriverStandings', [])

    except Exception as e:
        print(f"Error fetching stats: {e}")
        return

    db.query(StandingsModel).delete()
    db.commit()

    new_records = []
    for entry in current_list:
        driver = entry.get('Driver', {})
        name = f"{driver.get('givenName')} {driver.get('familyName')}"

        constructors = entry.get('Constructors', [])
        constructor_name = constructors[0].get('name')

        new_record = StandingsModel(
            id=uuid.uuid4(),
            position=int(entry.get('position', 0)),
            driver_name=name,
            constructor=constructor_name,
            points=float(entry.get('points', 0))
        )
        new_records.append(new_record)

    db.add_all(new_records)
    db.commit()