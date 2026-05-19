import type { Product } from "@/data/products";
import { Stamp } from "@/components/site/Stamp";
import { Caption } from "@/components/site/Caption";

type Tone = "paper" | "ink";

export function ClassifiedCard({
  product,
  tone = "paper",
  number,
}: {
  product: Product;
  tone?: Tone;
  number?: string;
}) {
  const isInk = tone === "ink";
  return (
    <article
      className={
        "flex flex-col h-full " +
        (isInk
          ? "bg-ink text-newsprint border border-newsprint/15"
          : "bg-newsprint text-ink border border-ink/15")
      }
    >
      {product.image && (
        <figure className="border-b border-current/15">
          <div className="aspect-[4/3] overflow-hidden bg-newsprint-2">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale-[0.15] contrast-[1.05]"
            />
          </div>
        </figure>
      )}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          {number && (
            <span className={"meta tabular " + (isInk ? "text-newsprint/60" : "text-ink-soft")}>
              {number}
            </span>
          )}
          <span className={"eyebrow " + (isInk ? "text-stamp" : "text-stamp")}>
            {product.category}
          </span>
        </div>
        <h3 className="display-4 leading-tight mb-2">{product.name}</h3>
        <p className={"body-sm flex-1 " + (isInk ? "text-newsprint/80" : "text-ink-soft")}>
          {product.description}
        </p>
        <div className="mt-4 pt-3 rule-hair flex items-center justify-between gap-3">
          {product.badge ? (
            <Stamp size="sm" rotation={-3}>{product.badge}</Stamp>
          ) : (
            <span className={"meta " + (isInk ? "text-newsprint/60" : "text-ink-soft")}>
              PICKUP &amp; DELIVERY
            </span>
          )}
          <span className={"label " + (isInk ? "text-newsprint" : "text-ink")}>
            Call for price
          </span>
        </div>
      </div>
    </article>
  );
}

export { Caption };