import { Section } from "../Section";
import { MonoLabel } from "../MonoLabel";
import { DisplayHeading } from "../DisplayHeading";
import { InlineCTA } from "../InlineCTA";

export interface HeroSectionProps {
  title?: string;
  meta: string;
  heading: React.ReactNode;
  body: string;
  ctaLabel: string;
  ctaTo?: string;
  ctaHref?: string;
}

export function HeroSection({
  title = "JEFFERSON YARD",
  meta,
  heading,
  body,
  ctaLabel,
  ctaTo,
  ctaHref,
}: HeroSectionProps) {
  return (
    <Section title={title} tone="paper">
      <div className="flex-1 flex flex-col justify-center p-8 md:p-24 min-h-[80vh]">
        <div className="max-w-4xl">
          <MonoLabel accent className="mb-4 block">{meta}</MonoLabel>
          <DisplayHeading as="h1" size="xxl" className="mb-8">
            {heading}
          </DisplayHeading>
          <p className="font-barlow text-xl md:text-2xl max-w-xl opacity-80 mb-10">
            {body}
          </p>
          <InlineCTA to={ctaTo} href={ctaHref}>{ctaLabel}</InlineCTA>
        </div>
      </div>
    </Section>
  );
}
