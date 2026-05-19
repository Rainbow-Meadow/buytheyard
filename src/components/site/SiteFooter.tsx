import { Link } from "@tanstack/react-router";
import { Facebook } from "lucide-react";
import brandmark from "@/assets/brandmark-dark.png";
import { YelpLogo } from "@/components/site/YelpLogo";
import { openCookieSettings } from "@/lib/cookie-consent";

// TODO: replace with the real Google review short link from the
// Google Business Profile dashboard (looks like https://g.page/r/...).
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=REPLACE_ME";

export function SiteFooter() {
  return (
    <footer className="bg-surface text-surface-foreground">
      <div className="max-w-7xl mx-auto px-5 md:px-6 section">
        {/* Review band */}
        <div className="pb-8 md:pb-12 mb-10 md:mb-14 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2 className="display-4 text-white">
              Leave a <span className="text-brand">Google review.</span>
            </h2>
            <p className="mt-2 body-sm text-zinc-400">
              Reviews from Central Mass neighbors help other folks find the
              yard — and they mean a lot to Abby.
            </p>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-brand text-brand-foreground px-7 h-12 label hover:opacity-90 transition-opacity shrink-0 mx-auto md:mx-0"
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
        </div>

        {/* Main 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center md:text-left">
          {/* Brand & contact */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <img
              src={brandmark}
              alt="Buy The Yard — Mulch · Loam · Sand · Stone"
              width={240}
              height={120}
              className="h-20 w-auto"
              loading="lazy"
              decoding="async"
            />
            <div className="space-y-1">
              <a
                href="tel:5085799897"
                className="block display-4 text-brand hover:text-white transition-colors"
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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2">
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
            <p className="micro text-zinc-500">
              Est. 2016 · WBE Certified
            </p>
          </div>

          {/* Visit */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="display-5 text-white border-l-2 border-brand pl-3 mb-5">
              Visit
            </h3>
            <address className="not-italic body-sm text-zinc-300 leading-relaxed">
              2264 Main St.
              <br />
              Jefferson, MA 01522
            </address>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="display-5 text-white border-l-2 border-brand pl-3 mb-5">
              Hours
            </h3>
            <ul className="body-sm space-y-1.5 w-full max-w-[28ch]">
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
            <p className="mt-4 meta text-zinc-500 leading-relaxed max-w-[32ch] text-center md:text-left">
              In-season 4/1 – 8/1. 2026 opens 4/1. After 8/1: by appointment.
              Winter salt year-round — call for loading hours.
            </p>
          </div>

          {/* Site */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="display-5 text-white border-l-2 border-brand pl-3 mb-5">
              Site
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-y-2 body-sm">
              <Link to="/products" className="text-zinc-300 hover:text-white transition-colors">Products</Link>
              <Link to="/about" className="text-zinc-300 hover:text-white transition-colors">About</Link>
              <Link to="/delivery" className="text-zinc-300 hover:text-white transition-colors">Delivery &amp; Pickup</Link>
              <Link to="/service-area" className="text-zinc-300 hover:text-white transition-colors">Service Area</Link>
              <Link to="/contact" className="text-zinc-300 hover:text-white transition-colors">Contact</Link>
              <Link to="/privacy" className="mt-2 text-zinc-500 hover:text-zinc-300 transition-colors">Privacy &amp; Terms</Link>
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer text-left"
              >
                Cookie settings
              </button>
            </nav>
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 micro text-zinc-500 text-center">
          <span>&copy; {new Date().getFullYear()} Buy The Yard Material · Jefferson, MA · WBE Certified</span>
          <span className="text-zinc-600">Designed by Patrick Berthiaume</span>
        </div>
      </div>
    </footer>
  );
}