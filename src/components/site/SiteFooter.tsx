import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook } from "lucide-react";
import brandmark from "@/assets/brandmark-dark.webp";
import wbeSeal from "@/assets/source/wbe-seal.webp";
import { YelpLogo } from "@/components/site/YelpLogo";
import { openCookieSettings } from "@/lib/cookie-consent";

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
    <footer className="bg-surface text-surface-foreground border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-8 md:py-10">
        {/* Row 1: Google review | Logo | WBE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 pb-6 md:pb-8 border-b border-white/10 items-stretch">
          {/* Google review */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-center">
              <h2 className="display-5 text-white">
                Leave a <span className="text-brand">Google review.</span>
              </h2>
              <p className="body-sm text-zinc-400">
                Reviews from Central Mass neighbors mean a lot to me.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-brand text-brand-foreground px-6 h-10 label hover:opacity-90 transition-opacity"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="size-5 bg-white rounded-full p-[2px]"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Write a Google review
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <a
                  href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 label text-zinc-400 hover:text-white transition-colors"
                >
                  <Facebook className="size-4" /> Facebook
                </a>
                <a
                  href="https://www.yelp.com/biz/buy-the-yard-holden"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 label text-zinc-400 hover:text-white transition-colors"
                >
                  <YelpLogo className="size-4" /> Yelp
                </a>
              </div>
          </div>

          {/* Logo centerpiece */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-center">
              <img
                src={brandmark}
                alt="Buy The Yard — Mulch · Loam · Sand · Stone"
                width={320}
                height={160}
                className="h-32 md:h-44 w-auto object-fill"
                loading="lazy"
                decoding="async"
              />
              <p className="meta text-zinc-500">
                Est. 2016 · WBE Certified
              </p>
          </div>

          {/* WBE */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-center">
              <img
                src={wbeSeal}
                alt="Massachusetts WBE certified seal"
                width={160}
                height={100}
                className="h-16 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="display-5 text-white">Certified Woman-Owned</p>
                <p className="mt-1 body-sm text-zinc-300">
                  Certified by the Commonwealth of Massachusetts since 2018.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 label text-white hover:text-brand transition-colors"
              >
                Meet Abby <ArrowRight className="size-4" />
              </Link>
          </div>
        </div>

        {/* Row 2: Hours | Visit (map) | Site */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 pt-6 md:pt-8 items-stretch">
          {/* Hours */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-start">
              <h3 className="display-5 text-white border-b-2 border-brand pb-1">
                Hours
              </h3>
              <ul className="body-sm space-y-1 w-full max-w-[28ch] mx-auto">
                <li className="flex justify-between gap-4">
                  <span className="text-zinc-500">Mon – Fri</span>
                  <span className="text-zinc-200">8:00am – 5:00pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-zinc-500">Saturday</span>
                  <span className="text-zinc-200">8:00am – 3:00pm</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-zinc-500">Sunday</span>
                  <span className="text-zinc-200">Closed</span>
                </li>
              </ul>
              <p className="meta text-zinc-500 leading-relaxed">
                In-season 4/1 to 8/1. After 8/1, by appointment. Winter salt year-round.
              </p>
              <div className="space-y-1">
                <a
                  href="tel:5085799897"
                  className="block display-5 text-brand hover:text-white transition-colors"
                >
                  508.579.9897
                </a>
                <a
                  href="mailto:abby@btymaterial.com"
                  className="block body-sm text-zinc-300 hover:text-white transition-colors"
                >
                  abby@btymaterial.com
                </a>
              </div>
          </div>

          {/* Visit + map */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-start">
              <h3 className="display-5 text-white border-b-2 border-brand pb-1">
                Visit
              </h3>
              <address className="not-italic body-sm text-zinc-300 leading-relaxed">
                2264 Main St.
                <br />
                Jefferson, MA 01522
              </address>
              <div className="w-full max-w-[16rem] aspect-video border border-white/10 overflow-hidden">
                <iframe
                  src={MAP_EMBED_URL}
                  title="Buy The Yard Material — 2264 Main St, Jefferson, MA"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[0.2] contrast-[1.05]"
                  style={{ border: 0 }}
                />
              </div>
              <a
                href={MAP_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 label text-zinc-300 hover:text-white transition-colors"
              >
                Get directions <ArrowRight className="size-4" />
              </a>
          </div>

          {/* Site */}
          <div className="flex-col text-center space-y-3 px-2 md:px-4 flex items-center justify-start">
              <h3 className="display-5 text-white border-b-2 border-brand pb-1">
                Site
              </h3>
              <nav className="flex flex-col items-center gap-y-1 body-sm">
                <Link to="/products" className="text-zinc-300 hover:text-white transition-colors">Products</Link>
                <Link to="/about" className="text-zinc-300 hover:text-white transition-colors">About</Link>
                <Link to="/delivery" className="text-zinc-300 hover:text-white transition-colors">Delivery &amp; Pickup</Link>
                <Link to="/service-area" className="text-zinc-300 hover:text-white transition-colors">Service Area</Link>
                <Link to="/contact" className="text-zinc-300 hover:text-white transition-colors">Contact</Link>
                <Link to="/privacy" className="mt-2 text-zinc-500 hover:text-zinc-300 transition-colors">Privacy &amp; Terms</Link>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Cookie settings
                </button>
              </nav>
          </div>
        </div>

        {/* Legal bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 items-center mt-6 md:mt-8 pt-4 md:pt-5 border-t border-white/10 micro text-zinc-500 text-center md:text-left">
          <span>
            &copy; {year} Buy The Yard Material · Jefferson, MA · WBE Certified
          </span>
          <span className="text-zinc-600 text-center md:text-right">
            Designed by Patrick Berthiaume
          </span>
        </div>
      </div>
    </footer>
  );
}
