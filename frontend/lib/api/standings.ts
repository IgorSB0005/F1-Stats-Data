import { StandingsDiplay } from "@/types/standings";

function getStatsApiBase() {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.STATS_SERVICE_URL || process.env.NEXT_PUBLIC_STATS_SERVICE_URL
      : process.env.NEXT_PUBLIC_STATS_SERVICE_URL || process.env.STATS_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("STATS service URL is not configured");
  }

  return baseUrl;
}

export async function getDriverStandings(): Promise<StandingsDiplay[]> {
  try {
    const res = await fetch(`${getStatsApiBase()}/standings`, {
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
