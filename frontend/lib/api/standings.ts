import { StandingsDiplay } from "@/types/standings";

const API_URL = process.env.STATS_SERVICE_URL;

export async function getDriverStandings(): Promise<StandingsDiplay[]> {
  try {
    const res = await fetch(`${API_URL}/standings`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch standings");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Standings API error:", error);
    return [];
  }
}
