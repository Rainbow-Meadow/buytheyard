import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";
import { SectionSplit } from "../SectionSplit";
import { DisplayHeading } from "../DisplayHeading";

export interface LogisticsSplitProps {
  title?: string;
  pickup: { heading: string; body: string; specLines: string[] };
  delivery: { heading: string; body: string; ctaLabel: string; ctaHref?: string };
  heightClass?: string;
}

export function LogisticsSplitSection({ title = "PICKUP & DELIVERY", pickup, delivery, heightClass }: LogisticsSplitProps) {
  const compact = Boolean(heightClass);
  return (
    <Section title={title} tone="paper" heightClass={heightClass}>
      <SectionSplit
        compact={compact}
        left={
          <>
            <DisplayHeading as="h2" size="md" className={compact ? "mb-3" : "mb-6"}>{pickup.heading}</DisplayHeading>
            <p className={`font-barlow opacity-80 ${compact ? "mb-4 text-sm" : "mb-8"}`}>{pickup.body}</p>
            <div className={`bg-ink text-paper font-mono-industrial text-xs uppercase ${compact ? "p-4 leading-relaxed" : "p-6 leading-loose"}`}>
              {pickup.specLines.map((l) => <div key={l}>{l}</div>)}
            </div>
          </>
        }
        right={
          <>
            <DisplayHeading as="h2" size="md" className={compact ? "mb-3" : "mb-6"}>{delivery.heading}</DisplayHeading>
            <p className={`font-barlow opacity-80 ${compact ? "mb-4 text-sm" : "mb-8"}`}>{delivery.body}</p>
            <a
              href={delivery.ctaHref ?? "#"}
              className={`block w-full text-center border-2 border-ink font-bebas tracking-widest hover:bg-ink hover:text-paper transition-colors ${compact ? "py-3 text-lg" : "py-4 text-xl"}`}
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
