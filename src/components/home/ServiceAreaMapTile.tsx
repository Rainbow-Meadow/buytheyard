import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

/**
 * Decorative service-area map for the delivery hero tile.
 * Abstract dot-cluster of Central Mass towns served from the Jefferson yard.
 * Not a real geographic map — a quick visual proof that we serve the area.
 */
const TOWNS: Array<{ name: string; x: number; y: number; star?: boolean }> = [
  { name: "Jefferson", x: 50, y: 50, star: true },
  { name: "Holden", x: 53, y: 64 },
  { name: "Princeton", x: 38, y: 38 },
  { name: "Sterling", x: 62, y: 30 },
  { name: "Rutland", x: 28, y: 52 },
  { name: "W. Boylston", x: 64, y: 52 },
  { name: "Paxton", x: 33, y: 68 },
  { name: "Worcester", x: 56, y: 78 },
  { name: "Leominster", x: 50, y: 18 },
  { name: "Boylston", x: 72, y: 64 },
];

export function ServiceAreaMapTile() {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-md bg-surface text-surface-foreground p-5 md:p-6 flex flex-col">
      <p className="eyebrow text-brand mb-2">Delivery · Central MA</p>
      <p className="display-5 leading-snug">Curbside from our Jefferson yard</p>

      <div className="relative flex-1 min-h-0 mt-4 rounded-md ring-1 ring-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] overflow-hidden">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* concentric service rings */}
          <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" strokeDasharray="1 1.5" />

          {/* lines from Jefferson to each town */}
          {TOWNS.filter((t) => !t.star).map((t) => (
            <line
              key={`l-${t.name}`}
              x1="50"
              y1="50"
              x2={t.x}
              y2={t.y}
              stroke="rgba(186,26,26,0.25)"
              strokeWidth="0.25"
            />
          ))}

          {/* town dots */}
          {TOWNS.map((t) => (
            <g key={t.name}>
              {t.star ? (
                <>
                  <circle cx={t.x} cy={t.y} r="2.2" fill="var(--brand)" />
                  <circle cx={t.x} cy={t.y} r="4.5" fill="none" stroke="var(--brand)" strokeWidth="0.5" opacity="0.5" />
                </>
              ) : (
                <circle cx={t.x} cy={t.y} r="1.1" fill="rgba(255,255,255,0.65)" />
              )}
            </g>
          ))}
        </svg>

        {/* Town labels — decorative, paired with the SVG above.
         *  The whole cluster is aria-hidden because the spatial layout is
         *  meaningless without sight; SR users get the headline + CTA only. */}
        <div aria-hidden="true">
          {TOWNS.map((t) => (
            <span
              key={`lbl-${t.name}`}
              className={`absolute whitespace-nowrap pointer-events-none ${
                t.star ? "text-brand font-semibold" : "text-white/85"
              }`}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: "translate(8px, -50%)",
                fontSize: "11px",
                lineHeight: 1,
              }}
            >
              {t.star && <MapPin className="inline size-3 mr-0.5 -mt-0.5" />}
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <Link
        to="/service-area"
        className="mt-4 inline-flex items-center gap-2 label border-b border-current self-start hover:opacity-80"
      >
        See full service area
      </Link>
    </article>
  );
}