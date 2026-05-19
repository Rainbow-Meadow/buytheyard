import { createFileRoute, Link } from "@tanstack/react-router";
import { mProducts, mBrand } from "../mobile/copy";

export const Route = createFileRoute("/m/shop")({
  head: () => ({
    meta: [{ title: "Shop — Buy The Yard" }],
  }),
  component: MShop,
});

function MShop() {
  return (
    <div className="px-5 py-6">
      <p className="m-eyebrow mb-2">All Materials</p>
      <h1 className="m-display text-3xl mb-6">By the yard.</h1>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {mProducts.map((p) => (
          <div key={p.name} className="m-tile">
            <span className="m-slot absolute inset-0">{p.slot}</span>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-m-bg to-transparent">
              <p className="m-display text-lg">{p.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-m-muted">{p.note}</p>
            </div>
          </div>
        ))}
      </div>
      <a href={`tel:${mBrand.phoneTel}`} className="m-btn">Call for pricing</a>
      <Link to="/m/contact" className="m-btn-ghost mt-3">Visit the yard</Link>
    </div>
  );
}