import { useEffect, useState } from "react";

const VOLUME = "VOL. X";

function formatDate(d: Date) {
  return d
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function yardStatus(d: Date) {
  const day = d.getDay();
  const h = d.getHours();
  // Mon–Fri 8–5, Sat 8–3, Sun closed
  if (day === 0) return "CLOSED SUN · OPENS MON 8AM";
  if (day === 6) {
    if (h < 8) return "OPENS 8AM";
    if (h < 15) return "OPEN · CLOSES 3PM";
    return "CLOSED · OPENS MON 8AM";
  }
  if (h < 8) return "OPENS 8AM";
  if (h < 17) return "OPEN · CLOSES 5PM";
  if (day === 5) return "CLOSED · OPENS SAT 8AM";
  return "CLOSED · OPENS 8AM TOMORROW";
}

export function Masthead() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-ink text-newsprint">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-2 flex items-center justify-between gap-4 text-newsprint/80">
        <span className="dateline truncate">{VOLUME} · JEFFERSON, MA</span>
        <span className="dateline truncate hidden sm:inline">
          {now ? formatDate(now) : "—"}
        </span>
        <span className="dateline truncate text-stamp">
          {now ? yardStatus(now) : "—"}
        </span>
      </div>
    </div>
  );
}