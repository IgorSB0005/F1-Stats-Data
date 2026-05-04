export type BattleMode = "driver" | "team";

export type BattleMetric = "wins" | "podiums" | "poles";

export interface BattleEntity {
  id: string;

  name: string;

  image: string;

  country: string;

  type: BattleMode;

  teamColor: string;
}

export interface ComparisonResponse {
  leftValue: number;

  rightValue: number;


  winner: string;
}
