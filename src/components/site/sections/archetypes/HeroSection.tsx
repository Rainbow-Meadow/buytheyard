import { Section } from "../Section";
import { MonoLabel } from "../MonoLabel";
import { DisplayHeading } from "../DisplayHeading";
import { InlineCTA } from "../InlineCTA";

export interface HeroSectionProps {
  meta: string;
  heading: React.ReactNode;
  body: string;
  ctaLabel: string;
  ctaTo?: string;
  ctaHref?: string;
  /** Optional background photo; rendered behind a paper→transparent gradient for legibility. */
  image?: string;
  imageAlt?: string;
}

export function HeroSection({
  meta,
  heading,
  body,
  ctaLabel,
  ctaTo,
  ctaHref,
  image,
  imageAlt,
}: HeroSectionProps) {
  return (
    <Section tone="paper">
      <div className="relative flex-1 flex flex-col justify-center p-8 md:p-24 min-h-[80vh] overflow-hidden">
        {image && (
          <>
            <img
              src={image}
              alt={imageAlt ?? ""}
              aria-hidden={imageAlt ? undefined : true}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              loading="eager"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-paper/90 via-paper/55 to-paper/15 md:to-transparent"
              aria-hidden
            />
          </>
        )}
        <div className="relative max-w-4xl">
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
