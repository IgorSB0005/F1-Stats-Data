"use client";

import { useEffect, useState } from "react";
import { StandingsDiplay } from "@/types/standings";
import DriverCard from "./driverCard";
import StandingsSkeleton from "./standingsSkeleton";

export default function StandingsSection() {
  const [data, setData] = useState<StandingsDiplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_STATS_SERVICE_URL;

    if (!baseUrl) {
      setData([]);
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}/standings`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StandingsSkeleton />;

  if (!data.length) {
    return (
      <p className="text-gray-400 text-sm text-center py-4">
        No standings available
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data.map((driver) => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
