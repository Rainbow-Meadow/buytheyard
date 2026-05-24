import { Section } from "../Section";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface ServiceAreaProps {
  title?: string;
  heading: React.ReactNode;
  body: string;
  phone: string;
  towns: string[];
}

export function ServiceAreaSection({
  title = "SERVICE AREA",
  heading,
  body,
  phone,
  towns,
}: ServiceAreaProps) {
  return (
    <Section title={title} tone="paper">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-soft">
          <DisplayHeading as="h2" size="md" className="mb-6">{heading}</DisplayHeading>
          <p className="font-barlow text-lg opacity-80 mb-8 max-w-md">{body}</p>
          <MonoLabel className="block mb-2 opacity-60">Direct Line</MonoLabel>
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="text-4xl font-bebas text-ember hover:underline"
          >
            {phone}
          </a>
        </div>
        <div className="p-8 md:p-16">
          <MonoLabel className="block mb-6 opacity-60">Towns Served</MonoLabel>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
            {towns.map((t) => (
              <li key={t} className="font-bebas text-2xl uppercase leading-none border-b border-ink/10 pb-2">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}