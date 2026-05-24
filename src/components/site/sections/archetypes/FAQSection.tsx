import { Section } from "../Section";

export interface FAQItem { q: string; a: string }

export function FAQSection({
  title = "FIELD QUESTIONS",
  items,
}: {
  title?: string;
  items: FAQItem[];
}) {
  return (
    <Section title={title} tone="paper">
      <div className="divide-y divide-soft">
        {items.map((it) => (
          <details key={it.q} className="group">
            <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
              <h3 className="font-bebas text-2xl uppercase pr-4">{it.q}</h3>
              <span className="transition-transform group-open:rotate-45 text-2xl">+</span>
            </summary>
            <div className="px-8 pb-8 font-barlow text-sm opacity-80 max-w-2xl">{it.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
