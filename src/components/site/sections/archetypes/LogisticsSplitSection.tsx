import { Section } from "../Section";
import { SectionSplit } from "../SectionSplit";
import { DisplayHeading } from "../DisplayHeading";

export interface LogisticsSplitProps {
  index?: string | number;
  pickup: { heading: string; body: string; specLines: string[] };
  delivery: { heading: string; body: string; ctaLabel: string; ctaHref?: string };
}

export function LogisticsSplitSection({ index = "03", pickup, delivery }: LogisticsSplitProps) {
  return (
    <Section index={index} tone="paper">
      <SectionSplit
        left={
          <>
            <DisplayHeading as="h2" size="md" className="mb-6">{pickup.heading}</DisplayHeading>
            <p className="font-barlow mb-8 opacity-80">{pickup.body}</p>
            <div className="bg-ink text-paper p-6 font-mono-industrial text-xs uppercase leading-loose">
              {pickup.specLines.map((l) => <div key={l}>{l}</div>)}
            </div>
          </>
        }
        right={
          <>
            <DisplayHeading as="h2" size="md" className="mb-6">{delivery.heading}</DisplayHeading>
            <p className="font-barlow mb-8 opacity-80">{delivery.body}</p>
            <a
              href={delivery.ctaHref ?? "#"}
              className="block w-full text-center border-2 border-ink py-4 font-bebas text-xl tracking-widest hover:bg-ink hover:text-paper transition-colors"
            >
              {delivery.ctaLabel}
            </a>
          </>
        }
        rightTone="soft"
      />
    </Section>
  );
}
