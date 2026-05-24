import { Section } from "../Section";
import { MonoLabel } from "../MonoLabel";

export interface CatalogItem {
  name: string;
  description: string;
  price: string;
  unit: string;
  stockNote?: string;
  image?: string;
}

export function ProductCatalogSection({
  title,
  items,
}: {
  title?: string;
  items: CatalogItem[];
}) {
  return (
    <Section title={title} tone="paper">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border-y border-ink/10 md:h-[calc(100svh-4rem)]">
        {items.map((it) => (
          <article
            key={it.name}
            className="bg-paper p-6 md:p-8 lg:p-6 flex flex-col min-h-0"
          >
            <div className="aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0 bg-soft mb-6 relative overflow-hidden">
              {it.image ? (
                <img
                  src={it.image}
                  alt={it.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center font-mono-industrial text-[10px] tracking-widest uppercase text-ink/40">
                  {it.name}
                </span>
              )}
            </div>
            <h3 className="font-bebas text-2xl md:text-3xl uppercase leading-none mb-2 shrink-0">
              {it.name}
              {it.stockNote && (
                <span className="ml-2 font-mono-industrial text-[10px] tracking-widest text-ink/50 normal-case">
                  ({it.stockNote})
                </span>
              )}
            </h3>
            <p className="font-barlow text-sm opacity-75 mb-6 flex-1 lg:flex-none shrink-0">{it.description}</p>
            <div className="flex items-baseline justify-between border-t border-ink/10 pt-4 shrink-0">
              <span className="font-bebas text-3xl text-ember leading-none">{it.price}</span>
              <MonoLabel className="opacity-60">{it.unit}</MonoLabel>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}