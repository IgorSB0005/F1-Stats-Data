import { StandingsDiplay } from "@/types/standings";

type Props = {
  driver: StandingsDiplay;
};

export default function DriverCard({ driver }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition">
      <div className="flex items-center gap-3">
        <span className="text-red-500 font-bold w-6">{driver.position}</span>

        <div>
          <p className="text-sm font-semibold text-white">
            {driver.driver_name}
          </p>
          <p className="text-xs text-gray-400">{driver.constructor}</p>
        </div>
      </div>

      <span className="text-sm font-bold text-white">{driver.points} pts</span>
    </div>
  );
}
