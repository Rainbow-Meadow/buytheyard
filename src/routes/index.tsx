import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Phone, Truck } from "lucide-react";
import heroDesktop from "@/assets/source/hero-desktop-yard-2026.png";
import heroMobile from "@/assets/source/hero-mobile-piles-mulch-sand-stone-2026.png";
import { products } from "@/data/products";
import { promos } from "@/data/promos";
import { ClassifiedCard } from "@/components/site/ClassifiedCard";
import { RuleBar, DoubleRule } from "@/components/site/RuleBar";
import { Ticker } from "@/components/site/Ticker";
import { PullQuote } from "@/components/site/PullQuote";
import { Stamp } from "@/components/site/Stamp";
import { Caption } from "@/components/site/Caption";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const reviews = [
  {
    name: "Rob Warner",
    date: "APR 21",
    quote:
      "Abby and crew are awesome. Very accommodating, great prices, delivery and quality product.",
  },
  {
    name: "Michael Radesky",
    date: "AUG 26, 2019",
    quote:
      "Wicked nice folks! Dependable, personable, and good products. We love Abby!!!",
  },
  {
    name: "John Sarkisian",
    date: "MAY 7, 2019",
    quote: "Great customer service. Very professional. Prices are fair!",
  },
];

const communityPosts = [
  {
    org: "Central Tree Middle School",
    date: "JUN 26, 2024",
    quote:
      "Thank you to former CTMS student and owner of Buy The Yard Outdoor Products Abby Montalto for her generosity. Loam has been delivered and mulch is on the way.",
  },
  {
    org: "Rutland Fire Department",
    date: "MAY 22, 2020",
    quote:
      "Thank you to the local businesses that helped make the public safety building look amazing for Memorial Day — including Buy The Yard Outdoor Products.",
  },
];

