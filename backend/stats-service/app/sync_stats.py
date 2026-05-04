import os
import requests
import uuid
from sqlalchemy.orm import Session
from .models import StandingsModel, RaceCalendarModel
from datetime import datetime, timedelta
from urllib.parse import quote

API_STATS_URL = os.getenv("STATS_API_URL")
API_SCHEDULE_URL = os.getenv("SCHEDULE_API_URL")

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

def sync_f1_calendar(db: Session):
    current_year = datetime.now().year
    url = f"{API_SCHEDULE_URL}/meetings?year={current_year}"
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        meetings = response.json()
    except requests.HTTPError as e:
        status = getattr(e.response, "status_code", None)
        if status in {401, 403}:
            meetings = []
        else:
            print(f"Error fetching calendar: {e}")
            return
    except Exception as e:
        print(f"Error fetching calendar: {e}")
        return

    db.query(RaceCalendarModel).delete()
    db.commit()

    new_races = []
    for race in meetings:
        raw_track_url = race.get('circuit_image')
        raw_flag_url = race.get('country_flag')

        fixed_track_url = raw_track_url.replace(" ", "%20")
        fixed_flag_url = raw_flag_url.replace(" ", "%20")

        new_races.append(RaceCalendarModel(
            id=uuid.uuid4(),
            official_name=race.get('meeting_official_name'),
            location=race.get('location'),
            country=race.get('country_name'),
            date_start=datetime.fromisoformat(race['date_start'].replace('Z', '')),
            date_end=datetime.fromisoformat(race['date_end'].replace('Z', '')),
            track_image=fixed_track_url,
            country_flag=fixed_flag_url
        ))

    db.add_all(new_races)
    db.commit()