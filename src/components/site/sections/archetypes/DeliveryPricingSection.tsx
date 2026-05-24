import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface DeliveryZone {
  town: string;
  fee: string;
}

export function DeliveryPricingSection({
  title = "DELIVERY ZONES",
  heading = "Delivery Pricing",
  note = "3 cubic yard minimum. Orders under 3 yards add $10. Same-day delivery for orders placed before 2:00 PM EST.",
  zones,
}: {
  title?: string;
  heading?: string;
  note?: string;
  zones: DeliveryZone[];
}) {
  return (
    <Section title={title} tone="paper">
      <div className="p-8 md:p-16">
        <DisplayHeading as="h2" size="md" className="mb-4">{heading}</DisplayHeading>
        <p className="font-barlow text-sm opacity-70 mb-10 max-w-2xl">{note}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {zones.map((z) => (
            <div key={z.town} className="bg-paper p-5 flex flex-col">
              <MonoLabel className="opacity-60 mb-2">{z.town}</MonoLabel>
              <span className="font-bebas text-3xl text-ember leading-none">{z.fee}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}