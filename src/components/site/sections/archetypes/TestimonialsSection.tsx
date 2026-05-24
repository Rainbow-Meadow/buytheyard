import { Section } from "../Section";
import { MonoLabel } from "../MonoLabel";

export interface Testimonial { quote: string; attribution: string }

export function TestimonialsSection({
  title = "CUSTOMER FIELD LOGS",
  items,
}: {
  title?: string;
  items: Testimonial[];
}) {
  return (
    <Section title={title} tone="paper">
      <div className="p-6 md:py-10 md:px-16 md:min-h-[50svh] md:flex md:flex-col md:justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink border border-ink">
          {items.map((t) => (
            <div key={t.attribution} className="bg-paper p-6 md:p-8">
              <div className="flex mb-3 text-ember tracking-widest">★★★★★</div>
              <p className="font-barlow italic mb-3 text-lg">"{t.quote}"</p>
              <MonoLabel>— {t.attribution}</MonoLabel>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
