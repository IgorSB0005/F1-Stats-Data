import type { RaceWeekend } from "@/types/schedule";

const SCHEDULE_API_URL = "http://localhost:8001";

export async function getSeasonSchedule(): Promise<RaceWeekend[]> {
  const response = await fetch(`${SCHEDULE_API_URL}/schedule`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("cant resolve season schedule");
  }

  const data = await response.json();

  const racesArray: RaceWeekend[] = Array.isArray(data) ? data : [];

  return racesArray;
}
