import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ClipboardCheck, Building2, HeartHandshake, Phone } from "lucide-react";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import { Tile } from "@/components/site/Tile";
import { TileScreen } from "@/components/site/TileScreen";

const SDO_URL = "https://www.mass.gov/orgs/supplier-diversity-office";

export const Route = createFileRoute("/wbe")({
  head: () => ({
    meta: [
      { title: "What WBE Certification Means — Buy The Yard" },
      {
        name: "description",
        content:
          "Buy The Yard is a Massachusetts WBE — a state-certified Women Business Enterprise. What WBE means, how the Commonwealth certifies it, and why it matters for customers.",
      },
      { property: "og:title", content: "Certified Woman-Owned (WBE) — Buy The Yard" },
      {
        property: "og:description",
        content:
          "Massachusetts-certified Women Business Enterprise. What WBE is, how certification works, and why it matters.",
      },
      { property: "og:url", content: "/wbe" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/wbe" }],
  }),
  component: WbePage,
});

function WbePage() {
  return (
    <>
      {/* Screen 1 — pageHero: WBE seal + four definition tiles */}
      <TileScreen
        layout="pageHero"
        label="What WBE certification means"
        heading="What WBE certification means"
        headingLevel="h1"
        tiles={{
          hero: (
            <article className="relative h-full w-full overflow-hidden rounded-md ring-1 ring-zinc-800 bg-surface text-kraft">
              <div
                aria-hidden="true"
                className="absolute left-0 bottom-16 md:bottom-20 w-1.5 h-56 md:h-72 bg-brand z-10"
              />
              <div className="relative z-10 h-full w-full flex items-end md:items-center">
                <div className="px-5 md:px-10 pb-8 md:pb-0 max-w-3xl">
                  <div className="mb-6 flex items-center gap-4">
                    <img
                      src={wbeSeal}
                      alt="Massachusetts WBE certified seal"
                      width={160}
                      height={100}
                      className="h-14 w-auto object-contain shrink-0"
                      loading="eager"
                      decoding="async"
                    />
                    <p className="eyebrow text-kraft/70 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        Certified since 2018
                      </span>
                      <span aria-hidden="true" className="text-kraft/40">·</span>
                      <span>Commonwealth of Massachusetts</span>
                    </p>
                  </div>
                  <h1 className="display-2 leading-[0.95] text-balance text-kraft">
                    A <span className="text-brand">Women Business Enterprise</span>, certified by the Commonwealth.
                  </h1>
                  <p className="lead text-kraft/80 max-w-[58ch] mt-4 text-pretty">
                    WBE is a formal state certification — not a self-applied label. Here's what it
                    means, how it works, and why customers care.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 max-w-md md:flex-row md:flex-wrap md:items-center md:gap-3 md:max-w-none">
                    <Link
                      to="/quote"
                      className="inline-flex items-center justify-between md:justify-start gap-2 bg-brand text-brand-foreground px-6 h-12 md:h-11 label hover:opacity-90 transition-opacity"
                    >
                      Get a quote
                      <ArrowRight className="size-4" />
                    </Link>
                    <a
                      href="tel:5085799897"
                      className="inline-flex items-center gap-2 label text-kraft hover:text-brand transition-colors h-12 md:h-11 px-3"
                    >
                      <Phone className="size-4 text-brand" />
                      508.579.9897
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ),
          a: (
            <Tile
              id="wbe-def"
              fill
              variant="text"
              tone="kraft"
              layout="anchored"
              anchorIndex="01"
              icon={<BadgeCheck strokeWidth={1.25} />}
              eyebrow="01 · What it is"
              title="Women Business Enterprise"
              body="At least 51% owned, operated, and controlled by one or more women."
            />
          ),
          b: (
            <Tile
              id="wbe-who"
              fill
              variant="text"
              tone="brand"
              layout="anchored"
              anchorIndex="02"
              icon={<Building2 strokeWidth={1.25} />}
              eyebrow="02 · Who certifies"
              title="MA Supplier Diversity Office"
              body="The state office (SDO) that reviews and grants WBE, MBE, and DBE status."
            />
          ),
          c: (
            <Tile
              id="wbe-how"
              fill
              variant="text"
              tone="surface"
              layout="anchored"
              anchorIndex="03"
              icon={<ClipboardCheck strokeWidth={1.25} />}
              eyebrow="03 · How it works"
              title="Application + site visit"
              body="Ownership and control documentation, an interview, and periodic recertification."
            />
          ),
          d: (
            <Tile
              id="wbe-why"
              fill
              variant="text"
              tone="gray"
              layout="anchored"
              anchorIndex="04"
              icon={<HeartHandshake strokeWidth={1.25} />}
              eyebrow="04 · Why it matters"
              title="Counts toward diversity goals"
              body="Towns, schools, and contractors with supplier-diversity targets can credit purchases from a certified WBE."
            />
          ),
        }}
      />

      {/* Screen 2 — long-form explainer */}
      <section className="bg-surface text-kraft">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20 border-l-[1.5px] border-brand">
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            <header className="md:col-span-1">
              <p className="eyebrow text-brand inline-flex items-center gap-2">
                <span aria-hidden className="h-px w-6 bg-brand" />
                The details
              </p>
              <h2 className="display-3 mt-3">The short version of a longer story.</h2>
            </header>

            <div className="md:col-span-2 space-y-10">
              <div>
                <h3 className="display-5 text-brand">What WBE actually means</h3>
                <p className="body mt-3 text-kraft/85">
                  WBE stands for <strong>Women Business Enterprise</strong>. To qualify, a company
                  has to be at least 51% owned by one or more women — and those women have to
                  actually run the business day to day, not just hold paper ownership. Buy The Yard
                  meets both bars: Abby owns it and runs it.
                </p>
              </div>

              <div>
                <h3 className="display-5 text-brand">Who issues the certification</h3>
                <p className="body mt-3 text-kraft/85">
                  In Massachusetts, WBE status is granted by the{" "}
                  <a
                    href={SDO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-brand/60 underline-offset-4 hover:text-brand transition-colors"
                  >
                    Supplier Diversity Office (SDO)
                  </a>
                  , the Commonwealth's office that certifies women-, minority-, veteran-, and
                  disability-owned businesses. It's a state credential, not a private badge.
                </p>
              </div>

              <div>
                <h3 className="display-5 text-brand">How a business gets certified</h3>
                <p className="body mt-3 text-kraft/85">
                  The SDO requires a formal application with ownership records, financials, and
                  governance documents proving the company is at least 51% woman-owned and
                  woman-operated. The office reviews the paperwork, typically conducts a site
                  visit or interview, and — if everything checks out — issues the certification.
                  Certified businesses recertify on a regular cycle to keep their status.
                </p>
              </div>

              <div>
                <h3 className="display-5 text-brand">Why it matters to customers</h3>
                <p className="body mt-3 text-kraft/85">
                  Towns, school districts, state agencies, and many private general contractors
                  have supplier-diversity goals on their projects. Material bought from a
                  certified WBE counts toward those goals. For homeowners and landscapers, it's a
                  simpler signal: you're buying from a vetted, woman-owned local business
                  rather than a chain.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-6 h-11 label hover:opacity-90 transition-opacity"
                >
                  Get a quote <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 label text-kraft hover:text-brand transition-colors"
                >
                  Meet Abby <ArrowRight className="size-4" />
                </Link>
                <a
                  href={SDO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 label text-kraft/70 hover:text-kraft transition-colors"
                >
                  MA Supplier Diversity Office ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
