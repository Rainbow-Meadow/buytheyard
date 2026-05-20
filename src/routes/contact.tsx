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
import yardPatio from "@/assets/source/yard-banner-5.webp";
import yardDog from "@/assets/source/yard-dog.webp";

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
      <section className="bg-surface text-surface-foreground">
        {/* Mobile stacked hero */}
        <div className="md:hidden">
          <div className="aspect-square overflow-hidden">
            <img src={yardPatio} alt="The patio area at the Buy The Yard lot in Jefferson, MA" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          </div>
          <div className="px-5 py-8">
            <p className="eyebrow text-brand mb-4">Contact</p>
            <h1 className="display-2 leading-[0.9]">
              Call. <span className="text-brand">We answer.</span>
            </h1>
            <p className="mt-4 text-zinc-300 text-base">
              Phone is fastest. Use the online quote form for material lists. Email works for anything that's not urgent.
            </p>
          </div>
        </div>

        {/* Desktop split hero */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 section-loose grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7">
              <p className="eyebrow text-brand mb-4">Contact</p>
              <h1 className="display-1 leading-[0.9] max-w-[14ch]">
                Call. <span className="text-brand">We answer.</span>
              </h1>
              <p className="mt-6 text-zinc-400 max-w-[52ch] text-lg">
                Phone is fastest. Use the online quote form for material lists. Email works for anything that's not urgent.
              </p>
            </div>
            <div className="col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-md ring-1 ring-white/10">
                <img src={yardPatio} alt="The patio area at the Buy The Yard lot in Jefferson, MA" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA channels — unified across breakpoints */}
        <div className="max-w-7xl mx-auto px-5 md:px-6 pb-12 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <a
              href="tel:5085799897"
              className="group flex items-center gap-4 bg-brand text-brand-foreground px-6 py-6 rounded-md hover:opacity-90 transition-opacity"
            >
              <Phone className="size-8 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col leading-tight">
                <span className="eyebrow opacity-80">
                  Call
                </span>
                <span className="display-4">
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
                <span className="eyebrow opacity-80">
                  Online
                </span>
                <span className="display-4">
                  Get a quote
                </span>
              </span>
              <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <a
              href="mailto:abby@btymaterial.com"
              className="group bg-white/5 ring-1 ring-white/10 rounded-md p-5 backdrop-blur-sm hover:bg-white/10"
            >
              <Mail className="size-5 text-brand mb-3" />
              <p className="eyebrow text-zinc-400 mb-1">Email · non-urgent</p>
              <p className="display-5 text-white leading-tight break-all">abby@btymaterial.com</p>
            </a>
            <a
              href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
              target="_blank"
              rel="noreferrer"
              className="group bg-white/5 ring-1 ring-white/10 rounded-md p-5 backdrop-blur-sm hover:bg-white/10"
            >
              <Facebook className="size-5 text-brand mb-3" />
              <p className="eyebrow text-zinc-400 mb-1">Social</p>
              <p className="display-5 text-white leading-tight">Facebook</p>
            </a>
            <a
              href="https://www.yelp.com/biz/buy-the-yard-holden"
              target="_blank"
              rel="noreferrer"
              className="group bg-white/5 ring-1 ring-white/10 rounded-md p-5 backdrop-blur-sm hover:bg-white/10"
            >
              <YelpLogo className="size-5 text-brand mb-3" />
              <p className="eyebrow text-zinc-400 mb-1">Reviews</p>
              <p className="display-5 text-white leading-tight">Yelp</p>
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-500 max-w-[60ch]">
            Heads up: the chat widget on our previous website is no longer monitored.
          </p>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
          {/* Featured editorial: Address + dog photo — desktop only */}
          <article className="hidden md:flex md:col-span-6 relative overflow-hidden rounded-md bg-surface text-surface-foreground aspect-[5/4]">
            <img src={yardDog} alt="The yard dog at Buy The Yard" className="absolute inset-0 w-full h-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col h-full w-full">
              <MapPin className="size-7 text-brand" />
              <div className="mt-auto">
                <p className="eyebrow text-brand mb-2">Stop by</p>
                <p className="display-3 text-white leading-tight">2264 Main St.<br />Jefferson, MA 01522</p>
                <a
                  href="https://maps.google.com/?q=2264+Main+St,+Jefferson,+MA+01522"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 label text-white border-b border-white/40 hover:text-brand hover:border-brand"
                >
                  Open in maps →
                </a>
              </div>
            </div>
          </article>

          {/* Address card — mobile only */}
          <div className="md:hidden bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <MapPin className="size-7 text-brand mb-4" />
            <h2 className="display-4 mb-2">Address</h2>
            <p className="text-zinc-900">
              2264 Main St.
              <br />
              Jefferson, MA 01522
            </p>
            <a
              href="https://maps.google.com/?q=2264+Main+St,+Jefferson,+MA+01522"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block label text-brand font-semibold"
            >
              Open in maps →
            </a>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 gap-3 md:gap-6 content-start">
          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <ClipboardList className="size-7 text-brand mb-4" />
            <h2 className="display-4 mb-2">Get a Quote</h2>
            <p className="text-sm text-zinc-700 mb-3">
              Best for material lists. Send your products, town, and timing, and we'll come back with pricing.
            </p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 label text-brand font-semibold hover:opacity-80"
            >
              Start a request <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <Phone className="size-7 text-brand mb-4" />
            <h2 className="display-4 mb-2">Phone &amp; Email</h2>
            <a href="tel:5085799897" className="block text-zinc-900 font-semibold hover:text-brand">
              508-579-9897
            </a>
            <a
              href="mailto:abby@btymaterial.com"
              className="mt-2 flex items-center gap-2 text-sm text-zinc-700 hover:text-brand"
            >
              <Mail className="size-4" /> abby@btymaterial.com
            </a>
            <p className="text-xs text-zinc-600 mt-2">
              Cell coverage at the yard can be spotty. If we don't pick up, leave a voicemail. We return calls the same day.
            </p>
          </div>

          <div className="bg-kraft p-8 rounded-md ring-1 ring-zinc-300">
            <Clock className="size-7 text-brand mb-4" />
            <h2 className="display-4 mb-2">Hours</h2>
            <p className="eyebrow text-brand mb-2">
              In-season (4/1 – 8/1)
            </p>
            <ul className="text-sm text-zinc-900 space-y-1">
              <li className="flex justify-between gap-4"><span>Mon–Fri</span><span>8a – 5p</span></li>
              <li className="flex justify-between gap-4"><span>Saturday</span><span>8a – 3p</span></li>
              <li className="flex justify-between gap-4"><span>Sunday</span><span className="text-zinc-500">Closed</span></li>
            </ul>
            <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
              Our 2026 season opens <strong>April 1</strong>. After August 1, pickup and delivery are by appointment. Salt and ice melt are available year-round, so call for winter loading hours.
            </p>
          </div>
          </div>
        </div>
      </section>

      <section className="section bg-base">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
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
