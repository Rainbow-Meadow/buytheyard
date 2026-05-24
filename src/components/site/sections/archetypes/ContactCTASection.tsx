import { Section } from "../Section";
import { MonoLabel } from "../MonoLabel";

export interface ContactCTAProps {
  title?: string;
  phone: string;
  email: string;
  address: { line1: string; line2: string };
  primaryLabel?: string;
  primaryHref?: string;
}

export function ContactCTASection({
  title = "GET A QUOTE",
  phone,
  email,
  address,
  primaryLabel = "Order Now",
  primaryHref = "#",
}: ContactCTAProps) {
  return (
    <Section title={title} tone="paper" rule={false}>
      <div className="flex flex-col md:flex-row md:h-[50svh] md:overflow-hidden">
        <div className="flex-1 p-8 md:py-12 md:px-16 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <MonoLabel className="mb-2 block opacity-60">Direct Line</MonoLabel>
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                 className="text-4xl font-bebas text-ember hover:underline">
                {phone}
              </a>
            </div>
            <div>
              <MonoLabel className="mb-2 block opacity-60">Office Email</MonoLabel>
              <a href={`mailto:${email}`} className="text-xl md:text-2xl font-bebas uppercase break-words">
                {email}
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-black text-paper p-6 md:py-10 md:px-10 flex flex-col justify-between">
          <p className="font-barlow text-sm opacity-60">{address.line1}<br/>{address.line2}</p>
          <a
            href={primaryHref}
            className="mt-6 block text-center w-full bg-ember text-paper py-5 font-bebas text-3xl tracking-widest hover:brightness-110 transition-all"
          >
            {primaryLabel}
          </a>
        </div>
      </div>
    </Section>
  );
}
