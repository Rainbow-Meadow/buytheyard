import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-kraft/60 ring-1 ring-black/5 p-4 rounded-md flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-5 bg-zinc-200">
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
      <div className="flex items-center gap-3 pt-3 border-t border-zinc-300/60">
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