import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mulch, Loam, Sand & Stone — Jefferson, MA" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand & stone from Buy The Yard in Jefferson, MA. Woman-owned, WBE-certified, and built for pickup or delivery across Central Mass.",
      },
      { property: "og:title", content: "Buy The Yard — Bulk Landscape Materials in Jefferson, MA" },
      {
        property: "og:description",
        content:
          "Mulch, loam, sand, stone, garden center materials, and practical ordering help from Abby's Jefferson yard.",
      },
      { property: "og:url", content: "https://buytheyard.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LandscapingBusiness",
          name: "Buy The Yard",
          telephone: "+1-508-579-9897",
          email: "abby@btymaterial.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
            addressCountry: "US",
          },
          url: "https://buytheyard.lovable.app",
          founder: {
            "@type": "Person",
            name: "Abby Montalto",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section
        aria-label="Buy The Yard — bulk materials in Central Mass"
        className="border-y border-[var(--rule)]"
      >
        <article className="relative w-full overflow-hidden bg-zinc-950 text-white min-h-[520px] md:min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800" />
          <span aria-hidden="true" className="absolute left-0 inset-y-0 w-[1.5px] bg-brand z-10" />
          <div className="relative z-10 h-full w-full flex items-end md:items-center min-h-[520px] md:min-h-[600px]">
            <div className="px-5 md:px-10 pb-8 md:pb-0 max-w-3xl">
              <p className="eyebrow text-white/70 mb-6">
                Est. 2016 · <Link to="/wbe" className="hover:text-brand transition-colors">Woman-owned</Link> · Jefferson, MA
              </p>
              <h1 className="home-hero-heading display-2 leading-[0.95] text-balance text-white">
                Mulch. Loam. Sand. <span className="text-brand">Stone.</span>
              </h1>
              <p className="lead text-zinc-200 max-w-[54ch] mt-4 text-pretty">
                Bulk landscape materials from Abby’s Jefferson yard — pickup or delivery
                across Central Mass.
              </p>
              <div className="mt-6 flex flex-col gap-2 max-w-md md:flex-row md:flex-wrap md:items-center md:gap-3 md:max-w-none">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-between md:justify-start gap-2 bg-brand text-brand-foreground px-6 h-12 md:h-11 label hover:opacity-90 transition-opacity"
                >
                  Shop materials
                  <ArrowRight className="size-4" />
                </Link>
                <div className="flex items-stretch gap-3 md:contents">
                  <Link
                    to="/quote"
                    className="flex-1 md:flex-none inline-flex items-center justify-center md:justify-start gap-2 border border-white/30 hover:border-white text-white px-5 h-12 md:h-11 label hover:bg-white/10 transition-colors"
                  >
                    Get a quote
                  </Link>
                  <a
                    href="tel:5085799897"
                    className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors h-12 md:h-11 px-3"
                  >
                    <Phone className="size-4 text-brand" />
                    508.579.9897
                  </a>
                </div>
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
