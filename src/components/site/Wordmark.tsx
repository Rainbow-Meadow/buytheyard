import { Link } from "@tanstack/react-router";

type WordmarkProps = {
  size?: "sm" | "lg";
  withTagline?: boolean;
  asLink?: boolean;
  onClick?: () => void;
  className?: string;
};

/**
 * Typographic wordmark used in chrome (header + footer).
 * Replaces the raster brandmark with the display font already in the
 * type system so it stays sharp and recolorable.
 */
export function Wordmark({
  size = "sm",
  withTagline = true,
  asLink = false,
  onClick,
  className = "",
}: WordmarkProps) {
  const wordCls =
    size === "lg"
      ? "font-display uppercase text-4xl md:text-5xl leading-none tracking-tight"
      : "font-display uppercase text-2xl leading-none tracking-tight";

  const taglineCls =
    size === "lg"
      ? "mt-2 eyebrow text-kraft/50"
      : "mt-1 text-[8px] uppercase tracking-[0.2em] font-semibold text-kraft/55";

  const inner = (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className={wordCls}>
        Buy The <span className="text-brand">Yard</span>
      </span>
      {withTagline && (
        <span className={taglineCls}>Mulch · Loam · Sand · Stone</span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link
        to="/"
        aria-label="Buy The Yard, home"
        onClick={onClick}
        className="inline-flex items-center"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}