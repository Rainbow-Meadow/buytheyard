import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Abby Montalto — Buy The Yard | Jefferson, MA" },
      {
        name: "description",
        content:
          "Meet Abby Montalto, owner of Buy The Yard — a woman-owned, MA WBE-certified materials yard in Jefferson, MA with Central Mass construction roots.",
      },
      { property: "og:title", content: "Meet Abby — Buy The Yard" },
      {
        property: "og:description",
        content:
          "The story behind Buy The Yard: Abby Montalto, family construction roots, WBE certification, and a Jefferson yard built on practical help.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "https://buytheyard.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="section bg-base text-zinc-900">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <article className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden rounded-md bg-zinc-950 text-white ring-1 ring-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
              <span aria-hidden="true" className="absolute left-0 bottom-16 h-64 w-1.5 bg-brand" />
              <div className="relative z-10 flex h-full items-end p-5 md:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                    Meet Abby Montalto
                  </p>
                  <h1 className="display-2 leading-[0.94] text-balance">
                    Built by Abby. Run from Jefferson.
                  </h1>
                  <p className="lead mt-5 max-w-[58ch] text-zinc-200 text-pretty">
                    Buy The Yard is a woman-owned materials yard with Central Mass construction roots, practical answers, and a simple goal: help people get the right material in the right place without guessing.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <a
                      href="tel:5085799897"
                      className="inline-flex h-12 items-center justify-between gap-3 bg-brand px-5 label text-white hover:opacity-90"
                    >
                      Call Abby <Phone className="size-4" />
                    </a>
                    <Link
                      to="/quote"
                      className="inline-flex h-12 items-center justify-between gap-3 border border-white/30 px-5 label text-white hover:bg-white/10"
                    >
                      Send a quote request <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
          </article>
        </div>
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
