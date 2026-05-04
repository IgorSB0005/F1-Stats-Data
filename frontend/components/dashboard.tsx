import { NewsSection } from "./news/newsSection";
import Image from "next/image";
import StandingsSection from "@/components/standings/standingsSection";
import StandingsSkeleton from "@/components/standings/standingsSkeleton";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/anotherPic/dashBackground.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-red-500">
            Formula 1 Hub
          </p>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
            Home Base
          </h1>
          <div className="mt-5 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <p className="mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
            Latest headlines, live standings, and the fastest way to stay in sync
            with the season.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/45" />
            <div className="relative p-8 sm:p-10">
              <div className="mb-8 flex items-center justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                    Newswire
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    F1 Headlines
                  </h2>
                </div>
              </div>
              <NewsSection />
            </div>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-80" />
          </section>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/45" />
            <div className="relative p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                Championship
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Driver Standings
              </h2>
              <div className="mt-8 max-h-[720px] overflow-y-auto pr-2">
                <Suspense fallback={<StandingsSkeleton />}>
                  <StandingsSection />
                </Suspense>
                <div className="pointer-events-none sticky bottom-0 h-6 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </div>
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-80" />
          </section>
        </div>
      </div>
    </div>
  );
}
