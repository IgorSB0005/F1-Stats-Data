
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
    image: "/images/drivers/verstappen.webp",
    country: "Netherlands",
    type: "driver",
    teamColor: "#1E5BC6",
  },

  {
    id: "isack_hadjar",
    name: "Isack Hadjar",
    image: "/images/drivers/hadjar.webp",
    country: "France",
    type: "driver",
    teamColor: "#1E5BC6",
  },

  {
    id: "leclerc",
    name: "Charles Leclerc",
    image: "/images/drivers/leclerc.webp",
    country: "Monaco",
    type: "driver",
    teamColor: "#DC0000",
  },

  {
    id: "hamilton",
    name: "Lewis Hamilton",
    image: "/images/drivers/hamilton.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#00D2BE",
  },

  {
    id: "russell",
    name: "George Russell",
    image: "/images/drivers/russell.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#00D2BE",
  },

  {
    id: "antonelli",
    name: "Kimi Antonelli",
    image: "/images/drivers/antonelli.webp",
    country: "Italy",
    type: "driver",
    teamColor: "#00D2BE",
  },

  {
    id: "norris",
    name: "Lando Norris",
    image: "/images/drivers/norris.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#FF8700",
  },

  {
    id: "piastri",
    name: "Oscar Piastri",
    image: "/images/drivers/piastri.webp",
    country: "Australia",
    type: "driver",
    teamColor: "#FF8700",
  },

  {
    id: "alonso",
    name: "Fernando Alonso",
    image: "/images/drivers/alonso.webp",
    country: "Spain",
    type: "driver",
    teamColor: "#006F62",
  },

  {
    id: "stroll",
    name: "Lance Stroll",
    image: "/images/drivers/stroll.webp",
    country: "Canada",
    type: "driver",
    teamColor: "#006F62",
  },

  {
    id: "gasly",
    name: "Pierre Gasly",
    image: "/images/drivers/gasly.webp",
    country: "France",
    type: "driver",
    teamColor: "#0090FF",
  },

  {
    id: "colapinto",
    name: "Franco Colapinto",
    image: "/images/drivers/colapinto.webp",
    country: "Argentina",
    type: "driver",
    teamColor: "#0090FF",
  },

  {
    id: "ocon",
    name: "Esteban Ocon",
    image: "/images/drivers/ocon.webp",
    country: "France",
    type: "driver",
    teamColor: "#B6BABD",
  },

  {
    id: "bearman",
    name: "Oliver Bearman",
    image: "/images/drivers/bearman.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#B6BABD",
  },

  {
    id: "lawson",
    name: "Liam Lawson",
    image: "/images/drivers/lawson.webp",
    country: "New Zealand",
    type: "driver",
    teamColor: "#6692FF",
  },

  {
    id: "lindblad",
    name: "Arvid Lindblad",
    image: "/images/drivers/lindblad.webp",
    country: "United Kingdom",
    type: "driver",
    teamColor: "#6692FF",
  },

  {
    id: "albon",
    name: "Alexander Albon",
    image: "/images/drivers/albon.webp",
    country: "Thailand",
    type: "driver",
    teamColor: "#005AFF",
  },

  {
    id: "sainz",
    name: "Carlos Sainz",
    image: "/images/drivers/sainz.webp",
    country: "Spain",
    type: "driver",
    teamColor: "#005AFF",
  },

  {
    id: "hulkenberg",
    name: "Nico Hulkenberg",
    image: "/images/drivers/hulkenberg.webp",
    country: "Germany",
    type: "driver",
    teamColor: "#00A19B",
  },

  {
    id: "bortoleto",
    name: "Gabriel Bortoleto",
    image: "/images/drivers/bortoleto.webp",
    country: "Brazil",
    type: "driver",
    teamColor: "#00A19B",
  },

  {
    id: "perez",
    name: "Sergio Perez",
    image: "/images/drivers/perez.webp",
    country: "Mexico",
    type: "driver",
    teamColor: "#6E4C1E",
  },

  {
    id: "bottas",
    name: "Valtteri Bottas",
    image: "/images/drivers/bottas.webp",
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
  const response = await fetch(`${process.env.API_URL}/stats/battle`, {
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
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comparison");
  }

  return response.json();


}
