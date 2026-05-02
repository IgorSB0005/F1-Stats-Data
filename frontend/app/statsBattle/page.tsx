import Image from "next/image";

import { getBattleEntities, getBattleComparison } from "@/lib/api/statsBattle";

import type {
  BattleEntity,
  BattleMetric,
  BattleMode,
} from "@/types/statsBattle";

import {
  RotateCcw,
  Trophy,
  Medal,
  TimerReset,
  ChevronRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

const metricLabels: Record<BattleMetric, string> = {
  wins: "Race Wins",
  podiums: "Podiums",
  poles: "Pole Positions",
};

function getMetricIcon(metric: BattleMetric) {
  switch (metric) {
    case "wins":
      return Trophy;

    case "podiums":
      return Medal;

    case "poles":
      return TimerReset;

    default:
      return Trophy;
  }
}

function BattleCard({
  entity,
  value,
  winner,
}: {
  entity: BattleEntity;
  value: number;
  winner: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2.5rem] border transition-all duration-700
      ${winner ? "scale-[1.02]" : "opacity-90"}`}
      style={{
        borderColor: winner
          ? `${entity.teamColor}70`
          : "rgba(255,255,255,0.08)",

        background: winner
          ? `linear-gradient(180deg, ${entity.teamColor}15 0%, rgba(255,255,255,0.03) 100%)`
          : "rgba(255,255,255,0.04)",

        boxShadow: winner ? `0 0 70px ${entity.teamColor}30` : "none",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at top, ${entity.teamColor}, transparent 60%)`,
        }}
      />

      {winner && (
        <div
          className="absolute right-6 top-6 z-20 rounded-full border px-5 py-2 backdrop-blur-xl"
          style={{
            borderColor: `${entity.teamColor}80`,
            background: `${entity.teamColor}25`,
          }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
            Winner
          </span>
        </div>
      )}

      <div className="relative flex flex-col items-center p-10">
        <div
          className="relative mb-8 flex h-[270px] w-[270px] items-center justify-center overflow-hidden rounded-[2rem] border backdrop-blur-md"
          style={{
            borderColor: `${entity.teamColor}50`,
            background: `${entity.teamColor}10`,
          }}
        >
          <Image
            src={entity.image}
            alt={entity.name}
            fill
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />

          <div
            className="absolute h-[220px] w-[220px] rounded-full blur-3xl"
            style={{
              background: `${entity.teamColor}35`,
            }}
          />
        </div>

        <h2 className="mb-2 text-center text-4xl font-black text-white">
          {entity.name}
        </h2>

        <p className="mb-10 text-sm uppercase tracking-[0.35em] text-gray-400">
          {entity.type === "driver" ? "Formula 1 Driver" : "Formula 1 Team"}
        </p>

        <div
          className="w-full rounded-[2rem] border p-8 text-center backdrop-blur-md"
          style={{
            borderColor: `${entity.teamColor}40`,
            background: `${entity.teamColor}10`,
          }}
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-400">
            Result
          </p>

          <span className="text-7xl font-black text-white">{value}</span>
        </div>
      </div>
    </div>
  );
}