const guide = [
  {
    use: "Front bed refresh",
    pick: "Hemlock Mulch",
    spec: "1 yd ≈ 100 sq ft @ 3\" deep",
  },
  {
    use: "New lawn install",
    pick: "Screened Loam",
    spec: "1 yd ≈ 100 sq ft @ 3\" deep",
  },
  {
    use: "Driveway top-up",
    pick: "3/4\" Crushed Blue",
    spec: "1 yd ≈ 80 sq ft @ 4\" deep",
  },
  {
    use: "Walking path",
    pick: "3/8\" Pea Stone",
    spec: "1 yd ≈ 110 sq ft @ 3\" deep",
  },
  {
    use: "Paver base / sandbox",
    pick: "Mason Sand",
    spec: "Washed, fine, clean",
  },
  {
    use: "Playground surface",
    pick: "ASTM Chips",
    spec: "F1292 / F2075 / F1951",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA | Central MA Delivery" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from our Jefferson, MA yard. Delivery to Holden, Worcester, Princeton, Sterling, Rutland & all of Central Mass. Call 508-579-9897.",
      },
      { property: "og:title", content: "Buy The Yard — Premium Outdoor Materials" },
      {
        property: "og:description",
        content:
          "Bulk mulch, loam, sand, stone — and a full plant nursery. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-home.jpg" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroMobile, fetchpriority: "high", media: "(max-width: 767px)" },
      { rel: "preload", as: "image", href: heroDesktop, fetchpriority: "high", media: "(min-width: 768px)" },
      { rel: "canonical", href: "https://buytheyard.lovable.app/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = [
    "Hemlock Mulch",
    "Screened Loam",
    "Mason Sand",
    "3/4\" Crushed Blue Stone",
    "Red Lava Rock",
    "Hanging Baskets",
  ]
    .map((n) => products.find((p) => p.name === n))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const activePromos = promos.filter((p) => p.active);

  return (
    <>
      {/* ────────────── FRONT-PAGE BANNER HEADLINE ────────────── */}
      <section className="bg-newsprint paper-grain">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 md:pt-10 pb-4">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">
              FRONT PAGE · CENTRAL MASS EDITION
            </span>
            <span className="dateline text-ink-soft hidden sm:inline">
              ONE YARD MINIMUM · CALL FOR TODAY'S PRICE
            </span>
          </div>

          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[18ch]">
            Mulch, Loam, Sand &amp; Stone —{" "}
            <span className="text-stamp">by the yard.</span>
          </h1>
          <p className="lead mt-4 md:mt-6 max-w-[60ch] text-ink-soft not-italic">
            Plainspoken, locally owned, woman-owned. Pickup at the Jefferson
            yard or curbside delivery across Central Mass — same day when you
            call before noon.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="tel:5085799897"
              className="inline-flex items-center gap-2 bg-stamp text-newsprint label px-6 h-12 btn-press hover:bg-ink"
            >
              <Phone className="size-4" strokeWidth={2.5} />
              508.579.9897
            </a>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 border-2 border-ink text-ink label px-6 h-12 btn-press hover:bg-ink hover:text-newsprint"
            >
              File a quote request
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 label text-ink-soft hover:text-stamp h-12 px-1"
            >
              Read the catalog →
            </Link>
          </div>
        </div>

        {/* HERO PHOTO — full-bleed, captioned, with phone stamp */}
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pb-10">
          <figure className="relative border-2 border-ink bg-ink">
            <picture>
              <source media="(min-width: 768px)" srcSet={heroDesktop} />
              <img
                src={heroMobile}
                alt="The Buy The Yard lot in Jefferson, MA — piles of mulch, loam, stone and a loader at work."
                className="w-full h-[60vh] md:h-[68vh] max-h-[640px] object-cover grayscale-[0.25] contrast-[1.08]"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent pointer-events-none" />

            {/* Giant phone number lock-up */}
            <a
              href="tel:5085799897"
              aria-label="Call 508-579-9897"
              className="absolute left-5 right-5 bottom-5 md:left-8 md:right-auto md:bottom-8 max-w-3xl bg-newsprint text-ink p-5 md:p-7 border-2 border-ink"
            >
              <span className="dateline text-ink-soft">
                CALL THE YARD · ABBY ANSWERS
              </span>
              <span
                className="block font-display font-bold leading-[0.9] text-ink mt-2 tabular"
                style={{ fontSize: "clamp(2.5rem, 8vw, 5.25rem)" }}
              >
                508.579.9897
              </span>
              <span className="meta text-ink-soft mt-2 inline-block">
                MON–FRI 8–5 · SAT 8–3 · 2264 MAIN ST, JEFFERSON, MA
              </span>
            </a>

            {/* Stamp */}
            <div className="absolute top-5 right-5 md:top-8 md:right-8">
              <Stamp size="lg" rotation={-6} className="bg-newsprint/95">
                EST. 2016 · WBE
              </Stamp>
            </div>
          </figure>
          <Caption credit="The Yard">
            The lot at 2264 Main St., open Monday through Saturday in season.
          </Caption>
        </div>
      </section>

      {/* ────────────── TICKER ────────────── */}
      <Ticker
        tone="ink"
        items={[
          "IN STOCK — HEMLOCK · BLACK · DARK BROWN MULCH",
          "SCREENED LOAM · PLANT MIX · COMPOST",
          "3/4\" BLUE · 3/8\" PEA · RIVER · LAVA",
          "MASON SAND · ASTM PLAYGROUND CHIPS",
          "DELIVERY 6 DAYS · 1 YARD MINIMUM",
          "CALL 508.579.9897 FOR TODAY'S PRICE",
        ]}
      />

      {/* ────────────── FEATURED MATERIALS (classifieds) ────────────── */}
      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <RuleBar
            number="§ 01"
            label="Featured Materials"
            right={
              <Link
                to="/products"
                className="inline-flex items-center gap-2 label text-ink hover:text-stamp"
              >
                FULL CATALOG <ArrowRight className="size-4" />
              </Link>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-ink/15">
              {featured.map((p, i) => (
                <div
                  key={p.name}
                  className="border-r border-b border-ink/15 -mr-px -mb-px"
                >
                  <ClassifiedCard
                    product={p}
                    number={`№ ${String(i + 1).padStart(2, "0")}`}
                  />
                </div>
              ))}
            </div>
          </RuleBar>
        </div>
      </section>

      {/* ────────────── WHAT GOES WHERE — homeowner guide ────────────── */}
      <section className="section-tight bg-newsprint-2 border-y border-rule-strong">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <p className="eyebrow text-stamp mb-3">§ 02 · HOMEOWNER'S GUIDE</p>
              <h2 className="display-3 text-ink text-balance">
                What Goes Where, Plain &amp; Simple.
              </h2>
              <p className="body mt-4 text-ink-soft max-w-[42ch]">
                Not sure what you need? Pick the job. We'll match the material
                and tell you how much one yard covers.
              </p>
              <Link
                to="/quote"
                className="mt-5 inline-flex items-center gap-2 label text-ink hover:text-stamp"
              >
                Ask Abby for a recommendation →
              </Link>
            </div>
            <div className="md:col-span-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="rule-thick border-b">
                    <th className="dateline text-left text-ink-soft py-2">JOB</th>
                    <th className="dateline text-left text-ink-soft py-2">PICK</th>
                    <th className="dateline text-left text-ink-soft py-2 hidden sm:table-cell">
                      COVERAGE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {guide.map((g) => (
                    <tr key={g.use} className="align-baseline">
                      <td className="body py-3 text-ink">{g.use}</td>
                      <td className="display-5 py-3 text-ink">{g.pick}</td>
                      <td className="meta py-3 text-ink-soft hidden sm:table-cell">
                        {g.spec}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── PULL QUOTE ────────────── */}
      <section className="bg-newsprint">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-16">
          <PullQuote attribution="Rob Warner, neighbor (★★★★★)">
            Abby and crew are awesome. Very accommodating, great prices,
            delivery and quality product.
          </PullQuote>
        </div>
      </section>

      {/* ────────────── COVERAGE & COMMUNITY ────────────── */}
      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <RuleBar number="§ 03" label="Coverage & Community" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
            <div className="md:col-span-7">
              <p className="eyebrow text-stamp mb-3 inline-flex items-center gap-2">
                <Facebook className="size-3.5" /> FROM FACEBOOK · REAL POSTS
              </p>
              <h3 className="display-4 text-ink mb-6">What neighbors say.</h3>
              <div className="space-y-6">
                {reviews.map((r) => (
                  <figure
                    key={r.name}
                    className="border-l-4 border-ink pl-5"
                  >
                    <blockquote className="body text-ink italic">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <figcaption className="meta mt-2 text-ink-soft">
                      <span className="text-ink font-semibold">{r.name}</span>{" "}
                      · {r.date}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5 md:border-l md:border-rule-strong md:pl-10">
              <p className="eyebrow text-stamp mb-3">COMMUNITY DESK</p>
              <h3 className="display-4 text-ink mb-6">
                In the neighborhood.
              </h3>
              <div className="space-y-6">
                {communityPosts.map((p) => (
                  <div key={p.org}>
                    <p className="body text-ink">&ldquo;{p.quote}&rdquo;</p>
                    <p className="meta mt-2 text-ink-soft">
                      <span className="text-ink font-semibold">{p.org}</span>{" "}
                      · {p.date}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ────────────── DELIVERY BAND ────────────── */}
      <section className="bg-ink text-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8 section grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow text-newsprint/60 mb-3 inline-flex items-center gap-2">
              <Truck className="size-3.5" /> § 04 · DELIVERY DESK
            </p>
            <h2 className="display-2 leading-[0.95]">
              We Deliver Across Central Mass.
            </h2>
            <p className="lead text-newsprint/80 not-italic mt-4 max-w-[44ch]">
              Curbside or driveway. Same-day when you call before noon, otherwise
              within 48 hours.
            </p>
            <Link
              to="/delivery"
              className="mt-6 inline-flex items-center gap-2 bg-stamp text-newsprint label px-6 h-12 btn-press hover:bg-newsprint hover:text-ink"
            >
              Delivery details <ArrowRight className="size-4" />
            </Link>
          </div>

          <dl className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-t border-newsprint/15">
            {[
              ["Driveway to curb", "We drop on driveway or curbline only — keeps lawns & utilities safe."],
              ["1-yard minimum", "Whether mulch, loam, or stone — one yard is the smallest order."],
              ["Mark your spot", "Flag, cone, or a spray-painted X — tell us exactly where to drop."],
              ["Cash or check, no fee", "Card payments carry a 4% pass-through processor fee."],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border-r border-b border-newsprint/15 p-5 md:p-6"
              >
                <dt className="display-5 text-newsprint">{k}</dt>
                <dd className="body-sm mt-2 text-newsprint/70">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ────────────── CLASSIFIEDS / PROMOS ────────────── */}
      {activePromos.length > 0 && (
        <section className="section bg-newsprint-2">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <RuleBar number="§ 05" label="Notices & Classifieds" />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-ink/20">
              {activePromos.map((p) => (
                <article
                  key={p.title}
                  className="border-r border-b border-ink/20 p-6 md:p-7 bg-newsprint flex flex-col"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <span className="eyebrow text-stamp">NOTICE</span>
                    <Stamp size="sm" rotation={-3}>NOW POSTED</Stamp>
                  </div>
                  <h3 className="display-4 text-ink mb-2">{p.title}</h3>
                  <p className="body text-ink-soft flex-1">{p.body}</p>
                  <a
                    href="tel:5085799897"
                    className="mt-4 inline-flex items-center gap-2 label text-ink hover:text-stamp"
                  >
                    <Phone className="size-4" /> 508.579.9897
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────────── HOURS & FAQ ────────────── */}
      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <RuleBar number="§ 06" label="Hours, Visiting & FAQ" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            {/* Hours panel */}
            <aside className="md:col-span-4 bg-ink text-newsprint p-6 md:p-7">
              <p className="eyebrow text-newsprint/60 mb-3">YARD HOURS</p>
              <dl className="meta text-newsprint/80 divide-y divide-newsprint/15">
                <div className="flex justify-between py-2">
                  <dt>MON–FRI</dt><dd className="tabular">8:00–5:00</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt>SATURDAY</dt><dd className="tabular">8:00–3:00</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt>SUNDAY</dt><dd>CLOSED</dd>
                </div>
              </dl>
              <DoubleRule className="my-5 [&_div]:!border-newsprint/30" />
              <p className="dateline text-newsprint/60">
                IN-SEASON 4/1–8/1 · AFTER: BY APPOINTMENT · SALT YEAR-ROUND
              </p>
              <a
                href="tel:5085799897"
                className="mt-5 inline-flex items-center gap-2 bg-stamp text-newsprint label px-5 h-11 btn-press"
              >
                <Phone className="size-4" /> 508.579.9897
              </a>
            </aside>

            <div className="md:col-span-8">
              <Accordion type="single" collapsible className="border-y-2 border-ink">
                <AccordionItem value="pricing" className="border-b border-rule">
                  <AccordionTrigger className="display-4 py-5 hover:no-underline text-ink">
                    How much does material cost?
                  </AccordionTrigger>
                  <AccordionContent className="body text-ink-soft pb-5 pr-6">
                    Prices move with the season, so we quote by phone — and we
                    work to keep them the best around. One-yard minimum on all
                    bulk orders. Call{" "}
                    <a href="tel:5085799897" className="text-ink underline underline-offset-4">508-579-9897</a>{" "}
                    or{" "}
                    <Link to="/quote" className="text-ink underline underline-offset-4">request a quote online</Link>.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery-area" className="border-b border-rule">
                  <AccordionTrigger className="display-4 py-5 hover:no-underline text-ink">
                    Do you deliver to my town?
                  </AccordionTrigger>
                  <AccordionContent className="body text-ink-soft pb-5 pr-6">
                    Curbside delivery throughout Central Mass — Holden, Princeton,
                    Sterling, Rutland, West Boylston, Paxton, Worcester, Leominster
                    and surrounding towns. Priced by ZIP. See{" "}
                    <Link to="/delivery" className="text-ink underline underline-offset-4">delivery</Link>.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="card-fee" className="border-b border-rule">
                  <AccordionTrigger className="display-4 py-5 hover:no-underline text-ink">
                    What's the 4% card fee about?
                  </AccordionTrigger>
                  <AccordionContent className="body text-ink-soft pb-5 pr-6">
                    Pass-through processor surcharge. Cash or check, no fee — your
                    quoted price stays the same either way.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="timing" className="border-0">
                  <AccordionTrigger className="display-4 py-5 hover:no-underline text-ink">
                    How fast can I get a delivery?
                  </AccordionTrigger>
                  <AccordionContent className="body text-ink-soft pb-5 pr-6">
                    Same-day when you call before noon (route permitting),
                    otherwise allow 48 hours.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── FINAL EDITION CTA ────────────── */}
      <section className="bg-stamp text-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16 text-center">
          <p className="dateline text-newsprint/70">— FINAL EDITION —</p>
          <h2 className="display-2 mt-4 text-balance max-w-[22ch] mx-auto">
            Pick up the phone. Get the load on the way.
          </h2>
          <a
            href="tel:5085799897"
            className="mt-8 inline-flex items-center gap-3 bg-newsprint text-ink label text-base px-8 h-14 btn-press hover:bg-ink hover:text-newsprint"
          >
            <Phone className="size-5" strokeWidth={2.5} />
            508.579.9897
          </a>
          <p className="dateline mt-5 text-newsprint/70">
            ABBY ANSWERS · MON–SAT · 2264 MAIN ST, JEFFERSON, MA
          </p>
        </div>
      </section>
    </>
  );
}