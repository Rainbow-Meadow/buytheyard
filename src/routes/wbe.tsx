import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

export const Route = createFileRoute("/wbe")({
  head: () => ({
    meta: [
      { title: "What WBE Certification Means — Buy The Yard" },
      {
        name: "description",
        content:
          "Buy The Yard is a Massachusetts WBE — certified by the MA Supplier Diversity Office (MassUCP). MA Home Improvement Contractor #214009 · USDOT #3543587.",
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
      <section aria-label="What WBE certification means" className="border-y border-[var(--rule)]">
        <h1 className="sr-only">What WBE certification means</h1>
        <article className="relative w-full overflow-hidden bg-surface text-kraft min-h-[520px] md:min-h-[600px]">
              <div
                aria-hidden="true"
                className="absolute left-0 bottom-16 md:bottom-20 w-1.5 h-56 md:h-72 bg-brand z-10"
              />
              <div className="relative z-10 h-full w-full flex items-end md:items-center min-h-[520px] md:min-h-[600px]">
                <div className="px-5 md:px-10 pb-8 md:pb-0 max-w-3xl">
                  <div className="mb-6 flex items-center gap-4">
                    <p className="eyebrow text-kraft/70 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        Certified since 2018
                      </span>
                      <span aria-hidden="true" className="text-kraft/40">·</span>
                      <span>Commonwealth of Massachusetts</span>
                    </p>
                  </div>
                  <h2 className="display-2 leading-[0.95] text-balance text-kraft">
                    A <span className="text-brand">Women Business Enterprise</span>, certified by the Commonwealth.
                  </h2>
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
      </section>

      <section aria-label="Section placeholder" className="border-b border-[var(--rule)]">
        <div className="container mx-auto px-5 md:px-10 py-24 md:py-32">
          <p className="eyebrow text-zinc-500">Next section</p>
          <p className="body-sm text-zinc-500 mt-2">Empty — build from here.</p>
        </div>
      </section>
    </>
  );
}
