import { Section } from "../Section";
import { SectionHeader } from "../SectionHeader";
import { MonoLabel } from "../MonoLabel";

export interface Testimonial { quote: string; attribution: string }

export function TestimonialsSection({
  title = "CUSTOMER FIELD LOGS",
  heading = "Customer Field Logs",
  items,
}: {
  title?: string;
  heading?: string;
  items: Testimonial[];
}) {
  return (
    <Section title={title} tone="paper">
      <div className="p-8 md:p-16">
        <SectionHeader heading={heading} size="md" className="p-0 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink border border-ink">
          {items.map((t) => (
            <div key={t.attribution} className="bg-paper p-8">
              <div className="flex mb-4 text-ember tracking-widest">★★★★★</div>
              <p className="font-barlow italic mb-4 text-lg">"{t.quote}"</p>
              <MonoLabel>— {t.attribution}</MonoLabel>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
