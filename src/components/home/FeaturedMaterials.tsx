import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGroup } from "@/components/site/ProductGroup";

const FEATURED_NAMES = [
  "Hemlock Mulch",
  "Screened Loam",
  "Mason Sand",
  "3/4\" Crushed Blue Stone",
  "Red Lava Rock",
  "Hanging Baskets",
  "ASTM Playground Chips",
] as const;

const featured = FEATURED_NAMES
  .map((n) => products.find((p) => p.name === n))
  .filter((p): p is (typeof products)[number] => Boolean(p));

export default function FeaturedMaterials() {
  return (
    <section className="section bg-base">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 mb-5 md:mb-10">
          <div>
            <p className="eyebrow text-brand mb-3">
              Bulk materials &amp; garden center
            </p>
            <h2 className="display-3 leading-[0.95] text-zinc-950 max-w-[16ch] mt-4 md:mt-6">
              Featured materials
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 label text-zinc-900 hover:text-brand transition-colors"
            >
              See the full catalog <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <ProductGroup products={featured}>
          {/* Mobile: Gallery — 2-col image-overlay grid */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            {featured.map((p) => (
              <ProductCard key={p.name} product={p} variant="gallery" />
            ))}
          </div>

          {/* Desktop: Magazine — tall featured (3 rows) + 6 supporting (2×3) */}
          <div className="hidden md:grid md:grid-cols-3 md:grid-rows-3 md:auto-rows-fr gap-4 items-stretch">
            <div className="md:col-span-1 md:row-span-3 flex">
              <ProductCard product={featured[0]} variant="featured-tall" />
            </div>
            {featured.slice(1, 7).map((p) => (
              <ProductCard key={p.name} product={p} variant="gallery" />
            ))}
          </div>
        </ProductGroup>
      </div>
    </section>
  );
}