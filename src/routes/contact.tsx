import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Buy The Yard | 508-579-9897 | Jefferson, MA" },
      {
        name: "description",
        content:
          "Call 508-579-9897 or send a quote online. Stop by Buy The Yard at 2264 Main St., Jefferson, MA 01522. In-season: Mon–Fri 8a–5p, Sat 8a–3p.",
      },
      { property: "og:title", content: "Contact — Buy The Yard" },
      { property: "og:description", content: "Phone, address, hours, and the map. Jefferson, MA." },
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
          email: "abby@btymaterial.com",
          sameAs: [
            "https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/",
            "https://www.yelp.com/biz/buy-the-yard-holden",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "2264 Main St.",
            addressLocality: "Jefferson",
            addressRegion: "MA",
            postalCode: "01522",
            addressCountry: "US",
          },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "17:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "15:00" },
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
            Get in <span className="text-brand">touch.</span>
          </h1>
          <p className="mt-6 text-zinc-400 max-w-[60ch] text-lg">
            Two equally good ways. Call the yard for a fast answer. Or send a quote
            request — Abby comes back with pricing and a delivery window.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <a
              href="tel:5085799897"
              className="group flex items-center gap-4 bg-brand text-brand-foreground px-6 py-6 rounded-md hover:opacity-90 transition-opacity"
            >
              <Phone className="size-8 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                  Call
                </span>
                <span className="font-display text-3xl md:text-4xl uppercase">
                  508.579.9897
                </span>
              </span>
            </a>
            <Link
              to="/quote"
              className="group flex items-center gap-4 bg-brand text-brand-foreground px-6 py-6 rounded-md hover:opacity-90 transition-opacity"
            >
              <ClipboardList className="size-8 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                  Online
                </span>
                <span className="font-display text-3xl md:text-4xl uppercase">
                  Get a quote
                </span>
              </span>
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-400 max-w-[60ch]">
            For non-urgent stuff, email{" "}
            <a
              href="mailto:abby@btymaterial.com"
              className="text-zinc-100 underline underline-offset-4 hover:text-brand"
            >
              abby@btymaterial.com
            </a>
            . The chat widget on the old site isn't monitored in real time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-brand"
            >
              <Facebook className="size-4" /> Facebook
            </a>
            <a
              href="https://www.yelp.com/biz/buy-the-yard-holden"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-brand"
            >
              <Star className="size-4" /> Yelp
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <ClipboardList className="size-7 text-brand mb-4" />
            <h2 className="font-display text-2xl uppercase mb-2">Get a Quote</h2>
            <p className="text-sm text-zinc-700 mb-3">
              Send your materials list, town, and timing. Abby comes back with pricing — fast.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand font-semibold hover:opacity-80"
            >
              Start a request <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <Phone className="size-7 text-brand mb-4" />
            <h2 className="font-display text-2xl uppercase mb-2">Phone &amp; Email</h2>
            <a href="tel:5085799897" className="text-zinc-900 font-semibold hover:text-brand">
              508-579-9897
            </a>
            <a
              href="mailto:abby@btymaterial.com"
              className="mt-2 inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-brand"
            >
              <Mail className="size-4" /> abby@btymaterial.com
            </a>
            <p className="text-xs text-zinc-600 mt-2">
              Cell signal at the yard isn't perfect. Miss us? Leave a message — we call back.
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
              In-season (4/1 – 8/1)
            </p>
            <ul className="text-sm text-zinc-900 space-y-1">
              <li className="flex justify-between gap-4"><span>Mon–Fri</span><span>8a – 5p</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>8a – 3p</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-zinc-500">Closed</span></li>
            </ul>
            <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
              We open the 2026 season on <strong>April 1</strong>. After 8/1, pickup &amp;
              delivery are by appointment. Salt &amp; ice melt run year-round — call for
              loading hours.
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
