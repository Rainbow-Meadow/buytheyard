import { Link } from "@tanstack/react-router";
import { Facebook, Star } from "lucide-react";
import brandmark from "@/assets/brandmark.png";
import { YelpLogo } from "@/components/site/YelpLogo";

// TODO: replace with the real Google review short link from the
// Google Business Profile dashboard (looks like https://g.page/r/...).
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=REPLACE_ME";

export function SiteFooter() {
  return (
    <footer className="bg-surface text-surface-foreground border-t border-white/5">
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 md:flex-1">
            <span className="inline-flex items-center justify-center size-12 rounded-full bg-brand/15 text-brand shrink-0">
              <Star className="size-6 fill-brand" strokeWidth={1.5} />
            </span>
            <div className="text-center md:text-left">
              <p className="font-display text-2xl md:text-3xl uppercase leading-tight">
                Leave a <span className="text-brand">Google review.</span>
              </p>
              <p className="mt-1.5 text-sm text-zinc-400 max-w-[58ch]">
                Reviews from Central Mass neighbors help other folks find the
                yard — and they mean a lot to Abby.
              </p>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-brand text-brand-foreground px-6 h-12 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity shrink-0"
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
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 text-center md:text-left">
        <div className="md:col-span-1 flex flex-col items-center md:items-start">
          <img
            src={brandmark}
            alt="Buy The Yard — Mulch · Loam · Sand · Stone"
            width={240}
            height={120}
            className="h-20 md:h-24 w-auto mx-auto md:mx-0"
            loading="lazy"
            decoding="async"
          />
          <a
            href="tel:5085799897"
            className="mt-5 md:mt-6 inline-block font-display text-2xl text-brand hover:opacity-80"
          >
            508.579.9897
          </a>
          <a
            href="mailto:abby@btymaterial.com"
            className="mt-2 block text-sm text-zinc-300 hover:text-zinc-100"
          >
            abby@btymaterial.com
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2">
            <a
              href="https://www.facebook.com/Buy-The-Yard-Outdoor-Products-546148285792835/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-brand"
            >
              <Facebook className="size-4" /> Facebook
            </a>
            <a
              href="https://www.yelp.com/biz/buy-the-yard-holden"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-brand"
            >
            <YelpLogo className="size-4" /> Yelp
            </a>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500">
            Est. 2016 · WBE Certified
          </p>
        </div>
        <div className="space-y-2 md:space-y-3 flex flex-col items-center md:items-start">
          <h4 className="text-zinc-500 font-display text-lg uppercase tracking-widest">
            Visit
          </h4>
          <p className="text-zinc-200 text-sm leading-relaxed">
            2264 Main St.
            <br />
            Jefferson, MA 01522
          </p>
        </div>
        <div className="space-y-2 md:space-y-3 flex flex-col items-center md:items-start order-last md:order-none">
          <h4 className="text-zinc-500 font-display text-lg uppercase tracking-widest">
            Hours
          </h4>
          <p className="text-zinc-200 text-sm leading-relaxed">
            Mon – Fri: 8:00am – 5:00pm
            <br />
            Saturday: 8:00am – 3:00pm
            <br />
            Sunday: Closed
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-[34ch]">
            In-season 4/1 – 8/1. 2026 opens 4/1.<br />
            After 8/1: by appointment.<br />
            Winter salt year-round — call for loading hours.
          </p>
        </div>
        <div className="space-y-2 md:space-y-3 flex flex-col items-center md:items-start">
          <h4 className="text-zinc-500 font-display text-lg uppercase tracking-widest">
            Site
          </h4>
          <ul className="space-y-1.5 md:space-y-2 text-sm text-zinc-300">
            <li><Link to="/products" className="hover:text-zinc-100">Products</Link></li>
            <li><Link to="/about" className="hover:text-zinc-100">About</Link></li>
            <li><Link to="/delivery" className="hover:text-zinc-100">Delivery &amp; Pickup</Link></li>
            <li><Link to="/service-area" className="hover:text-zinc-100">Service Area</Link></li>
            <li><Link to="/contact" className="hover:text-zinc-100">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-zinc-100">Privacy &amp; Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 md:py-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3 text-xs text-zinc-500 text-center">
          <span>&copy; {new Date().getFullYear()} Buy The Yard Material. WBE Certified.</span>
          <span className="uppercase tracking-widest">Jefferson, MA</span>
        </div>
      </div>
    </footer>
  );
}