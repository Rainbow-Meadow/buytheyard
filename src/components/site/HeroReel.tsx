import { useEffect, useRef, useState } from "react";
import reel01 from "@/assets/hero/reel-01-mulch.mp4.asset.json";
import reel02 from "@/assets/hero/reel-02-loader.mp4.asset.json";
import reel03 from "@/assets/hero/reel-03-truck.mp4.asset.json";
import reel04 from "@/assets/hero/reel-04-rake.mp4.asset.json";
import reel05 from "@/assets/hero/reel-05-dusk.mp4.asset.json";

const CLIPS = [reel01, reel02, reel03, reel04, reel05] as Array<{ url: string }>;
const HOLD_MS = 5200;

/**
 * Crossfading cinematic hero reel.
 * Two stacked <video> tags trade places; the inactive one preloads the next clip
 * so playback feels continuous. Falls back to a static gradient on reduced-motion.
 */
export function HeroReel() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const vidA = useRef<HTMLVideoElement>(null);
  const vidB = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % CLIPS.length);
    }, HOLD_MS);
    return () => clearInterval(t);
  }, [reduced]);

  // Try to play whichever video is currently visible (autoplay quirks).
  useEffect(() => {
    const ref = active % 2 === 0 ? vidA.current : vidB.current;
    if (ref) {
      ref.currentTime = 0;
      void ref.play().catch(() => {});
    }
  }, [active]);

  const aIndex = active % 2 === 0 ? active : (active + 1) % CLIPS.length;
  const bIndex = active % 2 === 0 ? (active + 1) % CLIPS.length : active;
  const aVisible = active % 2 === 0;

  return (
    <div className="absolute inset-0 overflow-hidden bg-base">
      <video
        ref={vidA}
        src={CLIPS[aIndex]?.url}
        muted
        playsInline
        autoPlay
        loop={reduced || CLIPS.length === 1}
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
          aVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <video
        ref={vidB}
        src={CLIPS[bIndex]?.url}
        muted
        playsInline
        autoPlay
        loop={reduced || CLIPS.length === 1}
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
          aVisible ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Veil + grade */}
      <div className="absolute inset-0 hero-veil pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_120%,color-mix(in_oklab,var(--brand)_18%,transparent),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 grid-noir opacity-40 mix-blend-overlay pointer-events-none" />

      {/* Frame markers */}
      <div className="absolute bottom-4 right-5 z-10 flex items-center gap-1.5">
        {CLIPS.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-px transition-all duration-500 ${
              i === active ? "w-8 bg-brand" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}