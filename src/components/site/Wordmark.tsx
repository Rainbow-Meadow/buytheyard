import { Link } from "@tanstack/react-router";

type WordmarkProps = {
  size?: "sm" | "lg";
  withTagline?: boolean;
  asLink?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "light";
};

/**
 * Typographic wordmark used in chrome (header + footer).
 * Replaces the raster brandmark with the display font already in the
 * type system so it stays sharp and recolorable.
 */
export function Wordmark({
  size = "sm",
  withTagline = false,
  asLink = false,
  onClick,
  className = "",
  variant = "default",
}: WordmarkProps) {
  const wordCls =
    size === "lg"
      ? "font-sans font-extrabold uppercase text-2xl md:text-3xl leading-none tracking-tight"
      : "font-sans font-extrabold uppercase text-lg leading-none tracking-tight";

  const taglineCls =
    variant === "light"
      ? "ml-3 hidden sm:inline eyebrow text-white/40"
      : "ml-3 hidden sm:inline eyebrow text-kraft/40";

  const yardCls = variant === "light" ? "text-white" : "text-brand";

  const inner = (
    <span className={`inline-flex items-baseline leading-none ${className}`}>
      <span className={`${wordCls} ${variant === "light" ? "text-white" : "text-kraft"}`}>
        Buy The <span className={yardCls}>Yard</span>
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