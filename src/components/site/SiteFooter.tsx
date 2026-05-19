import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Phone } from "lucide-react";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import { YelpLogo } from "@/components/site/YelpLogo";
import { openCookieSettings } from "@/lib/cookie-consent";
import { Stamp } from "@/components/site/Stamp";

// TODO: replace with the real Google review short link from the
// Google Business Profile dashboard (looks like https://g.page/r/...).
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=REPLACE_ME";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=2264+Main+St,+Jefferson,+MA+01522&output=embed";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=2264+Main+St,+Jefferson,+MA+01522";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-newsprint text-ink border-t-4 border-ink">
      {/* Back-page nameplate */}
      <div className="bg-ink text-newsprint">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4">
          <span className="dateline text-newsprint/70">
            BACK PAGE · THE YARD GAZETTE
          </span>
          <span className="dateline text-newsprint/70 hidden sm:inline">
            VOL. X · CENTRAL MASS EDITION
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Top: masthead + phone — newsprint headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b-2 border-ink">
          <div className="md:col-span-7">
            <p className="dateline text-ink-soft">
              JEFFERSON, MA · EST. 2016 · WBE CERTIFIED
            </p>
            <h2 className="masthead text-ink mt-2 text-[2.5rem] md:text-[3.75rem] leading-[0.85]">
              The Yard Gazette
            </h2>
            <p className="body mt-3 text-ink-soft max-w-[48ch]">
              Mulch, loam, sand and stone — by the yard — printed and delivered
              out of 2264 Main St., Jefferson, Mass.
            </p>
          </div>
          <div className="md:col-span-5 md:border-l md:border-ink/30 md:pl-10 flex flex-col">
            <p className="dateline text-ink-soft">CALL THE YARD</p>
            <a
              href="tel:5085799897"
              className="block font-display font-bold tabular text-ink leading-none mt-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              508.579.9897
            </a>
            <a
              href="mailto:abby@btymaterial.com"
              className="body-sm text-ink-soft hover:text-stamp mt-2"
            >
              abby@btymaterial.com
            </a>
            <a
              href="tel:5085799897"
              className="mt-4 inline-flex items-center gap-2 bg-stamp text-newsprint label px-5 h-11 w-fit btn-press hover:bg-ink"
            >
              <Phone className="size-4" strokeWidth={2.5} /> Call Abby
            </a>
          </div>
        </div>

        {/* Column grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 py-8 md:py-10 border-b border-rule">
          {/* Hours */}
          <div className="col-span-2 md:col-span-3">
            <p className="eyebrow text-stamp mb-3">HOURS</p>
            <dl className="meta text-ink-soft divide-y divide-rule">
              <div className="flex justify-between py-1.5">
                <dt>MON–FRI</dt><dd className="text-ink tabular">8–5</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt>SATURDAY</dt><dd className="text-ink tabular">8–3</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt>SUNDAY</dt><dd className="text-ink">CLOSED</dd>
              </div>
            </dl>
            <p className="dateline text-ink-soft mt-3 leading-relaxed">
              IN-SEASON 4/1–8/1 · APPT AFTER
            </p>
          </div>

          {/* Visit */}
          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow text-stamp mb-3">VISIT THE LOT</p>
            <address className="body not-italic text-ink leading-snug">
              2264 Main St.<br />Jefferson, MA 01522
            </address>
            <div className="mt-3 w-full aspect-[16/9] border border-ink/30 overflow-hidden">
              <iframe
                src={MAP_EMBED_URL}
                title="Buy The Yard Material — 2264 Main St, Jefferson, MA"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[0.4] contrast-[1.08]"
                style={{ border: 0 }}
              />
            </div>
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 label text-ink hover:text-stamp"
            >
              GET DIRECTIONS <ArrowRight className="size-4" />
            </a>
          </div>

          {/* Sections */}
          <nav className="col-span-1 md:col-span-2">
            <p className="eyebrow text-stamp mb-3">SECTIONS</p>
            <ul className="body-sm space-y-1.5">
              <li><Link to="/products" className="text-ink hover:text-stamp">Catalog</Link></li>
              <li><Link to="/delivery" className="text-ink hover:text-stamp">Delivery</Link></li>
              <li><Link to="/service-area" className="text-ink hover:text-stamp">Service Area</Link></li>
              <li><Link to="/about" className="text-ink hover:text-stamp">About Abby</Link></li>
              <li><Link to="/contact" className="text-ink hover:text-stamp">Contact</Link></li>
              <li><Link to="/quote" className="text-ink hover:text-stamp">Get a Quote</Link></li>
            </ul>
          </nav>

          {/* Reviews + socials */}
          <div className="col-span-1 md:col-span-3">
            <p className="eyebrow text-stamp mb-3">SAY HELLO</p>
            <p className="body-sm text-ink-soft">
              Reviews from Central Mass neighbors mean a lot.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 border-2 border-ink text-ink label px-4 h-10 btn-press hover:bg-ink hover:text-newsprint"
            >
              Write a Google review
            </a>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.facebook.com/BuyTheYardOutdoorProducts"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 label text-ink-soft hover:text-stamp"
              >
                <Facebook className="size-4" /> FB
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
            <div className="mt-5 flex items-center gap-3">
              <img
                src={wbeSeal}
                alt="Massachusetts WBE certified seal"
                width={56}
                height={56}
                className="h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <Stamp size="sm" rotation={-4}>WBE CERTIFIED · 2018</Stamp>
            </div>
          </div>
        </div>

        {/* Colophon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center pt-5 micro text-ink-soft">
          <span>
            &copy; {year} BUY THE YARD MATERIAL · JEFFERSON, MA · WBE CERTIFIED
          </span>
          <span className="md:text-right">
            <Link to="/privacy" className="hover:text-stamp mr-4">PRIVACY &amp; TERMS</Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-stamp cursor-pointer"
            >
              COOKIE SETTINGS
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
