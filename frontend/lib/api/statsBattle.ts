import type {
  BattleEntity,
  BattleMetric,
  BattleMode,
  ComparisonResponse,
} from "@/types/statsBattle";

const drivers: BattleEntity[] = [
  {
    id: "max_verstappen",
    name: "Max Verstappen",
    image: "/drivers/verstappenPP.webp",
    country: "Netherlands",
    type: "driver",
    teamColor: "#1E5BC6",
  },
  {
    id: "isack_hadjar",
    name: "Isack Hadjar",
    image: "/drivers/hadjarPP.webp",
    country: "France",
    type: "driver",
    teamColor: "#1E5BC6",
  },
  {
    id: "leclerc",
    name: "Charles Leclerc",
    image: "/drivers/leclercPP.webp",
    country: "Monaco",
    type: "driver",
    teamColor: "#DC0000",
  },
  {
    id: "hamilton",
    name: "Lewis Hamilton",
    image: "/drivers/hamiltonPP.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#DC0000",
  },
  {
    id: "russell",
    name: "George Russell",
    image: "/drivers/russellPP.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#00D2BE",
  },
  {
    id: "antonelli",
    name: "Kimi Antonelli",
    image: "/drivers/antonelliPP.webp",
    country: "Italy",
    type: "driver",
    teamColor: "#00D2BE",
  },
  {
    id: "norris",
    name: "Lando Norris",
    image: "/drivers/norrisPP.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#FF8700",
  },
  {
    id: "piastri",
    name: "Oscar Piastri",
    image: "/drivers/piastriPP.webp",
    country: "Australia",
    type: "driver",
    teamColor: "#FF8700",
  },
  {
    id: "alonso",
    name: "Fernando Alonso",
    image: "/drivers/alonsoPP.webp",
    country: "Spain",
    type: "driver",
    teamColor: "#006F62",
  },
  {
    id: "stroll",
    name: "Lance Stroll",
    image: "/drivers/strollPP.webp",
    country: "Canada",
    type: "driver",
    teamColor: "#006F62",
  },
  {
    id: "gasly",
    name: "Pierre Gasly",
    image: "/drivers/gaslyPP.webp",
    country: "France",
    type: "driver",
    teamColor: "#0090FF",
  },
  {
    id: "colapinto",
    name: "Franco Colapinto",
    image: "/drivers/colapintoPP.webp",
    country: "Argentina",
    type: "driver",
    teamColor: "#0090FF",
  },
  {
    id: "ocon",
    name: "Esteban Ocon",
    image: "/drivers/oconPP.webp",
    country: "France",
    type: "driver",
    teamColor: "#B6BABD",
  },
  {
    id: "bearman",
    name: "Oliver Bearman",
    image: "/drivers/bearmanPP.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#B6BABD",
  },
  {
    id: "lawson",
    name: "Liam Lawson",
    image: "/drivers/lawsonPP.webp",
    country: "New Zealand",
    type: "driver",
    teamColor: "#6692FF",
  },
  {
    id: "lindblad",
    name: "Arvid Lindblad",
    image: "/drivers/lindbladPP.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#6692FF",
  },
  {
    id: "albon",
    name: "Alexander Albon",
    image: "/drivers/albonPP.webp",
    country: "Thailand",
    type: "driver",
    teamColor: "#005AFF",
  },
  {
    id: "sainz",
    name: "Carlos Sainz",
    image: "/drivers/sainzPP.webp",
    country: "Spain",
    type: "driver",
    teamColor: "#005AFF",
  },
  {
    id: "hulkenberg",
    name: "Nico Hulkenberg",
    image: "/drivers/hulkenbergPP.webp",
    country: "Germany",
    type: "driver",
    teamColor: "#00A19B",
  },
  {
    id: "bortoleto",
    name: "Gabriel Bortoleto",
    image: "/drivers/bortoletoPP.webp",
    country: "Brazil",
    type: "driver",
    teamColor: "#00A19B",
  },
  {
    id: "perez",
    name: "Sergio Perez",
    image: "/drivers/perezPP.webp",
    country: "Mexico",
    type: "driver",
    teamColor: "#6E4C1E",
  },
  {
    id: "bottas",
    name: "Valtteri Bottas",
    image: "/drivers/bottasPP.webp",
    country: "Finland",
    type: "driver",
    teamColor: "#6E4C1E",
  },
];

const teams: BattleEntity[] = [
  {
    id: "mclaren",
    name: "McLaren",
    image: "/teams/mclarenLogo.svg",
    country: "United Kingdom",
    type: "team",
    teamColor: "#FF8700",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    image: "/teams/ferrariLogo.svg",
    country: "Italy",
    type: "team",
    teamColor: "#DC0000",
  },
  {
    id: "mercedes",
    name: "Mercedes",
    image: "/teams/mercedesLogo.svg",
    country: "Germany",
    type: "team",
    teamColor: "#00D2BE",
  },
  {
    id: "redbull",
    name: "Red Bull Racing",
    image: "/teams/redbullLogo.svg",
    country: "Austria",
    type: "team",
    teamColor: "#1E5BC6",
  },
  {
    id: "astonmartin",
    name: "Aston Martin",
    image: "/teams/astonmartinLogo.svg",
    country: "United Kingdom",
    type: "team",
    teamColor: "#006F62",
  },
  {
    id: "alpine",
    name: "Alpine",
    image: "/teams/aplineLogo.svg",
    country: "France",
    type: "team",
    teamColor: "#0090FF",
  },
  {
    id: "haas",
    name: "Haas",
    image: "/teams/haasLogo.svg",
    country: "United States",
    type: "team",
    teamColor: "#B6BABD",
  },
  {
    id: "racingbulls",
    name: "Racing Bulls",
    image: "/teams/rbLogo.svg",
    country: "Italy",
    type: "team",
    teamColor: "#6692FF",
  },
  {
    id: "williams",
    name: "Williams",
    image: "/teams/williamsLogo.svg",
    country: "United Kingdom",
    type: "team",
    teamColor: "#005AFF",
  },
  {
    id: "audi",
    name: "Audi",
    image: "/teams/audiLogo.svg.png",
    country: "Germany",
    type: "team",
    teamColor: "#00A19B",
  },
  {
    id: "cadillac",
    name: "Cadillac",
    image: "/teams/cadillacLogo.svg",
    country: "United States",
    type: "team",
    teamColor: "#6E4C1E",
  },
];

export async function getBattleEntities(
  mode: BattleMode
): Promise<BattleEntity[]> {
  return mode === "driver" ? drivers : teams;
}

export async function getBattleComparison({
  leftId,
  rightId,
  metric,
  mode,
}: {
  leftId: string;
  rightId: string;
  metric: BattleMetric;
  mode: BattleMode;
}): Promise<ComparisonResponse> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.STATS_SERVICE_URL
      : process.env.NEXT_PUBLIC_STATS_SERVICE_URL;

  if (!baseUrl) {
    throw new Error("STATS service URL is not configured");
  }

  const response = await fetch(
    `${baseUrl}/stats/battle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        leftId,
        rightId,
        metric,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comparison");
  }

  return response.json();
}
