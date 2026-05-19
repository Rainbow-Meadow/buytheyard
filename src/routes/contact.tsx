import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Mail,
  MapPin,
  Phone,
  Facebook,
} from "lucide-react";
import { YelpLogo } from "@/components/site/YelpLogo";

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
      { property: "og:image", content: "https://buytheyard.lovable.app/og/og-contact.jpg" },
      { name: "twitter:image", content: "https://buytheyard.lovable.app/og/og-contact.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://buytheyard.lovable.app/contact" },
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
      <section className="bg-newsprint paper-grain border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-8 md:pb-10">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thin">
            <span className="dateline text-ink-soft">CONTACT DESK · § C</span>
            <span className="dateline text-ink-soft hidden sm:inline">PHONE IS FASTEST</span>
          </div>
          <h1 className="display-1 mt-5 md:mt-7 text-ink text-balance max-w-[16ch]">
            Call. <span className="text-stamp">We answer.</span>
          </h1>
          <p className="lead mt-4 max-w-[60ch] text-ink-soft not-italic">
            Phone is fastest. Use the online quote form for material lists. Email for non-urgent questions.
          </p>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-0 max-w-3xl border-l border-t border-ink/15">
            <a
              href="tel:5085799897"
              className="group flex items-center gap-4 bg-stamp text-newsprint px-6 py-6 border-r border-b border-ink/15 btn-press hover:bg-ink"
            >
              <Phone className="size-8 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight">
                <span className="eyebrow opacity-80">CALL THE YARD</span>
                <span className="display-4 tabular">508.579.9897</span>
              </span>
            </a>
            <Link
              to="/quote"
              className="group flex items-center gap-4 bg-ink text-newsprint px-6 py-6 border-r border-b border-ink/15 btn-press hover:bg-stamp"
            >
              <ClipboardList className="size-8 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight flex-1">
                <span className="eyebrow opacity-80">ONLINE FORM</span>
                <span className="display-4">File a quote</span>
              </span>
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="mt-5 body-sm text-ink-soft max-w-[60ch]">
            For non-urgent stuff, email{" "}
            <a
              href="mailto:abby@btymaterial.com"
              className="text-ink underline underline-offset-4 hover:text-stamp"
            >
              abby@btymaterial.com
            </a>
            . Please note: the chat widget on our previous website is no longer monitored.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <a
              href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 label text-ink-soft hover:text-stamp"
            >
              <Facebook className="size-4" /> FACEBOOK
            </a>
            <a
              href="https://www.yelp.com/biz/buy-the-yard-holden"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 label text-ink-soft hover:text-stamp"
            >
              <YelpLogo className="size-4" /> YELP
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-newsprint-2 border-y border-rule-strong">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-ink/15">
          <div className="bg-newsprint p-7 border-r border-b border-ink/15">
            <ClipboardList className="size-7 text-stamp mb-4" />
            <p className="eyebrow text-ink-soft mb-1">§ 01</p>
            <h2 className="display-4 text-ink mb-2">Get a Quote</h2>
            <p className="body-sm text-ink-soft mb-3">
              Best for material lists. Submit your products, town, and project
              timing, and we'll respond with pricing.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 label text-stamp hover:text-ink"
            >
              START A REQUEST <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="bg-newsprint p-7 border-r border-b border-ink/15">
            <Phone className="size-7 text-stamp mb-4" />
            <p className="eyebrow text-ink-soft mb-1">§ 02</p>
            <h2 className="display-4 text-ink mb-2">Phone &amp; Email</h2>
            <a href="tel:5085799897" className="block display-5 text-ink tabular hover:text-stamp">
              508-579-9897
            </a>
            <a
              href="mailto:abby@btymaterial.com"
              className="mt-2 inline-flex items-center gap-2 body-sm text-ink-soft hover:text-stamp"
            >
              <Mail className="size-4" /> abby@btymaterial.com
            </a>
            <p className="meta text-ink-soft mt-3 leading-relaxed normal-case">
              Cell coverage at the yard can be limited. If we don't pick up,
              please leave a voicemail — we return calls the same day.
            </p>
          </div>

          <div className="bg-newsprint p-7 border-r border-b border-ink/15">
            <MapPin className="size-7 text-stamp mb-4" />
            <p className="eyebrow text-ink-soft mb-1">§ 03</p>
            <h2 className="display-4 text-ink mb-2">Address</h2>
            <address className="body text-ink not-italic leading-snug">
              2264 Main St.<br />Jefferson, MA 01522
            </address>
            <a
              href="https://maps.google.com/?q=2264+Main+St,+Jefferson,+MA+01522"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block label text-stamp hover:text-ink"
            >
              OPEN IN MAPS →
            </a>
          </div>

          <div className="bg-newsprint p-7 border-r border-b border-ink/15">
            <Clock className="size-7 text-stamp mb-4" />
            <p className="eyebrow text-ink-soft mb-1">§ 04</p>
            <h2 className="display-4 text-ink mb-2">Hours</h2>
            <p className="eyebrow text-stamp mb-2">IN-SEASON (4/1–8/1)</p>
            <dl className="meta text-ink-soft divide-y divide-rule">
              <div className="flex justify-between py-1.5"><dt>MON–FRI</dt><dd className="text-ink tabular">8A–5P</dd></div>
              <div className="flex justify-between py-1.5"><dt>SATURDAY</dt><dd className="text-ink tabular">8A–3P</dd></div>
              <div className="flex justify-between py-1.5"><dt>SUNDAY</dt><dd>CLOSED</dd></div>
            </dl>
            <p className="meta text-ink-soft mt-3 leading-relaxed normal-case">
              Our 2026 season opens <strong className="text-ink">April 1</strong>. After August 1,
              pickup and delivery are by appointment. Salt and ice melt are
              available year-round; call for winter loading hours.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-4 pb-3 rule-thick">
            <h2 className="display-3 text-ink leading-none">The Lot</h2>
            <span className="dateline text-ink-soft hidden sm:inline">2264 MAIN ST · JEFFERSON, MA</span>
          </div>
          <div className="mt-6 aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden border-2 border-ink">
            <iframe
              title="Buy The Yard location map"
              src="https://www.google.com/maps?q=2264+Main+St,+Jefferson,+MA+01522&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.3] contrast-[1.05]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