export default async function StatsBattlePage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: BattleMode;
    left?: string;
    right?: string;
    metric?: BattleMetric;
  }>;
}) {
  const params = await searchParams;

  const mode: BattleMode = params.mode || "driver";

  const entities = await getBattleEntities(mode);

  const leftEntity = entities.find((e) => e.id === params.left);

  const rightEntity = entities.find((e) => e.id === params.right);

  const availableRightSide = entities.filter(
    (entity) => entity.id !== leftEntity?.id
  );

  let comparison = null;

  if (leftEntity && rightEntity && params.metric) {
    comparison = await getBattleComparison({
      leftId: leftEntity.id,
      rightId: rightEntity.id,
      metric: params.metric,
      mode,
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/anotherPic/dashBackground.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">

        <div className="mb-16 flex flex-col items-center text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.45em] text-red-500">
            Formula 1 Analytics
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            Stats Battle
          </h1>

          <div className="mt-5 h-[2px] w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        <div className="mb-14 flex justify-center">
          <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <a
              href="/statsBattle?mode=driver"
              className={`px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-300
              ${
                mode === "driver"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Drivers
            </a>

            <a
              href="/statsBattle?mode=team"
              className={`px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] transition-all duration-300
              ${
                mode === "team"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Teams
            </a>
          </div>
        </div>

        {!comparison && (
          <div className="space-y-12">
            <div className="grid gap-10 lg:grid-cols-2">

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <p className="mb-6 text-sm uppercase tracking-[0.3em] text-red-500">
                  Select First {mode === "driver" ? "Driver" : "Team"}
                </p>

                <div className="grid max-h-[700px] gap-4 overflow-y-auto pr-2">
                  {entities.map((entity) => (
                    <a
                      key={entity.id}
                      href={`?mode=${mode}&left=${entity.id}${
                        rightEntity ? `&right=${rightEntity.id}` : ""
                      }`}
                      className={`group flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300
                      ${
                        leftEntity?.id === entity.id
                          ? "border-red-500/50 bg-red-500/10"
                          : "border-white/10 bg-black/30 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div
                        className="relative h-20 w-20 overflow-hidden rounded-2xl border"
                        style={{
                          borderColor: `${entity.teamColor}60`,
                          background: `${entity.teamColor}10`,
                        }}
                      >
                        <Image
                          src={entity.image}
                          alt={entity.name}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {entity.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {entity.country}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <p className="mb-6 text-sm uppercase tracking-[0.3em] text-red-500">
                  Select Second {mode === "driver" ? "Driver" : "Team"}
                </p>

                <div className="grid max-h-[700px] gap-4 overflow-y-auto pr-2">
                  {availableRightSide.map((entity) => (
                    <a
                      key={entity.id}
                      href={`?mode=${mode}&left=${leftEntity?.id || ""}&right=${
                        entity.id
                      }`}
                      className={`group flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300
                      ${
                        rightEntity?.id === entity.id
                          ? "border-red-500/50 bg-red-500/10"
                          : "border-white/10 bg-black/30 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div
                        className="relative h-20 w-20 overflow-hidden rounded-2xl border"
                        style={{
                          borderColor: `${entity.teamColor}60`,
                          background: `${entity.teamColor}10`,
                        }}
                      >
                        <Image
                          src={entity.image}
                          alt={entity.name}
                          fill
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {entity.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {entity.country}
                        </p>
                      </div>

                      <ChevronRight className="h-5 w-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {leftEntity && rightEntity && (
              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md">
                <div className="mb-10 text-center">
                  <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-500">
                    Comparison Metric
                  </p>

                  <h2 className="text-4xl font-black text-white">
                    Choose Statistic
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {(Object.keys(metricLabels) as BattleMetric[]).map(
                    (metric) => {
                      const Icon = getMetricIcon(metric);

                      return (
                        <a
                          key={metric}
                          href={`?mode=${mode}&left=${leftEntity.id}&right=${rightEntity.id}&metric=${metric}`}
                          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-8 transition-all duration-500 hover:border-red-500/40 hover:bg-red-500/10"
                        >
                          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-red-500/10 blur-3xl transition-all duration-500 group-hover:bg-red-500/20" />

                          <Icon className="mb-6 h-12 w-12 text-red-500" />

                          <h3 className="text-2xl font-black text-white">
                            {metricLabels[metric]}
                          </h3>
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {comparison && leftEntity && rightEntity && (
          <div className="space-y-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <BattleCard
                entity={leftEntity}
                value={comparison.leftValue}
                winner={comparison.winner === leftEntity.id}
              />

              <BattleCard
                entity={rightEntity}
                value={comparison.rightValue}
                winner={comparison.winner === rightEntity.id}
              />
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-md">
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-500">
                Battle Result
              </p>

              <h2 className="mb-4 text-5xl font-black text-white">
                {comparison.winner === leftEntity.id
                  ? leftEntity.name
                  : rightEntity.name}{" "}
                Wins
              </h2>

              <p className="text-lg text-gray-400">
                Better result in{" "}
                <span className="font-semibold text-white">
                  {metricLabels[params.metric as BattleMetric]}
                </span>
              </p>

              <a
                href="/statsBattle"
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-500/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-red-500"
              >
                <RotateCcw className="h-5 w-5" />
                Reset Battle
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
