import Image from "next/image";
import type { RaceWeekend } from "@/types/schedule";
import { getSeasonSchedule } from "@/lib/api/schedule";
import { formatRaceDate } from "@/lib/formatDate";

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
  const races: RaceWeekend[] = await getSeasonSchedule();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/anotherPic/dashBackground.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center justify-center text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-red-500">
            Formula 1 Season
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            Race Schedule
          </h1>

          <div className="mt-5 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        <div className="flex flex-col gap-12">
          {races.map((race, index) => (
            <div
              key={`${race.official_name}-${index}`}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08]

              ${index % 2 === 0 ? "lg:ml-0 lg:mr-24" : "lg:ml-24 lg:mr-0"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />

              <div className="relative grid min-h-[500px] grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col justify-between p-8 sm:p-12">
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-2xl font-black text-white shadow-lg shadow-red-500/30">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                          Round
                        </p>

                        <h2 className="text-3xl font-bold text-white sm:text-5xl">
                          {race.official_name}
                        </h2>
                      </div>
                    </div>

                    <div className="mb-8 flex items-center gap-4">
                      <div className="relative h-10 w-14 overflow-hidden rounded-md border border-white/20">
                        <Image
                          src={race.country_flag}
                          alt={race.country}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-white">
                          {race.country}
                        </p>

                        <p className="text-sm text-gray-400">{race.location}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-red-500">
                          Race Weekend
                        </p>

                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-white">
                            {formatRaceDate(race.date_start)}
                          </span>

                          <div className="h-[2px] w-10 bg-red-500" />

                          <span className="text-3xl font-black text-white">
                            {formatRaceDate(race.date_end)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />

                    <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                      Formula One World Championship
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-l" />

                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-sm">
                    <Image
                      src={race.track_image}
                      alt={race.official_name}
                      width={600}
                      height={600}
                      className="w-[85%] object-contain opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute h-[300px] w-[300px] rounded-full bg-red-500/10 blur-3xl" />
                  </div>
                </div>
              </div>

              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
