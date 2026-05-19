import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "../desktop/copy";

export const Route = createFileRoute("/_desktop/products")({
  head: () => ({
    meta: [
      { title: "Products — Buy The Yard | Bulk Mulch, Loam, Stone" },
      { name: "description", content: "Browse bulk mulch, loam, sand, gravel, specialty stone, playground chips, and garden center inventory at Buy The Yard." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return (
    <>
      <header className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
        <div className="md:col-span-8 d-card p-10">
          <p className="d-eyebrow mb-4">The Inventory</p>
          <h1 className="d-serif text-5xl lg:text-6xl leading-tight mb-4">
            Every yard, weighed and ready.
          </h1>
          <p className="text-d-muted max-w-2xl leading-relaxed">
            Twelve material lines, one phone number. Pickup loads start at half a yard;
            delivery starts at three.
          </p>
        </div>
        <div className="md:col-span-4 bg-d-gold p-8 flex flex-col justify-between text-d-bg">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Today's pricing</p>
          <p className="d-serif text-3xl leading-tight">Call the yard for live per-yard rates.</p>
          <Link to="/quote" className="text-[10px] uppercase tracking-widest font-bold">Request a quote →</Link>
        </div>
      </header>

      <div className="space-y-12">
        {categories.map((cat) => (
          <section key={cat}>
            <div className="flex items-baseline justify-between border-b border-d-line pb-4 mb-6">
              <h2 className="d-serif text-3xl text-d-gold-light">{cat}</h2>
              <span className="d-eyebrow">
                {products.filter((p) => p.category === cat).length} lines
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter((p) => p.category === cat)
                .map((p) => (
                  <article key={p.name} className="d-card p-8 flex flex-col justify-between min-h-[180px]">
                    <div>
                      <h3 className="d-serif text-2xl mb-2">{p.name}</h3>
                      <p className="text-sm text-d-muted">{p.note}</p>
                    </div>
                    <p className="d-eyebrow mt-6">Per yard · call</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}