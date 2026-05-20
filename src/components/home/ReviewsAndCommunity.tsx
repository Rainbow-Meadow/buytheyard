import { lazy, useEffect, useRef } from "react";
import { Facebook } from "lucide-react";
import { LazyOnVisible } from "@/components/site/LazyOnVisible";
import { TileGrid, type TileBlock } from "@/components/site/Tile";
import communityCtms from "@/assets/source/community-ctms-loam.webp";
import communityRutland from "@/assets/source/community-rutland-memorial.webp";

const CommunityTiles = lazy(() => import("@/components/home/CommunityTiles"));

const reviews = [
  {
    name: "Rob Warner",
    date: "Apr 21",
    quote:
      "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product.",
  },
  {
    name: "Michael Radesky",
    date: "Aug 26, 2019",
    quote:
      "Wicked nice folks! Dependable, personable, and good products. We love Abby!!!",
  },
  {
    name: "John Sarkisian",
    date: "May 7, 2019",
    quote: "Great customer service. Very professional. Prices are fair!",
  },
];

const DESKTOP_BLOCKS: TileBlock[] = [
  {
    id: "reviews-intro",
    variant: "text",
    icon: <Facebook />,
    eyebrow: "From Facebook · real customers",
    title: "What the neighbors say.",
    body: "Recommendations posted by people who actually pulled into the yard.",
    size: "md",
    tone: "surface",
  },
  ...reviews.map<TileBlock>((r, i) => ({
    id: `review-${i}`,
    variant: "quote",
    eyebrow: `${r.name} · ${r.date}`,
    quote: r.quote,
    attribution: "Recommends Buy The Yard",
    size: "md",
    tone: i === 0 ? "white" : i === 1 ? "kraft" : "white",
  })),
  {
    id: "community-ctms",
    variant: "image",
    src: communityCtms,
    alt: "Buy The Yard dump truck unloading a pile of dark loam at Central Tree Middle School",
    size: "md",
    aspect: "wide",
    focal: "center",
    overlay: {
      eyebrow: "Community",
      title: "CTMS · loam + mulch donation",
      align: "bottom-left",
    },
    details: {
      shareId: "community-ctms",
      eyebrow: "Central Tree Middle School · Jun 26, 2024",
      title: "Loam and mulch for CTMS",
      body: "Thank you to former CTMS Student and owner of Buy The Yard Outdoor Products Abby Montalto for her generosity. Loam has been delivered and mulch is on the way.",
    },
  },
  {
    id: "community-rutland-memorial",
    variant: "image",
    src: communityRutland,
    alt: "American flags and a memorial flower bed at the Rutland Public Safety building on Memorial Day",
    size: "md",
    aspect: "wide",
    focal: "center",
    overlay: {
      eyebrow: "Community",
      title: "Rutland Public Safety · Memorial Day",
      align: "bottom-left",
    },
    details: {
      shareId: "community-rutland-memorial",
      eyebrow: "Rutland Fire Department · May 22, 2020",
      title: "Memorial Day at the public safety building",
      body: "Just wanted to say thank you to the following local businesses that have helped out to make the public safety building look amazing for this Memorial Day. Wildwood Lawn Care, Buy The Yard Outdoor Products, Sterling Irrigation, and the Patterson Family.",
    },
  },
];

export default function ReviewsAndCommunity() {
  const reviewsRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    let paused = false;

    const tick = () => {
      if (paused || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.querySelector<HTMLElement>("[data-reviews-item]");
        const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20;
        el.scrollBy({ left: delta, behavior: "smooth" });
      }
    };

    const start = () => {
      if (timer) return;
      timer = setInterval(tick, 5000);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onEnter = () => { paused = true; stop(); };
    const onLeave = () => { paused = false; start(); };
    const onTouchStart = () => { paused = true; stop(); };
    const onTouchEnd = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => { paused = false; start(); }, 2500);
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!paused) start();
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      if (resumeTimeout) clearTimeout(resumeTimeout);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="section bg-kraft border-y border-zinc-300/60">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Desktop: balanced tile grid */}
        <div className="hidden md:block">
          <TileGrid blocks={DESKTOP_BLOCKS} />
        </div>

        {/* Mobile: existing carousel + community */}
        <div className="md:hidden max-w-2xl flex flex-col gap-3">
          <div>
            <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
              <Facebook className="size-3.5" />
              From Facebook · real customers, real posts
            </p>
            <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[20ch]">
              What the neighbors say.
            </h2>
          </div>

          <div className="mt-3 max-w-2xl">
          <div
            ref={reviewsRailRef}
            className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                data-reviews-item
                className="snap-start shrink-0 basis-full min-w-0 flex"
              >
                <figure className="bg-white border border-zinc-200 p-6 flex flex-col w-full min-h-[200px]">
                  <div className="meta flex items-center gap-2 text-zinc-500 mb-4">
                    <Facebook className="size-3.5 text-[#1877F2]" />
                    <span className="font-semibold text-zinc-900">{r.name}</span>
                    <span>·</span>
                    <span>{r.date}</span>
                  </div>
                  <blockquote className="display-5 leading-snug text-zinc-900 flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 eyebrow text-brand">
                    Recommends Buy The Yard
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <p className="mt-3 eyebrow text-zinc-500">
            Swipe to read more →
          </p>
          </div>

          <div className="mt-8 max-w-2xl border-t border-zinc-300/60 pt-8">
            <p className="eyebrow text-zinc-500 mb-3">
              Community
            </p>
            <LazyOnVisible fallback={<div style={{ minHeight: 320 }} />}>
              <CommunityTiles />
            </LazyOnVisible>
          </div>
        </div>
      </div>
    </section>
  );
}