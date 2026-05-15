import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Mulch, Loam, Sand & Stone | Buy The Yard" },
      {
        name: "description",
        content:
          "The full catalog. Mulches, screened loam, mason sand, crushed and decorative stone, hanging baskets, annuals, plant mix and compost, ASTM playground chips. Pickup or delivery from Jefferson, MA.",
      },
      { property: "og:title", content: "Products — Buy The Yard" },
      {
        property: "og:description",
        content: "Bulk landscape materials. By the yard. Pickup or delivery in Central Mass.",
      },
      { property: "og:url", content: "/products" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Catalog
          </p>
          <h1 className="font-display text-6xl md:text-7xl uppercase leading-[0.9] max-w-[18ch]">
            Materials, by the <span className="text-brand">yard</span>.
          </h1>
          <p className="mt-6 text-zinc-400 max-w-[60ch] text-lg">
            Pricing moves with the season — and with how much you need. Call{" "}
            <a href="tel:5085799897" className="text-zinc-100 underline underline-offset-4">
              508-579-9897
            </a>{" "}
            for today's number.
          </p>
        </div>
      </section>

      {categories.map((cat) => {
        const items = products.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="py-16 md:py-20 bg-base border-b border-zinc-200 last:border-0">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10 border-b-2 border-zinc-900 pb-4">
                <h2 className="font-display text-3xl md:text-4xl uppercase leading-none text-zinc-900">
                  {cat}
                </h2>
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {items.length} {items.length === 1 ? "option" : "options"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-kraft py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl uppercase mb-4">
            Don't see what you need?
          </h2>
          <p className="text-zinc-700 mb-8">
            We carry more than what's listed. Bulk salt and ice melt all winter.
            Specialty bagged stuff. Seasonal one-offs. Pick up the phone — we'll tell you straight.
          </p>
          <a
            href="tel:5085799897"
            className="inline-flex items-center gap-2 bg-brand text-brand-foreground px-7 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90"
          >
            <Phone className="size-4" /> 508.579.9897
          </a>
        </div>
      </section>
    </>
  );
}
