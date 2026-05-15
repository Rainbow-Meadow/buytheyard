import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard | 508-579-9897 | Jefferson, MA" },
      {
        name: "description",
        content:
          "Call 508-579-9897, email abby@cmscllc.com, or visit Buy The Yard at 2264 Main St., Jefferson, MA 01522. Spring/summer: Mon–Fri 7a–4p, Sat 8a–12p.",
      },
      { property: "og:title", content: "Contact — Buy The Yard" },
      { property: "og:description", content: "Phone, address, hours, and map for the Jefferson, MA yard." },
      { property: "og:url", content: "/contact" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Buy The Yard",
          telephone: "+1-508-579-9897",
          email: "abby@cmscllc.com",
          sameAs: ["https://www.facebook.com/BuyTheYardOutdoorProducts"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "07:00", closes: "16:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-surface text-surface-foreground">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand mb-4">
            Contact
          </p>
          <h1 className="font-display text-6xl md:text-8xl uppercase leading-[0.9] max-w-[16ch]">
            Best way to reach us? <span className="text-brand">Call.</span>
          </h1>
          <a
            href="tel:5085799897"
            className="mt-10 inline-flex items-center gap-3 font-display text-5xl md:text-6xl uppercase text-brand hover:opacity-80 transition-opacity"
          >
            <Phone className="size-10" strokeWidth={2.5} />
            508.579.9897
          </a>
          <p className="mt-6 text-zinc-400 max-w-[60ch]">
            Calling is the fastest way to get answers about pricing, availability, and
            delivery scheduling. For non-urgent questions, email{" "}
            <a
              href="mailto:abby@cmscllc.com"
              className="text-zinc-100 underline underline-offset-4 hover:text-brand"
            >
              abby@cmscllc.com
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-20 bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <Phone className="size-7 text-brand mb-4" />
            <h2 className="font-display text-2xl uppercase mb-2">Phone &amp; Email</h2>
            <a href="tel:5085799897" className="text-zinc-900 font-semibold hover:text-brand">
              508-579-9897
            </a>
            <a
              href="mailto:abby@cmscllc.com"
              className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-brand"
            >
              <Mail className="size-4" /> abby@cmscllc.com
            </a>
            <p className="text-xs text-zinc-600 mt-2">
              Cell signal at the yard isn't perfect. If we miss you, leave a message.
            </p>
          </div>

          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <MapPin className="size-7 text-brand mb-4" />
            <h2 className="font-display text-2xl uppercase mb-2">Address</h2>
            <p className="text-zinc-900">
              2264 Main St.
              <br />
              Jefferson, MA 01522
            </p>
            <a
              href="https://maps.google.com/?q=2264+Main+St,+Jefferson,+MA+01522"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs uppercase tracking-widest text-brand font-semibold"
            >
              Open in maps →
            </a>
          </div>

          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <Clock className="size-7 text-brand mb-4" />
            <h2 className="font-display text-2xl uppercase mb-2">Hours</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">
              Spring &amp; summer
            </p>
            <ul className="text-sm text-zinc-900 space-y-1">
              <li className="flex justify-between gap-4"><span>Mon–Fri</span><span>7a – 4p</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>8a – 12p</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-zinc-500">Closed</span></li>
            </ul>
            <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
              Aug 1 onward: weekend pickup &amp; delivery by appointment. Closed 6/28–7/6
              (appointment only). Winter salt: call for hours. Hours follow the season —
              call to confirm.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-md ring-1 ring-zinc-300">
            <iframe
              title="Buy The Yard location map"
              src="https://www.google.com/maps?q=2264+Main+St,+Jefferson,+MA+01522&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
