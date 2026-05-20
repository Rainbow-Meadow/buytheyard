import { lazy, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Facebook } from "lucide-react";
import { LazyOnVisible } from "@/components/site/LazyOnVisible";

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

export default function ReviewsAndCommunity() {
  const reviewsRailRef = useRef<HTMLDivElement>(null);
  const [reviewsCanPrev, setReviewsCanPrev] = useState(false);
  const [reviewsCanNext, setReviewsCanNext] = useState(true);

  useEffect(() => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const update = () => {
      setReviewsCanPrev(el.scrollLeft > 4);
      setReviewsCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollReviewsByCard = (dir: 1 | -1) => {
    const el = reviewsRailRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-reviews-item]");
    const delta = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20;
    el.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

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
        <div className="max-w-2xl flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
          <div>
            <p className="eyebrow text-brand mb-3 inline-flex items-center gap-2">
              <Facebook className="size-3.5" />
              From Facebook · real customers, real posts
            </p>
            <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[20ch]">
              What neighbors say.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => scrollReviewsByCard(-1)}
              disabled={!reviewsCanPrev}
              className="size-10 inline-flex items-center justify-center ring-1 ring-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-900"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => scrollReviewsByCard(1)}
              disabled={!reviewsCanNext}
              className="size-10 inline-flex items-center justify-center ring-1 ring-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-white transition disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-900"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-12 max-w-2xl">
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
          <p className="md:hidden mt-3 eyebrow text-zinc-500">
            Swipe to read more →
          </p>
        </div>

        <div className="mt-8 md:mt-12 max-w-2xl border-t border-zinc-300/60 pt-8">
          <p className="eyebrow text-zinc-500 mb-3">
            Community
          </p>
          <LazyOnVisible fallback={<div style={{ minHeight: 320 }} />}>
            <CommunityTiles />
          </LazyOnVisible>
        </div>
      </div>
    </section>
  );
}