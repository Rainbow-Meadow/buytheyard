import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";

export interface GalleryItem {
  src?: string;
  alt: string;
}

const SPEED: Record<"slow" | "normal" | "fast", string> = {
  slow: "60s",
  normal: "40s",
  fast: "25s",
};

export function GalleryMarqueeSection({
  title,
  items,
  speed = "normal",
}: {
  title?: string;
  items: GalleryItem[];
  speed?: "slow" | "normal" | "fast";
}) {
  // Two copies for a seamless -50% translate loop.
  const loop = [...items, ...items];
  return (
    <Section title={title} tone="paper">
      <div className="marquee-mask overflow-hidden py-6 md:py-8 md:h-[calc(50svh-2rem)] flex items-center">
        <div
          className="marquee-track gap-px bg-ink"
          style={{ ["--marquee-duration" as string]: SPEED[speed] }}
        >
          {loop.map((item, i) => (
            <figure
              key={i}
              aria-hidden={i >= items.length}
              className="flex-shrink-0 h-56 md:h-64 aspect-[4/3] bg-soft relative overflow-hidden"
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center font-mono-industrial text-[10px] tracking-widest uppercase text-ink/40">
                  {item.alt}
                </span>
              )}
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}