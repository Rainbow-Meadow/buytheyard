import type { Product } from "@/data/products";

export function ProductCard({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "gallery";
}) {
  if (variant === "gallery") {
    return (
      <div className="group relative w-full aspect-square overflow-hidden rounded-sm bg-zinc-200 ring-1 ring-black/5">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 33vw, 50vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface text-surface-foreground p-4 text-center">
            <span className="display-5 leading-[0.95]">{product.name}</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 inline-flex items-center px-1.5 py-0.5 bg-brand text-brand-foreground micro rounded-xs">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 pt-10">
          <p className="eyebrow text-white/70 mb-0.5">{product.category}</p>
          <h3 className="display-5 text-white leading-tight">{product.name}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="group w-full bg-kraft/60 ring-1 ring-black/5 p-3 md:p-4 rounded-md flex flex-col">
      <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-3 md:mb-5 bg-zinc-200">
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
            <span className="eyebrow text-brand mb-2">
              Spec sheet
            </span>
            <span className="display-4 leading-[0.95]">
              {product.name}
            </span>
            <span className="mt-3 micro text-zinc-400">
              Photo on request
            </span>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3 className="display-4 text-zinc-900 leading-tight">
          {product.name}
        </h3>
        <span className="eyebrow text-brand shrink-0">
          {product.category}
        </span>
      </div>
      <p className="text-sm text-zinc-600 mb-3 md:mb-5 flex-1">{product.description}</p>
      {product.badge && (
        <span className="inline-flex self-start mb-3 items-center gap-1.5 px-2 py-1 bg-brand/10 text-brand eyebrow rounded-sm">
          {product.badge}
        </span>
      )}
      <div className="flex items-center gap-3 pt-3 border-t border-zinc-300/60">
        <span className="eyebrow text-zinc-500">
          Available:
        </span>
        <span className="eyebrow text-zinc-900">
          Pickup &amp; Delivery
        </span>
      </div>
    </div>
  );
}