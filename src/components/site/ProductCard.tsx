import type { Product } from "@/data/products";

export function ProductCard({
  product,
  tone = "light",
}: {
  product: Product;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={
        isDark
          ? "group w-full bg-white/5 ring-1 ring-white/10 p-3 md:p-4 rounded-md flex flex-col"
          : "group w-full bg-kraft/60 ring-1 ring-black/5 p-3 md:p-4 rounded-md flex flex-col"
      }
    >
      <div
        className={
          "w-full aspect-[4/3] overflow-hidden rounded-sm mb-3 md:mb-5 " +
          (isDark ? "bg-zinc-800" : "bg-zinc-200")
        }
      >
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
        <h3 className={"display-4 leading-tight " + (isDark ? "text-white" : "text-zinc-900")}>
          {product.name}
        </h3>
        <span className="eyebrow text-brand shrink-0">
          {product.category}
        </span>
      </div>
      <p className={"text-sm mb-3 md:mb-5 flex-1 " + (isDark ? "text-zinc-300" : "text-zinc-600")}>{product.description}</p>
      {product.badge && (
        <span className="inline-flex self-start mb-3 items-center gap-1.5 px-2 py-1 bg-brand/10 text-brand eyebrow rounded-sm">
          {product.badge}
        </span>
      )}
      <div className={"flex items-center gap-3 pt-3 border-t " + (isDark ? "border-white/10" : "border-zinc-300/60")}>
        <span className={"eyebrow " + (isDark ? "text-zinc-400" : "text-zinc-500")}>
          Available:
        </span>
        <span className={"eyebrow " + (isDark ? "text-white" : "text-zinc-900")}>
          Pickup &amp; Delivery
        </span>
      </div>
    </div>
  );
}