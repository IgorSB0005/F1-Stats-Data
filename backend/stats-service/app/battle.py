import requests
import os

API_STATS_URL = os.getenv("STATS_API_URL")

def fetch_entity_stats(mode: str, entity_id: str, metric: str):
    api_mode = "drivers" if mode == "driver" else "constructors"
    base_url = f"{API_STATS_URL}/{api_mode}/{entity_id}"

    def get_total_count(path_suffix):
        try:
            url = f"{base_url}/{path_suffix}.json?limit=1"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                return int(response.json()['MRData']['total'])
            return 0
        except Exception as e:
            print(f"Error for {entity_id}: {e}")
            return 0

    stats = {
        "id": entity_id,
        "name": entity_id.replace('_', ' ').title(),
    }

    if metric == "wins":
        stats["wins"] = get_total_count("results/1")

    elif metric == "podiums":
        w = get_total_count("results/1")
        p2 = get_total_count("results/2")
        p3 = get_total_count("results/3")
        stats["podiums"] = w + p2 + p3

    elif metric == "poles":
        stats["poles"] = get_total_count("grid/1/results")

    return stats