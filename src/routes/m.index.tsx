import { createFileRoute, Link } from "@tanstack/react-router";
import { mHome, mBrand, mProducts } from "../mobile/copy";

export const Route = createFileRoute("/m/")({
  head: () => ({
    meta: [
      { title: "Buy The Yard — Mobile" },
      { name: "description", content: "Bulk mulch, loam, sand and stone in Jefferson, MA." },
    ],
  }),
  component: MHome,
});

function MHome() {
  return (
    <div className="px-5 py-6 space-y-6">
      <section className="m-card p-6">
        <p className="m-eyebrow mb-3">{mHome.eyebrow}</p>
        <h1 className="m-display text-4xl mb-4">{mHome.headline}</h1>
        <p className="text-sm text-m-muted leading-relaxed mb-6">{mHome.sub}</p>
        <a href={`tel:${mBrand.phoneTel}`} className="m-btn mb-3">{mHome.cta}</a>
        <Link to="/m/shop" className="m-btn-ghost">{mHome.shopCta}</Link>
      </section>

      <section>
        <p className="m-eyebrow mb-3 px-1">Featured</p>
        <div className="grid grid-cols-2 gap-3">
          {mProducts.slice(0, 4).map((p) => (
            <Link to="/m/shop" key={p.name} className="m-tile">
              <span className="m-slot absolute inset-0">{p.slot}</span>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-m-bg to-transparent">
                <p className="m-display text-lg">{p.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-m-muted">{p.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}