import type { RaceWeekend } from "@/types/schedule";

function getStatsApiBase() {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.STATS_SERVICE_URL
      : process.env.NEXT_PUBLIC_STATS_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("STATS service URL is not configured");
  }

  return baseUrl;
}

export async function getSeasonSchedule(): Promise<RaceWeekend[]> {
  const response = await fetch(`${getStatsApiBase()}/schedule`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("cant resolve season schedule");
  }

  const data = await response.json();

  const racesArray: RaceWeekend[] = Array.isArray(data) ? data : [];

  return racesArray;
}
