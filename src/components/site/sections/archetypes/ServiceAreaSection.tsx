import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";
import { DisplayHeading } from "../DisplayHeading";
import { MonoLabel } from "../MonoLabel";

export interface ServiceAreaProps {
  title?: string;
  heading: React.ReactNode;
  body: string;
  phone: string;
  towns: string[];
  /** Optional hero photo for the band; gradient fades to the right so the towns list stays clean. */
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Override the background treatment. Defaults to a photo if `image` is set, otherwise scatter. */
  background?: SectionBackground;
}

export function ServiceAreaSection({
  title = "SERVICE AREA",
  heading,
  body,
  phone,
  towns,
  image,
  imageAlt,
  imagePosition = "object-center",
  background,
}: ServiceAreaProps) {
  const bg: SectionBackground =
    background ??
    (image
      ? { kind: "photo", src: image, alt: imageAlt, position: imagePosition, gradient: "right" }
      : { kind: "scatter", density: "regular", tint: "ink" });
  return (
    <Section title={title} tone="paper" background={bg}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(70svh-2.8rem)] md:items-center md:overflow-hidden">
        <div className="p-6 md:py-10 md:px-14 border-b md:border-b-0 md:border-r border-soft">
          <DisplayHeading as="h2" size="md" className="mb-4">{heading}</DisplayHeading>
          <p className="font-barlow text-lg opacity-80 mb-6 max-w-md">{body}</p>
          <MonoLabel className="block mb-2 opacity-60">Direct Line</MonoLabel>
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="text-4xl font-bebas text-ember hover:underline"
          >
            {phone}
          </a>
        </div>
        <div className="p-6 md:py-10 md:px-14">
          <MonoLabel className="block mb-6 opacity-60">Towns Served</MonoLabel>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
            {towns.map((t) => (
              <li key={t} className="font-bebas text-2xl uppercase leading-none border-b border-ink/10 pb-1.5">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}