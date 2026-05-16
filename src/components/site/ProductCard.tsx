import { categoryPricing, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const pricing = categoryPricing[product.category];
  return (
    <div className="group bg-kraft/60 ring-1 ring-black/5 p-4 rounded-md flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-5 bg-zinc-200">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-surface text-surface-foreground p-6 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-2">
              Spec sheet
            </span>
            <span className="font-display text-3xl uppercase leading-[0.95]">
              {product.name}
            </span>
            <span className="mt-3 text-[10px] uppercase tracking-widest text-zinc-400">
              Photo on request
            </span>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3 className="font-display text-2xl uppercase text-zinc-900 leading-tight">
          {product.name}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand shrink-0">
          {product.category}
        </span>
      </div>
      <p className="text-sm text-zinc-600 mb-5 flex-1">{product.description}</p>
      {product.badge && (
        <span className="inline-flex self-start mb-3 items-center gap-1.5 px-2 py-1 bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest rounded-sm">
          {product.badge}
        </span>
      )}
      <div className="flex items-baseline justify-between gap-3 pt-3 mb-2 border-t border-zinc-300/60">
        <span className="font-display text-2xl uppercase text-zinc-900 leading-none">
          {pricing.range}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          {pricing.unit} · {product.category} range
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Available:
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
          Pickup &amp; Delivery
        </span>
      </div>
    </div>
  );
}