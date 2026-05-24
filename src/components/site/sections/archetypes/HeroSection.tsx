import { Section } from "../Section";
import type { SectionBackground } from "../SectionBackdrop";
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
  /** Tailwind object-position class(es) for the background image. Defaults to center. */
  imagePosition?: string;
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
  imagePosition = "object-center",
}: HeroSectionProps) {
  const background: SectionBackground = image
    ? { kind: "photo", src: image, alt: imageAlt, position: imagePosition, gradient: "right" }
    : { kind: "scatter", density: "regular", tint: "ink" };
  return (
    <Section tone="paper" background={background}>
      <div className="relative flex-1 flex flex-col justify-center p-8 md:p-24 min-h-[calc(100svh-4rem)]">
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
