import Image from "next/image";

export const dynamic = "force-dynamic";

const timeline = [
  {
    year: "1950",
    title: "The Beginning of Formula 1",
    description:
      "The first official Formula 1 World Championship season began in 1950. Silverstone hosted the opening race, marking the birth of the most prestigious motorsport category in the world.",
    image: "/history/historyTimeline1.avif",
  },
  {
    year: "1968",
    title: "The Era of Sponsorship & Innovation",
    description:
      "Formula 1 teams started introducing sponsor liveries, transforming the sport visually and commercially. Aerodynamics and engineering innovation rapidly became the key to success.",
    image: "/history/historyTimeline2.avif",
  },
  {
    year: "1988",
    title: "McLaren Dominance",
    description:
      "The legendary McLaren MP4/4 became one of the most dominant cars in F1 history, winning 15 out of 16 races during the season.",
    image: "/history/historyTimeline3.webp",
  },
  {
    year: "2004",
    title: "Schumacher's Record Season",
    description:
      "Michael Schumacher secured his seventh world championship and delivered one of the most dominant seasons ever seen in Formula 1.",
    image: "/history/historyTimeline4.jpg",
  },
  {
    year: "2021",
    title: "A New Generation",
    description:
      "One of the most dramatic title battles in Formula 1 history introduced a new generation of fans and reignited global interest in the sport.",
    image: "/history/historyTimeline5.avif",
  },
];

const records = [
  {
    value: "7",
    title: "Most World Championships",
    subtitle: "Michael Schumacher / Lewis Hamilton",
  },
  {
    value: "105+",
    title: "Most Grand Prix Wins",
    subtitle: "Lewis Hamilton",
  },
  {
    value: "263 MPH",
    title: "Highest Recorded Speed",
    subtitle: "Valtteri Bottas — Mexico",
  },
  {
    value: "15 / 16",
    title: "Most Wins in a Season",
    subtitle: "McLaren MP4/4 — 1988",
  },
];

const legendaryTeams = [
  {
    name: "Ferrari",
    years: "1950 — Present",
  },
  {
    name: "McLaren",
    years: "1966 — Present",
  },
  {
    name: "Williams",
    years: "1977 — Present",
  },
  {
    name: "Mercedes",
    years: "1954 — Present",
  },
];

export default function HistoryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/anotherPic/dashBackground.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,0,0.15),transparent_35%)]" />

      <div className="relative z-10 mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="relative mb-24 overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />

          <div className="relative grid min-h-[700px] grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 sm:p-16">
              <p className="mb-4 text-sm uppercase tracking-[0.4em] text-red-500">
                Formula 1 Legacy
              </p>

              <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                The History Of Motorsport Excellence
              </h1>

              <div className="mt-6 h-[2px] w-40 bg-gradient-to-r from-red-500 to-transparent" />

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300">
                More than just racing — Formula 1 is a constantly evolving story
                of engineering breakthroughs, legendary rivalries and historic
                moments that shaped modern motorsport.
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <div className="rounded-3xl border border-white/10 bg-black/30 px-6 py-5 transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08] hover:-translate-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                    Since
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-white">1950</h3>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 px-6 py-5 transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08] hover:-translate-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                    Grand Prix
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-white">1100+</h3>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 px-6 py-5 transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08] hover:-translate-y-1">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                    Legendary Teams
                  </p>

                  <h3 className="mt-2 text-4xl font-black text-white">70+</h3>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-l" />

              <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20 backdrop-blur-sm">
                <Image
                  src="/history/historySecOne.jpg"
                  alt="Formula 1 History"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-10 left-10">
                  <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                    Motorsport Heritage
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-white">
                    Built On Speed
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-80" />
        </section>

        {/* TIMELINE */}
        <section className="mb-28">
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-red-500">
              Timeline
            </p>

            <h2 className="text-5xl font-black tracking-tight text-white">
              Historic Moments
            </h2>

            <div className="mt-5 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>

          <div className="relative flex flex-col gap-12">
            <div className="absolute left-[50%] top-0 hidden h-full w-[2px] -translate-x-1/2 bg-white/10 lg:block" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`group relative grid grid-cols-1 lg:grid-cols-2 ${
                  index % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                <div className="flex items-center justify-center p-4">
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08]">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

                    <div className="relative p-8 sm:p-10">
                      <p className="text-6xl font-black text-red-500/80">
                        {item.year}
                      </p>

                      <h3 className="mt-4 text-3xl font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-6 max-w-xl leading-relaxed text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-4">
                  <div className="group/image relative h-[350px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/20">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-red-500 shadow-lg shadow-red-500/50 lg:block" />
              </div>
            ))}
          </div>
        </section>

        {/* RECORDS */}
        <section className="mb-28">
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-red-500">
              Statistics
            </p>

            <h2 className="text-5xl font-black tracking-tight text-white">
              Legendary Records
            </h2>

            <div className="mt-5 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {records.map((record) => (
              <div
                key={record.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:bg-white/[0.08]"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl transition-all duration-500 group-hover:bg-red-500/20" />

                <p className="text-6xl font-black text-white">{record.value}</p>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {record.title}
                </h3>

                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gray-400">
                  {record.subtitle}
                </p>

                <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-red-500 to-transparent opacity-60" />
              </div>
            ))}
          </div>
        </section>

        {/* LEGENDARY TEAMS */}
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 sm:p-14">
              <p className="mb-3 text-sm uppercase tracking-[0.4em] text-red-500">
                Constructors
              </p>

              <h2 className="text-5xl font-black tracking-tight text-white">
                Legendary Teams
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300">
                Teams are the heart of Formula 1. Some became icons of racing
                culture through decades of innovation, rivalries and
                championship victories.
              </p>

              <div className="mt-12 flex flex-col gap-5">
                {legendaryTeams.map((team) => (
                  <div
                    key={team.name}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-6 py-5 transition-all duration-500 hover:border-red-500/40 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {team.name}
                        </h3>

                        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                          Active Era
                        </p>
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-white">
                      {team.years}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[500px]">
              <Image
                src="/history/historyTeamwork.jpg"
                alt="Legendary Teams"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black" />

              <div className="absolute bottom-10 right-10 rounded-3xl border border-white/10 bg-black/40 px-8 py-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-red-500">
                  Formula One
                </p>

                <h3 className="mt-3 text-4xl font-black text-white">
                  Engineering Icons
                </h3>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent opacity-80" />
        </section>
      </div>
    </div>
  );
}
