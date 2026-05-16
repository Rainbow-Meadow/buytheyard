import { Link } from "@tanstack/react-router";
import { Facebook } from "lucide-react";
import brandmark from "@/assets/brandmark.png";
import { YelpLogo } from "@/components/site/YelpLogo";

export function SiteFooter() {
  return (
    <footer className="bg-surface text-surface-foreground border-t border-white/5">
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
              <Star className="size-4" /> Yelp
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
            In-season 4/1 – 8/1. Opening 4/1/26.<br />
            Aug+: by appointment.<br />
            Open year-round — winter salt available, call for hours.
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