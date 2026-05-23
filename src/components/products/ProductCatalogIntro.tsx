import { Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, Phone, Ruler, Truck } from "lucide-react";
import { categories, categoryPricing, products } from "@/data/products";
import type { TileBlock } from "@/components/site/Tile";

const heroCategories = categories.filter((category) =>
  products.some((product) => product.category === category),
);

export function ProductCatalogIntro(_: { categorySlides?: TileBlock[] }) {
  return (
    <section aria-labelledby="products-heading" className="bg-base text-zinc-900 py-4 md:py-6">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="grid min-h-[calc(100svh-7rem)] gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-stretch">
          <article className="relative overflow-hidden rounded-md bg-white p-5 ring-1 ring-zinc-300 md:p-7 lg:p-8">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="eyebrow text-brand mb-4 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  Materials catalog
                </p>
                <h1 id="products-heading" className="display-3 leading-[0.95] text-balance text-zinc-950">
                  Today’s material list starts here.
                </h1>
                <p className="body mt-5 max-w-[48ch] text-zinc-700 text-pretty">
                  Browse what the yard carries, then call for today’s price. Abby can confirm the material, quantity, pickup or delivery, and whether the route has room.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    href="tel:5085799897"
                    className="inline-flex h-12 items-center justify-between gap-3 bg-brand px-5 label text-white hover:opacity-90"
                  >
                    Call Abby <Phone className="size-4" />
                  </a>
                  <Link
                    to="/quote"
                    className="inline-flex h-12 items-center justify-between gap-3 border border-zinc-300 bg-kraft px-5 label text-zinc-950 hover:bg-zinc-100"
                  >
                    Send a list <ArrowRight className="size-4 text-brand" />
                  </Link>
                </div>
                <div className="grid gap-2 text-sm text-zinc-700 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <HeroCue icon={<Ruler />} label="Measure" value="Length × width × depth" />
                  <HeroCue icon={<Truck />} label="Delivery" value="1-yard minimum" />
                  <HeroCue icon={<ClipboardCheck />} label="Confirm" value="Price before it leaves" />
                </div>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-md bg-surface text-white ring-1 ring-zinc-800">
            <span aria-hidden="true" className="absolute left-0 inset-y-0 w-1.5 bg-brand" />
            <div className="flex h-full flex-col">
              <div className="border-b border-white/10 p-5 md:p-6">
                <p className="eyebrow text-brand mb-2 inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-0.5 w-7 bg-brand" />
                  Yard counter board
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="display-4 leading-none text-balance">Price by phone</h2>
                  <a href="tel:5085799897" className="label text-white hover:text-brand">
                    508.579.9897
                  </a>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3 md:p-4">
                <div className="space-y-2">
                  {heroCategories.map((category) => {
                    const items = products.filter((product) => product.category === category);
                    const pricing = categoryPricing[category];
                    return (
                      <section key={category} className="rounded-md bg-white/[0.06] ring-1 ring-white/10 overflow-hidden">
                        <div className="grid gap-2 border-b border-white/10 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                          <div>
                            <p className="eyebrow text-brand">{category}</p>
                            <p className="body-sm text-zinc-300">
                              {items.length} option{items.length === 1 ? "" : "s"}
                            </p>
                          </div>
                          <div className="sm:text-right">
                            <p className="label text-white">{pricing.range}</p>
                            <p className="body-sm text-zinc-500">{pricing.unit}</p>
                          </div>
                        </div>
                        <ul className="divide-y divide-white/10">
                          {items.map((item) => (
                            <li key={item.name} className="grid gap-1 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                              <div>
                                <p className="display-5 leading-tight text-white text-balance">{item.name}</p>
                                <p className="body-sm mt-1 line-clamp-2 text-zinc-400 text-pretty">{item.description}</p>
                              </div>
                              {item.badge ? (
                                <span className="eyebrow text-brand sm:ml-4 sm:text-right">{item.badge}</span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/20 p-4 md:p-5">
                <p className="body-sm text-zinc-300 text-pretty">
                  Prices change with stock, season, and supplier costs. Call before planning the load.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function HeroCue({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md bg-kraft p-3 ring-1 ring-zinc-300">
      <div className="mb-2 text-brand [&>*]:size-4" aria-hidden="true">{icon}</div>
      <p className="eyebrow text-brand">{label}</p>
      <p className="body-sm text-zinc-700">{value}</p>
    </div>
  );
}
