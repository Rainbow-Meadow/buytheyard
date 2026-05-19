import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { categories, products } from "@/data/products";
import { ClassifiedCard } from "@/components/site/ClassifiedCard";
import { RuleBar } from "@/components/site/RuleBar";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Mulch, Loam, Sand & Stone | Buy The Yard" },
      {
        name: "description",
        content:
          "Bulk mulch, loam, sand, gravel, specialty stone, plus garden center and ASTM playground chips. Pickup or delivery from Jefferson, MA.",
      },
      { property: "og:title", content: "Products — Buy The Yard" },
      {
        property: "og:description",
        content: "Bulk landscape materials. By the yard. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "/products" },
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-products.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-products.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/products" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Buy The Yard — Materials Catalog",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              category: p.category,
              brand: { "@type": "Brand", name: "Buy The Yard" },
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                seller: { "@type": "LocalBusiness", name: "Buy The Yard" },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  description: "Call 508-579-9897 for today's price",
                },
              },
            },
          })),
        }),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      {/* Masthead banner */}
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8 md:pb-10">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">CATALOG SECTION · § C</span>
            <span className="dateline text-ink-soft hidden sm:inline">
              ONE-YARD MINIMUM · PICKUP OR DELIVERY
            </span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[20ch]">
            The Materials Catalog,{" "}
            <span className="text-stamp">by the yard.</span>
          </h1>
          <p className="lead mt-4 md:mt-6 max-w-[60ch] text-ink-soft not-italic">
            Prices move with the season — call{" "}
            <a href="tel:5085799897" className="text-ink underline underline-offset-4 hover:text-stamp">
              508-579-9897
            </a>{" "}
            for today's number. We'll size your project on the call.
          </p>
        </div>
      </section>

      {categories.map((cat, idx) => {
        const items = products.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        const sectionNo = String(idx + 1).padStart(2, "0");
        const bg = idx % 2 === 0 ? "bg-newsprint" : "bg-newsprint-2";
        return (
          <section key={cat} className={`section ${bg}`}>
            <div className="max-w-7xl mx-auto px-5 md:px-8">
              <RuleBar
                number={`§ ${sectionNo}`}
                label={cat}
                right={
                  <span className="label text-ink-soft">
                    {items.length} {items.length === 1 ? "LISTING" : "LISTINGS"}
                  </span>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-ink/15">
                  {items.map((p, i) => (
                    <div
                      key={p.name}
                      className="border-r border-b border-ink/15 -mr-px -mb-px"
                    >
                      <ClassifiedCard
                        product={p}
                        number={`№ ${sectionNo}-${String(i + 1).padStart(2, "0")}`}
                      />
                    </div>
                  ))}
                </div>
              </RuleBar>
            </div>
          </section>
        );
      })}

      <section className="bg-ink text-newsprint section-loose">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <p className="dateline text-newsprint/60">— END OF CATALOG —</p>
          <h2 className="display-2 mt-4 text-balance">
            Looking for something else?
          </h2>
          <p className="body mt-4 text-newsprint/80 max-w-[52ch] mx-auto">
            Bulk salt and ice melt in winter, bagged soils year-round, and seasonal
            specials. Call to confirm stock.
          </p>
          <a
            href="tel:5085799897"
            className="mt-7 inline-flex items-center gap-2 bg-stamp text-newsprint label px-7 h-12 btn-press hover:bg-newsprint hover:text-ink"
          >
            <Phone className="size-4" strokeWidth={2.5} /> 508.579.9897
          </a>
        </div>
      </section>
    </>
  );
}
