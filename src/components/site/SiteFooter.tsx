import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-surface text-surface-foreground border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <p className="font-display text-3xl uppercase tracking-tighter leading-none">
            Buy The <span className="text-brand">Yard</span>
          </p>
          <p className="mt-3 text-xs uppercase tracking-widest text-zinc-500">
            Premium Outdoor Products
          </p>
          <a
            href="tel:5085799897"
            className="mt-6 inline-block font-display text-2xl text-brand hover:opacity-80"
          >
            508.579.9897
          </a>
        </div>
        <div className="space-y-3">
          <h4 className="text-zinc-500 font-display text-lg uppercase tracking-widest">
            Visit
          </h4>
          <p className="text-zinc-200 text-sm leading-relaxed">
            2264 Main St.
            <br />
            Jefferson, MA 01522
          </p>
        </div>
        <div className="space-y-3">
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
          <p className="text-xs text-zinc-500">
            Winter salt &amp; ice melt: call for hours.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-zinc-500 font-display text-lg uppercase tracking-widest">
            Site
          </h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li><Link to="/products" className="hover:text-zinc-100">Products</Link></li>
            <li><Link to="/about" className="hover:text-zinc-100">About</Link></li>
            <li><Link to="/delivery" className="hover:text-zinc-100">Delivery &amp; Pickup</Link></li>
            <li><Link to="/contact" className="hover:text-zinc-100">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Buy The Yard Material. WBE Certified.</span>
          <span className="uppercase tracking-widest">Jefferson, MA</span>
        </div>
      </div>
    </footer>
  );
}